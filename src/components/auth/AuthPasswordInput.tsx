import { memo, useState, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface AuthPasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  minLength?: number;
  required?: boolean;
  hint?: ReactNode;
}

function AuthPasswordInputComponent({
  id,
  label,
  value,
  onChange,
  autoComplete,
  minLength,
  required = true,
  hint,
}: AuthPasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-3 pr-11 py-2.5 rounded-md border text-sm"
          style={{
            borderColor: "var(--color-border-medium)",
            backgroundColor: "var(--color-bg-white)",
          }}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-md cursor-pointer transition-colors hover:opacity-80"
          style={{ color: "var(--color-text-muted)" }}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
        >
          {visible ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
        </button>
      </div>
      {hint}
    </div>
  );
}

export const AuthPasswordInput = memo(AuthPasswordInputComponent);
