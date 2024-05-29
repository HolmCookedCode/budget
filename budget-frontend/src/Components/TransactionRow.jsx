import React, { useEffect, useState } from 'react'

const TransactionRow = ({ transaction, selectedIds, setSelectedIds, transactions, setContextConfig, editProp, dbTransaction, setDbTransaction }) => {
  const [balance, setBalance] = useState(0);
  const [editing, setEditing] = useState(editProp);

  // style when a row is selected
  const dynamicStyle = {
    "backgroundColor": "yellow"
  };

  const handleContextMenu = (e) => {
    e.preventDefault();

    setContextConfig({
            show: true,
            x: e.pageX,
            y: e.pageY
        });
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

  const handleDateChange = (e) => {
    setDbTransaction({...dbTransaction, date: e.target.value});
  };

  const handlePayeeChange = (e) => {
    setDbTransaction({...dbTransaction, payee: e.target.value});
  }

  const handleCategoryChange = (e) => {
    setDbTransaction({...dbTransaction, category: e.target.value});
  }

  const handleMemoChange = (e) => {
    setDbTransaction({...dbTransaction, memo: e.target.value});
  }

  const handleNegativeAmountChange = (e) => {
    const dbAmount = e.target.value * -1;
    // TODO logic for setting inflow field to nothing
    setDbTransaction({...dbTransaction, amount: dbAmount});
  }

  const handlePositiveAmountChange = (e) => {
    // TODO logic for setting inflow field to nothing
    setDbTransaction({...dbTransaction, amount: e.target.value});
  }

  const handleClearedChange = (e) => {
    setDbTransaction({...dbTransaction, cleared: e.target.value});
  }

  return (
      <>
        {editing ? 
        // view when editing
          <tr onMouseDown={(e) => handleSelect(e)} style={selectedIds.includes(transaction.id) ? dynamicStyle : {}} onContextMenu={(e) => handleContextMenu(e)} >
            <td><input type="checkbox" /></td>
            <td><input type="date" onChange={(e) => handleDateChange(e)} /></td>
            <td><input type="text" onChange={(e) => handlePayeeChange(e)} /></td>
            <td><input type="text" onChange={(e) => handleCategoryChange(e)} /></td>
            <td><input type="text" onChange={(e) => handleMemoChange(e)} /></td>
            <td><input type="number" onChange={(e) => handleNegativeAmountChange(e)} /></td>
            <td><input type="number" onChange={(e) => handlePositiveAmountChange(e)} /></td>
            <td>Balance</td>
            <td><input type="checkbox" onChange={(e) => handleClearedChange(e)} /></td>
          </tr>
        : 
        // standard view
          <tr onMouseDown={(e) => handleSelect(e)} style={selectedIds.includes(transaction.id) ? dynamicStyle : {}} onContextMenu={(e) => handleContextMenu(e)} >
            <td><input type="checkbox" /></td>
            <td>{transaction.date}</td>
            <td>{transaction.payee}</td>
            <td>{transaction.category}</td>
            <td>{transaction.memo}</td>
            <td>{transaction.amount < 0 && `$${Math.abs(transaction.amount).toFixed(2)}`}</td>
            <td>{transaction.amount > 0 && `$${transaction.amount.toFixed(2)}`}</td>
            <td>{`$${balance.toFixed(2)}`}</td>
            <td>{transaction.cleared ? "C" : ""}</td>
          </tr>
        }
      </>
  )
}

export default TransactionRow
