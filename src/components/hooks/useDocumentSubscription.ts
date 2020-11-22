import firebase from 'firebase';
import { useState, useEffect } from 'react';

interface DocumentModel {
  id: string;
  ref: firebase.firestore.DocumentReference | null;
}

export default function useDocumentSubscription<T extends DocumentModel>(
  ref: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | null,
  ctor: { new (params: any): T },
  dependencies: any[] = []
): T | null {
  const [item, setItem] = useState<T | null>(null);
  useEffect(() => {
    if (!ref) return;
    const unsubscribe = ref.onSnapshot((doc) => {
      if (doc.exists) {
        setItem(new ctor({ id: doc.id, ref, ...doc.data() }));
      } else {
        setItem(null);
      }
    });
    return unsubscribe;
  }, dependencies);
  return item;
}
