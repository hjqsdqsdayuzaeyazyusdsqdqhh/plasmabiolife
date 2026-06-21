"use client";
import { useState } from "react";
export default function Calculator({ rates = { newDonor: 115, returnDonor: 65 } }) {
  const [isNew, setIsNew] = useState(true);
  const [visits, setVisits] = useState(2);
  const rate = isNew ? rates.newDonor : rates.returnDonor;
  const totalDonations = visits * 4;
  const monthly = rate * totalDonations;
  const annualized = monthly * 12;
  return (
    <div className="calc-card">
      <div className="calc-header">
        <h3 className="calc-title">BioLife Plasma Earnings Calculator</h3>
        <p className="calc-sub">Estimate your monthly income based on donation frequency</p>
      </div>
      <div className="calc-body">
        <div className="calc-field">
          <label>Donor type</label>
          <div className="calc-toggle">
            <button onClick={() => setIsNew(true)} className={`calc-btn ${isNew ? "active" : ""}`}>New Donor</button>
            <button onClick={() => setIsNew(false)} className={`calc-btn ${isNew ? "" : "active"}`}>Returning</button>
          </div>
          <div className="calc-value">{isNew ? "Premium new donor rate" : "Standard return rate"}</div>
        </div>
        <div className="calc-field">
          <label>Visits per week: <strong>{visits}</strong></label>
          <input type="range" min="1" max="8" value={visits} onChange={(e) => setVisits(Number(e.target.value))} className="calc-range" />
          <div className="calc-value">{totalDonations} donations / month</div>
        </div>
      </div>
      <div className="calc-results">
        <div className="calc-result highlight">
          <div className="result-label">Monthly Income</div>
          <div className="result-value">${monthly.toLocaleString()}</div>
          <div className="result-note">${rate} × {totalDonations} visits</div>
        </div>
        <div className="calc-result">
          <div className="result-label">Per Donation</div>
          <div className="result-value">${rate}</div>
          <div className="result-note">Current rate</div>
        </div>
        <div className="calc-result">
          <div className="result-label">Total Donations</div>
          <div className="result-value">{totalDonations}</div>
          <div className="result-note">Per month</div>
        </div>
        <div className="calc-result annualized">
          <div className="result-label">Annualized Projection</div>
          <div className="result-value">${annualized.toLocaleString()}</div>
          <div className="result-note">Estimated yearly</div>
        </div>
      </div>
    </div>
  );
}
