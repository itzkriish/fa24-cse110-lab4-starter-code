import { Response } from 'express';

// Function to get the budget
export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}

// Function to update the budget
export function updateBudget(res: Response, body: any, budget: { amount: number }) {
    // TO DO: Implement updateBudget function
    const updatedBudget = body.amount;
    if (!updatedBudget) {
        return res.status(400).json({message: "Error"});
    }
    budget.amount = updatedBudget;
    res.status(200).send({ amount: updatedBudget })
}
