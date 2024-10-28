import { render, screen, fireEvent } from "@testing-library/react";
import AddExpenseForm from "./AddExpenseForm";
import { AppContext, AppProvider } from "../../context/AppContext";
import ExpenseList from "./ExpenseList";
import ExpenseTotal from "./ExpenseTotal";
import Remaining from "../Remaining";

test("creates an expense", () => {
 render(
   <AppProvider>
     <AddExpenseForm />
     <ExpenseList />
     <ExpenseTotal />
     <Remaining />
   </AppProvider>
 );

 fireEvent.change(screen.getByLabelText(/Name/), { target: { value: "Test" } });
 fireEvent.change(screen.getByLabelText(/Cost/), { target: { value: "100" } });
 fireEvent.click(screen.getByText(/Save/));

 expect(screen.getByText("Test")).toBeInTheDocument();
 expect(screen.getByText("$100")).toBeInTheDocument();
 expect(screen.getByText(/Spent so far:/)).toHaveTextContent("Spent so far: $100");
 expect(screen.getByText(/Remaining:/)).toHaveTextContent("Remaining: $900");
});
