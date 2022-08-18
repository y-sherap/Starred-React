import './homeplaylist.css'

const HomePlaylist = ({ playlist, index,togglePopup,addNewPlaylist,isUser,goToPlaylist}) => {
  return (
    <div className= "playlistCard" id="blur" onClick={(e) =>togglePopup(e, true)}>
      <div className="imageHolder">
        <img
          src={playlist.image}
          alt="playlist image"
          className="playlistImage"  
        />
    </div>
        <div className='innerPlaylist'>
          <h3 className="playlistName" onClick={() => goToPlaylist(playlist.id,playlist.name,isUser)}>{playlist.name}</h3>
          <h5 className="playlistMood">{playlist.mood}</h5>
        </div>

        <div>
          { isUser ? <span></span>:<button className='updatePlaylistButton' onClick={() => addNewPlaylist(playlist.id,index)}>Add Playlist</button>}
        </div>
    </div>
  )
}

export default HomePlaylist