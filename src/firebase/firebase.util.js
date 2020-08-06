import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD1O9tXXpE1Hanw2O98puhlRvAugU7xnWE",
  authDomain: "crwn-db-cf41e.firebaseapp.com",
  databaseURL: "https://crwn-db-cf41e.firebaseio.com",
  projectId: "crwn-db-cf41e",
  storageBucket: "crwn-db-cf41e.appspot.com",
  messagingSenderId: "261317845968",
  appId: "1:261317845968:web:c9a053a3f8d9992cf30fd5",
  measurementId: "G-TW4ZE3M92S"
};

export const createUserProfileDoc = async (userAuth, additionalData) => {
  if (!userAuth) return;
  if (userAuth.uid === undefined) return;

  let userRef = firestore.doc(`users/${userAuth.uid}`);
  console.log(`uid=${userAuth.uid}`)

  let snapshot = await userRef.get();

  if (!snapshot.exists) {
    console.log('Creating user data...');

    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (err) {
      console.log('Error creating user', err.message)
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
