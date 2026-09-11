export interface CreateUserInput {
  name: string;
}

export interface User {
  id: string; // The uuid
  name?: string;
}
