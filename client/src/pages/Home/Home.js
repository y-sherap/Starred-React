import Client from '../../services/api'
import HomePlaylist from '../../components/HomePlaylist/HomePlaylist'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import home from './home.css'
import PopUp from "../../components/PopUp/PopUp"

const Home = ({ user, authenticated }) => {
  const [playlists, setPlaylists] = useState([])
  const navigate = useNavigate()

  const renderPlaylists = async () => {
    try {
      let temp = []
      const res = await axios.get(`http://localhost:3001/playlist/all`)
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
  
  const [isOpen, setIsOpen] = useState(false)


  const goToPlaylist = (playlist) => {
    navigate(`playlist/${playlist.id}/${playlist.name}`)
  }

  const navigateRegister = () => {
    navigate('/register')
  }

  const navigateLogin = () => {
    navigate('/login')
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

  const togglePopup = () => {
    if(!user){
    setIsOpen(!isOpen)
    var blur = document.getElementById('blur')
    blur.classList.toggle('active')
    var popup = document.getElementById('popup')
    popup.classList.toggle('active')
    }
  }

  return (
    <div className="homeContainer" id="blur">
      <h1 id = "title">STARRED</h1>
      {isOpen ?(
        <PopUp
          content={
              <div id="popup">
                <span className="close-icon" onClick={togglePopup}>
          x
        </span>
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
          handleClose={togglePopup}
        />
      ): <span></span>}
    <div id="homePlaylistContainer">
      {playlists.map((playlist, index) => (
        <div>
          <HomePlaylist
            playlist={playlist}
            index={index}
            isHover={playlist.isHover}
            renderPlaylists={renderPlaylists}
            updateHover={updateHover}
            user={user}
            togglePopup={togglePopup}
          />
        </div>
      ))}
    </div>
    </div>
  )
}

export default Home
