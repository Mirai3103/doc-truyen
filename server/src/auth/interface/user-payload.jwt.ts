export interface UserPayload {
  _id: string;
  username: string;
  role: string;
}
export interface UserPayloadJwt {
  sub: string;
  username: string;
  role: string;
}
