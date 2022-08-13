import Search from "../components/Search"
import Playlist from "../components/Playlist"
import { useState,useEffect} from "react"
import { useNavigate } from 'react-router-dom'
import Client from "../services/api"
const Dashboard = ({user, authenticated}) => {
    const [playlists,setPlaylists] = useState([])

    const renderPlaylists = async () => {
        try{
            let temp = []
            const res = await Client.get(`/playlist/all`)
            const playlistArr = res.data
            playlistArr.forEach((playlist)=> {
                let tempObj = {...playlist,isEdit: false}
                temp.push(tempObj)
            })
            setPlaylists(temp)
        }catch(e){
            console.error(e)
        }
    }
    useEffect(() => {
        renderPlaylists()
    },[])
    const renderUpdate = (index) => {
        let tempArray = [...playlists]
        let tempObj = playlists[index]
        tempObj.isEdit = true 
            tempArray.splice(index,1,tempObj)
        setPlaylists(tempArray)
    }

    const updatePlaylist = (playlist,index,newName,newMood,newImg) => {
        let tempArray = [...playlists]
        let tempObj = playlists[index]
        if(newName){tempObj.name = newName}
        if(newMood){tempObj.mood = newMood}
        if(newImg){tempObj.newImg = newImg}
        tempObj.isEdit = false 
            tempArray.splice(index,1,tempObj)
        setPlaylists(tempArray)
    }
    return(user && authenticated) ? (
        <div>
            <div>
            <Search user = {user}/>
            </div>
            {playlists.map((playlist,index)=> (
                <div>
                <Playlist playlist={playlist} index ={index} isEdit ={playlist.isEdit} isHover ={true} renderUpdate = {renderUpdate} updatePlaylist ={updatePlaylist} />
                </div>
            ))}
            <div>
            </div>
        </div>
    ) : <div><h1>Please sign in</h1></div>

}

export default Dashboard