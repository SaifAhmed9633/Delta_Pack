import AdminSidebar from "@/components/AdminSidebar";

export const metadata = {
    title: "Admin | Delta Pack Manager",
    description: "Delta Pack Admin Dashboard - Manage your products",
    manifest: "/manifest.json",
    themeColor: "#22c55e",
    viewport: { width: "device-width", initialScale: 1, maximumScale: 1, userScalable: false },
    appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "DeltaPack" },
    icons: { icon: "/favicon.ico", shortcut: "/icon-192.png", apple: "/icon-192.png" },
    other: { "mobile-web-app-capable": "yes", "apple-mobile-web-app-capable": "yes", "apple-mobile-web-app-status-bar-style": "black-translucent", "apple-mobile-web-app-title": "DeltaPack" },
};

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] lg:flex">
            <AdminSidebar />
            <main className="flex-1 min-h-screen pt-14 lg:pt-0">
                {children}
            </main>
        </div>
    );
}
