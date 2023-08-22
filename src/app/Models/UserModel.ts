export interface User {
  identityToken: string;
  refreshToken: string;
  accessToken: string;
  userInfo: UserInfo
}

export interface UserInfo {
  admin: string | boolean;
  lang: string;
  phoneNumberVerified: string;
  givenName: string;
  customerName: string;
  k24admin: string | boolean;
  customerId: string;
  phoneNumber: string;
  familyName: string;
  email: string;
  firstname: string;
  lastname: string;
}
