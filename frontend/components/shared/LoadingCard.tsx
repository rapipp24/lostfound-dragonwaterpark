type LoadingCardProps = {
  count?: number;
};

export default function LoadingCard({
  count = 2,
}: LoadingCardProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="border rounded-2xl p-6 bg-white animate-pulse"
        >

          <div className="w-full h-48 bg-gray-200 rounded-xl mb-5" />

          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />

          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>
      ))}
    </div>
  );
}