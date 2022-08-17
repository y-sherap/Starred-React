import React from 'react'
import './popup.css'

const Popup = (props) => {
  return (
    <div className="popup-box">
        {props.content}
        
    </div>
  )
}

export default Popup
