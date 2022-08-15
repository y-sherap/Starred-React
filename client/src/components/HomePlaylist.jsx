import Popup from '../components/PopUp/PopUp'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Playlist = ({ playlist, index, updateHover, isHover, user }) => {
  
  let navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const navigateRegister = () => {
    navigate('/register')
  }

  const navigateLogin = () => {
    navigate('/login')
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
              <b>Join Starred to keep track of your favorite songs and playlists</b>
              <button onClick={navigateRegister}>Sign Up</button>

              <b>Already have an account?</b>
              <button onClick={navigateLogin}>Sign In</button>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  )
}

export default Playlist
