import { HiDotsHorizontal } from "react-icons/hi"; 
import './index.css'
import { FaVideo } from "react-icons/fa";
import { RiEditBoxFill } from "react-icons/ri";
import { useAppSelector } from "../../../store/typedHook";

export const Profile = () => {
    const {username, avatar} = useAppSelector((state) => state.userReducer.currentUser);

    return (
        <>
            <div className="profile">
                <div className="profile-info">
                    <img src = {avatar || './avatar.png'} alt="profile-pic"/>
                    <p className="user-name">{username}</p>
                </div>
                <div className="user-options">
                    <HiDotsHorizontal color="#fff" size={30} className="icon" />
                    <FaVideo color="#fff" size={25} className="icon" />
                    <RiEditBoxFill color="#fff" size={25} className="icon" />
                </div>
            </div>
        </>
    )
}