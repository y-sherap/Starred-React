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

    return(user && authenticated) ? (
        <div>
            <div>
            <Search user = {user}/>
            </div>
            
            <div>
            </div>
        </div>
    ) : <div><h1>Please sign in</h1></div>

}

export default Dashboard