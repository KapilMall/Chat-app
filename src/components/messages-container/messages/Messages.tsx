import { useEffect, useRef } from 'react'
import './index.css'

export const Messages = () => {
    // to make sure that whenever messaged are rendered, it will automatically scroll to the latest message
    const endRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth"})
    });

    return (
        <>
            <div className='messageBox-container'>
                <div className='message'>
                    <img src='./avatar.png'/>
                    <div className='text'>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id scelerisque metus, 
                        sed euismod justo. Mauris porta orci ac finibus consequat. Cras facilisis, 
                        sapien ac mollis accumsan, eros tellus fringilla lorem, 
                        eu efficitur mi elit ut arcu.s
                        </p>
                        <span>7 mins ago</span>
                    </div>
                </div>
                <div className='message own'>
                    <div className='text'>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id scelerisque metus, 
                        sed euismod justo. Mauris porta orci ac finibus consequat. Cras facilisis, 
                        sapien ac mollis accumsan, eros tellus fringilla lorem, 
                        eu efficitur mi elit ut arcu.s
                        </p>
                        <span>15 mins ago</span>
                    </div>
                </div>
                <div className='message'>
                    <img src='./avatar.png'/>
                    <div className='text'>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id scelerisque metus, 
                        sed euismod justo. Mauris porta orci ac finibus consequat. Cras facilisis, 
                        sapien ac mollis accumsan, eros tellus fringilla lorem, 
                        eu efficitur mi elit ut arcu.s
                        </p>
                        <span>16 mins ago</span>
                    </div>
                </div>
                <div className='message own'>
                    <div className='text'>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id scelerisque metus, 
                        sed euismod justo. Mauris porta orci ac finibus consequat. Cras facilisis, 
                        sapien ac mollis accumsan, eros tellus fringilla lorem, 
                        eu efficitur mi elit ut arcu.s
                        </p>
                        <span>5 mins ago</span>
                    </div>
                </div>
                <div className='message'>
                    <img src='./avatar.png'/>
                    <div className='text'>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id scelerisque metus, 
                        sed euismod justo. Mauris porta orci ac finibus consequat. Cras facilisis, 
                        sapien ac mollis accumsan, eros tellus fringilla lorem, 
                        eu efficitur mi elit ut arcu.s
                        </p>
                        <span>16 mins ago</span>
                    </div>
                </div>
                <div className='message own'>
                    <div className='text'>
                        <img src='https://i.pinimg.com/736x/73/81/53/738153a375912728cc2e8d04dd4f4c69.jpg' alt='image'/>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id scelerisque metus, 
                        sed euismod justo. Mauris porta orci ac finibus consequat. Cras facilisis, 
                        sapien ac mollis accumsan, eros tellus fringilla lorem, 
                        eu efficitur mi elit ut arcu.s
                        </p>
                        <span>5 mins ago</span>
                    </div>
                </div>
                <div ref={endRef}></div>
            </div>
        </>
    )
}