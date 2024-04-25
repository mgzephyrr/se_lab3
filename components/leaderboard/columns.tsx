"use client"

import { users } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { ArrowUpDown } from "lucide-react"

export const columns: ColumnDef<users>[] = [
  {
    accessorKey: "name",
    header: "Имя",
    id: "Имя",
    cell: ({ row }) => (
      <div className="capitalize lg:font-medium">{row.getValue("Имя")}</div>
    ),
  },
  {
    accessorKey: "score",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Счёт
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
]
