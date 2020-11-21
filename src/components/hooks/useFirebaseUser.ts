import { useState, useEffect } from 'react';
import firebase from 'firebase';
import { auth } from '../../firebase';

export default function useFirebaseUser() {
  const [firebaseUser, setFirebaseUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      setFirebaseUser(firebaseUser);
    });
  }, []);

  return firebaseUser;
}
