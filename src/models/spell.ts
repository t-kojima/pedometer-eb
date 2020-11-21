import firebase from 'firebase';
import { FieldValue } from '../firebase';
import { Element } from './element';

export interface ISpell {
  id: string;
  ref: firebase.firestore.DocumentReference | null;
  name: string;
  element: Element;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  toObject: () => {};
}

export class Spell implements ISpell {
  id: string = '';
  ref: firebase.firestore.DocumentReference | null = null;
  name: string = '';
  element: Element = 'any';
  createdAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp;
  updatedAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp;

  constructor({
    id = '',
    ref = null,
    name = '',
    element = 'any',
    createdAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
    updatedAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
  }: Partial<ISpell>) {
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
      element: this.element,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
