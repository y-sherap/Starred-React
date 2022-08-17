import Search from '../../components/Search/Search'
import Playlist from '../../components/Playlist/Playlist'
import PopUp from '../../components/PopUp/PopUp'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../../services/api'
import "./dashboard.css"
import axios from 'axios'
const Dashboard = ({ user, authenticated }) => {
  const [playlists, setPlaylists] = useState([])
  const [name, setName] = useState('')
  const [mood, setMood] = useState('')
  const [image, setImage] = useState('')
  const [songs, setSongs] = useState([])
  const [search, setSearch] = useState()
  const [isSearch, setIsSearch] = useState(false)
  const options = {
    method: 'GET',
    url: 'https://spotify23.p.rapidapi.com/search/',
    params: {
      q: `${search}`,
      type: 'tracks',
      offset: '0',
      limit: '10',
      numberOfTopResults: '5'
    },
    headers: {
      'X-RapidAPI-Key': '303d72b48fmsh678a2284baa6cd2p10546ajsn372ba29a7be4',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  }
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
  const navigateRegister = () => {
    navigate('/register')
  }

  const navigateLogin = () => {
    navigate('/login')
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
  const getSongs = async (e,value) => {
    let dashboard = e.nativeEvent.path[3].children.dashboardContent
    if(value){
    await axios
      .request(options)
      .then(function (response) {
        setSongs(response.data.tracks.items)
      })
      .catch(function (error) {
        console.error(error)
      })
      dashboard.classList.add('blur')
      setIsSearch(value)
    }else{
      setIsSearch(value)
      dashboard.classList.remove('blur')
    }
  }
  return user && authenticated ? (
  <div id='dashboard'>
      <div id='searchBar'>
        <Search user={user} playlists={playlists} getSongs={getSongs} songs={songs} setSearch={setSearch} search={search} isSearch={isSearch} setIsSearch={setIsSearch}/>
      </div>
    <div id="dashboardContent">
      <div className="createPlaylistFormContainer">
        <div id = "Form">
        <h3 id="dashboardPageTitle">Create a Playlist</h3>
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
                    id="createPlaylistName"
                    maxlength="15"
                  />
                </div>
                <div>
                  <input className='playlistFromInput'
                  type="text"
                    value={mood}
                    onChange={changeMood}
                    name={'mood'}
                    placeholder={'Mood'}
                    id="createPlaylistMood"

                  />
                </div>
                <div>
                  <input className='playlistFromInput'
                  type="text"
                    value={image}
                    onChange={changeImage}
                    name={'image'}
                    placeholder={'Add image URL'}
                    id="createPlaylistImage"
                  />
                </div>
                <div>
                <button id="form-submit">Create Playlist</button>
                </div>
              </div>
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
              <PopUp
          content={
              <div id="popup">
                <div id="SignUp">
                  <h4>Join Starred to keep track of your favorite songs and playlists </h4>         
                    <button onClick={navigateRegister} className="popUpButtons">Sign Up</button>
                </div>
                <div id="SignIn">
                  <h4>Already have an account?</h4>
                    <button onClick={navigateLogin} className="popUpButtons">Sign In</button>
                </div>
              </div>
          }
          />
    </div>
  )
}
export default Dashboard
