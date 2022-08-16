import { useState } from 'react'
import Client from '../../services/api'
import './song.css'

const Song = ({ song, playlists, removeSong, inPlaylist, index }) => {
  const [pickPlaylist, setPickPlaylist] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(pickPlaylist)
      if (pickPlaylist) {
        let res = await Client.post(`/song/${pickPlaylist}`, {
          title: song.name,
          artist: song.artists.items[0].profile.name,
          duration: song.duration.totalMilliseconds,
          image: song.albumOfTrack.coverArt.sources[0].url,
          playlistId: pickPlaylist
        })
      }
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div className= {inPlaylist ? "playlistSong" : "searchSong"}>
      <div id="songImageDiv">
      {inPlaylist ? <img src={song.image} id="songImage"></img> : <span></span>}
      </div>     
      {inPlaylist ?
      <div className='playlistSongHeader'> 
        <p>Title</p>
        <p id="songTitle">{song.title} </p>
        </div> : <p id="songSearchTitle">{song.name}</p>}
      {inPlaylist ? (
        <div className='playlistSongHeader'> 
          <p>Artist</p>
          <p id="songArtist">{song.artist}</p>
        </div>
      ) : (
        <p id="songSearchArtist">{song.artists.items[0].profile.name}</p>
      )}
      {inPlaylist ? (
        <div className='playlistSongHeader'>
          <p>Duration</p>
          <p id="songDuration">{Math.floor(parseInt(song.duration / 60000))}</p>
        </div>
        
      ) : (
        <span></span>
      )}
      {inPlaylist ? (
        <button onClick={() => removeSong(song.id, index)} className="removeButton">Remove</button>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)} className="searchForm">
          <select
            onChange={(e) => setPickPlaylist(e.target.value)}
            id="select-playlist"
          >
            <option></option>
            {playlists.map((playlist) => (
              <option value={playlist.id}>{playlist.name}</option>
            ))}
          </select>
          <button type="submit">Add</button>
        </form>
      )}
    </div>
  )
}

export default Song
