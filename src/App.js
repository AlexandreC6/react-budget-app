import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "./components/AddBudgetModal.jsx";
import AddExpenseModal from "./components/AddExpenseModal.jsx";
import BudgetCard from "./components/BudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard.jsx";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard.jsx";
import ViewExpensesModal from "./components/ViewExpensesModal.jsx";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetContexts";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const { budgets, getBudgetExpenses } = useBudgets();
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalId, setViewExpensesModalId] = useState();
  const [addExpenseModalBugetId, setAddExpenseModalBugetId] = useState();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBugetId(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap={2} className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr)",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );

            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() => setViewExpensesModalId(budget.id)}
              />
            );
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpensesModalId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => {
          setShowAddBudgetModal(false);
        }}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBugetId}
        handleClose={() => {
          setShowAddExpenseModal(false);
        }}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalId}
        defaultBudgetId={addExpenseModalBugetId}
        handleClose={() => {
          setViewExpensesModalId();
        }}
      />
    </>
  );
}

export default App;
