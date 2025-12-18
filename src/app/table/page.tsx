import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="bg-red-500 h-full w-full">
         <div className="">
            <h1 className="text-2xl font-bold">Table</h1>
         </div>
         <div className=" container w-full px-4 mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
    </div>
   
  )
}