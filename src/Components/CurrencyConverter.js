import { useState } from 'react'
import ExchangeRate from "./ExchangeRate"
import axios from 'axios'

const CurrencyConverter = () => {
    const currencies = ['BTC','ETH','USD','XRP','LTC','ADA']
    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState("BTC")
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState("BTC")
    const [amount,setAmount] = useState(1)
    const [exchangedData,setExchangedData] = useState({
        primaryCurrency: 'BTC',
        secondaryCurrency: 'BTC',
        exchangeRate: 0
    })
    const [result, setResult] = useState(0)

    console.log(exchangedData)

    const convert = () => {
        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
            headers: {
              'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
              'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            //   setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
              setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
              setExchangedData({
                primaryCurrency: chosenPrimaryCurrency,
                secondaryCurrency: chosenSecondaryCurrency,
                exchangeRate: response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']
              })
            //   setPrimaryCurrencyExchanged(chosenPrimaryCurrency)
            
          }).catch(function (error) {
              console.error(error);
          });
    }
    

    return (
      <div className = "currency-converter">
        <h2> Currency Converter </h2>
        <div className="input-box">
            <table>
                <tbody>
                <tr>
                    <td>Primary Currency:</td>
                    <td>
                        <input
                            type="number"
                            name="current-amount-1"
                            value={amount}
                            onChange = {(e) => setAmount(e.target.value)}
                        />
                    </td>
                    <td>
                        <select
                            value={chosenPrimaryCurrency}
                            name="currency-option-1"
                            className="currency-options"
                            onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                        >
                            {currencies.map((currency,_index) => <option key={_index}>{currency}</option>)}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Secondary Currency:</td>
                    <td>
                        <input
                            type="number"
                            name="current-amount-2"
                            value={result}
                            disabled = {true}
                        />
                    </td>
                    <td>
                        <select
                            value={chosenSecondaryCurrency}
                            name="currency-option-2"
                            className="currency-options"
                            onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                        >
                            {currencies.map((currency,_index) => <option key={_index}>{currency}</option>)}
                        </select>
                    </td>
                </tr>
                </tbody>
            </table>

            <button id="convert-button" onClick={convert}>Convert</button>
        </div>

        <ExchangeRate
            exchangedData ={exchangedData}
        />
      </div>
    )
  }
  
  export default CurrencyConverter