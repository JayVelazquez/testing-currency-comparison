import CurrencyComparison from '../currency_comparison';

import fetchData from '../utils/fetch-data';
jest.mock('../utils/fetch-data');

const testSalary = new CurrencyComparison(50000)
    
//Testing testSalary.currencyConversion
test('Get conversion rate for currency', () => {
  //arrange
  const currencyCode1 = 'CAD'
  const expectedValue1 = 1.21
  const currencyCode2 = 'EUR'
  const expectedValue2 = .82
  const rates = {
    "MXN": 19.9021,
    "CAD": 1.2121, 
    "EUR": .8235  
  }
 
  //act
  const actualValue1 = testSalary.currencyConversion(rates, currencyCode1);
  const actualValue2 = testSalary.currencyConversion(rates, currencyCode2);
 
  //assert
  expect(actualValue1).toBe(expectedValue1);
  expect(actualValue2).toBe(expectedValue2);
})

//Testing testSalary.hourlyPayUSD
test('Convert USD salary to hourly CAD pay', () => {
  //arrange
  const exchangeRate = 1.21
  const expectedValue = 20.66
  //act
  const actualValue = testSalary.hourlyPayUSD(exchangeRate)
  //assertions
  expect(actualValue).toBe(expectedValue)
})

//Testing testSalary.response
test("respond with different salaries based on currency", (done) => {
  //arrange
  const currency = "CAD"
  const exchangeRate = 1.21
  const expectedValue = {
    USD: 25,
    CAD: 20.66,
    salary: 50000,
  }

  //act
  testSalary.response(currency, exchangeRate, (result) => {
    //assertions
    try {
      expect(result).toEqual(expectedValue);
      done();
    } catch(error) {
      done(error);
    }
  });
});

test("Receives current currency exchange data", async ()=> {
  //arrange
  const expectedValue = 'Mock';
  //act
  const actualValue = await testSalary.fetchCurrentExchange();

  //assertions
  expect(actualValue).toContain(expectedValue);
})

test("Receives current currency exchange data", async ()=> {
  //arrange
  const mockResponse = {
    status : "Mock",
    data: {
      "base": "USD",
      "rates": {
        "CCD": 50,
      },
      "date": "2022-05-17"
    }
  }
  const expectedValue = [{"CCD": 50}, "Mock"];

  //Mocking the resolved value of fetchData
  fetchData.mockResolvedValueOnce(mockResponse);
  
  //act
  const actualValue = await testSalary.fetchCurrentExchange(); 
  
  //assertions
  expect(actualValue).toEqual(expectedValue)
})
