"use client";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { Claim } from "../types/claim";
import ClaimsTable from "../components/ClaimsTable";
export default function Page() {
  
  const [claims, setClaims] = useState<Claim[]>([
  {id: 1,
    claimer: "Budi",
    item: "Dompet",
    status: "Pending",},

  {id: 2,
    claimer: "Siti",
    item: "HP",
    status: "Approved",},
  ]);

  const [claimers, setClaimers] = useState("");
  const [items, setItems] = useState("");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClaim, setEditingClaim] = useState<Claim | null>(null);

  const handleAddClaim = () => {
  if (!claimers || !items) {
    alert("Claimer dan item wajib diisi!");
    return;
  }
    const newClaim: Claim = {
      id: Math.max(...claims.map((claim) => claim.id)) + 1,
      claimer: claimers,
      item: items,
      status: "Pending",
    };

    setClaims([...claims, newClaim]);
    setClaimers("");
    setItems("");
  };

  const handleDeleteClaim = (id: number) => {
    const filteredClaims = claims.filter((claim) => claim.id !== id);
    setClaims(filteredClaims);
  };

  const handleEditClaim = (claim: Claim) => {
    setEditingClaim(claim);
    setClaimers(claim.claimer);
    setItems(claim.item);
    setIsModalOpen(true);
  };

  const filteredClaims = claims.filter((claim) =>
    claim.claimer.toLowerCase().includes(search.toLowerCase()) ||
    claim.item.toLowerCase().includes(search.toLowerCase()) ||  
    claim.status.toLowerCase().includes(search.toLowerCase())
  );

 return (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Claims</h1>

      <Button onClick={() => setIsModalOpen(true)}>
        Add Claim
      </Button>
    </div>

    <div className="mb-4">
      <Input
        placeholder="Search claims..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {isModalOpen && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow w-96">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Add Claim
          </h2>

          <div className="space-y-3">
            <Input
              placeholder="Claimer name"
              value={claimers}
              onChange={(e) => setClaimers(e.target.value)}
            />

            <Input
              placeholder="Item name"
              value={items}
              onChange={(e) => setItems(e.target.value)}
            />

            <div className="flex gap-2">
              <Button
                onClick={() => {
                  handleAddClaim();
                  setIsModalOpen(false);
                }}
              >
                Save
              </Button>

              <Button onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    )}

    <ClaimsTable
      claims={filteredClaims}
      onDelete={handleDeleteClaim}
      onEdit={handleEditClaim}
    />
  </div>
);
}