import { useState } from 'react';
import {createContext, useContext} from 'react'
import {v4 as uuidV4 } from 'uuid';

const BudgetContext = createContext();

export function useBudgets() {
  return useContext(BudgetContext)
}


export const BudgetsProvider = ({children}) => {
  const [budgets, setBudgets] = useState([])
  const [expenses, setExpenses] = useState([])

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
