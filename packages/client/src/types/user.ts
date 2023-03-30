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

export { type IUserSigninRequest, type IUserSignupRequest };
