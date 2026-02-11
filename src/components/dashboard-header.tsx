import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/user-nav';
import { Logo } from '@/components/logo';

type DashboardHeaderProps = {
    children: React.ReactNode;
};

export function DashboardHeader({ children }: DashboardHeaderProps) {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        <div className="pb-4 border-b mb-4">
                           <Logo />
                        </div>
                        {children}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                {/* Optional: Can add a search bar here */}
            </div>
            <UserNav />
        </header>
    );
}
