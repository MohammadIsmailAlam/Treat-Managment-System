import React from 'react'

export default function SuccessMsg() {
  return (
    <div class="success-message" style={{ textAlign: "center", marginTop: "20px" }}>
      <i class="fa fa-check-circle"></i>
      <h2>Success!</h2>
      <p>Your action was completed successfully.</p>
    </div>

  )
}
