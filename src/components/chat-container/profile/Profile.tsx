import { HiDotsHorizontal } from "react-icons/hi"; 
import './index.css'
import { FaVideo } from "react-icons/fa";
import { RiEditBoxFill } from "react-icons/ri";

export const Profile = () => {
    return (
        <>
            <div className="profile">
                <div className="profile-info">
                    <img src = "/avatar.png" alt="profile-pic"/>
                    <p className="user-name">User name</p>
                </div>
                <div className="user-options">
                    <HiDotsHorizontal color="#fff" size={30} />
                    <FaVideo color="#fff" size={25}/>
                    <RiEditBoxFill color="#fff" size={25}/>
                </div>
            </div>
        </>
    )
}