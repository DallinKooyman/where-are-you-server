export interface User {
  id: string; // MongoDB ObjectID
  name?: string;
}

export interface CreateUserInput {
  name: string;
}
