// メール認証をしたことにするスクリプト
// テスト環境で実行すること
// firebase use pedometer-eb-staging && GOOGLE_APPLICATION_CREDENTIALS="./google_application_credentials/pedometer-eb-staging-30c1f41a94db.json" yarn ts-node scripts/add-item && firebase use default
import firebase from 'firebase';
import admin from 'firebase-admin';
import { Item } from '../src/models';

admin.initializeApp({ projectId: 'pedometer-eb-staging' });

const unit = new Item({
  name: 'レザーアーマー',
  life: 0,
  atk: 3,
  def: 3,
  isLot: true,
  rarity: 'common',
  createdAt: admin.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
  updatedAt: admin.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
});
admin.firestore().collection('items').add(unit.toObject()).catch(console.error);
