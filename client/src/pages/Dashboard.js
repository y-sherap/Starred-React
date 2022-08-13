import Search from "../components/Search"
import Playlist from "../components/Playlist"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
const Dashboard = (props) => {
    return(
        <div>
            <div>
            <Search user = {props.user}/>
            </div>
            <div>

            </div>
        </div>

    )

}

export default Dashboard