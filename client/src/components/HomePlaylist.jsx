import Popup from '../components/PopUp/PopUp'
import React, { useState } from 'react'

const Playlist = ({ playlist, index, updateHover, isHover, user }) => {
  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div>
        {user ?      <img
        onMouseOver={() => updateHover(true, index)}
        src={playlist.image}
        alt="playlist image"
      /> :
      <img
        onMouseOver={() => updateHover(true, index)}
        src={playlist.image}
        alt="playlist image"
        onClick={togglePopup}
      />
        }
      {isHover ? (
        <div>
          <h3>{playlist.name}</h3>
          <h5>{playlist.mood}</h5>
        </div>
      ) : (
        <span></span>
      )}
      {isOpen && (
        <Popup
          content={
            <>
              <b>Please Sign Up TO View The Content</b>
              <p>Gang</p>
              <button>Sign Up</button>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  )
}

export default Playlist
