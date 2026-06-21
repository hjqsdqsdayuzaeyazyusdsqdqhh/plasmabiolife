"use client";
import { useState } from "react";
export default function Calculator({ rates = { newDonor: 115, returnDonor: 60 } }) {
  const [isNew, setIsNew] = useState(true);
  const [visits, setVisits] = useState(2);
  const rate = isNew ? rates.newDonor : rates.returnDonor;
  const weekly = rate * visits;
  const monthly = weekly * 4;
  const yearly = monthly * 12;
  return (
    <div className="calc-card">
      <h3 className="calc-title">Earnings Calculator</h3>
      <div className="calc-row">
        <label>Donor Type</label>
        <div className="calc-toggle">
          <button onClick={() => setIsNew(true)} className={`calc-btn ${isNew ? "active" : ""}`}>New</button>
          <button onClick={() => setIsNew(false)} className={`calc-btn ${isNew ? "" : "active"}`}>Returning</button>
        </div>
      </div>
      <div className="calc-row">
        <label>Visits per week: <strong>{visits}</strong></label>
        <input type="range" min="1" max="8" value={visits} onChange={(e) => setVisits(Number(e.target.value))} className="calc-range" />
      </div>
      <div className="calc-results">
        <div className="calc-result"><span>Per Visit</span><strong>${rate}</strong></div>
        <div className="calc-result"><span>Weekly</span><strong>${weekly}</strong></div>
        <div className="calc-result"><span>Monthly</span><strong>${monthly}</strong></div>
        <div className="calc-result"><span>Yearly</span><strong>${yearly}</strong></div>
      </div>
    </div>
  );
}
