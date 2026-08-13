import ContactMessagesManager from "@/components/admin/contact-messages/ContactMessagesManager";

export default function AdminContactMessagesPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Contact Messages</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Messages submitted through the public contact form.
        </p>
      </div>

      <ContactMessagesManager />
    </div>
  );
}