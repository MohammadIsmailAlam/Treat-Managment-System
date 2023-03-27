import React from "react";

function BudgetAndTimeLimit(props) {
  const { budgetLimitPerPerson, timeLimit } = props;

  return (
    <div>
      <div className="limit form-control" style={{ display: "flex" }}>
        <span style={{ fontWeight: "bold" }}>Budget:</span>
        <span style={{ marginLeft: "0.5em" }}>{budgetLimitPerPerson}</span>
      </div>
      <div className="limit form-control" style={{ display: "flex" }}>
        <span style={{ fontWeight: "bold" }}>Time:</span>
        <span style={{ marginLeft: "0.5em" }}>{timeLimit}</span>
      </div>
    </div>
  );
}

export default BudgetAndTimeLimit;