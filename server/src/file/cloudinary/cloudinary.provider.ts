import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: process.env.CLOUD_NAME || 'a',
      api_key: process.env.API_KEY || 'a',
      api_secret: process.env.API_SECRET || '7Cx--a',
    });
  },
};
