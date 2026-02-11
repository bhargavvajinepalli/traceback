import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileQuestion, Search, HandHelping, LocateIcon, ShieldCheck, MapPin, FileClock } from 'lucide-react';
import { Logo } from '@/components/logo';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

export default function Home() {
  const heroImage = placeholderImages.placeholderImages.find(p => p.id === "hero-main");

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Logo />
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Login
          </Link>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
               {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={600}
                  height={400}
                  data-ai-hint={heroImage.imageHint}
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                />
              )}
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Lost something? Find it with TraceBack.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our platform connects people who have lost items with those
                    who have found them, making recovery simple and secure.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/dashboard/report-lost" prefetch={false}>
                      Report a Lost Item
                    </Link>
                  </Button>
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/dashboard/report-found" prefetch={false}>
                      I Found Something
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">
                  A Smarter Way to Recover Your Belongings
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  TraceBack offers a comprehensive suite of tools to help you
                  quickly and safely get your lost items back.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-1 text-center">
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FileQuestion className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">Report Lost Items</h3>
                <p className="text-sm text-muted-foreground">
                  Easily file a detailed report with descriptions, locations, and images to increase your chances of recovery.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <HandHelping className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">Submit Found Items</h3>
                <p className="text-sm text-muted-foreground">
                  Be a good samaritan. Anonymously report items you've found and help reunite them with their owners.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">AI-Powered Matching</h3>
                <p className="text-sm text-muted-foreground">
                  Our smart system, with optional image analysis, works behind the scenes to find potential matches between lost and found items.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FileClock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">Real-Time Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Stay updated on the status of your report from "Under Review" to "Matched" and "Recovered".
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">Location-Based Search</h3>
                <p className="text-sm text-muted-foreground">
                  Narrow down your search with our map integration, making it easier to pinpoint where items were lost or found.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">Secure & Verified Claims</h3>
                <p className="text-sm text-muted-foreground">
                  A secure process involving OTPs and proof validation ensures items are returned to their rightful owners.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 TraceBack. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
