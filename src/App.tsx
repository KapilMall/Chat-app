// import { useState } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Chat } from './components/chat-container/chat/Chat';
import { Profile } from './components/chat-container/profile/Profile';
import { SearchBar } from './components/chat-container/searchBar/SearchBar';
import { Login } from './components/Login/Login';
import { Messages } from './components/messages-container/messages/Messages';
import { RecipientInfo } from './components/messages-container/recipient-info/RecipientInfo';
import { SendMessage } from './components/messages-container/send-message/SendMessage';
import { Settings } from './components/settings/settings/Settings';
import { UserInfo } from './components/settings/userInfo/UserInfo';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './lib/firebase';
import { setCurrentUser } from './actions/userAction';
import { setLoader } from './actions/appAction';
import { doc, getDoc } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from './store/typedHook';

function App() {

  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.appReducer.isLoading);
  const currentUser = useAppSelector(state => state.userReducer.currentUser);

  const chatId = useAppSelector((state) => state.chatReducer?.chatId)

  const fetchUserInfo = useCallback(async(uid: string) => {
    try {
      // fetching user info and setting currentUser state with the fetched data

      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()){
        console.log('docSnap: ', docSnap.data());
        dispatch(setCurrentUser(docSnap.data()));
        dispatch(setLoader(false));
      } else {
        console.log('No such document exists!');
        dispatch(setCurrentUser(null));
        dispatch(setLoader(false));
      }
    } catch (error) {
      console.log('error fetching user information: ', error);
    }
  }, [currentUser]);

  // handle search 

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      console.log('current user: ', user);

      // if no uid exists that means user is logged out...
      if(!user?.uid) {
        dispatch(setCurrentUser(null));
        dispatch(setLoader(false));
        return;
      }
      fetchUserInfo(user.uid);      
    })

    // if you are listening on a real time data, make sure to use real time data.
    return () => {
      unsub();
    }
  }, []);

  return (
    <>
      <ToastContainer />
      { isLoading ? <div className='loading'>Loading...</div> : 
        <div className="container">
        {
          currentUser ? 
          <>
            <div className="chat-container">
              <Profile />
              <SearchBar handleSearch={handleSearch}/>
              <Chat searchQuery={searchQuery}/>
            </div>
            {
              chatId && 

              <div className='messages-container'>
              <div className='messagesInfo'>
                <RecipientInfo />
                <Messages />
                <SendMessage />
              </div>
              <div className='settings-container'>
                <UserInfo />
                <Settings />
              </div>
            </div>
            }
          </>
        : 
        <Login />
        }
        </div>
     }
    </>
  )
}

export default App
