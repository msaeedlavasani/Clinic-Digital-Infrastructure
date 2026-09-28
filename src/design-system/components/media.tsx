export type MediaKind = "landscape" | "portrait" | "technology" | "missing";

const fixtureMetadata = {
  landscape: {
    alt: "Illustrative architectural arch and abstract person-shaped subject marker for crop validation; not clinic or patient photography.",
    focal: { inline: 54, block: 70, width: 18, height: 44 },
    protected: { inline: 42, block: 45, width: 39, height: 54 },
    safe: { inline: 5, block: 8, width: 29, height: 44 },
  },
  portrait: {
    alt: "Portrait-oriented illustration of an abstract person-shaped subject marker in an architectural arch; not a real person.",
    focal: { inline: 51, block: 49, width: 30, height: 42 },
    protected: { inline: 34, block: 22, width: 47, height: 58 },
    safe: { inline: 7, block: 8, width: 24, height: 38 },
  },
  technology: {
    alt: "Neutral equipment silhouette used to validate technology framing and protected crop regions; not a specific device.",
    focal: { inline: 50, block: 45, width: 24, height: 58 },
    protected: { inline: 37, block: 14, width: 39, height: 72 },
    safe: { inline: 7, block: 8, width: 20, height: 30 },
  },
} as const;

export function MediaComposition({
  kind = "landscape",
  title = "Media crop and subject fixture",
  overlays = true,
  priority = false,
}: {
  kind?: MediaKind;
  title?: string;
  overlays?: boolean;
  priority?: boolean;
}) {
  if (kind === "missing") {
    return (
      <figure className="media-fixture media-fixture--missing" data-media-kind="missing">
        <div className="media-fixture__missing" role="img" aria-label="Optional media intentionally unavailable">
          <span aria-hidden="true">◇</span>
          <strong>Optional media unavailable</strong>
          <small>Content and composition remain usable.</small>
        </div>
        <figcaption className="media-fixture__caption">MISSING_OPTIONAL_MEDIA · stable reserved frame</figcaption>
      </figure>
    );
  }

  const data = fixtureMetadata[kind];
  const portrait = kind === "portrait";
  const source = kind === "technology" ? "/fixtures/technology-detail.svg" : "/fixtures/architecture-wide.svg";
  const portraitSource = "/fixtures/architecture-portrait.svg";

  return (
    <figure className={`media-fixture media-fixture--${kind}`} data-media-kind={kind}>
      <div className="media-fixture__frame">
        <picture>
          {kind !== "technology" && <source media="(max-width: 640px)" srcSet={portraitSource} />}
          <img
            src={portrait ? portraitSource : source}
            alt={data.alt}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            width={portrait ? 720 : 1200}
            height={portrait ? 960 : 760}
          />
        </picture>
        <span className="media-fixture__credit">ILLUSTRATIVE FIXTURE · NOT CLINICAL EVIDENCE</span>
        {overlays && (
          <div className="media-debug" aria-hidden="true">
            <span className="media-debug__crop" />
            <span
              className="media-debug__protected"
              style={{
                insetInlineStart: `${data.protected.inline}%`,
                insetBlockStart: `${data.protected.block}%`,
                width: `${data.protected.width}%`,
                height: `${data.protected.height}%`,
              }}
            />
            <span
              className="media-debug__focal"
              style={{
                insetInlineStart: `${data.focal.inline}%`,
                insetBlockStart: `${data.focal.block}%`,
                width: `${data.focal.width}%`,
                height: `${data.focal.height}%`,
              }}
            />
            <span
              className="media-debug__safe"
              style={{
                insetInlineStart: `${data.safe.inline}%`,
                insetBlockStart: `${data.safe.block}%`,
                width: `${data.safe.width}%`,
                height: `${data.safe.height}%`,
              }}
            />
            <span className="media-debug__contrast" />
            <div className="media-debug__legend">
              <span>Focal</span><span>Protected</span><span>Text-safe</span><span>Contrast</span><span>Crop</span>
            </div>
          </div>
        )}
      </div>
      <figcaption className="media-fixture__caption">{title} · art-directed crop envelope</figcaption>
    </figure>
  );
}
