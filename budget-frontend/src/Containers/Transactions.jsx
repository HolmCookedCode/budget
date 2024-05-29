import React, { useEffect, useState } from 'react'
import TransactionRow from '../Components/TransactionRow'
import style from "./Transactions.module.css"
import axios from 'axios';

const Transactions = ({ setContextConfig }) => {
    const [transactions, setTransactions] = useState([]);

    // ids of transactions that are currently selected
    const [selectedIds, setSelectedIds] = useState([]);

    // adding transaction is a state of if you are currently adding a transaction or not
    const [addingTransaction, setAddingTransaction] = useState(false);

    // the db transaction is the transaction object that should be saved to the database
    const [dbTransaction, setDbTransaction] = useState({ date: new Date(), payee: "", category: "", memo: "", amount: 0, cleared: false });


    // fetch data
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

    const handleAdd = () => {
        setAddingTransaction(true);
    };

    const handleSave = (newTransaction) => {
        // TODO api logic for saving a transaction
        setAddingTransaction(false);
    };

  return (
    <>

        <table id={style.ttable} cellSpacing={0} >
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
                    return (
                        <TransactionRow 
                            transactions={transactions} 
                            transaction={transaction} 
                            key={transaction.id} 
                            selectedIds={selectedIds} 
                            setSelectedIds={setSelectedIds} 
                            setContextConfig={setContextConfig} 
                            editProp={false}
                            dbTransaction={dbTransaction} 
                            setDbTransaction={setDbTransaction}
                        />
                    )
                })} 
                {addingTransaction && 
                    <TransactionRow 
                        transactions={transactions} 
                        transaction={dbTransaction} 
                        // id is 1 more than last. Won't be saved, but helps clean things up
                        key={transactions[transactions.length - 1].id + 1} 
                        selectedIds={selectedIds} 
                        setSelectedIds={setSelectedIds} 
                        setContextConfig={setContextConfig} 
                        editProp={true} 
                        dbTransaction={dbTransaction} 
                        setDbTransaction={setDbTransaction}
                    />
                }
            </tbody>
        </table>
        {addingTransaction ? 
            <div id={style.addTransBtnContainer}>
                <button onClick={handleSave}>Save Transaction</button>
            </div>
        : 
            <div id={style.addTransBtnContainer}>
                <button onClick={handleAdd}>Add Transaction</button>
            </div>
        }

    </>
  )
}

export default Transactions
