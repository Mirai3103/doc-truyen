export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY || 'secretKey',
};

console.log('jwtConstants.secret', jwtConstants.secret);
