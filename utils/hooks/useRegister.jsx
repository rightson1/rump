import { auth } from '../firebase';
import { doc, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useMutation } from 'react-query';

const userRef = collection(db, 'users');
const addUser = (user) => addDoc(userRef, user);
export const useRegister = () => {
    return useMutation(addUser, {
        onSuccess: () => console.log('success'),
    })
}