import { FaCamera, FaImage, FaMicrophone } from 'react-icons/fa';
import './index.css';
import { MdEmojiEmotions } from 'react-icons/md';
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';

export const SendMessage = () => {
    const [showEmojis, setShowEmojis] = useState(false);
    const [message, setMessage] = useState('');
    const handleEmoji = (e: any) => {
        setMessage((prev) => prev + e.emoji);
        setShowEmojis(false);
    }

    return (
        <>
            <div className="sendMessage-container">
                <div className='message-options'>
                    <FaImage color='#fff' size={25}/>
                    <FaCamera color='#fff' size={23}/>
                    <FaMicrophone color='#fff' size={22}/>
                </div>
                <div className='send-message'>
                    <input placeholder='Type a message' value={message} onChange={e => setMessage(e.target.value)}/>
                </div>
                <div className='emoji-button'>
                    <div className='emoji'>
                        <EmojiPicker className='emojiPicker' open = {showEmojis} onEmojiClick={handleEmoji}/> 
                    </div>
                    <MdEmojiEmotions color='#fff' size={25} onClick={() => setShowEmojis((prev) => !prev)} className='emojiButton'/>
                    <button type='button'>Send</button>
                </div>
            </div>
        </>
    ) 
};