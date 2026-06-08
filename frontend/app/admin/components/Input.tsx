type InputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
      w-full
      px-4
      py-2
      border
      rounded-lg
      outline-none
      focus:ring-2
      focus:ring-blue-500
      text-black
      placeholder:text-gray-400
      bg-white dark:bg-zinc-900"
    />
  );
}