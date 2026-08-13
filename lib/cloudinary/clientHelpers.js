/**
 * Client-safe Cloudinary helpers. No dependency on the `cloudinary` SDK —
 * safe to import from "use client" components.
 */

/** Builds the direct-upload endpoint for a given cloud name. `auto` lets
 * Cloudinary detect image vs video from the file itself, so the uploader
 * doesn't need to know the type ahead of time. */
export function getCloudinaryUploadUrl(cloudName) {
  return `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
}

/**
 * Derives a static JPG thumbnail URL for a Cloudinary-hosted video, by
 * swapping the file extension on its delivery URL — Cloudinary generates
 * this thumbnail automatically for every uploaded video, no extra request
 * or configuration needed.
 */
export function getVideoThumbnailUrl(videoUrl) {
  if (!videoUrl) return null;
  return videoUrl.replace(/\.[a-zA-Z0-9]+$/, ".jpg");
}
