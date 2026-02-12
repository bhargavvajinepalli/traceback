'use client';
import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useUser, useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { format } from 'date-fns';
import { collection, query, where } from "firebase/firestore";
import type { LostItem } from "@/lib/types";

export default function DashboardPage() {
    const { user, isUserLoading: isUserLoadingAuth } = useUser();
    const firestore = useFirestore();

    const userLostItemsQuery = useMemoFirebase(() => {
        if (!user) return null;
        return query(collection(firestore, 'lost_items'), where('userId', '==', user.uid));
    }, [firestore, user]);

    const { data: userLostItems, isLoading: isLoadingItems } = useCollection<LostItem>(userLostItemsQuery);

    const matchedCount = userLostItems?.filter(item => item.status === 'Matched').length || 0;
    const recoveredCount = userLostItems?.filter(item => item.status === 'Recovered').length || 0;
    const recentReports = userLostItems?.slice(0, 5) || [];

    if (isUserLoadingAuth || isLoadingItems) {
        return <div>Loading...</div>
    }

  return (
        <>
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl font-headline">Welcome back, {user?.displayName || 'User'}!</h1>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Items Reported
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userLostItems?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Keep reporting to increase chances.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Items Matched
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{matchedCount}</div>
                <p className="text-xs text-muted-foreground">
                  Potential matches found.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Items Recovered</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{recoveredCount}</div>
                <p className="text-xs text-muted-foreground">
                  Successfully recovered items.
                </p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recovery Rate</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(userLostItems?.length || 0) > 0 ? Math.round((recoveredCount / (userLostItems?.length || 1)) * 100) : 0}%</div>
                <p className="text-xs text-muted-foreground">
                  Your success rate.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>
                    Your most recently filed reports.
                  </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link href="/dashboard/track">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="hidden xl:table-column">
                        Category
                      </TableHead>
                      <TableHead className="hidden xl:table-column">
                        Date Lost
                      </TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentReports.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <div className="font-medium">{item.itemName}</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                    {item.location}
                                </div>
                            </TableCell>
                            <TableCell className="hidden xl:table-column">{item.category}</TableCell>
                            <TableCell className="hidden xl:table-column">{format(new Date(item.dateLost), 'PPP')}</TableCell>
                            <TableCell className="text-right">
                                <Badge variant={item.status === 'Matched' ? 'default' : 'outline'}>{item.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Need to report something?</CardTitle>
                    <CardDescription>
                        The sooner you report, the higher the chance of recovery.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Button asChild>
                        <Link href="/dashboard/report-lost">Report a Lost Item</Link>
                    </Button>
                     <Button variant="secondary" asChild>
                        <Link href="/dashboard/report-found">Report a Found Item</Link>
                    </Button>
                </CardContent>
            </Card>
          </div>
        </>
  )
}
