import admin from 'firebase-admin';

import serviceAccount from './radium-draft-firebase-adminsdk.json';

export const Firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as unknown as string),
});
