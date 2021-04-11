import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { firebaseConfig } from '../config/firebaseconfig';

const fb = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const auth = fb.auth();

const db = fb.firestore();

export { auth, db };