import firebase from 'firebase';
import { FieldValue } from '../firebase';

export interface IUser {
  id: string;
  ref: firebase.firestore.DocumentReference | null;
  name: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  toObject: () => {};
}

export class User implements IUser {
  id: string = '';
  ref: firebase.firestore.DocumentReference | null = null;
  name: string = '';
  createdAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp;
  updatedAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp;

  constructor({
    id = '',
    ref = null,
    name = '',
    createdAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
    updatedAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
  }: Partial<IUser>) {
    Object.assign(this, {
      id,
      ref,
      name,
      createdAt,
      updatedAt,
    });
  }

  toObject(): {} {
    return {
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
