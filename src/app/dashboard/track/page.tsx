'use client';

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
import type { LostItem } from "@/lib/types";
import { format } from "date-fns"
import { collection, query, where } from "firebase/firestore";
import Image from "next/image"

export default function TrackItemsPage() {
    const { user, isUserLoading: isUserLoadingAuth } = useUser();
    const firestore = useFirestore();

    const userLostItemsQuery = useMemoFirebase(() => {
        if (!user) return null;
        return query(collection(firestore, 'lost_items'), where('userId', '==', user.uid));
    }, [firestore, user]);

    const { data: userLostItems, isLoading: isLoadingItems } = useCollection<LostItem>(userLostItemsQuery);

    const getStatusVariant = (status: LostItem['status']) => {
        switch (status) {
            case 'Matched':
                return 'default'
            case 'Recovered':
                return 'secondary'
            case 'Under Review':
                return 'outline'
            case 'Reported':
                return 'outline'
            default:
                return 'outline'
        }
    }

    const getStatusColor = (status: LostItem['status']) => {
        switch (status) {
            case 'Matched':
                return 'bg-accent text-accent-foreground'
            case 'Recovered':
                return 'bg-green-500/20 text-green-700'
            case 'Under Review':
                return 'bg-blue-500/20 text-blue-700'
            case 'Reported':
                return 'bg-gray-500/20 text-gray-700'
            default:
                return 'bg-gray-500/20 text-gray-700'
        }
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Track Your Items</CardTitle>
        <CardDescription>
          A detailed list of all items you have reported as lost.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">
                Date Lost
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(isUserLoadingAuth || isLoadingItems) && <TableRow><TableCell colSpan={5}>Loading...</TableCell></TableRow>}
            {userLostItems?.map((item) => (
                <TableRow key={item.id}>
                    <TableCell className="hidden sm:table-cell">
                        <Image
                        alt={item.itemName}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={item.imageUrl}
                        width="64"
                        />
                    </TableCell>
                    <TableCell className="font-medium">
                        <div className="font-bold">{item.itemName}</div>
                        <div className="text-sm text-muted-foreground">{item.location}</div>
                    </TableCell>
                    <TableCell>
                        <Badge className={getStatusColor(item.status)} variant={getStatusVariant(item.status)}>{item.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        {format(new Date(item.dateLost), "PPP")}
                    </TableCell>
                    <TableCell>
                        <Button size="sm" variant="outline" disabled={item.status !== 'Matched'}>Claim</Button>
                    </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
