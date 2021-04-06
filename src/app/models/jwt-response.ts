export interface IJwtResponse {
  success: boolean;
  dataUser: {
    id: number;
    name: string;
    email: string;
    accessToken: string;
    role: string;
  };
}
