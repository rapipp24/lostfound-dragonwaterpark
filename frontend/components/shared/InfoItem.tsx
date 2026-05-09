type InfoItemProps = {
  label: string;
  value: string;
};

export default function InfoItem({
  label,
  value,
}: InfoItemProps) {
  return (
    <div>
      <span className="font-semibold">
        {label}:
      </span>{" "}
      <span className="text-gray-600">
        {value}
      </span>
    </div>
  );
}