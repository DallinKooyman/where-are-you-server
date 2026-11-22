export interface User {
  id: string; // MongoDB ObjectID
  name?: string;
  password?: string;
}

export interface CreateUserInput {
  name: string;
  password: string;
}
