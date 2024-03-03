export interface ISignUp {
  username: string;
  surname: string;
  password: string;
  confirmPassword: string;
  hydra_id_sales: string;
  supervizer: number;
}

export interface ISignUpRes {
  message: string;
  token: string;
}

export interface ISupervizer {
  id: number;
  supervizer_surname: string;
}

export interface IUser {
  username: string;
  token: string;
}

export interface IUserState {
  user: IUser | null;
  signUpLoading: boolean;
  signInLoading: boolean;
}