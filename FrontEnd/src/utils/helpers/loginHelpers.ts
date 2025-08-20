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

  // If exp field is missing or expired, return EXPIRED
  if (!payload.exp || payload.exp < currentTime) {
    return JWT_TOKEN_STATUS.EXPIRED;
  }

  return JWT_TOKEN_STATUS.VALID;
};

export const clearAllDataOnUserLogout = () => {
  sessionStorage.clear();
  console.log('Cleared all data on user logout');
};
