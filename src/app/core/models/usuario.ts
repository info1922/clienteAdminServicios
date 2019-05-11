export class User {
  email: string;
  password?: string;
}

export interface LoginRsp {
  success: boolean;
  token: string;
}

export interface SignupRsp {
  success: boolean;
  message: string;
}

export interface ChangeNombre {
  nombre: string;
}

export class Usuario {
  constructor(
      public email: string,
      public role: string,
      public nombre: string,
      public favoritos: any,
      public nese: any,
      public anuncios: any,
      public google?: any,
      public password?: string,
      public id?: string
  ) {}
}

export class Registro {
  constructor(
      public email: string,
      public role: string,
      public nombre: string,
      public password: string
  ) {}
}
