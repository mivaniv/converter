import React, {useEffect, useState} from 'react';
import Area from "./area";
import classes from "./all.module.css";

const STORE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=7427faa3e80235ea00f892a11a87f5c6'

function Converter() {
    const [currencyOption, setCurrencyOption] = useState([]);
    const [baseCurrency, setBaseCurrency] = useState()
    const [currency, setCurrency] = useState()
    const [exchangeRate, setExchangeRate] = useState()
    const [current, setCurrent] = useState(1)
    const [currentDefault, setCurrentDefault] = useState(true)

    let amount, fromAmount
    if (currentDefault) {
        fromAmount = current;
        amount = current * exchangeRate;
    } else {
        amount = current;
        fromAmount = current / exchangeRate;
    }

    function handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    useEffect(() => {
        fetch(STORE_URL)
            .then(res => res.json())
            .then(data => {
                const firstCurrency = Object.keys(data.rates)[149]
                setCurrencyOption([data.base, ...Object.keys(data.rates)])
                setBaseCurrency(data.base)
                setCurrency(firstCurrency)
                setExchangeRate(data.rates[firstCurrency])
            })
    }, [])
    useEffect(() => {
        if (baseCurrency != null && currency != null) {
            fetch(STORE_URL)
                .then(handleErrors)
                .then(res => res.json())
                .then(data => setExchangeRate(data.rates[currency]))
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [baseCurrency, currency]);

    function handleChange(e) {
        setCurrent(e.target.value);
        setCurrentDefault(true);
    }

    function handleFromChange(e) {
        setCurrent(e.target.value);
        setCurrentDefault(false);
    }

    return (
        <div>
            <h1>Калькулятор конвертування валют</h1>
            <div className={classes.all}>
                <Area currencyOption={currencyOption}
                      selectCurrency={baseCurrency}
                      onChangeCurrency={e => setBaseCurrency(e.target.value)}
                      onChangeAmount={handleChange}
                      current={fromAmount}

                />
                <p className={classes.equally}>=</p>
                <Area currencyOption={currencyOption}
                      selectCurrency={currency}
                      onChangeCurrency={e => setCurrency(e.target.value)}
                      onChangeAmount={handleFromChange}
                      current={amount}
                />
            </div>
        </div>
    );
}

export default Converter;