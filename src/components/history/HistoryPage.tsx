
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Filter, Search, ArrowDownToLine, ArrowUpFromLine, Calendar, Download, Edit, Trash2 } from 'lucide-react';

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  description?: string;
}

const initialTransactions: Transaction[] = [
  { id: 1, type: 'income', category: 'Salary', amount: 3500, date: '2023-06-01', description: 'Monthly salary' },
  { id: 2, type: 'expense', category: 'Housing', amount: 1200, date: '2023-06-01', description: 'Monthly rent' },
  { id: 3, type: 'expense', category: 'Food', amount: 350, date: '2023-06-12', description: 'Groceries' },
  { id: 4, type: 'income', category: 'Freelance', amount: 450, date: '2023-06-15', description: 'Website development' },
  { id: 5, type: 'expense', category: 'Transportation', amount: 120, date: '2023-06-15', description: 'Gas' },
  { id: 6, type: 'income', category: 'Investments', amount: 250, date: '2023-06-20', description: 'Dividend payment' },
  { id: 7, type: 'expense', category: 'Entertainment', amount: 80, date: '2023-06-18', description: 'Movies' },
];

const categories = {
  income: ['Salary', 'Freelance', 'Investments', 'Other'],
  expense: ['Housing', 'Food', 'Transportation', 'Entertainment', 'Healthcare', 'Shopping', 'Education', 'Utilities', 'Travel', 'Other']
};

const HistoryPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const handleDelete = (id: number) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const filteredTransactions = transactions
    .filter(item => filterType === 'all' || item.type === filterType)
    .filter(item => 
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalIncome = transactions
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);
    
  const totalExpenses = transactions
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);
    
  const balance = totalIncome - totalExpenses;

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight mb-1">Transaction History</h1>
        <p className="text-muted-foreground">Complete record of your financial activities</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Card */}
        <Card variant="premium" className="border-l-4 border-l-income">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base">
              <ArrowDownToLine size={18} className="mr-2 text-income" />
              Total Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-income">₹{totalIncome.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        {/* Expenses Card */}
        <Card variant="premium" className="border-l-4 border-l-expense">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base">
              <ArrowUpFromLine size={18} className="mr-2 text-expense" />
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-expense">₹{totalExpenses.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        {/* Balance Card */}
        <Card variant="premium" className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base">
              <span className="mr-2 flex items-center justify-center w-5 h-5 bg-primary/10 rounded-full text-primary">
                =
              </span>
              Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${balance >= 0 ? 'text-income' : 'text-expense'}`}>
              ₹{balance.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      <Card variant="premium">
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>Comprehensive list of all your income and expenses</CardDescription>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            
            <div className="flex space-x-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'all' | 'income' | 'expense')}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="all">All Types</option>
                <option value="income">Income Only</option>
                <option value="expense">Expenses Only</option>
              </select>
              
              <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                <Filter size={16} className="mr-2" />
                More Filters
              </button>
              
              <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                <Calendar size={16} className="mr-2" />
                Date Range
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <button className="inline-flex items-center text-sm text-primary hover:underline">
              <Download size={16} className="mr-1" />
              Export Data
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left font-medium text-muted-foreground">Type</th>
                  <th className="pb-2 text-left font-medium text-muted-foreground">Category</th>
                  <th className="pb-2 text-left font-medium text-muted-foreground">Date</th>
                  <th className="pb-2 text-left font-medium text-muted-foreground">Description</th>
                  <th className="pb-2 text-right font-medium text-muted-foreground">Amount</th>
                  <th className="pb-2 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((item) => (
                    <tr key={item.id} className="border-b last:border-b-0 hover:bg-secondary/30 transition-colors">
                      <td className="py-3">
                        <span className={`inline-flex items-center justify-center rounded-full p-1 ${
                          item.type === 'income' 
                            ? 'bg-income-light text-income' 
                            : 'bg-expense-light text-expense'
                        }`}>
                          {item.type === 'income' 
                            ? <ArrowDownToLine size={14} /> 
                            : <ArrowUpFromLine size={14} />}
                        </span>
                        <span className="ml-2 text-sm font-medium capitalize">{item.type}</span>
                      </td>
                      <td className="py-3 font-medium">{item.category}</td>
                      <td className="py-3 text-muted-foreground">
                        {new Date(item.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="py-3 text-muted-foreground truncate max-w-xs">{item.description || '-'}</td>
                      <td className={`py-3 text-right font-medium ${
                        item.type === 'income' ? 'text-income' : 'text-expense'
                      }`}>
                        {item.type === 'income' ? '+' : '-'}₹{item.amount.toLocaleString()}
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
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
                    <td colSpan={6} className="py-6 text-center text-muted-foreground">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground text-center">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryPage;
