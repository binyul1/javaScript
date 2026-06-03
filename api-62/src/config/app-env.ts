import { config } from 'dotenv';

config();

export const MongodbConfig = {
    url: process.env.MONGODB_URL,
    dbName: process.env.MONGODB_DB_NAME,
};

export const Secrets = {
    jwtSecret: process.env.JWT_SECRET
}
export const AppConfig = {
    assetsUrl: process.env.ASSETS_URL   
}

export const CloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
}

export const SMTPConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM_ADDRESS
}