export interface UserPayload {
  _id: string;
  username: string;
  role: number;
}
export interface UserPayloadJwt {
  sub: string;
  username: string;
  role: number;
}
