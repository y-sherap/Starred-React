import Client from '../services/api'
import HomePlaylist from '../components/HomePlaylist'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [playlists, setPlaylists] = useState([])
  const navigate = useNavigate()

  const renderPlaylists = async () => {
    try {
      let temp = []
      const res = await Client.get(`/playlist/all`)
      const playlistArr = res.data
      playlistArr.forEach((playlist) => {
        let tempObj = { ...playlist, isEdit: false, isHover: false }
        temp.push(tempObj)
      })
      setPlaylists(temp)
    } catch (e) {
      console.error(e)
    }
  }

  const goToPlaylist = (playlist) => {
    navigate(`playlist/${playlist.id}/${playlist.name}`)
  }

  useEffect(() => {
    renderPlaylists()
  }, [])
  const renderUpdate = (index) => {
    let tempArray = [...playlists]
    let tempObj = playlists[index]
    tempObj.isEdit = true
    tempArray.splice(index, 1, tempObj)
    setPlaylists(tempArray)
  }

  const updateHover = (value, index) => {
    let tempArray = [...playlists]
    let tempObj = playlists[index]
    tempObj.isHover = value
    tempArray.splice(index, 1, tempObj)
    setPlaylists(tempArray)
  }

  return (
    <div>
      {playlists.map((playlist, index) => (
        <div>
          <HomePlaylist
            playlist={playlist}
            index={index}
            isHover={playlist.isHover}
            renderPlaylists={renderPlaylists}
            updateHover={updateHover}
          />
        </div>
      ))}
    </div>
  )
}

export default Home
