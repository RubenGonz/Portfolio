interface FormFieldProps {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  type?: "text" | "url" | "number";
  hint?: string;
}

export function FormField({
  label,
  name,
  defaultValue,
  required,
  type = "text",
  hint,
}: FormFieldProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-inputmono text-[11px] tracking-widest uppercase text-subtle">
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="font-inputmono text-sm bg-surface border border-line/10 px-3 py-2
          text-fg focus:border-brand/50 focus:outline-none transition-colors"
      />
      {hint && <span className="font-inputmono text-[10px] text-subtle/60">{hint}</span>}
    </label>
  );
}

interface TextareaFieldProps {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  rows?: number;
  hint?: string;
}

export function TextareaField({
  label,
  name,
  defaultValue,
  required,
  rows = 4,
  hint,
}: TextareaFieldProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-inputmono text-[11px] tracking-widest uppercase text-subtle">
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        required={required}
        rows={rows}
        className="font-inputmono text-sm bg-surface border border-line/10 px-3 py-2
          text-fg focus:border-brand/50 focus:outline-none transition-colors resize-y"
      />
      {hint && <span className="font-inputmono text-[10px] text-subtle/60">{hint}</span>}
    </label>
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
}

export function SelectField({ label, name, defaultValue, options }: SelectFieldProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-inputmono text-[11px] tracking-widest uppercase text-subtle">
        {label}
      </span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="font-inputmono text-sm bg-surface border border-line/10 px-3 py-2
          text-fg focus:border-brand/50 focus:outline-none transition-colors"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
