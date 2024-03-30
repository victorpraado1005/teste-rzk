import { useQuery } from "@tanstack/react-query";
import { getCurrencys } from "../services/currencyService";
import { useEffect, useState } from "react";

interface currencyProps {
  USDBRL: {
    code: string,
    codein: string,
    name: string,
    high: string,
    low: string,
    varBid: string,
    pctChange: string,
    bid: string,
    ask: string,
    timestamp: string,
    create_date: string
  },
  EURBRL: {
    code: string,
    codein: string,
    name: string,
    high: string,
    low: string,
    varBid: string,
    pctChange: string,
    bid: string,
    ask: string,
    timestamp: string,
    create_date: string
  },
  BTCBRL: {
    code: string,
    codein: string,
    name: string,
    high: string,
    low: string,
    varBid: string,
    pctChange: string,
    bid: string,
    ask: string,
    timestamp: string,
    create_date: string
  }
}

export function Home() {
  const { data, isLoading, isError } = useQuery<currencyProps>({
    queryKey: ['dados'],
    queryFn: getCurrencys,
  });
  const [currencys, setCurrencys] = useState<currencyProps[]>([]);

  useEffect(() => {
    if (data) {
      setCurrencys(prevData => [...prevData, data]);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrencys().then(newData => {
        setCurrencys(prevData => [...prevData, newData]);
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar os dados</div>;

  return (
    <div>
      <h1>Dados da API</h1>
      <div>
        {currencys.length > 0 && currencys.map((item, index) => (
          <div key={index}>
            <span>{item.BTCBRL.ask}</span>
          </div>
        ))}
      </div>
    </div>
  )
}