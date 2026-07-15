import { Download } from "lucide-react";

function DownloadReport() {
  return (
    <div className="text-center mt-12">

      <button className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-xl font-semibold flex items-center gap-3 mx-auto transition">

        <Download size={22} />

        Download Report

      </button>

    </div>
  );
}

export default DownloadReport;