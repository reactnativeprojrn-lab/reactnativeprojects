// FundList component: shows all funds for the selected AMC
import React, { useEffect, useState } from "react";
import "./App.css";
import FundDetails from "./FundDetails";

function FundList({ amc }) {
  const [funds, setFunds] = useState([]);
  const [selectedFund, setSelectedFund] = useState(null);

  useEffect(() => {
    if (!amc) {
      setFunds([]);
      setSelectedFund(null);
      return;
    }
    import("./data.json").then((data) => {
      const json = data.default ? data.default : data;
      const amcObj = json.find((item) => item.amc === amc);
      setFunds(amcObj ? amcObj.funds : []);
      setSelectedFund(null);
    });
  }, [amc]);

  if (!amc) return null;

  return (
    <div className="fund-list">
      <h3>Funds for {amc}:</h3>
      {funds.length === 0 ? (
        <div>No funds found.</div>
      ) : (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {funds.map((fund) => (
            <li key={fund.fund_name} style={{ marginBottom: "0.5rem" }}>
              <button
                className="fund-btn"
                onClick={() => setSelectedFund(fund)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  border: "1px solid #0a6a5c",
                  background: "#0a6a5c",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                {fund.fund_name}
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* Nested FundDetails component */}
      <FundDetails fund={selectedFund} />
    </div>
  );
}

export default FundList;