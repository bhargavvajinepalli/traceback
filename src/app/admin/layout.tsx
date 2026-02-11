import {
    Home,
    Search,
    Package,
    Users,
    Shield,
} from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardNav } from '@/components/dashboard-nav';
import { Logo } from '@/components/logo';

const navItems = [
    {
        href: '/admin',
        label: 'Dashboard',
        icon: <Home className="h-4 w-4" />,
    },
    {
        href: '/admin',
        label: 'Lost Items',
        icon: <Search className="h-4 w-4" />,
    },
    {
        href: '/admin',
        label: 'Found Items',
        icon: <Package className="h-4 w-4" />,
    },
    {
        href: '#',
        label: 'Users',
        icon: <Users className="h-4 w-4" />,
    },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-card md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Logo />
                    </div>
                    <div className="flex-1">
                        <div className='flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary font-headline lg:px-6'>
                            <Shield className="h-5 w-5" />
                            Admin Panel
                        </div>
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <DashboardNav navItems={navItems} />
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <DashboardHeader>
                    <div className='flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary font-headline lg:px-6'>
                        <Shield className="h-5 w-5" />
                        Admin Panel
                    </div>
                    <DashboardNav navItems={navItems} />
                </DashboardHeader>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-secondary/50">
                    {children}
                </main>
            </div>
        </div>
    );
}
