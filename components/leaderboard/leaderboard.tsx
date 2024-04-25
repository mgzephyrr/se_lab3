import { users } from "@prisma/client";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function LeaderboardTable(
    {
        data
    } : {
        data: users[]
    }
) {
    return (
        <DataTable columns={columns} data={data}/>
    )
}
