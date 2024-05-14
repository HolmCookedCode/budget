import React, { useEffect, useState } from 'react'
import TransactionRow from '../Components/TransactionRow'
import style from "./Transactions.module.css"
import axios from 'axios';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        axios.get("https://localhost:7029/api/transaction")
            .then(response => {
                const data = response.data;
                data.sort((a, b) => {
                    return new Date(a.date) - new Date(b.date);
                });
                setTransactions(data);
            });
    }, []);

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
                    return <TransactionRow transactions={transactions} transaction={transaction} key={transaction.id} selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
                })} 
            </tbody>
        </table>
        <div id={style.addTransBtnContainer}>
            <button>Add Transaction</button>
        </div>
    </>
  )
}

export default Transactions
