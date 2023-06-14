
async function fetchCurrencyData(from: string, to: string, amount: number) {
    const response = await fetch(
      `https://my.transfergo.com/api/fx-rates?from=${from}&to=${to}&amount=${amount}`
    );
  
    if (!response.ok) {
      throw new Error('API request failed');
    }
  
    return response.json();
  }
  
  export default fetchCurrencyData;
  