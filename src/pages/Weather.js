import React, { useEffect, useState } from "react";

function Weather() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Met Éireann real-time observations
    fetch("https://prodapi.metweb.ie/observations/real-time")
      .then((res) => res.json())
      .then((data) => {
        setStations(data.stations || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading real weather data...</h2>;
  }

  return (
    <div>
      <h1>Live Irish Weather</h1>
      <p>Data from Met Éireann</p>

      {stations.map((s) => (
        <div
          key={s.stationId}
          style={{
            background: "#f2f2f2",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "8px"
          }}
        >
          <h2>{s.stationName}</h2>
          <p><strong>Temperature:</strong> {s.temperature}°C</p>
          <p><strong>Wind:</strong> {s.windSpeed} km/h</p>
          <p><strong>Condition:</strong> {s.weatherDescription}</p>
        </div>
      ))}
    </div>
  );
}

export default Weather;
