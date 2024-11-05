import { render, screen, fireEvent } from "@testing-library/react";
import AddExpenseForm from "../Expense/AddExpenseForm";
import { AppContext, AppProvider } from "../../context/AppContext";
import ExpenseList from "../Expense/ExpenseList";
import ExpenseTotal from "../Expense/ExpenseTotal";
import Remaining from "../Remaining";

test("verifies budget balance", () => {
 render(
   <AppProvider>
     <AddExpenseForm />
     <ExpenseList />
     <ExpenseTotal />
     <Remaining />
   </AppProvider>
 )

 fireEvent.change(screen.getByLabelText(/Name/), { target: { value: "Test 1" } });
 fireEvent.change(screen.getByLabelText(/Cost/), { target: { value: "100" } });
 fireEvent.click(screen.getByText(/Save/));
 expect(screen.getByText(/Spent so far:/)).toHaveTextContent("Spent so far: $100");
 expect(screen.getByText(/Remaining:/)).toHaveTextContent("Remaining: $900");

 fireEvent.change(screen.getByLabelText(/Name/), { target: { value: "Test 2" } });
 fireEvent.change(screen.getByLabelText(/Cost/), { target: { value: "500" } });
 fireEvent.click(screen.getByText(/Save/));
 expect(screen.getByText(/Spent so far:/)).toHaveTextContent("Spent so far: $600");
 expect(screen.getByText(/Remaining:/)).toHaveTextContent("Remaining: $400");

 fireEvent.change(screen.getByLabelText(/Name/), { target: { value: "Test 3" } });
 fireEvent.change(screen.getByLabelText(/Cost/), { target: { value: "200" } });
 fireEvent.click(screen.getByText(/Save/));
 expect(screen.getByText(/Spent so far:/)).toHaveTextContent("Spent so far: $800");
 expect(screen.getByText(/Remaining:/)).toHaveTextContent("Remaining: $200");

 fireEvent.click(screen.getAllByText("x")[0]);
 expect(screen.getByText(/Spent so far:/)).toHaveTextContent("Spent so far: $700");
 expect(screen.getByText(/Remaining:/)).toHaveTextContent("Remaining: $300");
});
