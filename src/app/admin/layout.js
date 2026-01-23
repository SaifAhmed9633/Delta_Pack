import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#0a0a0a]">
            <AdminSidebar />
            <main className="flex-1 p-8 overflow-y-auto h-screen">
                {children}
            </main>
        </div>
    );
}
