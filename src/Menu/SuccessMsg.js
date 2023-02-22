import React from 'react'
import { Alert} from 'react-bootstrap'

export default function SuccessMsg() {
    return (
        <div className="container my-5">
          <Alert variant="success">
            <Alert.Heading>Success!</Alert.Heading>
            <p>Your message has been sent successfully.</p>
            <hr />
            <p className="mb-0">Thank you for contacting us.</p>
          </Alert>
        </div>
      );
    };
