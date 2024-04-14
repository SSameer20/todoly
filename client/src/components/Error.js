import React from 'react'
import '../style/error.css'
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="error">
        <p id='title'>Error 404</p>
        <p>Go back to the home page <span><Link to="/">Click Here</Link></span></p>
    </div>
  )
}
