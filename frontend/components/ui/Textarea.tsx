type TextareaProps = {
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
};

export default function Textarea({
  placeholder,
  value,
  onChange,
}: TextareaProps) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-black min-h-[140px]"
    />
  );
}