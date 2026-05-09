import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

export default function ClaimsPage() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">
        Claim Barang
      </h1>

      <form className="space-y-5 border p-6 rounded-2xl shadow-sm">
        <Input
          placeholder="Nama barang"
        />

        <Textarea
          placeholder="Alasan claim / bukti kepemilikan"
        />

        <input
          type="file"
          className="w-full"
        />

        <Button>
          Submit Claim
        </Button>
      </form>
    </div>
  );
}