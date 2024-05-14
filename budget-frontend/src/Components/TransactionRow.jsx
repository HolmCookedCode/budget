import React from 'react'

const TransactionRow = ({transaction}) => {
  return (
    <tr>
        <td><input type="checkbox" /></td>
        <td>{transaction.date}</td>
        <td>{transaction.payee}</td>
        <td>{transaction.category}</td>
        <td>{transaction.memo}</td>
        <td>{transaction.amount}</td>
        <td></td>
        <td></td>
        <td>{transaction.cleared ? "C" : ""}</td>
    </tr>
  )
}

export default TransactionRow
