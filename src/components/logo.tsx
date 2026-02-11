import { LocateIcon } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <LocateIcon className="h-7 w-7 text-primary" />
      <span className="font-headline text-2xl font-bold text-foreground">
        TraceBack
      </span>
    </Link>
  );
}
