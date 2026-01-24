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
        <div className="min-h-screen bg-[#0a0a0a] lg:flex">
            <AdminSidebar />
            <main className="flex-1 min-h-screen">
                {children}
            </main>
        </div>
    );
}
