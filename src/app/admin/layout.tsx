'use client';

import AdminSidebar from "@/components/admin/admin-sidebar";
import { FirebaseClientProvider, useUser } from "@/firebase";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/login');
        }
    }, [user, isUserLoading, router]);

    if (isUserLoading || !user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-background">
            <AdminSidebar />
            <main className="flex-1 p-6 md:p-10">
                {children}
            </main>
        </div>
    );
}


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <FirebaseClientProvider>
            <ProtectedAdminLayout>
                {children}
            </ProtectedAdminLayout>
        </FirebaseClientProvider>
    );
}
