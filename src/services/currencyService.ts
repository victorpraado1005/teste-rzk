export async function getCurrencysQuotes() {
  const response = await fetch('https://economia.awesomeapi.com.br/last/BTC-BRL,EUR-BRL,USD-BRL');
  if (response.ok) {
    const newData = await response.json()
    return { ...newData, timestamp: new Date().toISOString() };
  }
}