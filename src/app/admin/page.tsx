'use client';
import Image from "next/image"
import { File, ListFilter, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import type { LostItem, FoundItem } from "@/lib/types"
import { format } from "date-fns"
import { collection } from "firebase/firestore"

export default function AdminDashboardPage() {
  const firestore = useFirestore();

  const lostItemsQuery = useMemoFirebase(() => collection(firestore, 'lost_items'), [firestore]);
  const { data: lostItems, isLoading: isLoadingLost } = useCollection<LostItem>(lostItemsQuery);

  const foundItemsQuery = useMemoFirebase(() => collection(firestore, 'found_items'), [firestore]);
  const { data: foundItems, isLoading: isLoadingFound } = useCollection<FoundItem>(foundItemsQuery);

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Item Management</h1>
      </div>
      <Tabs defaultValue="lost">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="lost">Lost Items</TabsTrigger>
            <TabsTrigger value="found">Found Items</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Matched</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Archived
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="lost">
          <Card>
            <CardHeader>
              <CardTitle>Lost Items</CardTitle>
              <CardDescription>
                Manage all reported lost items.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Reported By
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Date Lost
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingLost && <TableRow><TableCell colSpan={6}>Loading...</TableCell></TableRow>}
                  {lostItems?.map((item) => (
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
                      <TableCell className="font-medium">{item.itemName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        User ID: {item.userId}
                      </TableCell>
                       <TableCell className="hidden md:table-cell">
                        {format(new Date(item.dateLost), "PPP")}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Find Matches</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-{lostItems?.length || 0}</strong> of <strong>{lostItems?.length || 0}</strong>{" "}
                products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
         <TabsContent value="found">
          <Card>
            <CardHeader>
              <CardTitle>Found Items</CardTitle>
              <CardDescription>
                Manage all submitted found items.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                     <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Finder
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Date Found
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                   {isLoadingFound && <TableRow><TableCell colSpan={6}>Loading...</TableCell></TableRow>}
                  {foundItems?.map((item) => (
                     <TableRow key={item.id}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt={item.category}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={item.imageUrl}
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{item.category}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.finderId ? `User ID: ${item.finderId}`: 'Anonymous'}
                      </TableCell>
                       <TableCell className="hidden md:table-cell">
                        {format(new Date(item.dateFound), "PPP")}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Find Matches</DropdownMenuItem>
                            <DropdownMenuSeparator />
                             <DropdownMenuItem>Mark as Claimed</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
             <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-{foundItems?.length || 0}</strong> of <strong>{foundItems?.length || 0}</strong>{" "}
                products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
