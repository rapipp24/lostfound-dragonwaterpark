type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "danger";
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "primary",
  onClick,
}: ButtonProps) {

  const variants = {
    primary:
      "bg-black text-white hover:bg-gray-800",

    danger:
      "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded-lg transition ${
        variants[variant]
      }`}
    >
      {children}
    </button>
  );
}