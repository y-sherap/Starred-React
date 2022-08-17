import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './homeplaylist.css'

const HomePlaylist = ({ playlist, index, updateHover, isHover, user , togglePopup}) => {
  let navigate = useNavigate()


  return (
    <div className= "homePlaylistContainer" id="blur" onClick={() =>togglePopup()}>
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
      
    </div>
  )
}

export default HomePlaylist