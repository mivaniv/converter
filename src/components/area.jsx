import React from 'react';
import classes from "./all.module.css";

export default function Area(props) {
    const {
        currencyOption,
        selectCurrency,
        onChangeCurrency,
        onChangeAmount,
        current
    } = props
    return (
        <div className={classes.main} >
            <input type="number" value={current} onChange={onChangeAmount} className={classes.input}/>
            <select value={selectCurrency} onChange={onChangeCurrency} className={classes.select}>
                {currencyOption.map(option => (<option key={option} value={option}>
                    {option}
                </option>))}
            </select>
        </div>
    );
}

