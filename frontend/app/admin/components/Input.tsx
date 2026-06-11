type InputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

export default function Input({
  placeholder,
  value,
  onChange,
  type = "text",
  label,
  required = false,
  disabled = false,
  className = "",
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`
          w-full px-4 py-3
          border border-slate-300
          rounded-xl
          bg-white
          text-slate-800
          placeholder:text-slate-400
          outline-none
          transition-all
          focus: border-blue-500
          focus: ring-2
          focus: ring-blue-100
          disabled:opacity-60
          disabled:cursor-not-allowed
          ${className}
        `}
      />
    </div>
  );
}