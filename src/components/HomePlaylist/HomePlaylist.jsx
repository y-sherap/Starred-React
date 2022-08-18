import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './homeplaylist.css'

const HomePlaylist = ({ playlist, index, updateHover, isHover, user , togglePopup}) => {
  let navigate = useNavigate()


  return (
    <div className= "playlistCard" id="blur" onClick={(e) =>togglePopup(e, true)}>
      <div className="imageHolder">
        <img
          onMouseOver={() => updateHover(true, index)}
          src={playlist.image}
          alt="playlist image"
          className="playlistImage"  
        />
    </div>
      
        <div className='innerPlaylist'>
          <h3 className="playlistName">{playlist.name}</h3>
          <h5 className="playlistMood">{playlist.mood}</h5>
        </div>
        
      
    </div>
  )
}

export default HomePlaylist