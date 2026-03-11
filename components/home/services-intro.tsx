import React from "react";

const stats = [
  {
    value: "10+",
    label: "Years of Experience",
    description: "Serving the Bay Area with excellence",
  },
  {
    value: "25+",
    label: "Areas Served",
    description: "Covering the entire Bay Area",
  },
  {
    value: "4000+",
    label: "Projects Completed",
    description: "Successful renovations delivered",
  },
];

export default function ServicesIntro() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-20 font-geist">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-5xl md:text-6xl font-bold">{stat.value}</h3>
            <p className="text-xl font-bold uppercase tracking-wide">{stat.label}</p>
            <p className="text-gray-600 font-light leading-relaxed">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
