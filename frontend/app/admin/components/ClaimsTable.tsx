import { Claim } from "../types/claim";
    type props = {
      claims: Claim[];
      onDelete: (id: number) => void;
      onEdit: (claim: Claim) => void;
    };

export default function ClaimsTable({ claims, onDelete, onEdit }: props) {
return (
    <div className="bg-white text-gray-800 rounded-lg shadow overflow-hidden">
    <table className="w-full">
    <thead className="bg-gray-100">
    <tr>
    <th className="text-left p-4 text-gray-800">ID</th>
    <th className="text-left p-4 text-gray-800" >Claimer</th>
    <th className="text-left p-4 text-gray-800">Item</th>
    <th className="text-left p-4 text-gray-800">Status</th>
    </tr>
    </thead>

    <tbody>
    {claims.map((claim) => (
    <tr key={claim.id} className="border-t">
    <td className="p-4 text-gray-700">{claim.id}</td>

    <td className="p-4 text-gray-700">
    {claim.claimer}</td>

    <td className="p-4 text-gray-700">
    {claim.item}</td>

    <td className="p-4 text-gray-700">
    {claim.status}</td>

    <td className="p-4 flex gap-2">
    <button onClick={() => onEdit(claim)}
    className="bg-yellow-500 text-white px-3 py-1 rounded">
        Edit
    </button>

    <button onClick={() => onDelete(claim.id)}
    className="bg-red-500 text-white px-3 py-1 rounded">
        Delete
    </button>
    </td>
    </tr>
    ))} 
</tbody>
</table>
</div>
);
}