import React, { useEffect, useState } from "react";
import "./App.css";
import FundList from "./FundList";

// Replace with your actual JSON file path if needed
const DATA_PATH = "data.json";

function App() {
  const [amcList, setAmcList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredAmc, setFilteredAmc] = useState(["HDFC"]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAmc, setSelectedAmc] = useState("");

  useEffect(() => {
    // Simulate fetching JSON data from a file
    // Replace this with fetch(DATA_PATH) if loading from server/public folder
    import("./data.json").then((data) => {
      const amcNames = data.default
        ? data.default.map((item) => item.amc)
        : data.map((item) => item.amc);
      setAmcList(amcNames);
    });
  }, []);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredAmc([]);
      setShowDropdown(false);
      return;
    }
    const filtered = amcList.filter((amc) =>
      amc.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setFilteredAmc(filtered);
    setShowDropdown(filtered.length > 0);
  }, [inputValue, amcList]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSelectedAmc("");
  };

  const handleSelect = (amc) => {
    setInputValue(amc);
    setShowDropdown(false);
    setSelectedAmc(amc);
  };

  return (
    <div className="challenge" style={{ marginTop: 40 }}>
      <div className="combo-row">
      <label htmlFor="amc-combo">AMC Name:</label>
      <div className="combo-container">
        <input
          id="amc-combo"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          autoComplete="off"
          onFocus={() => setShowDropdown(filteredAmc.length > 0)}
          className="combo-input"
        />
        {showDropdown && (
          <ul className="combo-dropdown">
            {filteredAmc.map((amc) => (
              <li
                key={amc}
                className="combo-item"
                onMouseDown={() => handleSelect(amc)}
              >
                {amc}
              </li>
            ))}
          </ul>
        )}
      </div>
      <FundList amc={selectedAmc} />
      </div>
    </div>
  );
}

export default App;
// ...existing code...