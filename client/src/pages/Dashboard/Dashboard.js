import Search from '../../components/Search/Search'
import Playlist from '../../components/Playlist/Playlist'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../../services/api'
import "./dashboard.css"
const Dashboard = ({ user, authenticated }) => {
  const [playlists, setPlaylists] = useState([])
  const [name, setName] = useState('')
  const [mood, setMood] = useState('')
  const [image, setImage] = useState('')
  const navigate = useNavigate()
  const createPlaylist = async (e) => {
    const res = await Client.post(`/playlist/${user.id}`, {
      name: name,
      mood: mood,
      image: image
    })
    setName('')
    setMood('')
    setImage('')
    let tempArray = [...playlists]
    let tempObj = { ...res.data }
    tempArray.push(tempObj)
    setPlaylists(tempArray)
  }
  const changeName = (event) => {
    let n = event.target.value
    setName(n)
  }
  const changeMood = (event) => {
    let n = event.target.value
    setMood(n)
  }
  const changeImage = (event) => {
    let n = event.target.value
    setImage(n)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    createPlaylist(e)
  }
  const removePlaylist = async (id, index) => {
    await Client.delete(`/playlist/${id}`)
    let tempArray = [...playlists]
    tempArray.splice(index, 1)
    setPlaylists(tempArray)
  }
  const renderPlaylists = async () => {
    try {
      let temp = []
      const res = await Client.get(`/playlist/${user.id}`)
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

  const updatePlaylist = (playlist, index, newName, newMood, newImg) => {
    let tempArray = [...playlists]
    let tempObj = playlists[index]
    if (newName) {
      tempObj.name = newName
    }
    if (newMood) {
      tempObj.mood = newMood
    }
    if (newImg) {
      tempObj.newImg = newImg
    }
    tempObj.isEdit = false
    tempArray.splice(index, 1, tempObj)
    setPlaylists(tempArray)
  }
  useEffect(() => {
    if (user && authenticated) {
      renderPlaylists()
    }
  }, [user])

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
  return user && authenticated ? (
  <div id='dashboard'>
      <div id='searchBar'>
        <Search user={user} playlists={playlists} />
      </div>
    <div id="dashboardContent">
      <div className="createPlaylistFormContainer">
        <h3 id="dashboardPageTitle">Create a Playlist</h3>
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="createPlaylistForm">
              <div id = "playlistInner">
                <div>
                  <input className='playlistFromInput'
                    type="text"
                    value={name}
                    onChange={changeName}
                    name={'name'}
                    placeholder={'Playlist'}
                  />
                </div>
                <div>
                  <input className='playlistFromInput'
                  type="text"
                    value={mood}
                    onChange={changeMood}
                    name={'mood'}
                    placeholder={'Mood'}
                  />
                </div>
                <div>
                  <input className='playlistFromInput'
                  type="text"
                    value={image}
                    onChange={changeImage}
                    name={'image'}
                    placeholder={'Add image URL'}
                  />
                </div>
              </div>
              <button id="form-submit">Create Playlist</button>
            </div>
          </form>
        </div>
      </div>
      <div id="playlistContainer">
      {playlists.map((playlist, index) => (
        <div>
          <Playlist
            playlist={playlist}
            index={index}
            isEdit={playlist.isEdit}
            isHover={playlist.isHover}
            renderUpdate={renderUpdate}
            updatePlaylist={updatePlaylist}
            updateHover={updateHover}
            removePlaylist={removePlaylist}
            goToPlaylist={goToPlaylist}
          />
        </div>
      ))}
      </div>
    </div>
  </div>
  ) : (
    <div>
      <h1>Please sign in</h1>
    </div>
  )
}
export default Dashboard
