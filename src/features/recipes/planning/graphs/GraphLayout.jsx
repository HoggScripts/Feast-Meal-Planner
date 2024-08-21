import React from "react";

function GraphLayout({ graph, blurbHeader, blurb }) {
  return (
    <div className="grid grid-cols-12 gap-4 p-6">
      <div className="col-span-7 bg-lightgray p-4 rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-bluesecondary">
          {blurbHeader}
        </h2>
        <p className="text-xl">{blurb}</p>
      </div>
      <div className="col-span-5 p-4 rounded-lg flex justify-center">
        {graph}
      </div>
    </div>
  );
}

export default GraphLayout;
