import axios from 'axios'

const Song = ({ song, playlists, removeFromPlaylist, inPlaylist }) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('submit')
    try {
      let res = await axios.post(`/song/${e.target.value}`, {
        title: song.title,
        artist: song.artist.name,
        duration: song.duration,
        image: song.album.cover,
        playlistId: e.target.value
      })
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div className="song">
      {inPlaylist ? <img src={song.image}></img> : <span></span>}
      <p>{song.name}</p>
      <p>{song.artist}</p>
      {inPlaylist ? <p>{song.duration}</p> : <span></span>}
      {inPlaylist ? (
        <button onClick={(song) => removeFromPlaylist(song)}>Remove</button>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)}>
          <select id="select-playlist">
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
