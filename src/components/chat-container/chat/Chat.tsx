import { useEffect, useState } from 'react';
import {  useAppDispatch, useAppSelector } from '../../../store/typedHook';
import './index.css';
import { doc, DocumentData, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { AddUser } from '../addUser/addUser';
import { changeChats } from '../../../actions/chatAction';

interface ChatProps {
    searchQuery: string;
}

export const Chat: React.FC<ChatProps> = ({searchQuery}) => {
    const [chats, setChats] = useState<DocumentData | undefined>();

    const currentUser = useAppSelector((state) => state.userReducer.currentUser); 
    const addUser = useAppSelector((state) => state.appReducer.addUser);

    const dispatch = useAppDispatch();

    // funtion to open chats of a particular user when it is clicked
    const handleChatClick = async (data: any) => {

        // getting users information such as chatId, isSeen etc from the chats state.
        const userChats = chats?.map((item: any) => {
            const { user, ...rest } = item;
            return rest;
        })

        // getting index of the last chat to set isSeen to true
        const chatIndex = userChats.findIndex((c: any) => c.chatId === data.chatId);

        // setting isSeen to true for userChats variable
        userChats[chatIndex].isSeen = true;

        const usersChatsref = doc(db, "userschat", currentUser.id);

        try{
            await updateDoc(usersChatsref, {
                chats: userChats
            })
            dispatch(changeChats(data.chatId, data.user, currentUser))
        } catch (err) {
            console.log('error updating userschats collection when chat list was clicked: ', err);
        }
    }
    
    const filteredChats = chats?.filter((c: any) => c.user.username.toLowerCase().includes(searchQuery.toLowerCase()));



    useEffect(() => {
        // getting all the chat list of current user and the user information
        const unSub = onSnapshot(doc(db, "userschat", currentUser.id), async (res) => {
            const items = res.data()?.chats;

            // Add this check to prevent the error
            if (!items || !Array.isArray(items)) {
                setChats([]);
                return;
            }

            // getting user details from user collection based on the reciever id
            const promises = items?.map(async(item: any) => {
                const userDocRef = doc(db, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef);

                const user = userDocSnap.data();
                
                return {...item, user}
            })

            const chatData = await Promise.all(promises)
            setChats(chatData.sort((a,b) => b.updateAt - a.updateAt));
          });

        return () => {
            unSub();
        }  
    }, [currentUser.id]);

    console.log('CHATS:: ', chats);

    return (
        <>
            <div className="chat-list">
                { !chats ? <p>No chats Found, Start chatting...</p> : 
                    <ul className='chat-list-container'>
                        { Object.entries(filteredChats as DocumentData).map(([id, data]) => {
                            console.log('id:', `${id}`)
                            console.log(`data: ${JSON.stringify(data)}`);
                            return (
                            <li className="chat-info" key={id} onClick={() => handleChatClick(data)} style = {{ backgroundColor:  data?.isSeen ? 'transparent' : '#5183fe'}}>
                                <img src={ data.user.blocked.includes(currentUser.id) ? "/avatar.png" : data.user.avatar } className="pic"/>
                                <div className="chat">
                                    <p className="name">{ data.user.blocked.includes(currentUser.id) ? "User" : data.user.username }</p>
                                    <p className="message">{ data.lastMessage }</p>
                                </div>
                            </li>
                            )
                        }
                        ) }
                    </ul>
                }
                { addUser && <AddUser /> }
            </div>
        </>
    )
}