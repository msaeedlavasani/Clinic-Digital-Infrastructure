(() => {
  const root = document.documentElement;
  const world = document.querySelector("#world");
  const heroCopy = document.querySelector(".scene-copy--hero");
  const laserCopy = document.querySelector(".scene-copy--laser");
  const portrait = document.querySelector(".world__image--portrait");
  const focusPlane = document.querySelector(".world__focus-plane");
  const announcer = document.querySelector("#state-announcement");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const query = new URLSearchParams(location.search);
  const forceReduced = query.get("reduced") === "1";
  const motionReduced = () => reducedMotion.matches || forceReduced;
  const scenes = ["hero", "treatments", "laser-event", "laserDetail", "doctor", "technology", "consultation"];
  const sceneNames = {
    fa: ["معرفی کلینیک", "خدمات", "تجربه‌ی لیزر", "اطلاعات لیزر موهای زائد", "پزشک و تخصص", "فناوری و محیط", "درخواست مشاوره"],
    en: ["Clinic introduction", "Treatments", "Laser experience", "Laser hair removal information", "Doctor and care", "Technology and clinic", "Request a consultation"]
  };
  const copy = {
    fa: {
      navTreatments: "خدمات", navDoctor: "پزشکان", navTechnology: "تکنولوژی", navConsultation: "مشاوره",
      heroEyebrow: "کلینیک پوست، مو و زیبایی آرگون", heroTitle: "زیبایی، با دقت بیشتر.", heroNote: "پزشکی، فناوری و نگاهی شخصی به مراقبت از زیبایی.", heroServices: "مشاهده خدمات", heroConsultation: "درخواست مشاوره",
      laserEyebrow: "تجربه‌ی لیزر", laserTitle: "لیزر موهای زائد", laserNote: "نور متمرکز، با حرکتی دقیق و کنترل‌شده.", laserDetailAction: "ادامه به اطلاعات درمان",
      treatmentsEyebrow: "خدمات", laserDetailEyebrow: "اطلاعات درمان — لیزر", laserDetailTitle: "لیزر موهای زائد", laserDetailIntro: "انتخاب روش و برنامه‌ی درمان پس از مشاوره و ارزیابی فردی انجام می‌شود. این اطلاعات نمایشی است و جایگزین نظر پزشک نیست.",
      factDuration: "مدت جلسه", factDurationValue: "وابسته به ناحیه", factSessions: "تعداد جلسات", factSessionsValue: "پس از ارزیابی مشخص می‌شود", factDowntime: "دوره‌ی نقاهت", factDowntimeValue: "در مشاوره بررسی می‌شود", factArea: "ناحیه‌ی درمان", factAreaValue: "بر اساس نیاز فرد", meetDoctor: "آشنایی با پزشک", seeTechnology: "فناوری و محیط", requestConsultation: "درخواست مشاوره",
      doctorEyebrow: "پزشک و تخصص", doctorKicker: "مراقبت، با گفت‌وگو آغاز می‌شود.", doctorName: "دکتر ن. رحیمی", doctorSpecialty: "پوست و پزشکی زیبایی", doctorLine: "ارزیابی و گفت‌وگو، بخشی از مسیر انتخاب درمان است.", demoDoctor: "اطلاعات این نسخه صرفاً جهت نمایش دمو است.", doctorNext: "آشنایی با فناوری و محیط", technologyNext: "درخواست مشاوره",
      technologyEyebrow: "فناوری و محیط", technologyTitle: "دقت، در محیطی آرام.", technologyNote: "تجهیزات، فضا و تجربه‌ی مراقبت در کنار هم روایت می‌شوند.", demoTechnology: "تصویر و تجهیزات، نمایشی‌اند و به مدل مشخصی اشاره ندارند.",
      consultationEyebrow: "مشاوره", consultationTitle: "گفت‌وگو را آغاز کنید.", consultationNote: "برای آشنایی با مسیر درمان، درخواست خود را در این فرم نمایشی وارد کنید.", nameLabel: "نام", phoneLabel: "شماره تماس", serviceLabel: "خدمت مورد نظر", submitConsult: "ثبت درخواست مشاوره", localOnly: "نسخه‌ی نمایشی — اطلاعات ارسال یا ذخیره نمی‌شود.", contactLabel: "راه‌های تماس نمایشی:", phoneDemo: "+۹۸ ۲۱ ۰۰۰۰ ۰۰۰۰", whatsapp: "واتساپ", signoff: "تجربه‌ای سنجیده‌تر.", continue: "ادامه", previous: "رفتن به بخش قبل", next: "ادامه به بخش بعد", pageLabel: "تجربه‌ی کلینیک زیبایی آرگون", navLabel: "بخش‌های اصلی", treatmentList: "انتخاب خدمت", factsLabel: "اطلاعات کلی درمان", serviceSelect: "انتخاب خدمت مورد نظر", notIncluded: "جزئیات این خدمت در نسخه‌ی نمایشی تکمیل نشده است.", formReceived: "اطلاعات پاک شد؛ در این نسخه‌ی نمایشی درخواستی ارسال یا ذخیره نشد."
    },
    en: {
      navTreatments: "Treatments", navDoctor: "Expertise", navTechnology: "Technology", navConsultation: "Consultation",
      heroEyebrow: "ARGON AESTHETIC CLINIC", heroTitle: "Beauty, with greater care.", heroNote: "Medicine, technology and a personal approach to aesthetic care.", heroServices: "Explore treatments", heroConsultation: "Request a consultation",
      laserEyebrow: "THE LASER EXPERIENCE", laserTitle: "Laser Hair Removal", laserNote: "Focused light, in a precise and controlled movement.", laserDetailAction: "Continue to treatment information",
      treatmentsEyebrow: "TREATMENTS", laserDetailEyebrow: "TREATMENT INFORMATION — LASER", laserDetailTitle: "Laser Hair Removal", laserDetailIntro: "Treatment approach and planning follow a consultation and individual assessment. This demonstration information is not a substitute for medical advice.",
      factDuration: "Session duration", factDurationValue: "Depends on area", factSessions: "Number of sessions", factSessionsValue: "Set after assessment", factDowntime: "Recovery", factDowntimeValue: "Discussed in consultation", factArea: "Treatment area", factAreaValue: "Based on individual needs", meetDoctor: "Meet the clinician", seeTechnology: "Technology and setting", requestConsultation: "Request a consultation",
      doctorEyebrow: "DOCTOR & CARE", doctorKicker: "Care begins with a conversation.", doctorName: "Dr. N. Rahimi", doctorSpecialty: "Dermatology & Aesthetic Medicine", doctorLine: "Assessment and conversation inform the treatment choice.", demoDoctor: "This profile is for demonstration purposes only.", doctorNext: "Explore the clinic setting", technologyNext: "Request a consultation",
      technologyEyebrow: "TECHNOLOGY & SETTING", technologyTitle: "Precision, in a calm setting.", technologyNote: "Equipment, environment and care are presented as one experience.", demoTechnology: "Illustrative imagery and equipment; no specific model is represented.",
      consultationEyebrow: "CONSULTATION", consultationTitle: "Begin with a conversation.", consultationNote: "Use this demo form to explore the consultation step.", nameLabel: "Name", phoneLabel: "Phone number", serviceLabel: "Treatment of interest", submitConsult: "Submit demo request", localOnly: "Demonstration only — details are not sent or stored.", contactLabel: "Demo contact:", phoneDemo: "+98 21 0000 0000", whatsapp: "WhatsApp", signoff: "A more considered experience.", continue: "Continue", previous: "Previous scene", next: "Continue to next scene", pageLabel: "ARGON aesthetic clinic experience", navLabel: "Main sections", treatmentList: "Choose a treatment", factsLabel: "Treatment overview", serviceSelect: "Choose a treatment", notIncluded: "More information for this treatment is not included in this demo.", formReceived: "Fields cleared. This demo did not send or store a request."
    }
  };
  const treatments = {
    laser: { fa: ["لیزر موهای زائد", "رویکردی سنجیده به نور و دقت."], en: ["Laser Hair Removal", "A considered approach to light and precision."] },
    botox: { fa: ["بوتاکس", "درمانی با تمرکز بر دقت و انتخاب آگاهانه."], en: ["Botox", "An approach centered on precision and informed choice."] },
    filler: { fa: ["فیلر", "توجه به تناسب و ویژگی‌های فردی."], en: ["Dermal Fillers", "A focus on proportion and individual features."] },
    rejuvenation: { fa: ["جوانسازی پوست", "نگاهی سنجیده به بافت و شادابی پوست."], en: ["Skin Rejuvenation", "A considered approach to skin texture and vitality."] },
    hair: { fa: ["کاشت / ترمیم مو", "مسیر مراقبت متناسب با نیاز هر فرد."], en: ["Hair Restoration", "A care pathway shaped around individual needs."] }
  };
  const materialStops = [0, 0, .68, .68, .68, .68, .68];
  let sceneIndex = 0;
  let progress = 0;
  let locale = query.get("lang") === "en" ? "en" : "fa";
  let activeTreatment = "laser";
  let animationFrame = 0;
  let inputUnlockTimer = 0;
  let wheelSum = 0;
  let wheelTimer = 0;
  let inputLocked = false;
  let touchStart = null;
  let pointer = { x: .5, y: .5 };

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const smooth = (start, end, value) => {
    const x = clamp((value - start) / (end - start));
    return x * x * (3 - 2 * x);
  };
  const lerp = (a, b, p) => a + (b - a) * p;
  const digits = value => locale === "fa" ? String(value).replace(/[0-9]/g, digit => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]) : String(value);

  function setLanguage(next) {
    locale = next === "en" ? "en" : "fa";
    root.lang = locale === "fa" ? "fa-IR" : "en";
    root.dir = locale === "fa" ? "rtl" : "ltr";
    document.body.dataset.locale = locale;
    document.title = locale === "fa" ? "ARGON — کلینیک پوست، مو و زیبایی" : "ARGON — Aesthetic Clinic";
    document.querySelector('meta[name="description"]').content = locale === "fa"
      ? "ARGON — تجربه‌ی نمایشی کلینیک پوست، مو و زیبایی."
      : "ARGON — a demonstration experience for a skin, hair and aesthetic clinic.";
    document.querySelector("main").setAttribute("aria-label", copy[locale].pageLabel);
    document.querySelector("#home-reset").setAttribute("aria-label", locale === "fa" ? "ARGON — آغاز" : "ARGON — Home");
    document.querySelector(".primary-nav").setAttribute("aria-label", copy[locale].navLabel);
    document.querySelector(".treatment-rail").setAttribute("aria-label", copy[locale].treatmentList);
    document.querySelector(".treatment-facts").setAttribute("aria-label", copy[locale].factsLabel);
    document.querySelector("#consult-service").setAttribute("aria-label", copy[locale].serviceSelect);
    document.querySelector('[name="name"]').placeholder = locale === "fa" ? "نام و نام خانوادگی" : "Full name";
    document.querySelector('[name="phone"]').placeholder = locale === "fa" ? "شماره تماس" : "Phone number";
    document.querySelector("#consult-service option[value='']").textContent = locale === "fa" ? "انتخاب خدمت" : "Select a treatment";
    document.querySelector(".scene-copy--hero").setAttribute("aria-label", sceneNames[locale][0]);
    document.querySelector(".scene-copy--laser").setAttribute("aria-label", sceneNames[locale][2]);
    document.querySelector(".editorial-scene--laser-detail").setAttribute("aria-label", sceneNames[locale][3]);
    document.querySelector(".editorial-scene--doctor").setAttribute("aria-label", sceneNames[locale][4]);
    document.querySelector(".editorial-scene--technology").setAttribute("aria-label", sceneNames[locale][5]);
    document.querySelector(".editorial-scene--consultation").setAttribute("aria-label", sceneNames[locale][6]);
    document.querySelector(".doctor-portrait img").alt = locale === "fa" ? "پرتره‌ی پزشک نمایشی آرگون" : "Demonstration clinician portrait for ARGON";
    document.querySelectorAll("[data-copy]").forEach(node => {
      const key = node.dataset.copy;
      if (copy[locale][key] !== undefined) node.textContent = copy[locale][key];
    });
    document.querySelectorAll("[data-locale-choice]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.localeChoice === locale)));
    document.querySelectorAll(".action-arrow, .consultation-cta [aria-hidden='true']").forEach(arrow => { arrow.textContent = locale === "fa" ? "←" : "→"; });
    renderTreatment();
    announce();
  }

  function renderTreatment() {
    const item = treatments[activeTreatment];
    document.querySelector("#treatment-title").textContent = item[locale][0];
    document.querySelector("#treatment-note").textContent = item[locale][1];
    document.querySelectorAll(".treatment-option").forEach((button, i) => {
      const id = button.dataset.treatmentId;
      button.setAttribute("aria-pressed", String(id === activeTreatment));
      button.classList.toggle("is-active", id === activeTreatment);
      button.querySelector("b").textContent = treatments[id][locale][0];
      button.querySelector("span").textContent = digits(String(i + 1).padStart(2,"0"));
    });
    document.querySelectorAll("#consult-service option").forEach(option => {
      if (option.value in treatments) option.textContent = treatments[option.value][locale][0];
      else if (option.value === "") option.textContent = locale === "fa" ? "انتخاب خدمت" : "Select a treatment";
      else option.textContent = locale === "fa" ? "سایر" : "Other";
    });
    document.querySelector("#consult-service").value = activeTreatment;
  }

  function renderMaterial(p) {
    progress = clamp(p);
    const heroOut = smooth(.16, .23, progress);
    const laserIn = smooth(.5, .66, progress);
    // The treatment event is rendered into the unchanged portrait texture.
    const scanProgress = smooth(0, 1, clamp(progress / .68));
    const mobileStage = window.matchMedia("(max-width: 700px)").matches;
    const focusPosition = motionReduced() ? (mobileStage ? 66 : 76) : lerp(mobileStage ? 24 : 42, mobileStage ? 103 : 108, Math.pow(scanProgress, .62));
    const focusOpacity = motionReduced() ? (sceneIndex === 2 ? .85 : 0) : smooth(0, .08, progress) * (1 - smooth(.54, .68, progress));
    portrait.style.transform = `scale(${(1.015 + .025 * smooth(.1, .6, progress)).toFixed(3)})`;
    heroCopy.style.opacity = (sceneIndex === 0 ? 1 - heroOut : 0).toFixed(3);
    heroCopy.style.transform = `translate3d(0, ${(-progress * 28).toFixed(1)}px, 0)`;
    laserCopy.style.opacity = (sceneIndex === 2 ? laserIn : 0).toFixed(3);
    laserCopy.style.transform = `translate3d(${((1 - laserIn) * 16).toFixed(1)}px, 0, 0)`;
    focusPlane.style.opacity = focusOpacity.toFixed(3);
    focusPlane.style.setProperty("--focus-position", `${focusPosition.toFixed(2)}%`);
    focusPlane.style.setProperty("--focus-opacity", focusOpacity.toFixed(3));
    window.dispatchEvent(new CustomEvent("world:progress", { detail: { progress } }));
  }

  function announce() {
    const id = scenes[sceneIndex];
    document.body.dataset.scene = id;
    announcer.textContent = sceneNames[locale][sceneIndex];
    document.querySelectorAll("[data-editorial]").forEach(section => {
      const active = section.dataset.editorial === id;
      section.setAttribute("aria-hidden", String(!active));
      section.inert = !active;
    });
    document.querySelectorAll(".primary-nav [data-go]").forEach(button => {
      if (button.dataset.go === id || ((id === "laserDetail" || id === "laser-event") && button.dataset.go === "treatments")) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    document.querySelector(".scene-copy--hero").setAttribute("aria-hidden", String(sceneIndex !== 0));
    document.querySelector(".scene-copy--hero").inert = sceneIndex !== 0;
    document.querySelector(".scene-copy--laser").setAttribute("aria-hidden", String(sceneIndex !== 2));
    document.querySelector(".scene-copy--laser").inert = sceneIndex !== 2;
    document.querySelector("#hero-next").hidden = sceneIndex !== 0;
  }

  function stopAnimation() {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    animationFrame = 0;
  }

  function animateMaterial(target) {
    stopAnimation();
    if (motionReduced()) { renderMaterial(target); return; }
    const start = progress;
    const startedAt = performance.now();
    const duration = sceneIndex === 2 && target === materialStops[2] ? 2200 : 1020;
    function frame(now) {
      const t = clamp((now - startedAt) / duration);
      renderMaterial(start + (target - start) * smooth(0, 1, t));
      if (t < 1) animationFrame = requestAnimationFrame(frame);
      else animationFrame = 0;
    }
    animationFrame = requestAnimationFrame(frame);
  }

  function goTo(index, { force = false, eventFrame = false } = {}) {
    const targetIndex = clamp(index, 0, scenes.length - 1);
    if (inputLocked && !force) return;
    if (targetIndex === sceneIndex && !eventFrame) return;
    inputLocked = true;
    sceneIndex = targetIndex;
    announce();
    if (eventFrame) { stopAnimation(); renderMaterial(.42); }
    else animateMaterial(materialStops[targetIndex]);
    window.clearTimeout(inputUnlockTimer);
    inputUnlockTimer = window.setTimeout(() => { inputLocked = false; }, motionReduced() ? 220 : (sceneIndex === 2 ? 2280 : 1080));
  }

  function step(direction) { goTo(sceneIndex + Math.sign(direction)); }
  document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => {
      const destination = button.dataset.go === "laserDetail" ? scenes.indexOf("laserDetail") : scenes.indexOf(button.dataset.go);
      if (destination >= 0) goTo(destination, { force: true });
    });
  });
  document.querySelector("#hero-next").addEventListener("click", () => goTo(1, { force: true }));

  document.querySelector("#home-reset").addEventListener("click", event => {
    event.preventDefault();
    stopAnimation();
    window.clearTimeout(inputUnlockTimer);
    inputLocked = false;
    wheelSum = 0;
    window.clearTimeout(wheelTimer);
    sceneIndex = 0;
    document.body.classList.add("home-resetting");
    const resetUrl = new URL(window.location.href);
    resetUrl.searchParams.delete("state");
    resetUrl.searchParams.delete("event");
    if (locale === "en") resetUrl.searchParams.set("lang", "en");
    else resetUrl.searchParams.delete("lang");
    resetUrl.hash = "";
    window.history.replaceState(window.history.state, "", `${resetUrl.pathname}${resetUrl.search}`);
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    announce();
    renderMaterial(0);
    window.setTimeout(() => document.body.classList.remove("home-resetting"), 80);
  });

  window.addEventListener("wheel", event => {
    if (inputLocked || event.target.closest?.(".consultation-form")) return;
    event.preventDefault();
    const scale = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 18 : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? window.innerHeight : 1;
    wheelSum += event.deltaY * scale;
    window.clearTimeout(wheelTimer);
    wheelTimer = window.setTimeout(() => { wheelSum = 0; }, 170);
    if (Math.abs(wheelSum) >= Math.max(62, window.innerHeight * .075)) {
      const direction = Math.sign(wheelSum);
      wheelSum = 0;
      step(direction);
    }
  }, { passive: false });

  world.addEventListener("pointerdown", event => { if (event.pointerType === "touch") touchStart = { x: event.clientX, y: event.clientY }; });
  world.addEventListener("pointermove", event => {
    if (event.pointerType === "touch") return;
    pointer = { x: clamp(event.clientX / window.innerWidth), y: 1 - clamp(event.clientY / window.innerHeight) };
    window.dispatchEvent(new CustomEvent("world:pointer", { detail: pointer }));
  });
  world.addEventListener("pointerup", event => {
    if (event.pointerType !== "touch" || !touchStart) return;
    const dy = touchStart.y - event.clientY;
    const dx = touchStart.x - event.clientX;
    if (Math.abs(dy) > 48 && Math.abs(dy) > Math.abs(dx)) step(Math.sign(dy));
    touchStart = null;
  });
  world.addEventListener("pointercancel", () => { touchStart = null; });

  window.addEventListener("keydown", event => {
    if (event.altKey || event.ctrlKey || event.metaKey || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName)) return;
    const rtl = locale === "fa";
    if (["ArrowDown", rtl ? "ArrowLeft" : "ArrowRight", "PageDown"].includes(event.key)) { event.preventDefault(); step(1); }
    else if (["ArrowUp", rtl ? "ArrowRight" : "ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); step(-1); }
    else if (event.key === "Home") { event.preventDefault(); goTo(0, { force: true }); }
    else if (event.key === "End") { event.preventDefault(); goTo(scenes.length - 1, { force: true }); }
    else if (event.key === "Escape") document.activeElement.blur?.();
  });

  document.querySelectorAll(".treatment-option").forEach(button => {
    button.addEventListener("click", () => {
      activeTreatment = button.dataset.treatmentId;
      renderTreatment();
      document.querySelector("#consult-service").value = activeTreatment;
      document.querySelector("#treatment-message").textContent = "";
      if (activeTreatment === "laser") goTo(2, { force: true });
    });
  });
  document.querySelectorAll("[data-locale-choice]").forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.localeChoice)));
  document.querySelector("#consult-form").addEventListener("submit", event => {
    event.preventDefault();
    event.currentTarget.reset();
    document.querySelector("#form-status").textContent = copy[locale].formReceived;
  });

  if (forceReduced) document.body.classList.add("reduced-motion");
  const requestedState = query.get("state");
  const initialIndex = scenes.indexOf(requestedState);
  sceneIndex = Math.max(0, initialIndex);
  setLanguage(locale);
  if (query.get("event") === "50" && requestedState === "laser-event") renderMaterial(.34);
  else if (query.get("event") === "1" && requestedState === "laser-event") renderMaterial(.58);
  else renderMaterial(materialStops[sceneIndex]);
  if (query.get("layoutDebug") === "1") document.body.classList.add("layout-debug");
})();
