import React from 'react'
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc';
import pixelVid from '../assets/pexels.mp4';
import { client } from '../client';

const Login = () => {
    const navigate = useNavigate();

    const responseGoogle = (res) => {
        console.log("=======");
        console.log(res);
        localStorage.setItem('user',JSON.stringify(res.profileObj))
        const {name, googleId,imageUrl, email } = res.profileObj;

        const doc = {
            _id: googleId,
            _type: 'user',
            userName: name,
            image: imageUrl,
            email: email
        }

        client.createIfNotExists(doc)
            .then(() => {
                navigate('/',{ replace: true })
            })
    }

    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video 
                    src={pixelVid}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className='w-full h-full object-cover' />

                <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                    <div className='p-5'>
                        <div className='border-green-800 bg-cyan-200' style={{width: '300', height: '100'}}></div>
                    </div>
                    <div className="shadow-2xl">
                        <GoogleLogin 
                            clientId={process.env.REACT_APP_GOOGLE_APP_CLIENT_ID}
                            render={(props) => (
                                <button
                                 className='bg-mainColor flex justify-center items-center p-3 cursor-pointer outline-none' 
                                 type='button'
                                 onClick={props.onClick}
                                 disabled={props.disabled}>
                                    <FcGoogle className="mr-4"/> Sign In with Google
                                </button>
                            )}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy='single_host_origin'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
