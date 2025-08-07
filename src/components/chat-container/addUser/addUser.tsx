import { useState } from 'react';
import './addUser.css';
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useAppSelector } from '../../../store/typedHook';

interface User {
    username: string,
    id: string,
    email: string,
    blocked: [],
    avatar: string,

}

export const AddUser = () => {

    const [user, setUser] = useState<User | null>(null);
    const { id } = useAppSelector((state) => state.userReducer.currentUser)

    // function to search a user from "users" collection in the database
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log('seraching');

        const formData = new FormData(e.target);
        const username = formData.get("username");

        try {

            // performing query to get username from firebase collection users.

            // create a reference to the cities collection
            const userRef = collection(db, "users");

            console.log('userRef: ', userRef);

            // create a query against the collection, in this case users
            const  q = query(userRef, where("username", "==", username));
            console.log('query: ', q);

            const querySnapshot = await getDocs(q);
            console.log('querySnapshot: ', querySnapshot);

            if(!querySnapshot.empty){
                setUser(querySnapshot.docs[0].data() as User)
            }

        } catch (error) {
            console.log('Error searching user: ', error);
        }

    }

    // function to add chats from a users to the "userchats" collection in the database.

    const handleAddUser = async() => {

        //create a reference to the userchats collection
        const userChatsRef = collection(db, "userschat");

        // create a reference to the chats collection
        const chatsRef = collection(db, "chats");

        try {

            const newChatRef = doc(chatsRef)

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                message: [],
            })

            // updating the senders chat data
            await updateDoc(doc(userChatsRef, user?.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: id,
                    updatedAt: Date.now()
                })
            })

            // updating the logged in users chat data
            await updateDoc(doc(userChatsRef, id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user?.id,
                    updatedAt: Date.now()
                })
            })

        } catch (err) {
            console.log('error adding user: ', err);
        }


    }

    return (    
        <div className='addUser'>
            <form className='addUser-form' onSubmit={handleSubmit}>
                <input type = "text" placeholder='username' name='username'/>
                <button type='submit' className='search-button'>Search</button>
            </form>
            { user && 
                 <div className='search-results'>
                 <div className='details'>
                     <img 
                         src={ user.avatar || "./avatar.png" }
                         alt='user-avatar'
                     />
                     <p>{user.username}</p>
                     <button type="button" onClick={handleAddUser}>Add User</button>
                 </div>
             </div>
            }
        </div>
    )
}