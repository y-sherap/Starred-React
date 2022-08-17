import Popup from '../PopUp/PopUp'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './homeplaylist.css'

const HomePlaylist = ({ playlist, index, updateHover, isHover, user }) => {
  let navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
    var blur = document.getElementById('blur')
    blur.classList.toggle('active')
    var popup = document.getElementById('popup')
    popup.classList.toggle('active')
  }

  const navigateRegister = () => {
    navigate('/register')
  }

  const navigateLogin = () => {
    navigate('/login')
  }

  // function toggle(){
  //   var blur = document.getElementById('blur')
  //   blur.classList.toggle('active')
  //   var popup = document.getElementById('popup')
  //   popup.classList.toggle('active')
  // }

  return (
    <div class= "homePlaylistContainer" id="blur">
      {user ? (
        <img
          onMouseOver={() => updateHover(true, index)}
          src={playlist.image}
          alt="playlist image"
          className="playlistImage"  
        />
      ) : (
        <img
          onMouseOver={() => updateHover(true, index)}
          src={playlist.image}
          alt="playlist image"
          onClick={togglePopup}
          className="playlistImage"        />
      )}
      {isHover ? (
        <div>
          <h3 className="playlistName">{playlist.name}</h3>
          <h5 className="playlistMood">{playlist.mood}</h5>
        </div>
      ) : (
        <span></span>
      )}
      {isOpen ?(
        <Popup
          content={
              <div id="popup">
                <div id="SignUp">
                  <h4>Join Starred to keep track of your favorite songs and playlists </h4>         
                    <button onClick={navigateRegister} className="popUpButtons">Sign Up</button>
                </div>
                <div id="SignIn">
                  <h4>Already have an account?</h4>
                    <button onClick={navigateLogin} className="popUpButtons">Sign In</button>
                </div>
              </div>
          }
          handleClose={togglePopup}
        />
      ): <span></span>}
    </div>
  )
}

export default HomePlaylist