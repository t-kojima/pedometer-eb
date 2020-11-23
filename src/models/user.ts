import firebase from 'firebase';
import { FieldValue } from '../firebase';

export interface IUser {
  id: string;
  ref: firebase.firestore.DocumentReference | null;
  name: string;
  slaveIds: string[];
  costs: number;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  toObject: () => {};
}

export class User implements IUser {
  id: string = '';
  ref: firebase.firestore.DocumentReference | null = null;
  name: string = '';
  slaveIds: string[] = [];
  costs: number = 0;
  createdAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp;
  updatedAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp;

  constructor({
    id = '',
    ref = null,
    name = '',
    slaveIds = [],
    costs = 0,
    createdAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
    updatedAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
  }: Partial<IUser>) {
    Object.assign(this, {
      id,
      ref,
      name,
      slaveIds,
      costs,
      createdAt,
      updatedAt,
    });
  }

  toObject(): {} {
    return {
      name: this.name,
      slaveIds: this.slaveIds,
      costs: this.costs,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
