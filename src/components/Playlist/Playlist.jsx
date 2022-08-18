
import { useState } from "react"
import './playlist.css'


const Playlist = ({playlist,index,updatePlaylist,removePlaylist,removeFollowingPlaylist,updateHover,goToPlaylist,renderUpdate,isHover,isEdit,ogUser}) => {
    const [newName,setNewName] = useState()
    const [newMood,setNewMood] = useState()
    const [newImg,setNewImg] = useState()
    
    const nameHandler = (e) =>{
        setNewName(e.target.value)
    }
    const moodHandler = (e) =>{
        setNewMood(e.target.value)
    }
    const imgHandler = (e) =>{
        setNewImg(e.target.value)
    }
    return(
        <div className="playlistCard"  onMouseOver={() => updateHover(true,index)} onMouseOut = { () => updateHover(false,index)}  >
            <div className="imageHolder">
            {isEdit? <span></span>: <img src = {playlist.image} alt = "add playlist image" className="playlistImage" ></img>}
            </div>
            <div className="innerPlaylist">
                        {isEdit? <span></span>:<div onClick={() => goToPlaylist(playlist)} className="playlistName">{playlist.name}</div>}
                        {isEdit? <span></span>:<h5 className="playlistMood">{playlist.mood}</h5>}
                        <div className="playlistCardUpdateForm">
                            {isHover  ? isEdit? 
                                <div id="playlistUpdateFormFields">
                                    <input type="text" placeholder="Playlist Name" onChange={(e) => nameHandler(e) }></input>
                                    <input type="text" placeholder="Playlist Mood" onChange={(e) => moodHandler(e)}></input>
                                    <input type="text" placeholder="Playlist Image" onChange={(e) => imgHandler(e)}></input>
                                    <button className="updatePlaylistButton" onClick={() => updatePlaylist(playlist.id,index,newName,newMood,newImg)}>Save Update</button>
                                </div>
                                :<span></span> : <span></span>}
            </div>
                        <div id="playlistButtons">
                            { ogUser ? isHover ? isEdit? <span></span>:<button onClick={() => renderUpdate(index)} className="updatePlaylistButton">Update</button> : <span></span> : <button id="removePlaylistButton" onClick={() => removeFollowingPlaylist(playlist.id,index)}>Remove from Following</button>}
                            { ogUser ? isHover ? isEdit? <span></span>:<button onClick={() => removePlaylist(playlist.id,index)} id="removePlaylistButton" >Remove</button> : <span></span> : <span></span>}
                        </div>
                    </div>
        </div>
    )
}

export default Playlist 