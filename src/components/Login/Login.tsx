import { useState } from 'react';
import './index.css'
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';

interface IAvatar {
    file: File | null;
    url: string;
}

export const Login = () => {
    const [signUpInfo, setSignUpInfo] = useState({
        username: '',
        password: '',
        email: '',
    })
    const [loginInInfo, setLoginInfo] = useState({
        username: '',
        password: '',
    })
    const [avatar, setAvatar] = useState<IAvatar>();
    const [loader, setLoader] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpInfo((prev) => ({
            ...prev, 
            [name]: value,
        }));
    }

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginInfo((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]){
        setAvatar({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0]),
        })
        }
        // Why use URL.createObjectURL(files[0])?
        // Because e.target.value will only give you the file path as a string (and sometimes just 'C:\\fakepath\\filename.png'), which is not usable for previewing. URL.createObjectURL() gives you a temporary URL to show a preview.
    }

    const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('signing up...');
        setLoader(true);
        
        if (!avatar?.file) {
            toast('Please upload an image!');
            return;
        };
        try {
            //signing up a user
            const res = await createUserWithEmailAndPassword(auth, signUpInfo.email, signUpInfo.password);
            console.log('create user response: ', res);
            // uploading avatar to cloudinary
            const avatarFormData = new FormData();
            avatarFormData.append('file', avatar.file);
            avatarFormData.append('upload_preset', 'Avatar');
            avatarFormData.append('cloud_name', 'dtructx5e');
            
            const response = await axios.post('https://api.cloudinary.com/v1_1/dtructx5e/image/upload', avatarFormData);
            console.log(`image: `, response );

            await setDoc(doc(db, "users", res.user.uid), {
                username: signUpInfo.username,
                email: signUpInfo.email,
                password: signUpInfo.password,
                id: res.user.uid,
                blocked: [],
                avatar: response.data.url
              });

            await setDoc(doc(db, "userschat", res.user.uid), {
                chat: [],
              });

            toast.success('Signed up successfully, You can now log in!');
            setLoader(false);
            setSignUpInfo({
                username: '',
                email: '',
                password: '',
            })
        } catch (error) {
            toast.error('Something went wrong while signing up!');
            console.log('Error signing up: ', error)
        } finally {
            setLoader(false);
        }
    }

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('logging in...');
        setLoader(true);
        //sign in with email and password

        try {
            const res = await signInWithEmailAndPassword(auth, loginInInfo.username, loginInInfo.password)
            console.log('login res: ', res);
            toast('Logged in successfully!');
            setLoader(false);
            setLoginInfo({
                username: '',
                password: '',
            })
        } catch (error) {
            console.log('error signing in: ', error);
            toast('error signing in...');
        } finally {
            setLoader(false);
        }

    }

    return (
        <>
            <div className="login-container">
                <div className="item">
                    <h2 className="title">Welcome back</h2>
                    <form>
                        <input type="text" placeholder="Enter username" name='username' value={loginInInfo.username} onChange={handleLoginChange}/>
                        <input type="password" placeholder="Enter password" name='password' value={loginInInfo.password} onChange={handleLoginChange}/>
                        <button type='submit' onClick={handleLogin}>{loader ? 'Loading...' : 'Login'}</button>
                    </form>
                </div>
                <div className="separator"></div>
                <div className="item">
                    <h2 className="title">Create an Account</h2>
                    <form>
                        <label htmlFor='file'>
                            <img src={avatar?.url || './avatar.png'}/>
                            Upload an image
                        </label>
                        <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} name='avatar'/>
                        <input type="text" placeholder="Enter username" name='username' value={signUpInfo.username} onChange={handleChange}/>
                        <input type="email" placeholder="Enter email" name='email' value={signUpInfo.email} onChange={handleChange}/>
                        <input type="password" placeholder="Enter password" name='password' value={signUpInfo.password} onChange={handleChange}/>
                        <button type='submit' onClick={handleSignup}>{loader ? 'Loading...' : 'Sign up'}</button>
                    </form>
                </div>
            </div>
        </>
    )

}