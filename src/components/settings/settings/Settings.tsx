import { IoIosArrowDropup } from 'react-icons/io';
import './index.css';
import { auth, db } from '../../../lib/firebase';
import { useAppDispatch, useAppSelector } from '../../../store/typedHook';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { changeBlock } from '../../../actions/chatAction';

export const Settings = () => {

    const chatData = useAppSelector((state) => state.chatReducer);
    const currentUser = useAppSelector((state) => state.userReducer.currentUser);

    const dispatch = useAppDispatch();
    
    console.log('Chatdata: ', chatData);

    const handleBlock = async () => {
        if(!chatData.user) return;

        const userDocRef = doc(db, "users", currentUser.id)

        try {
            await updateDoc(userDocRef, {
                blocked: chatData.isReceiverBlocked ? arrayRemove(chatData.user.id) : arrayUnion(chatData.user.id)
            })
            dispatch(changeBlock())
        } catch (err) {
            console.log('Error blocking or unblocking user: ', err);
        }
    }

    return (
        <>
            <div className='settings'>
                <div className='options'>
                    <div className='option'>
                        <p>chat settings</p>
                        <IoIosArrowDropup color='#fff' size={18} className="icon" />
                    </div>
                    <div className='option'>
                        <p>privacy and helps</p>
                        <IoIosArrowDropup color='#fff' size={18} className="icon" />
                    </div>
                </div>
                <div className='buttons'>
                    <button className='block-user' onClick={handleBlock}>
                        { chatData.isCurrentUserBlocked ? "You are blocked!" : chatData.isReceiverBlocked ? "User blocked!" : "Block user" }
                        </button>
                    <button className='logout' onClick={() => auth.signOut()}>Logout</button>
                </div>
            </div>
        </>
    ) 
}
