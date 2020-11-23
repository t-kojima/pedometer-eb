import firebase from 'firebase';
import { FieldValue } from '../firebase';
import { Lot, Rarity } from './lot';

export interface IItem extends Lot {
  id: string;
  ref: firebase.firestore.DocumentReference | null;
  name: string;
  life: number;
  atk: number;
  def: number;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  toObject: () => {};
}

export class Item implements IItem {
  id: string = '';
  ref: firebase.firestore.DocumentReference | null = null;
  name: string = '';
  life: number = 0;
  atk: number = 0;
  def: number = 0;
  isLot: boolean = true;
  rarity: Rarity = 'unknown';
  createdAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp;
  updatedAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp;

  constructor({
    id = '',
    ref = null,
    name = '',
    life = 0,
    atk = 0,
    def = 0,
    isLot = true,
    rarity = 'unknown',
    createdAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
    updatedAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
  }: Partial<IItem>) {
    Object.assign(this, {
      id,
      ref,
      name,
      life,
      atk,
      def,
      isLot,
      rarity,
      createdAt,
      updatedAt,
    });
  }

  toObject(): {} {
    return {
      name: this.name,
      life: this.life,
      atk: this.atk,
      def: this.def,
      isLot: this.isLot,
      rarity: this.rarity,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
