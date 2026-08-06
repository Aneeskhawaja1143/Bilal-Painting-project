import { v2 as cloudinary } from "cloudinary";

/**
 * Cloudinary SDK configuration.
 *
 * Credentials come exclusively from environment variables — never
 * hardcoded here or anywhere else in the codebase. This module is
 * server-only (it uses CLOUDINARY_API_SECRET and the Node-dependent
 * `cloudinary` package), so it must NEVER be imported from a "use client"
 * component. Client components that need `MEDIA_FOLDERS` or
 * `CLOUDINARY_ROOT_FOLDER` should import them from `./constants` directly.
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { CLOUDINARY_ROOT_FOLDER, MEDIA_FOLDERS } from "./constants";

export default cloudinary;
