import AdminSidebar from "@/components/AdminSidebar";

export const metadata = {
    title: "Admin | Delta Pack Manager",
    description: "Delta Pack Admin Dashboard",
    manifest: "/manifest.json",
    themeColor: "#22c55e",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "DeltaPack"
    }
};

export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#0a0a0a]">
            <AdminSidebar />
            <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto h-screen">
                {children}
            </main>
        </div>
    );
}
