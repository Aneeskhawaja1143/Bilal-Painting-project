import cloudinary from "./config";
import { CLOUDINARY_ROOT_FOLDER } from "./constants";

/**
 * Creates a signed payload the browser can use to upload directly to
 * Cloudinary (bypassing our own server for the actual file bytes — this
 * matters for videos, which can exceed serverless function body limits).
 *
 * Only `timestamp` and `folder` are signed. Cloudinary requires every
 * upload request to include a signature computed over exactly the set of
 * params being sent (excluding `file`, `api_key`, `cloud_name`, `resource_type`,
 * and the signature itself) — so whatever we sign here must match what the
 * client actually sends in the upload request.
 *
 * @param {{ folder?: string }} options
 */
export function createSignedUploadPayload({ folder = "general" } = {}) {
  const timestamp = Math.round(Date.now() / 1000);
  const fullFolder = `${CLOUDINARY_ROOT_FOLDER}/${folder}`;

  const paramsToSign = {
    timestamp,
    folder: fullFolder,
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET
  );

  return {
    timestamp,
    folder: fullFolder,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  };
}
