import { useAppSelector } from '../../../store/typedHook';
import './index.css'

export const UserInfo = () => {

    const user = useAppSelector((state) => state.chatReducer);
    const currentUser = useAppSelector((state) => state.userReducer.currentUser)

    return (
        <>
            <div className='userInfo-container'>
                <img src={ user.user?.avatar ||  '/avatar.png'}/>
                <h3 className='username'>{ currentUser.blocked.includes(currentUser.id) ? "User" : user?.user?.username }</h3>
                <p className='userBio'>Blahblehbleh666</p>
            </div>
        </>
    ) 
}