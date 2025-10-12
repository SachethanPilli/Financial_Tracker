
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { PlusCircle, CreditCard, BarChart3, Filter, Calendar, Search, Edit, Trash2 } from 'lucide-react';

interface ExpenseEntry {
  id: number;
  category: string;
  amount: number;
  date: string;
  description?: string;
}

const categories = [
  'Housing', 'Food', 'Transportation', 'Entertainment', 
  'Healthcare', 'Shopping', 'Education', 'Utilities', 'Travel', 'Other'
];

const initialExpenses: ExpenseEntry[] = [
  { id: 1, category: 'Housing', amount: 1200, date: '2023-06-01', description: 'Monthly rent' },
  { id: 2, category: 'Food', amount: 350, date: '2023-06-12', description: 'Groceries' },
  { id: 3, category: 'Transportation', amount: 120, date: '2023-06-15', description: 'Gas' },
  { id: 4, category: 'Entertainment', amount: 80, date: '2023-06-18', description: 'Movies' },
];

const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseEntry[]>(initialExpenses);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    description: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing expense
      setExpenses(expenses.map(expense => 
        expense.id === editingId 
          ? {
              ...expense,
              category: formData.category,
              amount: parseFloat(formData.amount),
              date: formData.date,
              description: formData.description,
            }
          : expense
      ));
      setEditingId(null);
    } else {
      // Add new expense
      const newExpense: ExpenseEntry = {
        id: Date.now(),
        category: formData.category,
        amount: parseFloat(formData.amount),
        date: formData.date,
        description: formData.description,
      };
      
      setExpenses([newExpense, ...expenses]);
    }
    
    // Reset form
    setFormData({
      category: '',
      amount: '',
      date: new Date().toISOString().slice(0, 10),
      description: '',
    });
    
    setIsFormOpen(false);
  };

  const handleEdit = (expense: ExpenseEntry) => {
    setFormData({
      category: expense.category,
      amount: expense.amount.toString(),
      date: expense.date,
      description: expense.description || '',
    });
    setEditingId(expense.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const filteredExpenses = expenses.filter(item => 
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-1">Expenses</h1>
          <p className="text-muted-foreground">Track and manage your spending</p>
        </div>
        
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              category: '',
              amount: '',
              date: new Date().toISOString().slice(0, 10),
              description: '',
            });
            setIsFormOpen(!isFormOpen);
          }}
          className="mt-4 md:mt-0 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          <PlusCircle size={16} className="mr-2" />
          Add Expense
        </button>
      </div>
      
      {/* Expense Summary */}
      <Card variant="premium" className="border-l-4 border-l-expense">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 text-expense" size={20} />
            Total Expenses
          </CardTitle>
          <CardDescription>Your combined spending</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-expense">₹{totalExpenses.toLocaleString()}</div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">{expenses.length}</span> expenses recorded
            </div>
            <button className="text-sm text-primary flex items-center">
              <BarChart3 size={16} className="mr-1" />
              View Reports
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Expense Form */}
      {isFormOpen && (
        <Card variant="premium" className="animate-fade-in">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Expense' : 'Add New Expense'}</CardTitle>
            <CardDescription>
              {editingId ? 'Update expense details' : 'Record a new expense'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="" disabled>Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="amount" className="text-sm font-medium">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-input bg-background pl-7 pr-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">
                    Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description (Optional)
                  </label>
                  <input
                    id="description"
                    name="description"
                    type="text"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                    placeholder="What was this expense for?"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingId(null);
                  }}
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
                >
                  {editingId ? 'Update Expense' : 'Add Expense'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Expense List */}
      <Card variant="premium">
        <CardHeader>
          <CardTitle>Expense History</CardTitle>
          <CardDescription>Record of all your expenses</CardDescription>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-ring">
              <Filter size={16} className="mr-2" />
              Filter
            </button>
            <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-ring">
              <Calendar size={16} className="mr-2" />
              Date Range
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left font-medium text-muted-foreground">Category</th>
                  <th className="pb-2 text-left font-medium text-muted-foreground">Amount</th>
                  <th className="pb-2 text-left font-medium text-muted-foreground">Date</th>
                  <th className="pb-2 text-left font-medium text-muted-foreground">Description</th>
                  <th className="pb-2 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((item) => (
                    <tr key={item.id} className="border-b last:border-b-0 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 font-medium">{item.category}</td>
                      <td className="py-3 text-expense font-medium">₹{item.amount.toLocaleString()}</td>
                      <td className="py-3 text-muted-foreground">{new Date(item.date).toLocaleDateString()}</td>
                      <td className="py-3 text-muted-foreground truncate max-w-xs">{item.description || '-'}</td>
                      <td className="py-3 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                            aria-label="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-muted-foreground">
                      No expenses found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpensesPage;
