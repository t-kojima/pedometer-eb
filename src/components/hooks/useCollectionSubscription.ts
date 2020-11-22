import firebase from 'firebase';
import { useState, useEffect } from 'react';

interface DocumentModel {
  id: string;
  ref: firebase.firestore.DocumentReference | null;
}

export default function useCollectionSubscription<T extends DocumentModel>(
  ref:
    | firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
    | firebase.firestore.Query<firebase.firestore.DocumentData>
    | null
    | undefined,
  ctor: { new (params: any): T },
  dependencies: any[] = [],
  { initialItems = [] } = {}
): T[] {
  const [items, setItems] = useState<T[]>(initialItems);
  useEffect(() => {
    if (!ref) return;
    const unsubscribe = ref.onSnapshot(({ docs }) => {
      setItems(docs.map((_) => new ctor({ id: _.id, ref: _.ref, ..._.data() })));
    });
    return unsubscribe;
  }, dependencies);
  return items;
}
