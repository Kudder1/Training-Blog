import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';
import { createContext } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
   apiKey: 'AIzaSyCYoTi-AHFqe0McAlSvyNeyD1Gtg_cMWN8',
   authDomain: 'training-blog-a846e.firebaseapp.com',
   projectId: 'training-blog-a846e',
   storageBucket: 'training-blog-a846e.appspot.com',
   messagingSenderId: '112418331024',
   appId: '1:112418331024:web:58356b80ace9f8d7bd7b15'
 });
 

export const Context = createContext({} as any)

const auth = firebase.auth();
export const firestore = firebase.firestore();

ReactDOM.render(
   <Context.Provider value={{firebase, auth, firestore}}>
      <Provider store={store}>
         <App />
      </Provider>
   </Context.Provider>,
  document.getElementById('root')
);