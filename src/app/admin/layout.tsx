import AdminMobileHeader from "@/components/admin/AdminMobileHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-navy-deep)] text-white">
      <AdminMobileHeader />
      {children}
    </div>
  );
}
