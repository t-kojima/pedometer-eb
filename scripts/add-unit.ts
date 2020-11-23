// メール認証をしたことにするスクリプト
// テスト環境で実行すること
// firebase use pedometer-eb-staging && GOOGLE_APPLICATION_CREDENTIALS="./google_application_credentials/pedometer-eb-staging-30c1f41a94db.json" yarn ts-node scripts/add-unit && firebase use default
import firebase from 'firebase';
import admin from 'firebase-admin';
import { Unit } from '../src/models';

admin.initializeApp({ projectId: 'pedometer-eb-staging' });

const unit = new Unit({
  name: 'マミー',
  rank: 2,
  element: '魔',
  type: 'アンデッド',
  life: 34,
  atk: 10,
  def: 18,
  skillSlots: 2,
  itemSlots: 0,
  spellSlots: [],
  image: {
    uri:
      'https://firebasestorage.googleapis.com/v0/b/pedometer-eb-staging.appspot.com/o/units%2Fmon_072.png?alt=media&token=f9e39397-b6f1-493c-9cab-b0d07a721c46',
    width: 72,
    height: 72,
  },
  isLot: true,
  rarity: 'normal',
  createdAt: admin.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
  updatedAt: admin.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
});
admin.firestore().collection('units').doc('mon_072').set(unit.toObject()).catch(console.error);

// rank * 30 = base
// skill = 20
// item = 20
// spel = 10
