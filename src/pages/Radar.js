import React from "react";

function Radar() {
  return (
    <div>
      <h1>Ireland Rain Radar</h1>
      <p>Live radar from Met Éireann</p>

      <iframe
        title="Rain Radar"
        src="https://www.met.ie/Open_Data/radar/map.html"
        width="100%"
        height="600px"
        style={{ border: "0", borderRadius: "10px" }}
      ></iframe>
    </div>
  );
}

export default Radar;
