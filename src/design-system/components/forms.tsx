import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type FieldFrameProps = {
  id: string;
  label: string;
  helper?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

function FieldFrame({ id, label, helper, error, required, children }: FieldFrameProps) {
  const helperId = helper ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={`cdi-field${error ? " cdi-field--error" : ""}`}>
      <label className="cdi-field__label" htmlFor={id}>
        {label}<span className="cdi-field__requirement">{required ? " · Required" : " · Optional"}</span>
      </label>
      {children}
      {helper && <p className="cdi-field__helper" id={helperId}>{helper}</p>}
      {error && <p className="cdi-field__error" id={errorId}>{error}</p>}
    </div>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  helper?: string;
  error?: string;
  required?: boolean;
};

export function TextField({ id, label, helper, error, required, ...props }: TextFieldProps) {
  const describedBy = [helper && `${id}-helper`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <FieldFrame id={id} label={label} helper={helper} error={error} required={required}>
      <input
        className="cdi-control"
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        required={required}
        {...props}
      />
    </FieldFrame>
  );
}

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
  helper?: string;
  error?: string;
  required?: boolean;
};

export function TextAreaField({ id, label, helper, error, required, ...props }: TextAreaFieldProps) {
  const describedBy = [helper && `${id}-helper`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <FieldFrame id={id} label={label} helper={helper} error={error} required={required}>
      <textarea
        className="cdi-control cdi-control--textarea"
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        required={required}
        {...props}
      />
    </FieldFrame>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  helper?: string;
  error?: string;
  required?: boolean;
  options: string[];
};

export function SelectField({ id, label, helper, error, required, options, ...props }: SelectFieldProps) {
  const describedBy = [helper && `${id}-helper`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <FieldFrame id={id} label={label} helper={helper} error={error} required={required}>
      <select
        className="cdi-control"
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        required={required}
        {...props}
      >
        <option value="">Choose a validation option</option>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </FieldFrame>
  );
}

export function CheckField({ id, label, checked = false }: { id: string; label: string; checked?: boolean }) {
  return (
    <label className="cdi-check" htmlFor={id}>
      <input id={id} type="checkbox" defaultChecked={checked} />
      <span>{label}</span>
    </label>
  );
}
