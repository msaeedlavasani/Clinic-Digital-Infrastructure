export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="section-heading">
      <span className="section-heading__index" aria-hidden="true">{index}</span>
      <div>
        <p className="type-label section-heading__eyebrow">{eyebrow}</p>
        <h2 className="type-h2">{title}</h2>
        <p className="type-body section-heading__description">{description}</p>
      </div>
    </header>
  );
}
