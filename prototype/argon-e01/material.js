(() => {
  const canvas = document.querySelector("#material-canvas");
  const portrait = document.querySelector(".world__image--portrait img");
  const renewal = document.querySelector(".world__image--skin img");
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "high-performance" });
  if (!gl) return;

  const vertexSource = `
    attribute vec2 aPosition;
    varying vec2 vUv;
    void main() {
      vUv = aPosition * 0.5 + 0.5;
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `;

  const fragmentSource = `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uPortrait;
    uniform sampler2D uRenewal;
    uniform float uProgress;
    uniform float uViewAspect;
    uniform float uImageAspect;
    uniform vec2 uPointer;
    uniform float uReduced;

    vec2 coverUv(vec2 uv) {
      if (uImageAspect > uViewAspect) {
        float crop = uViewAspect / uImageAspect;
        float mobile = 1.0 - smoothstep(0.55, 0.9, uViewAspect);
        float focusX = mix(0.5, 0.86, mobile);
        uv.x = (uv.x - 0.5) * crop + (0.5 + (focusX - 0.5) * (1.0 - crop));
        float focusY = mix(0.5, 0.56, mobile);
        uv.y = (uv.y - 0.5) * mix(1.0, 0.88, mobile) + focusY;
      } else {
        uv.y = (uv.y - 0.5) * (uImageAspect / uViewAspect) + 0.5;
      }
      return clamp(uv, 0.001, 0.999);
    }

    float fieldNoise(vec2 p) {
      return sin(p.x * 18.0 + sin(p.y * 11.0)) * cos(p.y * 14.0 - p.x * 3.0);
    }

    void main() {
      float p = uProgress;
      float renewal = smoothstep(0.84, 0.995, p);

      vec2 uv = vUv;
      float camera = 1.0 + (1.0 - uReduced) * 0.035 * smoothstep(0.68, 0.84, p);
      uv = coverUv((uv - 0.5) / camera + 0.5);

      vec3 base = texture2D(uPortrait, clamp(uv, 0.001, 0.999)).rgb;
      // A luminous optical plane travels through the existing portrait. The
      // field is composited into its pixels so it reads as light on the scene,
      // not as a floating overlay or a skin-result transition.
      float laserPresence = uReduced > 0.5
        ? step(0.5, p) * 0.86
        : smoothstep(0.015, 0.10, p) * (1.0 - smoothstep(0.54, 0.68, p));
      float scanProgress = uReduced > 0.5 ? 0.72 : smoothstep(0.0, 1.0, p / 0.68);
      float mobile = 1.0 - smoothstep(0.72, 0.92, uViewAspect);
      float scanX = mix(0.42, 1.08, pow(scanProgress, 0.62));
      scanX = mix(scanX, mix(0.24, 1.03, pow(scanProgress, 0.62)), mobile);
      float dx = abs(vUv.x - scanX);
      float vertical = exp(-pow((vUv.y - 0.54) / mix(0.29, 0.34, mobile), 2.0));
      float fieldWidth = mix(0.12, 0.17, mobile);
      float haloWidth = mix(0.05, 0.07, mobile);
      float coreWidth = mix(0.012, 0.022, mobile);
      float field = exp(-pow(dx / fieldWidth, 2.0)) * vertical * laserPresence;
      float halo = exp(-pow(dx / haloWidth, 2.0)) * vertical * laserPresence;
      float core = exp(-pow(dx / coreWidth, 2.0)) * vertical * laserPresence;
      vec3 world = base * (1.0 + field * 0.26 + halo * 0.08);
      world += vec3(0.09, 0.08, 0.064) * field;
      world += vec3(0.13, 0.115, 0.09) * halo;
      world += vec3(0.29, 0.27, 0.23) * core;

      // This scene axis remains reserved for the existing Renewal handoff.
      float radius = 0.006 + pow(renewal, 1.8) * 0.9;
      float edgeNoise = fieldNoise(uv * vec2(1.1, 0.9)) * 0.12 * sqrt(renewal);
      float transitionAxis = (uv.y - (0.515 - (uv.x - 0.5) * 0.27)) + edgeNoise;
      float materialDistance = abs(transitionAxis);
      float revealStart = smoothstep(0.85, 0.91, p);
      float materialField = revealStart * (1.0 - smoothstep(radius - 0.035, radius + 0.06, materialDistance));
      float transitionEdge = exp(-pow((materialDistance - radius) / 0.045, 2.0)) * revealStart * (1.0 - renewal * 0.52);

      vec2 oldBend = uv + vec2(sin(uv.y * 12.0 + p * 8.0), cos(uv.x * 15.0 - p * 6.0)) * (0.010 * transitionEdge * (1.0 - uReduced));
      vec2 skinBend = uv + vec2(sin(uv.y * 9.0 + 0.7), cos(uv.x * 11.0 - 0.4)) * (0.012 * renewal * (1.0 - uReduced));
      vec3 oldMaterial = texture2D(uPortrait, clamp(oldBend, 0.001, 0.999)).rgb;
      vec3 newMaterial = texture2D(uRenewal, clamp(skinBend, 0.001, 0.999)).rgb;
      world = mix(world, oldMaterial, 0.22 * transitionEdge);
      world = mix(world, newMaterial, materialField);
      world += vec3(0.13, 0.13, 0.125) * transitionEdge;

      // A broad fixed luminance field gives Renewal a softer surface response;
      // pointer movement shifts it only slightly and never creates a cursor spot.
      float glowCenter = distance(vUv, vec2(0.57 + (uPointer.x - 0.5) * 0.025, 0.55));
      float softLuminosity = exp(-pow(glowCenter / 0.62, 2.0)) * renewal * 0.035;
      world += vec3(softLuminosity);

      gl_FragColor = vec4(clamp(world, 0.0, 1.0), 1.0);
    }
  `;

  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("E01 material shader error:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vertex = compile(gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertex || !fragment) return;
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("E01 material program error:", gl.getProgramInfoLog(program));
    return;
  }

  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uniforms = Object.fromEntries(["uPortrait", "uRenewal", "uProgress", "uViewAspect", "uImageAspect", "uPointer", "uReduced"].map(name => [name, gl.getUniformLocation(program, name)]));
  const imageAspect = portrait.naturalWidth / portrait.naturalHeight || 1.5;
  const textures = [];

  function makeTexture(image, unit) {
    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    return texture;
  }

  let progress = 0;
  let pointer = { x: 0.5, y: 0.5 };
  let scheduled = false;
  let ready = false;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, matchMedia("(max-width: 700px)").matches ? 1.2 : 1.45);
    const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      draw();
    }
  }

  function draw() {
    if (!ready) return;
    scheduled = false;
    canvas.dataset.progress = progress.toFixed(3);
    canvas.dataset.frame = String((Number(canvas.dataset.frame) || 0) + 1);
    gl.useProgram(program);
    gl.uniform1i(uniforms.uPortrait, 0);
    gl.uniform1i(uniforms.uRenewal, 1);
    gl.uniform1f(uniforms.uProgress, progress);
    gl.uniform1f(uniforms.uViewAspect, canvas.width / canvas.height);
    gl.uniform1f(uniforms.uImageAspect, imageAspect);
    gl.uniform2f(uniforms.uPointer, pointer.x, pointer.y);
    gl.uniform1f(uniforms.uReduced, document.body.classList.contains("reduced-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  function requestDraw() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(draw);
    }
  }

  function imageReady(image) {
    if (image.complete && image.naturalWidth) return Promise.resolve();
    return new Promise(resolve => {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", resolve, { once: true });
    });
  }

  Promise.all([imageReady(portrait), imageReady(renewal)]).then(() => {
    if (!portrait.naturalWidth || !renewal.naturalWidth) {
      console.error("E01 material images did not load; using the DOM fallback.");
      return;
    }
    textures.push(makeTexture(portrait, 0), makeTexture(renewal, 1));
    ready = true;
    document.body.classList.add("webgl-ready");
    resize();
    draw();
  });

  new ResizeObserver(resize).observe(canvas);
  window.addEventListener("orientationchange", resize);
  window.addEventListener("world:progress", event => {
    progress = Math.max(0, Math.min(1, event.detail.progress));
    requestDraw();
  });
  window.addEventListener("world:pointer", event => {
    pointer = event.detail;
    requestDraw();
  });
})();
