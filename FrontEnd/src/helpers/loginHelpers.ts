import Cookies from 'js-cookie';
import { size } from 'lodash';

export enum JWT_TOKEN_STATUS {
  EXPIRED = 'EXPIRED',
  INVALID = 'INVALID',
  VALID = 'VALID',
}

export const getJwtTokenStatus = (token: string): JWT_TOKEN_STATUS => {
  if (!token) {
    return JWT_TOKEN_STATUS.INVALID;
  }

  const payload = JSON.parse(atob(token.split('.')[1]));
  const currentTime = Math.floor(Date.now() / 1000);

  if (payload.exp < currentTime) {
    return JWT_TOKEN_STATUS.EXPIRED;
  }

  return JWT_TOKEN_STATUS.VALID;
};

export const clearAllDataOnUserLogout = () => {
  sessionStorage.clear();
  console.log('Cleared all data on user logout');
};
