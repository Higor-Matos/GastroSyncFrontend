// tipos.service.ts

export enum UserType {
  Admin = 'admin',
  Client = 'client',
}

export interface OpcaoNavegacao {
  label: string;
  icone: string;
  rota: string;
}
