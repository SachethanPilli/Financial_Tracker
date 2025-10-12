
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { PlusCircle, Banknote, BarChart3, Filter, Calendar, Search } from 'lucide-react';

interface IncomeEntry {
  id: number;
  source: string;
  amount: number;
  date: string;
  notes?: string;
}

const initialIncome: IncomeEntry[] = [
  { id: 1, source: 'Salary', amount: 3500, date: '2023-06-01', notes: 'Monthly salary' },
  { id: 2, source: 'Freelance Work', amount: 450, date: '2023-06-15', notes: 'Website development' },
  { id: 3, source: 'Investments', amount: 250, date: '2023-06-20', notes: 'Dividend payment' },
];

const IncomePage: React.FC = () => {
  const [income, setIncome] = useState<IncomeEntry[]>(initialIncome);
  const [formData, setFormData] = useState({
    source: '',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    notes: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newIncome: IncomeEntry = {
      id: Date.now(),
      source: formData.source,
      amount: parseFloat(formData.amount),
      date: formData.date,
      notes: formData.notes,
    };
    
    setIncome([newIncome, ...income]);
    
    // Reset form
    setFormData({
      source: '',
      amount: '',
      date: new Date().toISOString().slice(0, 10),
      notes: '',
    });
    
    setIsFormOpen(false);
  };

  const filteredIncome = income.filter(item => 
    item.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.notes?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-1">Income</h1>
          <p className="text-muted-foreground">Manage and track your income sources</p>
        </div>
        
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="mt-4 md:mt-0 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          <PlusCircle size={16} className="mr-2" />
          Add Income
        </button>
      </div>
      
      {/* Income Summary */}
      <Card variant="premium" className="border-l-4 border-l-income">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Banknote className="mr-2 text-income" size={20} />
            Total Income
          </CardTitle>
          <CardDescription>All your income sources combined</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-income">₹{totalIncome.toLocaleString()}</div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">{income.length}</span> income sources
            </div>
            <button className="text-sm text-primary flex items-center">
              <BarChart3 size={16} className="mr-1" />
              View Reports
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Add Income Form */}
      {isFormOpen && (
        <Card variant="premium" className="animate-fade-in">
          <CardHeader>
            <CardTitle>Add New Income</CardTitle>
            <CardDescription>Record a new income source</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="source" className="text-sm font-medium">
                    Income Source
                  </label>
                  <input
                    id="source"
                    name="source"
                    type="text"
                    required
                    value={formData.source}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                    placeholder="Salary, Freelance, etc."
                  />
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
                    Date Received
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
                  <label htmlFor="notes" className="text-sm font-medium">
                    Notes (Optional)
                  </label>
                  <input
                    id="notes"
                    name="notes"
                    type="text"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                    placeholder="Additional details..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
                >
                  Add Income
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Income List */}
      <Card variant="premium">
        <CardHeader>
          <CardTitle>Income History</CardTitle>
          <CardDescription>Record of all your income entries</CardDescription>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search income entries..."
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
                  <th className="pb-2 text-left font-medium text-muted-foreground">Source</th>
                  <th className="pb-2 text-left font-medium text-muted-foreground">Amount</th>
                  <th className="pb-2 text-left font-medium text-muted-foreground">Date</th>
                  <th className="pb-2 text-left font-medium text-muted-foreground">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredIncome.length > 0 ? (
                  filteredIncome.map((item) => (
                    <tr key={item.id} className="border-b last:border-b-0 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 font-medium">{item.source}</td>
                      <td className="py-3 text-income font-medium">₹{item.amount.toLocaleString()}</td>
                      <td className="py-3 text-muted-foreground">{new Date(item.date).toLocaleDateString()}</td>
                      <td className="py-3 text-muted-foreground truncate max-w-xs">{item.notes || '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-muted-foreground">
                      No income entries found
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

export default IncomePage;
