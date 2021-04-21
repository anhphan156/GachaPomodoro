import { db } from './firebase';

const getCurrentUser = async currentUserId => {
    const querySnapShot = await db.collection('Users').doc(currentUserId).get();

    return querySnapShot.data();
};

const getCharacters = async () => {
    const querySnapShot = await db.collection('Characters').get();

    return querySnapShot.docs.map(x => x.data());
};

export { getCurrentUser, getCharacters };