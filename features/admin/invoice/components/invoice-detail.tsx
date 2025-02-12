import Image from "next/image"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Separator } from "@radix-ui/react-select";

const InvoiceDetail = ({id}:{id:string}) => {


    const invoices = [
        {
          item: 'Dell XPS 15',
          description: 'Powerful laptop with Intel Core i7 and 16GB RAM',
          user: 'Joestar',
          quantity: 5,
          amount: 50000,
        },
        {
          item: 'MacBook Pro 14"',
          description: 'Apple M2 Pro chip with Retina Display',
          user: 'Dio Brando',
          quantity: 2,
          amount: 300000,
        },
        {
          item: 'Logitech MX Master 3',
          description: 'Wireless ergonomic mouse with programmable buttons',
          user: 'Joseph Joestar',
          quantity: 3,
          amount: 45000,
        },
        {
          item: 'Samsung 4K Monitor',
          description: '32-inch UHD display with HDR support',
          user: 'Kakyoin',
          quantity: 1,
          amount: 80000,
        },
        {
          item: 'Corsair Mechanical Keyboard',
          description: 'RGB gaming keyboard with Cherry MX switches',
          user: 'Avdol',
          quantity: 4,
          amount: 60000,
        },
        {
          item: 'Sony WH-1000XM5',
          description: 'Noise-canceling wireless headphones',
          user: 'Polnareff',
          quantity: 2,
          amount: 120000,
        },
      ];
  return (
    <section className="px-20 py-8 select-none">
        <div className="flex py-5 justify-between items-center gap-3">
            <Image src="/brandLogo.png" width={80} height={80} alt="logo" className="object-contain" />
            {/* <h1 className="text-6xl font-bold me-5">Invoice</h1> */}
        </div>

        <div className="flex flex-col ">
            <h1 className="text-md uppercase font-semibold scale-y-75">Invoice To</h1>
            <div className="flex justify-between gap-4">
                <div className="flex flex-col gap-5">
                    <div className="">
                        <h2 className="text-2xl font-bold">Maung Maung</h2>
                        <p className="text-sm">random text for invoice</p>
                    </div>
                    <div className="w-full border-b-[0.05px] border-dotted border-white" />
                    <div className="text-sm">
                        <p>Contact Person</p>
                        <p>Phone : (+63 )899 123 456</p>
                        <p>Email : megumie_ryu@gmail.com</p>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <div className="text-sm">
                        <p>Invoice No :L778CB9</p>
                        <p>Invoice date : December 24th 2020</p>
                    </div>
                    <div/>
                    {/* <div className="text-sm">
                        <p>Payment Method</p>
                        <div className="">
                            <p>AccountID : 8773477338</p>
                            <p>AccountName : kazuma Jean</p>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="mt-10">
            <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">description</TableHead>
          <TableHead>Item</TableHead>
          <TableHead>User</TableHead>
          <TableHead className="text-center">quantity</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice,index) => (
          <TableRow key={index}>
            <TableCell className="font-medium text-wrap">{invoice.description}</TableCell>
            <TableCell>{invoice.item}</TableCell>
            <TableCell>{invoice.user}</TableCell>
            <TableCell className="text-center">{invoice.quantity}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="">Total</TableCell>
          <TableCell className="text-right">$2,500.0000</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
            </div>
        </div>
    </section>
  )
}

export default InvoiceDetail