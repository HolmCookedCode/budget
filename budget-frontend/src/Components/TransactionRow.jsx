import React from 'react'

const TransactionRow = ({ transaction, selectedIds, setSelectedIds }) => {
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

  return (
    <tr onMouseDown={(e) => handleSelect(e)} style={selectedIds.includes(transaction.id) ? dynamicStyle : {}}>
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
