import './index.css';

export const Chat = () => {
    return (
        <>
            <div className="chat-list">
                <ul className='chat-list-container'>
                    <li className="chat-info">
                        <img src="/avatar.png" className="pic"/>
                        <div className="chat">
                            <p className="name">user one</p>
                            <p className="message">message</p>
                        </div>
                    </li>
                    <li className="chat-info">
                        <img src="/avatar.png" className="pic"/>
                        <div className="chat">
                            <p className="name">user one</p>
                            <p className="message">message</p>
                        </div>
                    </li>
                    <li className="chat-info">
                        <img src="/avatar.png" className="pic"/>
                        <div className="chat">
                            <p className="name">user one</p>
                            <p className="message">message</p>
                        </div>
                    </li>
                    <li className="chat-info">
                        <img src="/avatar.png" className="pic"/>
                        <div className="chat">
                            <p className="name">user one</p>
                            <p className="message">message</p>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}