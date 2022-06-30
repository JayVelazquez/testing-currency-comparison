import fetchData from './utils/fetch-data';
import "regenerator-runtime/runtime.js";

export default class CurrencyComparison {
  constructor(salary) {
    this.salary = salary
  }
  fetchCurrentExchange = async () => {
    return await fetchData().then(res => {
      return [res.data.rates, res.status]
    })
  }
  currencyConversion = (rates, currency) => {
    return +(rates[`${currency}`]).toFixed(2)
  }
  hourlyPayUSD = (exchangeRate) => {
    const usdSalaryEqual = 1/exchangeRate * this.salary
    const weeklySalary = usdSalaryEqual / 50
    return +(weeklySalary / 40).toFixed(2)
  }
  response = (currency, exchangeRate, useData) => {
    const hourlyPayComparison = {
      salary: this.salary,
      USD: this.hourlyPayUSD(1)
    }
    hourlyPayComparison[`${currency}`] = this.hourlyPayUSD(exchangeRate)
    return useData(hourlyPayComparison, currency)
  }
}
