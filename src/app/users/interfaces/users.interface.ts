export interface User {
  id: string;
  username: string;
  name: string;
  surnames: string;
  email: string;
  password: string;
  age: number | undefined;
  active: boolean;
  lastLogging: string;
  creationDate: string;
  urlImage: string;
}
