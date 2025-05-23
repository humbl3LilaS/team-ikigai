export type Tdata = {
    status: "PENDING" | "CANCEL" | "APPROVE" | "ON_THE_WAY" | "FINISH";
    total: number,
    createdAt: Date;
  }


export type TChartData = {
    quantity: number,
    product: string,
    fill?: string,
  }