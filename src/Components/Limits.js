import React, { useEffect } from "react";

export default function Limits({
  budgetData,
  setbudget,
  timeData,
  settime,
  budgetError,
  timeError,
  setBudgetError,
  setTimeError,
  isPublicTemplate,
  setIsPublicTemplate,
}) {
  useEffect(() => {
    if (isPublicTemplate) {
      setIsPublicTemplate(true);
    }
  }, [isPublicTemplate]);

  const handleCheckboxChange = (event) => {
    setIsPublicTemplate(event.target.checked);
  };

  return (
    <div className="limit">
      <div className="limit row">
        <div className="budget mb-3">
          <input
            type="number"
            placeholder="Budget Limit"
            min={0}
            value={budgetData}
            className="form-control"
            onChange={(event) => {
              event.preventDefault();
              setbudget(event.target.value);
              setBudgetError(false);
            }}
          />

          {budgetError && (
            <div className="error" style={{ color: "red", marginTop: "10px" }}>
              {" "}
              Budget Can't Be Empty
            </div>
          )}
        </div>

        <div className="time mb-3">
          <input
            type="time"
            placeholder="Time Limit"
            value={timeData}
            className="form-control"
            onChange={(event) => {
              event.preventDefault();
              settime(event.target.value);
              setTimeError(false);
            }}
          />

          {timeError && (
            <div className="error" style={{ color: "red", marginTop: "10px" }}>
              {" "}
              Time Can't Be Empty
            </div>
          )}
        </div>
      </div>
      <div className="templet">
        <label>
          <input
            type="checkbox"
            checked={isPublicTemplate}
            onChange={handleCheckboxChange}
          />
          {isPublicTemplate
            ? "Public template"
            : "Click if you want to make it public templet"}
        </label>
      </div>
    </div>
  );
}
