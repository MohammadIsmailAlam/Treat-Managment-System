import React from "react";

export const Limits = (setBudget , setTime) => {
  return (
    <div className="selection">
      <div class="budget">
        <h3> Budget Limit </h3>
        <input type="text" placeholder="Budget Per Person" onChange={setBudget} />
      </div>

      <div class="time">
        <h3> Time Limit</h3>
        <input type="time" placeholder="Time Limit" onChange={setTime} />
      </div>
    </div>
  );
};
