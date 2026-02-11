'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type NavItem = {
    href: string;
    label: string;
    icon: React.ReactNode;
    badge?: number;
};

type DashboardNavProps = {
    navItems: NavItem[];
};

export function DashboardNav({ navItems }: DashboardNavProps) {
    const pathname = usePathname();

    return (
        <>
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname === item.href && 'bg-muted text-primary'
                    )}
                >
                    {item.icon}
                    {item.label}
                    {item.badge !== undefined && (
                        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                            {item.badge}
                        </Badge>
                    )}
                </Link>
            ))}
        </>
    );
}
