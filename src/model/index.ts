export type UserPage = {
  results: User[];
  next: number | undefined;
};
export type User = {
  firstName: string;
  lastName: string;
  picture: string;
  id: string;
  email: string;
};
