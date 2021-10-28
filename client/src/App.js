import './App.css';
import { useState } from 'react'
import Axios from 'axios';

function App() {

  const [wage, setWage] = useState(0);
  const [showWage, setShowWage] = useState([]);
  const [newWage, setNewWage] = useState(0);

  const [newSpending, setNewSpending] = useState(0);
  const [showSpending, setShowSpending] = useState([]);

  const [total, setTotal] = useState(0);

  const [balance, setBalance] = useState(0);

  const postWage = () => {
    Axios.post('http://localhost:3001/mywage', {
      wage: wage
    });
  };

  const showTotalWage = () => {
    Axios.get('http://localhost:3001/getwage').then((response) => {
      setShowWage(response.data);
    })
  }

  const updateWage = (id) => {
    Axios.put('http://localhost:3001/updatewage', {
      wage: newWage,
      id: id
    }).then((response) => {
      alert('wage updated!');
    });
  }

  const postSpending = () => {
    Axios.post('http://localhost:3001/newspending', {
      spending: newSpending
    });
  };

  const showSpendings = () => {
    Axios.get('http://localhost:3001/showspendings').then((reponse) => {
      setShowSpending(reponse.data);
    })
  };

  const deleteSpending = (id) => {
    Axios.delete(`http://localhost:3001/deletespending/${id}`).then((response) => {
      setShowSpending(showSpending.filter((val) => {
        return val.id != id;
      }))
    })
  }

  const calcTotal = () => {
    var total = 0;
    showSpending.map((val) => {
      total = total + val.spending;
    })
    setTotal(total);
  }

  const showBalance = () => {
    var balance = showWage[0].wage - total;
    setBalance(balance);
  }


  return (
    <div>
      <header>
        <div className="wage">
          <label>WAGE:</label>
          <input
            type="number"
            onChange={(event) => {
              setWage(event.target.value)
            }}
          />
          <button onClick={postWage}>NEW WAGE</button>
          <button onClick={showTotalWage}>SHOW WAGE</button>
        </div>
        <div className="showWage">
          {
            showWage.map((val, key) => {
              return (
                <div key={key} className="divShowWage">
                  <h3>Your wage: ${val.wage}
                    <button className="deleteWage">x</button>
                  </h3>
                  <input
                    type="number"
                    placeholder="1800..."
                    onChange={(event) => {
                      setNewWage(event.target.value);
                    }}
                  />
                  <button className="updateWage" onClick={() => updateWage(val.id)}>UPDATE WAGE</button>
                </div>
              )
            })
          }
        </div>
      </header>
      <section>
        <div className="spendings">
          <label>SPENDINGS:</label>
          <input
            type="number"
            placeholder="200..."
            onChange={(event) => {
              setNewSpending(event.target.value);
            }}
          />
          <button onClick={postSpending}>ADD SPENDING</button>
          <button onClick={showSpendings}>SHOW SPENDINGS</button>
        </div>
        <div className="showSpendings">
          {
            showSpending.map((val, key) => {
              return (
                <div key={key} className="divShowSpendings">
                  <h3>Spending: ${val.spending}
                    <button onClick={() => deleteSpending(val.id)}>x</button>
                  </h3>
                </div>
              );
            })
          }
        </div>
        <div className="total">
          <h3>Total Spendings: ${total}</h3>
          <button onClick={() => calcTotal()}>TOTAL</button>
        </div>
        <div className='balance'>
          <h2> Your money left: ${balance}</h2>
          <button onClick={() => showBalance()}>SHOW BALANCE</button>
        </div>
      </section>
    </div>
  );

}

export default App;
