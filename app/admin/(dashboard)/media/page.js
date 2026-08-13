import MediaLibrary from "@/components/admin/MediaLibrary";

export default function AdminMediaLibraryPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Media Library</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Upload and manage images and videos. This library is shared across
          the whole site — once Hero, About, Portfolio, and other sections
          become editable, they&apos;ll pick their images and videos from here.
        </p>
      </div>

      <MediaLibrary mode="manage" />
    </div>
  );
}
