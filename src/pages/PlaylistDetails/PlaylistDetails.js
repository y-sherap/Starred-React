import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Client from '../../services/api'
import Song from '../../components/Song/Song'
import './playlistdetails.css'

const PlaylistDetails = ({ user, authenticated }) => {
  const { name, id, ogUser } = useParams()
  const [songs, setSongs] = useState([])
  const [myUser,setMyUser] = useState()
  const renderSongs = async () => {
    const res = await Client.get(`/song/${id}`)
    setSongs(res.data)
    if(ogUser === 'true'){
      setMyUser(true)
    }else{
      setMyUser(false)
    }
  }
  useEffect(() => {
    renderSongs()
  }, [])
  const removeSong = async (id, index) => {
    try {
      Client.delete(`/song/${id}`)
      let tempArray = [...songs]
      tempArray.splice(index, 1)
      setSongs(tempArray)
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div id="playlistDetailsContainer">
      <h1 id="playlistName">{name}</h1>
      <div className="songContainer">
      {songs.map((song, index) => (
        <div>
          <Song
            song={song}
            index={index}
            inPlaylist={true}
            removeSong={removeSong}
            ogUser={myUser}
          />
        </div>       
      ))}
      </div>
    </div>
  )
}
export default PlaylistDetails
