import { IoIosArrowDropup } from 'react-icons/io';
import './index.css';

export const Settings = () => {
    return (
        <>
            <div className='settings'>
                <div className='options'>
                    <div className='option'>
                        <p>chat settings</p>
                        <IoIosArrowDropup color='#fff' size={18}/>
                    </div>
                    <div className='option'>
                        <p>privacy and helps</p>
                        <IoIosArrowDropup color='#fff' size={18}/>
                    </div>
                </div>
                <div className='buttons'>
                    <button className='block-user'>Block user</button>
                    <button className='logout'>Logout</button>
                </div>
            </div>
        </>
    ) 
}
