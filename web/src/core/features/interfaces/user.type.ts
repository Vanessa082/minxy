type DateType = Date | string;

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  createdAt: DateType;
}
