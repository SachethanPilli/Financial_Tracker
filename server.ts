import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data
let expenses = [
  { id: 1, description: 'Groceries', amount: 50 },
  { id: 2, description: 'Utilities', amount: 100 },
];

// Routes
app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

app.post('/api/expenses', (req, res) => {
  const newExpense = { id: expenses.length + 1, ...req.body };
  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

app.put('/api/expenses/:id', (req, res) => {
  const { id } = req.params;
  const index = expenses.findIndex(expense => expense.id === parseInt(id));
  if (index !== -1) {
    expenses[index] = { id: parseInt(id), ...req.body };
    res.json(expenses[index]);
  } else {
    res.status(404).send('Expense not found');
  }
});

app.delete('/api/expenses/:id', (req, res) => {
  const { id } = req.params;
  expenses = expenses.filter(expense => expense.id !== parseInt(id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
