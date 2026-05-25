import React from "react";

export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12">
      <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
        🔍
      </div>
      <p className="text-gray-500">{message}</p>
    </div>
  );
}
