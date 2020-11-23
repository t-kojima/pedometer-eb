import firebase from 'firebase';
import { FieldValue } from '../firebase';
import { IUnit } from './unit';

export interface ISlave {
  id: string;
  ref: firebase.firestore.DocumentReference | null;
  unitId: string;
  exp: number;
  unit: IUnit | null;
  level: number;
  life: number;
  atk: number;
  def: number;
  next: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}

export class Slave implements ISlave {
  id: string = '';
  ref: firebase.firestore.DocumentReference | null = null;
  unitId: string = '';
  exp: number = 0;
  unit: IUnit | null = null;
  createdAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp;
  updatedAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp;

  constructor({
    id = '',
    ref = null,
    unitId = '',
    exp = 0,
    unit = null,
    createdAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
    updatedAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
  }: Partial<ISlave>) {
    Object.assign(this, {
      id,
      ref,
      unitId,
      exp,
      unit,
      createdAt,
      updatedAt,
    });
  }

  toObject(): {} {
    return {
      unitId: this.unitId,
      exp: this.exp,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  get level() {
    const value = Math.sqrt(this.exp / 10) + 1;
    return Math.floor(Math.min(value, 255));
  }

  get next() {
    // MEMO: 次までの経験値（％）、数値は出し方がわからない
    const value = Math.sqrt(this.exp / 10) + 1;
    if (value >= 255) return '-';

    return Math.floor((value - Math.floor(value)) * 100).toString();
  }

  get life() {
    if (!this.unit) return 0;

    const value = (this.unit.life * (this.level - 1)) / 4 + 1;
    return Math.floor(value);
  }

  get atk() {
    if (!this.unit) return 0;

    const value = (this.level * 0.632 + 100) * this.unit.atk;
    return Math.floor(value);
  }

  get def() {
    if (!this.unit) return 0;

    const value = (this.level * 0.632 + 100) * this.unit.def;
    return Math.floor(value);
  }
}
