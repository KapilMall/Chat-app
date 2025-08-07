import { useEffect, useRef, useState } from 'react'
import './index.css'
import { doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useAppSelector } from '../../../store/typedHook';
import { v4 as uuidv4 } from 'uuid';

interface Message {
    senderId: string,
    text: string,
    updatedAt: Timestamp,
}
interface Chats {
    createdAt: Timestamp,
    message: Message[]
}

export const Messages = () => {

    const [chats, setChats] = useState<Chats>();

    const id = useAppSelector((state) => state.chatReducer?.chatId)
    const currentUser = useAppSelector((state) => state.userReducer.currentUser)


    // to make sure that whenever messaged are rendered, it will automatically scroll to the latest message
    const endRef = useRef<HTMLDivElement | null>(null);
    

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth"})
    });

    // Getting realtime data from the chats collection 
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", id), async(res) => {
            setChats(res.data() as Chats)
        });

        return () => {
            unsub();
        }
    }, [id])

    return (
        <>
            <div className='messageBox-container'>
                {
                    chats?.message?.map((msg: any) => {
                        return (
                            <div className={ msg.senderId === currentUser.id ? 'message own' : 'message'} key={uuidv4()}>
                                <div className='text'>
                                    { msg.image && <img src={msg.image} alt='image'/>}
                                    { msg.text && <p>{msg.text}</p> }
                                    {/* <span>{msg.createdAt}</span> */}
                                </div>
                            </div>
                        )
                    })
                }
                {
                    
                }
                <div ref={endRef}></div>
            </div>
        </>
    )
}