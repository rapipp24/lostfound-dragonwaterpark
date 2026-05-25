import React from "react";

export default function LoadingCard() {
  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 animate-pulse flex flex-col max-w-[300px] w-full mx-auto">
      <div className="aspect-square bg-gray-100"></div>
      <div className="p-6 space-y-4">
        <div className="h-5 bg-gray-100 rounded-lg w-3/4"></div>
        <div className="h-3 bg-gray-50 rounded-lg w-1/4"></div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="h-12 bg-gray-50 rounded-2xl"></div>
          <div className="h-12 bg-gray-50 rounded-2xl"></div>
        </div>
        <div className="h-4 bg-gray-100 rounded-lg w-1/2 mt-4"></div>
      </div>
    </div>
  );
}
