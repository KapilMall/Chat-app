import {FaPhoneAlt, FaVideo } from 'react-icons/fa';
import './index.css';
import { MdInfo } from 'react-icons/md';

export const RecipientInfo = () => {
    return (
        <>
            <div className="recipient-container">
                <div className='info'>
                    <img src='/avatar.png'/>
                    <div className='name-bio'>
                        <p className='name'>user one</p>
                        <p className='bio'>Blahblehbleh666</p>
                    </div>
                </div>
                <div className='comm-options'>
                    <FaPhoneAlt  color='#fff' size={20}/>
                    <FaVideo color='#fff'size={20}/>
                    <MdInfo color='#fff' size={20}/>
                </div>
            </div>
        </>
    )
}