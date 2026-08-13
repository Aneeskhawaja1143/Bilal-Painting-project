/**
 * Plain constants with no dependency on the Cloudinary SDK, so this file
 * is safe to import from client components (e.g. the folder filter
 * dropdown in MediaLibrary) without accidentally bundling the server-only
 * `cloudinary` package — which uses Node APIs and must never ship to the
 * browser — into client JavaScript.
 */

/** The Cloudinary folder/library root used across the whole project. */
export const CLOUDINARY_ROOT_FOLDER = "bilal-painting";

/** Sub-folders offered in the Media Library's upload/filter UI. */
export const MEDIA_FOLDERS = [
  "general",
  "hero",
  "about",
  "services",
  "portfolio",
  "transformations",
  "testimonials",
];
