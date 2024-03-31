import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import { useQuery } from "@tanstack/react-query";
import { getCurrencysQuotes } from "../services/currencyService";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

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
  // const dataLine = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }];
  const [selectedCurrency, setSelectedCurrency] = useState('BTC')
  const { data, isLoading, isError } = useQuery<currencyProps>({
    queryKey: ['currencyQuotes'],
    queryFn: getCurrencysQuotes,
    refetchInterval: 5000,
  });
  const [currencyQuotes, setCurrencysQuotes] = useState<currencyProps[]>([]);

  useEffect(() => {
    if (data) {
      setCurrencysQuotes(prevData => [...prevData, data]);
    }
  }, [data]);

  const cotacoesBTC = currencyQuotes.filter(item => item.BTCBRL)
    .map(item => item.BTCBRL);

  const cotacoesUSD = currencyQuotes.filter(item => item.USDBRL)
    .map(item => item.USDBRL);

  const cotacoesEUR = currencyQuotes.filter(item => item.EURBRL)
    .map(item => item.EURBRL);

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar os dados</div>;

  return (
    <div className=''>
      <h1 className="border-2 border-sky-900 w-12">BTC</h1>
      <Select defaultValue='BTC' onValueChange={(value) => setSelectedCurrency(value)} >
        <SelectTrigger>
          <SelectValue placeholder='Selecione a moeda' />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="BTC">BTC</SelectItem>
          <SelectItem value="USD">USD</SelectItem>
          <SelectItem value="EUR">EUR</SelectItem>
        </SelectContent>
      </Select>
      <div>
        {selectedCurrency === 'BTC' ? (
          <div>
            <LineChart width={600} height={300} data={cotacoesBTC}>
              <Line type="monotone" dataKey="ask" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
              <XAxis dataKey="create_date" allowDecimals={false} />
              <YAxis dataKey="ask" />
              <Tooltip />
            </LineChart>
          </div>
        ) : selectedCurrency === 'USD' ? (
          <div>
            <LineChart width={600} height={300} data={cotacoesUSD}>
              <Line type="monotone" dataKey="ask" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
              <XAxis dataKey="create_date" allowDecimals={false} />
              <YAxis dataKey="ask" />
              <Tooltip />
            </LineChart>
          </div>
        ) : (
          <div>
            <LineChart width={600} height={300} data={cotacoesEUR}>
              <Line type="monotone" dataKey="ask" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
              <XAxis dataKey="create_date" allowDecimals={false} />
              <YAxis dataKey="ask" />
              <Tooltip />
            </LineChart>
          </div>
        )}
      </div>
    </div>
  )
}