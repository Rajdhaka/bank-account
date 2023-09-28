import { useReducer } from "react";

const initialState = { balance: 0, loan: 0, isActive: false };
function reducer(state, action) {
  if (!state.isActive && action.type !== "openAccount") return state;
  switch (action.type) {
    case "openAccount":
      return { ...state, balance: action.payload, isActive: true };
    case "deposit":
      return { ...state, balance: state.balance + action.payload };
    case "withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "requestLoan":
      return {
        ...state,
        balance:
          state.loan === 0 ? state.balance + action.payload : state.balance,
        loan: state.loan === 0 ? action.payload : state.loan,
      };
    case "payLoan":
      return {
        ...state,
        balance: state.loan === 0 ? state.balance : state.balance - state.loan,
        loan: 0,
      };
    case "closeAccount":
      return {
        ...state,
        isActive: state.balance === 0 && state.loan == 0 ? false : true,
      };
    default:
      return new Error("Action Error");
  }
}

function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>UseReducer Bank Account</h1>
      <p>Balance:{balance} </p>
      <p>Loan: {loan}</p>
      <p>
        <button
          disabled={isActive}
          onClick={() => dispatch({ type: "openAccount", payload: 500 })}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          disabled={!isActive}
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          disabled={!isActive}
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          disabled={!isActive}
          onClick={() => dispatch({ type: "requestLoan", payload: 5000 })}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          disabled={!isActive}
          onClick={() => dispatch({ type: "payLoan" })}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          disabled={!isActive}
          onClick={() => dispatch({ type: "closeAccount" })}
        >
          Close account
        </button>
      </p>
    </div>
  );
}

export default App;
