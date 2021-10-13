import firebase from 'firebase';
import { auth } from '..';

const Login = () => {
    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
    }
    return (
        <div>
           <button onClick={login}>login with google</button> 
        </div>
    );
};

export default Login;