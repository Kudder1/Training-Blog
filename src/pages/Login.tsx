import React, { useContext } from 'react';
import firebase from 'firebase';
import { Context } from '..';

const Login = () => {
    const { auth } = useContext(Context)
    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const { user } = await auth.signInWithPopup(provider);
        console.log(user)
    }
    return (
        <div>
           <button onClick={login}>login with google</button> 
        </div>
    );
};

export default Login;