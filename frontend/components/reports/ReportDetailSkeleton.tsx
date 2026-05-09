import Container from "../shared/Container";

export default function ReportDetailSkeleton() {
  return (
    <Container>
      <div className="py-10 animate-pulse">

        <div className="grid md:grid-cols-2 gap-10">

          <div className="w-full h-[500px] bg-gray-200 rounded-3xl" />

          <div className="bg-white border rounded-2xl p-6">

            <div className="w-32 h-10 bg-gray-200 rounded-full mb-6" />

            <div className="w-2/3 h-10 bg-gray-200 rounded mb-8" />

            <div className="space-y-5">
              <div className="w-full h-6 bg-gray-200 rounded" />
              <div className="w-full h-6 bg-gray-200 rounded" />
              <div className="w-full h-20 bg-gray-200 rounded" />
            </div>

            <div className="w-full h-14 bg-gray-200 rounded-2xl mt-10" />
          </div>
        </div>
      </div>
    </Container>
  );
}