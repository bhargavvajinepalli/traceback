import {
    Bell,
    Home,
    Search,
    FilePlus,
    FileQuestion,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardNav } from '@/components/dashboard-nav';
import { Logo } from '@/components/logo';

const navItems = [
    {
        href: '/dashboard',
        label: 'Dashboard',
        icon: <Home className="h-4 w-4" />,
    },
    {
        href: '/dashboard/track',
        label: 'Track Items',
        icon: <Search className="h-4 w-4" />,
        badge: 3,
    },
    {
        href: '/dashboard/report-lost',
        label: 'Report Lost',
        icon: <FileQuestion className="h-4 w-4" />,
    },
    {
        href: '/dashboard/report-found',
        label: 'Report Found',
        icon: <FilePlus className="h-4 w-4" />,
    },
];

export default function DashboardLayout({
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
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <DashboardNav navItems={navItems} />
                        </nav>
                    </div>
                    <div className="mt-auto p-4">
                        <Card>
                            <CardHeader className="p-2 pt-0 md:p-4">
                                <CardTitle>Found a good samaritan?</CardTitle>
                                <CardDescription>
                                    Consider upgrading your plan to access premium features and support our mission.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                                <Button size="sm" className="w-full">
                                    Upgrade
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <DashboardHeader>
                    <DashboardNav navItems={navItems} />
                </DashboardHeader>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-secondary/50">
                    {children}
                </main>
            </div>
        </div>
    );
}
