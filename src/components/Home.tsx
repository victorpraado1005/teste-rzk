import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import { useQuery } from "@tanstack/react-query";
import { getCurrencysQuotes } from "../services/currencyService";
import { useEffect, useState } from "react";
import * as Select from '@radix-ui/react-select';
import logo from '@/assets/logo.svg';
import { ChevronDownIcon } from '@radix-ui/react-icons';

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
  const [selectedCurrency, setSelectedCurrency] = useState('BTC')
  const { data, isLoading, isError } = useQuery<currencyProps>({
    queryKey: ['currencyQuotes'],
    queryFn: getCurrencysQuotes,
    refetchInterval: 5000,
  });
  const [currencyQuotes, setCurrencysQuotes] = useState<currencyProps[]>([]);
  const [lastCurrencyQuote, setLastCurrencyQuote] = useState<currencyProps[]>([]);

  useEffect(() => {
    if (data) {
      setCurrencysQuotes(prevData => [...prevData, data]);
      setLastCurrencyQuote([data]);
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
    <div className='flex flex-col items-center justify-center'>

      <div className='w-full flex items-center justify-evenly' >
        <img src={logo} className='size-32' />
        <span>Bem-Vindo à RZK Digital</span>
      </div>

      <div className='flex flex-col items-center gap-10'>
        <div className='w-full flex items-center justify-center gap-8'>
          <h1 className="text-4xl">{selectedCurrency}</h1>
          {selectedCurrency === 'BTC' ? (
            lastCurrencyQuote.map((quote) => (
              <span className='text-3xl font-light text-green-light-rzk'>{quote.BTCBRL.ask}</span>
            ))
          ) : selectedCurrency === 'USD' ? (
            lastCurrencyQuote.map((quote) => (
              <span className='text-3xl font-light text-green-light-rzk'>{quote.USDBRL.ask}</span>
            ))
          ) : (
            lastCurrencyQuote.map((quote) => (
              <span className='text-3xl font-light text-green-light-rzk'>{quote.EURBRL.ask}</span>
            ))
          )}
        </div>
        <div className=''>
          <Select.Root defaultValue='BTC' onValueChange={(value) => setSelectedCurrency(value)} >
            <Select.Trigger className='inline-flex items-center justify-between px-[15px] leading-none gap-[5px] border-2 border-green-rzk rounded-md w-48 h-10 text-green-rzk outline-none' >
              <Select.Value placeholder='Selecione sua moeda' className='w-48' />
              <Select.Icon>
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content className='overflow-hidden w-48 text-center rounded-md bg-green-rzk text-blue-rzk'>
                <Select.Viewport className="p-[5px]">
                  <Select.Item value="BTC">
                    <Select.ItemText>
                      BTC
                    </Select.ItemText>
                  </Select.Item>
                  <Select.Item value="USD">
                    <Select.ItemText>
                      USD
                    </Select.ItemText>
                  </Select.Item>
                  <Select.Item value="EUR">
                    <Select.ItemText>
                      EUR
                    </Select.ItemText>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        <div>
          {selectedCurrency === 'BTC' ? (
            <div>
              <LineChart width={600} height={350} data={cotacoesBTC}>
                <Line type="monotone" dataKey="ask" stroke="#5ABF9A" />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey="create_date" allowDecimals={false} />
                <YAxis dataKey="ask" />
                <Tooltip />
              </LineChart>
            </div>
          ) : selectedCurrency === 'USD' ? (
            <div>
              <LineChart width={600} height={350} data={cotacoesUSD}>
                <Line type="monotone" dataKey="ask" stroke="#5ABF9A" />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey="create_date" allowDecimals={false} />
                <YAxis dataKey="ask" />
                <Tooltip />
              </LineChart>
            </div>
          ) : (
            <div>
              <LineChart width={600} height={350} data={cotacoesEUR}>
                <Line type="monotone" dataKey="ask" stroke="#5ABF9A" />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey="create_date" allowDecimals={false} />
                <YAxis dataKey="ask" />
                <Tooltip />
              </LineChart>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}