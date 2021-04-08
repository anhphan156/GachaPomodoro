import firebase from 'firebase/app';
import 'firebase/auth';

import { firebaseConfig } from '../config/firebaseconfig';

const fb = firebase.initializeApp(firebaseConfig);

const auth = fb.auth();

export { fb, auth };