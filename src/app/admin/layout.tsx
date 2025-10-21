import AdminSidebar from "@/components/admin/admin-sidebar";
<<<<<<< HEAD
=======
import { useAuth } from "@/context/auth-context";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }
>>>>>>> bfa73560c963825c1b4db1797da8f2ef50b4bb74

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background">
            <AdminSidebar />
            <main className="flex-1 p-6 md:p-10">
                {children}
            </main>
        </div>
    );
}
<<<<<<< HEAD
=======


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedAdminLayout>
            {children}
        </ProtectedAdminLayout>
    );
}
>>>>>>> bfa73560c963825c1b4db1797da8f2ef50b4bb74
