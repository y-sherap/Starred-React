import { useState } from 'react'
import Client from "../services/api"
const Song = ({ song, playlists, removeFromPlaylist, inPlaylist }) => {
  const [pickPlaylist,setPickPlaylist] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let res = await Client.post(`/song/${pickPlaylist}`, {
        title: song.name,
        artist: song.artists.items[0].profile.name,
        duration: song.duration.totalMilliseconds,
        image: song.albumOfTrack.coverArt.sources[0].url,
        playlistId: pickPlaylist
      })
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div className="song">
      {inPlaylist ? <img src={song.albumOfTrack.coverArt.sources[0].url}></img> : <span></span>}
      <p>{song.name}</p>
      <p>{song.artists.items[0].profile.name}</p>
      {inPlaylist ? <p>{Math.floor(parseInt(song.duration.totalMilliseconds/60000))}</p> : <span></span>}
      {inPlaylist ? (
        <button onClick={(song) => removeFromPlaylist(song)}>Remove</button>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)}>
          <select onChange={(e) => setPickPlaylist(e.target.value)}id="select-playlist">
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
