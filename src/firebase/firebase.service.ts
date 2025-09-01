import { FirebaseApp, initializeApp } from 'firebase/app';
import { Injectable } from '@nestjs/common';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

@Injectable()
export class FireBaseService {
  private app: FirebaseApp;
  constructor() {
    const firebaseConfig = {
      apiKey: process.env.APIKEY,
      authDomain: process.env.AUTHD_DOMAIN,
      projectId: process.env.PROJECTID,
      storageBucket: process.env.STORAGEB_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MESUREMENT_ID,
    };

    this.app = initializeApp(firebaseConfig);
  }
  async uploadFile(file: any) {
    console.log('file', file);
    console.log('this.app', this.app);

    const storage = getStorage(this.app);
    const storageRef = ref(storage, 'some-child');

    // 'file' comes from the Blob or File API
    const result = await uploadBytes(storageRef, file);
    return result;
  }
}
