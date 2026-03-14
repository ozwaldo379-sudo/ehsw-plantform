import { redirect } from "next/navigation";
import { getAuthFromCookies } from "@/lib/auth";
import Link from "next/link";

import AdminMobileHeader from "@/components/admin/AdminMobileHeader";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Check if current path is login
    // Layout wraps all admin pages; login page handles its own auth

    return (
        <div className="min-h-screen bg-[var(--color-bg-dark)]">
            <AdminMobileHeader />
            {children}
        </div>
    );
}
