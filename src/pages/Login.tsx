import firebase from 'firebase';
import { auth } from 'index'

const Login = () => {
    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
    }
    return (
        <main className="login-page main-bg">
            <section className="login-page-container">
            <h1 className="main-heading">Welcome to training platform</h1>
                <button aria-label="Sign in with google" className="login-page__btn" onClick={login}>Sign in with Google</button>
            </section>
        </main>
    );
};

export default Login;