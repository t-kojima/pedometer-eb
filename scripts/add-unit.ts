// メール認証をしたことにするスクリプト
// テスト環境で実行すること
// firebase use pedometer-eb-staging && GOOGLE_APPLICATION_CREDENTIALS="./google_application_credentials/pedometer-eb-staging-30c1f41a94db.json" yarn ts-node scripts/add-unit && firebase use default
import firebase from 'firebase';
import admin from 'firebase-admin';
import { Unit } from '../src/models';

admin.initializeApp({ projectId: 'pedometer-eb-staging' });

const unit = new Unit({
  name: 'ドライアド',
  rank: 2,
  element: '土',
  type: '精霊',
  life: 17,
  atk: 3,
  def: 16,
  skillSlots: 1,
  itemSlots: 0,
  spellSlots: ['土', '無'],
  image: {
    uri:
      'https://firebasestorage.googleapis.com/v0/b/pedometer-eb-staging.appspot.com/o/units%2Fmon_028.png?alt=media&token=56d1da43-8746-486a-9cee-11153f276bc4',
    width: 0,
    height: 0,
  },
  isLot: true,
  rarity: 'rare',
  createdAt: admin.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
  updatedAt: admin.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
});
admin.firestore().collection('units').doc('mon_028').set(unit.toObject()).catch(console.error);

// rank * 30 = base
// skill = 20
// item = 20
// spel = 10
