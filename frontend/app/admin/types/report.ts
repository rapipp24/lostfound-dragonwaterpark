export interface Report {
  id: number;
  item: string;
  location: string;
  status: string;
  description: string;
  image?: string;
  createdAt?: string;
  user?: {
    fullName: string;
    email: string;
  };
}
