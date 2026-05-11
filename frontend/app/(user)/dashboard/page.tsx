export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">

      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Selamat datang di Lost & Found
          Dragon Waterpark.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="border rounded-2xl p-6 shadow-sm">
          <h2 className="text-gray-500">
            Total Reports
          </h2>

          <p className="text-4xl font-bold mt-3">
            12
          </p>
        </div>

        <div className="border rounded-2xl p-6 shadow-sm">
          <h2 className="text-gray-500">
            Total Claims
          </h2>

          <p className="text-4xl font-bold mt-3">
            4
          </p>
        </div>

        <div className="border rounded-2xl p-6 shadow-sm">
          <h2 className="text-gray-500">
            Barang Ditemukan
          </h2>

          <p className="text-4xl font-bold mt-3">
            7
          </p>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="border rounded-2xl p-6 shadow-sm">

        <h2 className="text-2xl font-semibold mb-6">
          Recent Reports
        </h2>

        <div className="space-y-4">

          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-semibold">
                iPhone 13
              </h3>

              <p className="text-gray-500 text-sm">
                Kolam Utama
              </p>
            </div>

            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
              Belum Ditemukan
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">
                Dompet Hitam
              </h3>

              <p className="text-gray-500 text-sm">
                Food Court
              </p>
            </div>

            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
              Ditemukan
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}