import BigNumber from 'bignumber.js'

export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
  const displayBalance = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals))
  return displayBalance.toNumber()
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}

export const getNumberSuffix = (_value, decimals = 3) => {
  let value = _value;

  if (typeof _value !== 'number') {
    value = (new BigNumber(_value)).toNumber();
  }

  switch (true) {
      case value === Infinity:
          return 'Infinity';
      case value > 1000000000:
          return `${(value / 1000000000).toFixed(2)}B `;
      case value > 1000000:
          return `${(value / 1000000).toFixed(2)}M `;
      case value > 10000:
          return `${(value / 1000).toFixed(decimals)}k `;

      default:
          return value.toFixed(decimals);
  }
};