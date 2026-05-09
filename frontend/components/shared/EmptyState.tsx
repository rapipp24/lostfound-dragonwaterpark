type EmptyStateProps = {
  title: string;
  description: string;
};

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="border rounded-2xl p-10 text-center bg-white">
      <h2 className="text-2xl font-semibold mb-3">
        {title}
      </h2>

      <p className="text-gray-500">
        {description}
      </p>
    </div>
  );
}