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
          w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          text-gray-900 placeholder:text-gray-400
          bg-white dark:bg-zinc-900
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-all
          ${className}
        `}
      />
    </div>
  );
}