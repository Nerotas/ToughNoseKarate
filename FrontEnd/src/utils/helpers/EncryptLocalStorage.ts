import { AES, enc } from 'crypto-js';

import { size } from 'lodash';

//any type because this needs to be flexible
export const encryptLocalData = (key: string, data: any) => {
  const envryptedObject = AES.encrypt(JSON.stringify(data), `${process.env.REACT_APP_CRYPTO}`);
  localStorage.setItem(key, envryptedObject.toString());
};

export const getEncyptedLocalData = (key: string) => {
  try {
    const value = localStorage.getItem(key) as string;

    //local storage item is encrypted and needs to be processed tp be readable
    if (size(value) > 0) {
      const decrypted2 = AES.decrypt(value, `${process.env.REACT_APP_CRYPTO}`);
      const decryptedObject = decrypted2.toString(enc.Utf8);
      return JSON.parse(decryptedObject);
    } else {
      return '';
    }
  } catch (error) {
    console.log(`error ${key}`);
  }
};
