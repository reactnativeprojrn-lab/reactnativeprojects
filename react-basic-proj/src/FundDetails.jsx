import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import "./App.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function FundDetails({ fund }) {
  const [showPie, setShowPie] = useState(false);

  if (!fund) return null;

  // Prepare portfolio data for table and pie chart
  const portfolio = fund.portfolio || {};
  const equity = portfolio.equity_and_equity_related || [];
  const cashPct = portfolio.cash_and_cash_equivalents_pct || 0;
  const equitySubTotal = portfolio.equity_sub_total_pct || 0;
  const grandTotal = portfolio.grand_total_pct || 0;

  // Pie chart data
  const pieData = {
    labels: [
      ...equity.map((item) => item.company),
      "Cash & Equivalents"
    ],
    datasets: [
      {
        data: [
          ...equity.map((item) => item.pct_of_nav),
          cashPct
        ],
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#8dd3c7"
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="fund-details" style={{ marginTop: "1.5rem" }}>
      <h4>Fund Details</h4>
      {/* Grouped table for the four fields */}
      <table className="details-table" style={{ marginBottom: "1.5rem" }}>
        <tbody>
          <tr>
            <th>Fund Name</th>
            <td>
              <input
                type="text"
                value={fund.fund_name}
                readOnly
                className="details-input"
              />
            </td>
            <th>Fund Manager</th>
            <td>
              <input
                type="text"
                value={fund.fund_manager?.name || ""}
                readOnly
                className="details-input"
              />
            </td>
          </tr>
          <tr>
            <th>Since</th>
            <td>
              <input
                type="text"
                value={fund.fund_manager?.since || ""}
                readOnly
                className="details-input"
              />
            </td>
            <th>Experience</th>
            <td>
              <input
                type="text"
                value={fund.fund_manager?.experience || ""}
                readOnly
                className="details-input"
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* NAV Table */}
      <h5>NAV</h5>
      <table className="details-table">
        <thead>
          <tr>
            <th>Regular Plan Growth</th>
            <th>Regular Plan IDCW</th>
            <th>Direct Plan Growth</th>
            <th>Direct Plan IDCW</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{fund.nav?.regular_plan_growth}</td>
            <td>{fund.nav?.regular_plan_idcw}</td>
            <td>{fund.nav?.direct_plan_growth}</td>
            <td>{fund.nav?.direct_plan_idcw}</td>
          </tr>
        </tbody>
      </table>

      {/* AUM Table */}
      <h5>AUM</h5>
      <table className="details-table">
        <thead>
          <tr>
            <th>As On July 31, 2025</th>
            <th>Avg for Month July 2025</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{fund.aum?.as_on_july_31_2025}</td>
            <td>{fund.aum?.avg_for_month_july_2025}</td>
          </tr>
        </tbody>
      </table>

      {/* Expense Ratio Table */}
      <h5>Expense Ratio</h5>
      <table className="details-table">
        <thead>
          <tr>
            <th>Regular</th>
            <th>Direct</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{fund.expense_ratio?.regular}</td>
            <td>{fund.expense_ratio?.direct}</td>
          </tr>
        </tbody>
      </table>

      {/* Portfolio Table and Pie Chart */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h5 style={{ marginBottom: 0 }}>Portfolio</h5>
        <button
          className="pie-btn"
          onClick={() => setShowPie((v) => !v)}
        >
          {showPie ? "Hide Pie Chart" : "Show Pie Chart"}
        </button>
      </div>
      {!showPie && (
        <table className="details-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Industry</th>
              <th>% of NAV</th>
            </tr>
          </thead>
          <tbody>
            {equity.map((item) => (
              <tr key={item.company}>
                <td>{item.company}</td>
                <td>{item.industry}</td>
                <td>{item.pct_of_nav}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={2}><b>Equity Sub Total %</b></td>
              <td>{equitySubTotal}</td>
            </tr>
            <tr>
              <td colSpan={2}><b>Cash & Equivalents %</b></td>
              <td>{cashPct}</td>
            </tr>
            <tr>
              <td colSpan={2}><b>Grand Total %</b></td>
              <td>{grandTotal}</td>
            </tr>
          </tbody>
        </table>
      )}
      {showPie && (
        <div style={{ maxWidth: 400, margin: "1rem auto" }}>
          <Pie data={pieData} />
        </div>
      )}
    </div>
  );
}

export default FundDetails;