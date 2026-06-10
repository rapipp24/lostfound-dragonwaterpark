import { Claim } from "../types/claim";

    type props = {
      claims: Claim[];
      onUpdateStatus: (id: number, status: string) => void;
    };

export default function ClaimsTable({ claims, onUpdateStatus }: props) {
  return (
    <div className="bg-white dark:bg-zinc-900 text-gray-800 rounded-lg shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">ID</th>
            <th className="text-left p-4">Claimer Info</th>
            <th className="text-left p-4">Item</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {claims.map((claim) => (
            <tr key={claim.id} className="border-t hover:bg-gray-50">
              <td className="p-4">{claim.id}</td>
              <td className="p-4">
                <div className="font-bold">{claim.claimer}</div>
                <div className="text-xs text-gray-500">{claim.phone}</div>
              </td>
              <td className="p-4 font-semibold">{claim.item}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  claim.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                  claim.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                  'bg-red-100 text-red-700'
                }`}>
                  {claim.status}
                </span>
              </td>
              <td className="p-4">
                {claim.status === "Pending" && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onUpdateStatus(claim.id, "Approved")}
                      className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => onUpdateStatus(claim.id, "Rejected")}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {claim.status === "Approved" && (
                  <a 
                    href={`https://wa.me/${claim.phone}`}
                    target="_blank"
                    className="text-xs text-green-600 underline font-bold"
                  >
                    Hubungi via WA
                  </a>
                )}
              </td>
            </tr>
          ))} 
        </tbody>
      </table>
    </div>
  );
}