import { useState } from 'react';
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

function App() {

  // const [user, setUser] = useState('')
  const user = true;

  return (
      <div className="container">
        {
          user ? 
          <>
            <div className="chat-container">
              <Profile />
              <SearchBar />
              <Chat />
            </div>
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
          </>
        : 
        <Login />
        }
      </div>
  )
}

export default App
