import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [newBudget, setNewBudget] = useState(budget.toString());

  useEffect(() => {
    const loadBudget = async () => {
      const fetchedBudget = await fetchBudget();
      setBudget(fetchedBudget)
    };
    loadBudget();
  }, [setBudget]);

  const handleEdit = (newBudget: string) => {
    setNewBudget(newBudget);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   // updateBudget(Number(newBudget))
    setBudget(Number(newBudget))
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>Budget: ${budget}</div>
      <form onSubmit={(event) => onSubmit(event)}>
      <div className="col-sm">
          <label htmlFor="budget">Edit</label>
          <input
            required
            type="number"
            className="form-control"
            id="budget"
            value={newBudget}
            // HINT: onChange={}
            onChange={(e) => handleEdit(e.target.value)}
          ></input>
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
        </form>
    </div>
  );
};

export default Budget;
