import firebase from 'firebase';
import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { IUser, User } from '../../models';
import useDocumentSubscription from './useDocumentSubscription';

const usersRef = db.collection('users');

export default function useUserSubscription(uid: string | null): IUser | null {
  const user = useDocumentSubscription(uid ? usersRef.doc(uid) : null, User, [uid]);
  const [item, setItem] = useState<IUser | null>(null);
  useEffect(() => {
    if (!uid || !user) return;

    setItem(new User({ ...user }));
  }, [uid, user]);
  return item;
}
