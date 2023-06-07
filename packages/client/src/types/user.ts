interface IUserSigninRequest {
  login: string;
  password: string;
}

interface IUserSignupRequest {
  login: string;
  password: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
}

interface IUserUpdateDataRequest {
  first_name: string;
  second_name: string;
  login: string;
  display_name: string;
  phone: string;
}

interface IUserUpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

interface IOAuthRequest {
  redirect_uri: string;
  code: string | null;
}

interface IOAuthGetCodeRequest {
  redirect_uri: string;
}

export {
  type IUserSigninRequest,
  type IUserSignupRequest,
  type IUserUpdateDataRequest,
  type IUserUpdatePasswordRequest,
  type IOAuthRequest,
  type IOAuthGetCodeRequest,
};
