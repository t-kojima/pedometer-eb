import firebase from 'firebase';
import { FieldValue } from '../firebase';
import { ISkill } from './skill';
import { Element, UnitType } from './const';
import { Lot, Rarity } from './lot';

type Image = {
  uri: string;
  width: number;
  height: number;
}

export interface IUnit extends Lot {
  id: string;
  ref: firebase.firestore.DocumentReference | null;
  name: string;
  rank: number;
  element: Element;
  type: UnitType;
  life: number;
  atk: number;
  def: number;
  skill: ISkill | null;
  skillSlots: number;
  itemSlots: number;
  spellSlots: Element[];
  image: Image | null;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}

export class Unit implements IUnit {
  id: string = '';
  ref: firebase.firestore.DocumentReference | null = null;
  name: string = '';
  rank: number = 0;
  element: Element = '無';
  type: UnitType = 'unknown';
  life: number = 0;
  atk: number = 0;
  def: number = 0;
  skill: ISkill | null = null;
  skillSlots: number = 0;
  itemSlots: number = 0;
  spellSlots: Element[] = [];
  image: Image | null = null;
  isLot: boolean = true;
  rarity: Rarity = 'unknown';
  createdAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp;
  updatedAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp;

  constructor({
    id = '',
    ref = null,
    name = '',
    rank = 0,
    element = '無',
    type = 'unknown',
    life = 0,
    atk = 0,
    def = 0,
    skill = null,
    skillSlots = 0,
    itemSlots = 0,
    spellSlots = [],
    image = null,
    isLot = true,
    rarity = 'unknown',
    createdAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
    updatedAt = FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
  }: Partial<IUnit>) {
    Object.assign(this, {
      id,
      ref,
      name,
      element,
      rank,
      type,
      life,
      atk,
      def,
      skill,
      skillSlots,
      itemSlots,
      spellSlots,
      image,
      isLot,
      rarity,
      createdAt,
      updatedAt,
    });
  }

  toObject(): {} {
    return {
      name: this.name,
      rank: this.rank,
      element: this.element,
      type: this.type,
      life: this.life,
      atk: this.atk,
      def: this.def,
      skill: this.skill,
      skillSlots: this.skillSlots,
      itemSlots: this.itemSlots,
      spellSlots: this.spellSlots,
      image: this.image,
      isLot: this.isLot,
      rarity: this.rarity,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
