import React from 'react'
import TransactionRow from '../Components/TransactionRow'
import style from "./Transactions.module.css"

const Transactions = ({transactions}) => {
  return (
    <>
        <table id={style.ttable} cellSpacing={0}>
            <thead>
                <tr>
                    <th><input type="checkbox" /></th>
                    <th>Date</th>
                    <th>Payee</th>
                    <th>Category</th>
                    <th>Memo</th>
                    <th>Outflow</th>
                    <th>Inflow</th>
                    <th>Balance</th>
                    <th>C</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map(transaction => {
                    return <TransactionRow transaction={transaction} key={transaction.id} />
                })} 
            </tbody>
        </table>

    </>
  )
}

export default Transactions
