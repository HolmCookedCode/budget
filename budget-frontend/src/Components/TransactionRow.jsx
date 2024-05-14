import React, { useEffect, useState } from 'react'

const TransactionRow = ({ transaction, selectedIds, setSelectedIds, transactions }) => {
  const [balance, setBalance] = useState(0);

  // style when a row is selected
  const dynamicStyle = {
    "backgroundColor": "yellow"
  };

  const handleSelect = (e) => {
      // if you control click something
      if (e.ctrlKey) {
        // if it isn't already in that selection
        if (!selectedIds.includes(transaction.id)) {
          // it should add it to the current selection 
          setSelectedIds([...selectedIds, transaction.id]);
        }
        else {
          // it should remove it from the current selection if it is already selected
          const index = selectedIds.indexOf(transaction.id);
          selectedIds.splice(index, 1);
          setSelectedIds([...selectedIds]);
        }
      }
    // if you left click something 
    else if (e.button === 0) {
      // it should select only that row
      setSelectedIds([transaction.id]);
    }

    // if you right click something
    else if (e.button === 2) {
      // if it isn't in the selection
      if (!selectedIds.includes(transaction.id)) {
        // it should select only that row 
        setSelectedIds([transaction.id]);
      }
      // the selection should not change if it is already selected
    }
  };

  // calculate balance
  useEffect(() => {
    const index = transactions.indexOf(transaction);
    let transactionSlice = transactions;
    transactionSlice = transactionSlice.slice(0, index + 1);

    let total = 0;
    transactionSlice.forEach((t) => {
      total = total + t.amount;
    });

    setBalance(total);
  }, [transaction, transactions]);

  return (
    <tr onMouseDown={(e) => handleSelect(e)} style={selectedIds.includes(transaction.id) ? dynamicStyle : {}}>
        <td><input type="checkbox" /></td>
        <td>{transaction.date}</td>
        <td>{transaction.payee}</td>
        <td>{transaction.category}</td>
        <td>{transaction.memo}</td>
        <td>{transaction.amount < 0 && `$${transaction.amount.toFixed(2)}`}</td>
        <td>{transaction.amount > 0 && `$${transaction.amount.toFixed(2)}`}</td>
        <td>{`$${balance.toFixed(2)}`}</td>
        <td>{transaction.cleared ? "C" : ""}</td>
    </tr>
  )
}

export default TransactionRow
