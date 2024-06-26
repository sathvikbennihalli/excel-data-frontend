import React, { useEffect, useState } from "react";
import backendUrl from "./config";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(backendUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        // Attempt to log the raw response for debugging purposes
        return res.text().then((text) => {
          try {
            return JSON.parse(text);
          } catch (err) {
            console.error("Failed to parse response as JSON:", text);
            throw new Error("Invalid JSON response");
          }
        });
      })
      .then((data) => setData(data))
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      });
  }, []);

  return (
    <div style={{ padding: "50px" }}>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Agent ID</th>
            <th style={tableHeaderStyle}>First Name</th>
            <th style={tableHeaderStyle}>Last Name</th>
            <th style={tableHeaderStyle}>Age</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Phone Number</th>
            <th style={tableHeaderStyle}>Vehicle Type</th>
            <th style={tableHeaderStyle}>License Plate</th>
            <th style={tableHeaderStyle}>Delivery Area</th>
            <th style={tableHeaderStyle}>Availability</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr
              key={i}
              style={i % 2 === 0 ? tableRowEvenStyle : tableRowOddStyle}
            >
              <td style={tableCellStyle}>{d.agent_id}</td>
              <td style={tableCellStyle}>{d.first_name}</td>
              <td style={tableCellStyle}>{d.last_name}</td>
              <td style={tableCellStyle}>{d.age}</td>
              <td style={tableCellStyle}>{d.email}</td>
              <td style={tableCellStyle}>{d.phone_number}</td>
              <td style={tableCellStyle}>{d.vehicle_type}</td>
              <td style={tableCellStyle}>{d.license_plate}</td>
              <td style={tableCellStyle}>{d.delivery_area}</td>
              <td style={tableCellStyle}>{d.availability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableHeaderStyle = {
  backgroundColor: "#f2f2f2",
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "left",
};

const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "left",
};

const tableRowEvenStyle = {
  backgroundColor: "#f9f9f9",
};

const tableRowOddStyle = {
  backgroundColor: "#ffffff",
};

export default App;
