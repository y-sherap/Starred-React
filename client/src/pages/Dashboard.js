import Search from '../components/Search'
import Playlist from '../components/Playlist'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api'
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
  const updateHover = (value, index) => {
    let tempArray = [...playlists]
    let tempObj = playlists[index]
    tempObj.isHover = value
    tempArray.splice(index, 1, tempObj)
    setPlaylists(tempArray)
  }
  return user && authenticated ? (
    <div>
      <div className="form">
        <h3 className="addPlaylist">Create a Playlist</h3>
        <div className="input-div">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="name">
              <input
                type="text"
                value={name}
                onChange={changeName}
                name={'name'}
                placeholder={'Playlist'}
              />
              <input
                type="text"
                value={mood}
                onChange={changeMood}
                name={'mood'}
                placeholder={'Which mood describes your playlist?'}
              />
              <input
                type="text"
                value={image}
                onChange={changeImage}
                name={'image'}
                placeholder={'Paste an image url link for your playlist here'}
              />
              <button id="form-submit">Create Playlist</button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <Search user={user} playlists={playlists} />
      </div>
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

      <div></div>
    </div>
  ) : (
    <div>
      <h1>Please sign in</h1>
    </div>
  )
}
export default Dashboard
