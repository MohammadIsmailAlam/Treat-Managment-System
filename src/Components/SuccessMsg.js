import React from 'react'

export default function SuccessMsg() {
  return (
    <div className="success-message" style={{ textAlign: "center", marginTop: "20px" }}>
      <i className="fa fa-check-circle"></i>
      <h2>Success!</h2>
      <p>Your action was completed successfully.</p>
    </div>

  )
}
