import {FaPhoneAlt, FaVideo } from 'react-icons/fa';
import './index.css';
import { MdInfo } from 'react-icons/md';
import { useAppSelector } from '../../../store/typedHook';

export const RecipientInfo = () => {

     const user = useAppSelector((state) => state.chatReducer);

     console.log('user: ', user);

    return (
        <>
            <div className="recipient-container">
                <div className='info'>
                <img src={ user.user?.avatar ||  '/avatar.png'}/>
                    <div className='name-bio'>
                        <p className='name'>{ user?.user?.username || "User" }</p>
                        <p className='bio'>Blahblehbleh666</p>
                    </div>
                </div>
                <div className='comm-options'>
                    <FaPhoneAlt  color='#fff' size={20} className="icon" />
                    <FaVideo color='#fff'size={20} className="icon" />
                    <MdInfo color='#fff' size={20} className="icon" />
                </div>
            </div>
        </>
    )
}