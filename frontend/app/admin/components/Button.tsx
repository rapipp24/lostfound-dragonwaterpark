type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "danger" | "secondary";
};

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
}: ButtonProps) {
  const baseStyle =
    "px-4 py-2 rounded-lg font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}