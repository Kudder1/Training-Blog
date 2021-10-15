import ReactDOM from 'react-dom';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const firebaseApp = initializeApp({
   apiKey: 'AIzaSyCYoTi-AHFqe0McAlSvyNeyD1Gtg_cMWN8',
   authDomain: 'training-blog-a846e.firebaseapp.com',
   projectId: 'training-blog-a846e',
   storageBucket: 'training-blog-a846e.appspot.com',
   messagingSenderId: '112418331024',
   appId: '1:112418331024:web:58356b80ace9f8d7bd7b15'
 });

export const auth = getAuth();
export const firestore = getFirestore(firebaseApp);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

serviceWorkerRegistration.register();