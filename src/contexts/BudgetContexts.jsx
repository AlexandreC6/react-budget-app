import {createContext, useContext} from 'react'
import {v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

const BudgetContext = createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets() {
  return useContext(BudgetContext)
}


export const BudgetsProvider = ({children}) => {
  const [budgets, setBudgets] = useLocalStorage("budgets",[])
  const [expenses, setExpenses] = useLocalStorage("expenses",[])

  function getBudgetExpenses(budgetId) {
    return expenses.filter(expense => expense.budgetId === budgetId)
  }
  function addExepense({description, amount, budgetId}) {
    setExpenses(prevExpenses => {
      return [...prevExpenses, {id : uuidV4(), description, amount, budgetId}]
    })

  }
  function addBudget({name, max}) {
    setBudgets(prevBudgets => {
      if(prevBudgets.find(budget => budget.name === name)){
        return prevBudgets
      }
      return [...prevBudgets, {id : uuidV4(), name, max}]
    })
  }
  function deleteBudget({id}) {
    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id)
    })
  }
  function deleteExpense({id}) {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id)
    })
  }

  return <BudgetContext.Provider value={{
    budgets,
    expenses,
    getBudgetExpenses,
    addExepense,
    addBudget,
    deleteBudget,
    deleteExpense
  }}>
    {children}
  </BudgetContext.Provider>
}
