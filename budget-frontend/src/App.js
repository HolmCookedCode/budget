import './App.css';
import Transactions from './Containers/Transactions';

function App() {
  const transactions = [
    {
      "id" : 1,
      "date" : "2024-05-10",
      "payee" : "Kroger",
      "category" : "Groceries",
      "memo" : "The good stuff",
      "amount" : -83.27,
      "cleared" : true
    },
    {
      "id" : 2,
      "date" : "2024-05-11",
      "payee" : "Exxon",
      "category" : "Fuel",
      "memo" : "",
      "amount" : -28.86,
      "cleared" : true
    },
    {
      "id" : 3,
      "date" : "2024-05-14",
      "payee" : "7-Eleven",
      "category" : "Eating Out",
      "memo" : "Breakfast sandwich",
      "amount" : -3.89,
      "cleared" : false
    },
  ];

  return (
    <div className="App">
      <Transactions transactions={transactions} />
    </div>
  );
}

export default App;
