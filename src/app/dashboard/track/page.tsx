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
import { lostItems, users } from "@/lib/data"
import { format } from "date-fns"
import Image from "next/image"

export default function TrackItemsPage() {
    const user = users[0];
    const userLostItems = lostItems.filter(item => item.userId === user.uid);

    const getStatusVariant = (status: (typeof userLostItems)[0]['status']) => {
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

    const getStatusColor = (status: (typeof userLostItems)[0]['status']) => {
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
            {userLostItems.map((item) => (
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
