import cloudinary from "./config";

/**
 * Deletes an asset from Cloudinary by its public ID.
 *
 * Cloudinary requires the correct `resource_type` ("image" or "video") to
 * delete non-image assets — passing the wrong one silently fails to find
 * the asset rather than erroring, so this must be threaded through
 * correctly from the MediaAsset row being deleted.
 *
 * @param {string} publicId
 * @param {"image"|"video"} resourceType
 */
export async function deleteCloudinaryAsset(publicId, resourceType = "image") {
  if (!publicId) {
    // Nothing was ever uploaded to Cloudinary for this row (e.g. a
    // seeded/local-path MediaAsset from Phase 1) — nothing to delete there.
    return { skipped: true };
  }

  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
    invalidate: true,
  });
}
