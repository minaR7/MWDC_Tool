import React from 'react';
import LeafletDraw from '@/components/SimpleMap';

const reports = [
  // {
  //   id: 1,
  //   title: 'Threat Analysis - Region A',
  //   level: 'High',
  //   summary: 'Multiple unauthorized drone detections in Region A airspace.',
  // },
  // {
  //   id: 2,
  //   title: 'Communication Breach - Sector 7',
  //   level: 'Medium',
  //   summary: 'Suspicious signal interference detected in secure channels.',
  // },
  // {
  //   id: 3,
  //   title: 'Environmental Data Leak',
  //   level: 'Low',
  //   summary: 'Unusual public access pattern observed for restricted data.',
  // },
];

function Intelligence() {
  return (
    <div className="min-h-screen bg-[#1C1C1C] p-6 text-white">
      <h1 className="text-3xl font-bold text-[#0A7CAD] mb-6">Intelligence Page</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-[#2A2A2A] p-5 rounded-xl shadow hover:shadow-lg transition-shadow duration-200 border border-[#3A3A3A]"
          >
            <h2 className="text-xl font-semibold text-[#0A7CAD] mb-2">{report.title}</h2>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                report.level === 'High'
                  ? 'bg-red-600 text-white'
                  : report.level === 'Medium'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-green-600 text-white'
              }`}
            >
              Threat Level: {report.level}
            </span>
            <p className="text-gray-300">{report.summary}</p>
          </div>
        ))}
      </div>
       <LeafletDraw />
    </div>
  );
}

export default Intelligence;
