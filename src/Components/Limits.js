import React, { useEffect } from "react";
import { Util } from "../common/Util.js";

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
            type="datetime-local"
            placeholder="Time Limit"
            value={Util.getLocalDate(timeData)}
            className="form-control"
            onChange={(event) => {
              event.preventDefault();
              settime(event.target.value);
              setTimeError(false);
              console.log(event.target.value);
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
          {isPublicTemplate ? (
            <>
              Public template
              <br />
              <span style={{ fontSize: "0.8rem" }}>
                This menu can be used by others
              </span>
            </>
          ) : (
            "Click if you want to make it public template"
          )}
        </label>
      </div>
    </div>
  );
}
