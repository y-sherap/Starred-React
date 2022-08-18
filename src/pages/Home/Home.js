import Client from '../../services/api'
import HomePlaylist from '../../components/HomePlaylist/HomePlaylist'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './home.css'
import PopUp from "../../components/PopUp/PopUp"

const Home = ({ user, authenticated }) => {
  const [playlists, setPlaylists] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const renderPlaylists = async () => {
    try {
      let temp = []
      const res = await axios.get(`http://localhost:3001/playlist/all`)
    if(user){
      const res2= await Client.get(`/friends/following/${user.id}`)
      const playlistArr = res.data
      const followingArr = res2.data[0].follower
      playlistArr.forEach((playlist) =>{
        let thisUser = false
        followingArr.forEach((following)=>{
            if(following.id === playlist.id){
              thisUser = true
            }
        })
        if(playlist.userId === user.id){
          thisUser = true
        }
        let tempObj = { ...playlist, isEdit: false, isHover: false,isUser:thisUser}
        temp.push(tempObj)
      })
    }else{
      const playlistArr = res.data
      playlistArr.forEach((playlist) => {
        let tempObj = { ...playlist, isEdit: false, isHover: false, isUser:true}
        temp.push(tempObj)
      })
    }
      setPlaylists(temp)
    } catch (e) {
      console.error(e)
    }
  }
  const addNewPlaylist = async(id,index) =>{
    try{
      await Client.post(`/friends/followingPlaylist`,{
        userId: user.id,
        playlistId: id
      })
    }catch(e){
      console.error(e)
    }
    let tempArray = [...playlists]
    let tempObj = playlists[index]
    tempObj.isUser = true
    tempArray.splice(index, 1, tempObj)
    setPlaylists(tempArray)
  }
  
  const goToPlaylist = (id,name,ogUser) => {
    navigate(`dashboard/playlist/${id}/${name}/${ogUser}`)
  }

  const navigateRegister = () => {
    navigate('/register')
  }

  const navigateLogin = () => {
    navigate('/login')
  }

  useEffect(() => {
      renderPlaylists()
  }, [user])


  const togglePopup = (e, value) => {
    if(!user){
      setIsOpen(!isOpen)
      if(value){
      const playlistBlur = e.nativeEvent.path[4]
      const titleBlur = e.nativeEvent.path[5].children.title
      if(playlistBlur.classList.contains('blurRemove') && titleBlur.classList.contains('blurRemove')){
        playlistBlur.classList.remove("blurRemove")
        titleBlur.classList.remove("blurRemove")
      }
      playlistBlur.classList.add("blur")
      titleBlur.classList.add("blur") 
    } else {
      const playlistBlur = e.nativeEvent.path[3].children.homePlaylistContainer
      const titleBlur = e.nativeEvent.path[3].children.title
      if(playlistBlur.classList.contains('blur') && titleBlur.classList.contains('blur')){
        playlistBlur.classList.remove("blur")
        titleBlur.classList.remove("blur")
      }
      playlistBlur.classList.add("blurRemove")
      titleBlur.classList.add("blurRemove") 
    }
    }
  }

  

  return (
    <div className="homeContainer" >
      <h1 id= "title" >STARRED</h1>
      {isOpen ?(
        <PopUp
          content={
              <div id="popup">
                <span className="close-icon" onClick={(e) => togglePopup(e, false)}>
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
    <div id="homePlaylistContainer" >
      {playlists.map((playlist, index) => (
        <div>
          <HomePlaylist
            playlist={playlist}
            index={index}
            togglePopup={togglePopup}
            addNewPlaylist={addNewPlaylist}
            isUser={playlist.isUser}
            goToPlaylist={goToPlaylist}
            user={user}
          />
        </div>
      ))}
    </div>
    </div>
  )
}

export default Home
