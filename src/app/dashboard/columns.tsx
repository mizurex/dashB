"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, TrendingUp, CheckCircle2, Clock, AlertCircle, RefreshCw, TriangleAlert, Loader, CircleX } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
 
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
    {
        id: "actions",
        cell: ({ row }) => {
          const payment = row.original
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(payment.id)}
                >
                  Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
  {
    accessorKey: "status",
    header: (status) => {
      return (
        <Button
          variant="ghost"
          onClick={() => status.column.toggleSorting(status.column.getIsSorted() === "asc")}
        >
          Status
          <TrendingUp className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const variantMap: Record<string, "success" | "processing" | "pending" | "failed"> = {
        success: "success",
        processing: "processing",
        pending: "pending",
        failed: "failed",
      }

      const iconMap: Record<string, React.ReactNode> = {
        success: <CheckCircle2 className="mr-1 h-3 w-3" />,
        processing: <Loader className="mr-1 h-3 w-3 animate-spin" />,
        pending: <TriangleAlert className="mr-1 h-3 w-3" />,
        failed: <CircleX className="mr-1 h-3 w-3" />,
      }

      return (
        <Badge variant={variantMap[status] || "default"} className="capitalize flex items-center">
          {iconMap[status]}
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right pr-[12px]">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-right pr-[4px] font-medium">{formatted}</div>
    },
  },
]