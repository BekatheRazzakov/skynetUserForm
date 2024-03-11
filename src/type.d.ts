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

export interface IUserState {
  user: string;
  signUpLoading: boolean;
  signInLoading: boolean;
  authorizationError: string;
  authorizationMessage: string;
  zayavkaRes: {
    hydra_ls: string;
    dogovor: string;
  } | null;
}

export interface ISignIn {
  username: string;
  password: string;
}

export interface ValidationError {
  error: string;
}