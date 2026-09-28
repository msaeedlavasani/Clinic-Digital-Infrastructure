/** Sensory identity only; the server-rendered label survives when CSS motion is unavailable. */
export function TreatmentSignature({ label, words }: { label: string; words: string[] }) {
  return (
    <div className="cdi-treatment-signature" aria-label={label} data-signature="light-focus-precision">
      <div className="cdi-treatment-signature__field" aria-hidden="true">
        <span className="cdi-treatment-signature__focus" />
        <span className="cdi-treatment-signature__beam" />
      </div>
      <p className="type-label cdi-treatment-signature__words">{words.map((word, index) => <span key={word}>{index > 0 && <span aria-hidden="true"> · </span>}{word}</span>)}</p>
    </div>
  );
}
