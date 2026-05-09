type ActionButtonsProps = {
  onClaim?: () => void;
};

export default function ActionButtons({
  onClaim,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-4 mt-10">

      <button
        onClick={onClaim}
        className="flex-1 bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition"
      >
        Claim Barang
      </button>

    </div>
  );
}