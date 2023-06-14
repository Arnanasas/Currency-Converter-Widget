# Currency Converter Widget

![Currency Converter Widget](https://www.part.lt/img/be17f965c4c12daefac89a01537e20d8331.png)

Built with TypeScript, React, and SCSS (CSS Modules). This widget allows users to easily convert between different currencies with real-time exchange rates. Using TransferGo TaxesAPI.

## Installation

To use the Currency Converter Widget in your project, follow these steps:

   ```bash
   git clone https://github.com/Arnanasas/Currency-Converter-Widget.git
   cd currency-converter-widget
   npm install & npm start
   ```
## Formal requirements 

- Uses TransferGo API for FX rates (details below). ✅
- Allows user to select initial FROM currency, TO currency and AMOUNT to convert (defaults to EUR -> GBP with amount 1.00 EUR). Mocked supported currency pairs. I.e. 2 lists for FROM, TO (supported currencies: PLN, EUR, GBP, UAH). ✅
- Has a button for initial conversion. ✅
- After conversion, AMOUNT and CONVERTED TO should be updated and conversion rate should be displayed at the bottom. ✅
- After initial conversion using the button, the following conversions should be automatic when any of the values change. ✅
- If the user updates CONVERTED TO input the AMOUNT value should be updated accordingly. ✅
- All values should be updated via a new API call to get the most recent conversion rates. ✅

## Personal requirements 
- Make widget fully responsive and as close to pixel-perfect ✅
- Use 100% Typescript ✅
- Write at least 80% coverage Unit Tests ❌
- Write as possible reusable and readble code ✅❌
- Optimize Widget performance (re-render count) using useMemo, memoize hooks❌
- Best HTML & CSS practices ✅

*For all the ❌ 's-  ran out of time tu achieve desired outcome*

