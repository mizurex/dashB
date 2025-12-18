
"use client";

import Sidebar from "@/components/side-bar"
import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"
import Header from "@/components/header"
import { Form, Menu } from "lucide-react"
import { useState, useEffect } from "react"


async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "unicorn.rider@example.com",
    },
    {
      id: "ab4832kl",
      amount: 250,
      status: "processing",
      email: "waffle.wizard@example.com",
    },
    {
      id: "gd2038zs",
      amount: 60,
      status: "success",
      email: "hamster.dancer@example.com",
    },
    {
      id: "xz2901nv",
      amount: 90,
      status: "pending",
      email: "llama.lifter@example.com",
    },
    {
      id: "tl2039ae",
      amount: 400,
      status: "processing",
      email: "pickle.princess@example.com",
    },
    {
      id: "ol9492br",
      amount: 120,
      status: "success",
      email: "banana.bandit@example.com",
    },
    {
      id: "wp5810lj",
      amount: 75,
      status: "failed",
      email: "sassy.sasquatch@example.com",
    },
    
    
   
  ]
}

export default function DemoPage() {
  const [data, setData] = useState<Payment[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    getData().then(setData)
  }, [])


  return (
    <div className="bg-[#f5f5f5] grid h-screen w-full grid-cols-1 overflow-hidden dark:bg-slate-900 lg:grid-cols-[250px_1fr]">
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
        <div className="bg-muted-foreground/9 overflow-y-auto h-full"
        >
            
          
         <div className="bg-white container max-w-[95%] lg:max-w-[78rem] px-4 lg:px-6 pb-4 pt-[4px] min-h-[calc(110vh-3rem)] lg:h-[45rem] rounded-[6px] mx-auto mt-6">
         <Header onMenuClick={() => setIsMobileMenuOpen(true)}/>
         <div className=" ">
            <h1 className="text-xl lg:text-2xl font-medium text-foreground font-sans pb-1 pl-0 lg:pl-7 pt-2 text-center lg:text-left">Transactions</h1>
         </div>
         <div className="mt-2 mx-auto bg-muted-foreground/9 w-full lg:w-[72rem] px-[4px] pb-[8px] rounded-[6px]">
            <div className="flex items-center gap-2 pl-[8px]">
            <span>
            <Form className="size-3 text-neutral-400" />
           </span>
                <span>
                      <h1 className="text-sm font-medium text-foreground font-sans py-[12px]">Transactions</h1>   
                </span>
          
              
            </div>
            
            <div className="overflow-x-auto">
              <DataTable columns={columns} data={data} />
            </div>
         </div>
      
    </div> 
        </div>
         
    </div>
   
  )
}