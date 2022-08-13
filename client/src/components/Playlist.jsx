import { useState } from "react"


const Playlist = ({playlist,index,updatePlaylist,removePlaylist,updateHover,renderPlaylist,renderUpdate,isHover,isEdit}) => {
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
        <div>
            <img onClick={() => updateHover()} src = {playlist.image} alt = "playlist image"></img>
            {isHover ?<div>
                        {isEdit? <span></span>:<h3 onClick={() => renderPlaylist(playlist.id,playlist.name)}>{playlist.name}</h3>}
                        {isEdit? <span></span>:<h5>{playlist.mood}</h5>}
                        <div>
                            {isEdit? 
                                <div>
                                    <input type="text" placeholder="Playlist Name" onChange={(e) => nameHandler(e) }></input>
                                    <input type="text" placeholder="Playlist Mood" onChange={(e) => moodHandler(e)}></input>
                                    <button onClick={() => updatePlaylist(playlist,index,newName,newMood,newImg)}>Save Update</button>
                                </div>
                                :<button onClick={() => renderUpdate(index)}>Update</button>}
                            {isEdit? <span></span>:<button onClick={() => removePlaylist(playlist,index)}>Remove</button>}
                        </div>
                      </div>: <span></span>}
        </div>
    )
}

export default Playlist 