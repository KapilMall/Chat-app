import { FaCamera, FaImage, FaMicrophone } from 'react-icons/fa';
import './index.css';
import { MdEmojiEmotions } from 'react-icons/md';
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useAppSelector } from '../../../store/typedHook';
import axios from 'axios';

interface IAvatar {
    file: File | null;
    url: string;
}

export const SendMessage = () => {
    const [showEmojis, setShowEmojis] = useState(false);
    const [message, setMessage] = useState('');
    const [image, setImage] = useState<IAvatar>()

    const isCurrentUserBlocked = useAppSelector((state) => state.chatReducer.isCurrentUserBlocked);
    const isReceiverBlocked = useAppSelector((state) => state.chatReducer.isReceiverBlocked);
    const chatId = useAppSelector((state) => state.chatReducer.chatId);
    const user = useAppSelector((state) => state.chatReducer.user);
    const currentUser = useAppSelector((state) => state.userReducer.currentUser)

    const handleEmoji = (e: any) => {
        setMessage((prev) => prev + e.emoji);
        setShowEmojis(false);
    }


    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]){
        setImage({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0]),
        })
        }
        // Why use URL.createObjectURL(files[0])?
        // Because e.target.value will only give you the file path as a string (and sometimes just 'C:\\fakepath\\filename.png'), which is not usable for previewing. URL.createObjectURL() gives you a temporary URL to show a preview.
    }
    console.log('img: ', image);

    const handleSend = async () => {
        if (message === "" && !image?.file) return;

        console.log('file: ', image?.file);

        let imgUrl = null;

        try {

            if(image?.file) {
                // uploading img to cloudinary

                const imageFormData = new FormData();
                imageFormData.append('file', image.file);
                imageFormData.append('upload_preset', 'ChatImages');
                imageFormData.append('cloud_name', 'dtructx5e');

                const response = await axios.post("https://api.cloudinary.com/v1_1/dtructx5e/image/upload", imageFormData);
                imgUrl = response.data.url;
            }


            await updateDoc(doc(db, "chats", chatId), {
                message: arrayUnion({
                    senderId: currentUser.id,
                    text: message,
                    updatedAt: new Date(),
                    ...(imgUrl && {image: imgUrl}) // using JavaScript's spread operator combined with conditional logic to conditionally add a property to an object.
                })
            })

            
            // since we need to update the data for both sender and receiver, we'll be creating a id array and loop through the array to update the users data based on the id (current user id or receiver id)

            const usersId = [currentUser.id, user.id];

            await Promise.all(usersId.map(async (id) => {
                const userChatRef = doc(db, "userschat", id);
                const userChatSnapshot = await getDoc(userChatRef);
    
                if(userChatSnapshot.exists()) {
                    const userChatData = userChatSnapshot.data();
    
                    // finding the index of the last message sent
                    const chatIndex = userChatData.chats.findIndex((c: any) => c.chatId === chatId);
    
                    // updating or setting new fields with the new data
                    userChatData.chats[chatIndex].lastMessage = message;
                    userChatData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
                    userChatData.chats[chatIndex].updatedAt = Date.now();
    
                    // updating userschat collection with the new data we have in userChatData
                    await updateDoc(userChatRef, {
                        chats: userChatData.chats,
                    })
                    }
            }));

            setMessage("");
            setImage({
                file: null,
                url: ''
            })

        } catch (err) {
            console.log('error sending message: ', err);
        }
    }

    return (
        <>
            <div className="sendMessage-container">
                <div className='message-options'>
                    <label htmlFor='file'>
                        <FaImage color='#fff' size={25} className="icon"/>
                    </label>
                    <input type='file' id="file" style={{ display: "none" }} onChange={handleImage}/>
                    <FaCamera color='#fff' size={23} className="icon" />
                    <FaMicrophone color='#fff' size={22} className="icon" />
                </div>
                <div className='send-message'>
                    <input placeholder={ isCurrentUserBlocked || isReceiverBlocked ? 'You cannot sent messages!' : 'Type a message' } value={message} onChange={e => setMessage(e.target.value)} disabled={isReceiverBlocked || isCurrentUserBlocked}/>
                </div>
                <div className='emoji-button'>
                    <div className='emoji'>
                        <EmojiPicker className='emojiPicker icon' open = {showEmojis} onEmojiClick={handleEmoji} /> 
                    </div>
                    <MdEmojiEmotions color='#fff' size={25} onClick={() => setShowEmojis((prev) => !prev)} className='emojiButton icon'/>
                    <button type='button' onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>Send</button>
                </div>
            </div>
        </>
    ) 
};