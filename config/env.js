import { config } from 'dotenv';

const result = config({
  path: `.env.${process.env.NODE_ENV || 'development'}.local`
});

console.log('ENV PATH:', `.env.${process.env.NODE_ENV || 'development'}.local`);
console.log('DOTENV RESULT:', result);
console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

export const { PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN, ARCJET_ENV, ARCJET_KEY } = process.env;