export interface IEmployeeRequest {
  name: string;
  password: string;
  is_adm: boolean;
  is_active: boolean;
}

export interface IEmployeeUpdate {
  password: string;
}

