'use client'

import react, { useEffect, useState } from "react"
import StockCard from "../components/StockCard";
import { getApi } from "../api";
import { Spin } from "antd";

const Portfolio: React.FC<{}> = () => {
  const [stocks, setStocks] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getApi("/api/portfolio/cyc", data => {setStocks(data)}, err => console.log(err), () => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <Spin />
  }

  return (
    <>
    {
      stocks.map(stock => <StockCard key={stock} name={stock} />)
    }
    </>
  );
};

export default Portfolio;