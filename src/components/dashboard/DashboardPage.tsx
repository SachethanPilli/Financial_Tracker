
import React, { useState } from 'react';
import { 
  BarChart3, 
  DollarSign, 
  TrendingDown, 
  TrendingUp, 
  Wallet,
  ChevronUp,
  CreditCard,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from 'recharts';

// Sample data
const pieData = [
  { name: 'Housing', value: 1200, color: '#3b82f6' },
  { name: 'Food', value: 600, color: '#10b981' },
  { name: 'Transport', value: 300, color: '#f59e0b' },
  { name: 'Entertainment', value: 250, color: '#8b5cf6' },
  { name: 'Others', value: 350, color: '#ec4899' },
];

const barData = [
  { name: 'Jan', income: 3200, expenses: 2400 },
  { name: 'Feb', income: 3500, expenses: 2800 },
  { name: 'Mar', income: 3700, expenses: 2900 },
  { name: 'Apr', income: 3000, expenses: 2300 },
  { name: 'May', income: 3900, expenses: 2800 },
  { name: 'Jun', income: 4100, expenses: 3100 },
];

const lineData = [
  { name: 'Jan', savings: 800 },
  { name: 'Feb', savings: 700 },
  { name: 'Mar', savings: 800 },
  { name: 'Apr', savings: 700 },
  { name: 'May', savings: 1100 },
  { name: 'Jun', savings: 1000 },
];

const recentTransactions = [
  { id: 1, type: 'expense', category: 'Groceries', amount: 84.97, date: '2023-06-12' },
  { id: 2, type: 'income', category: 'Salary', amount: 2400, date: '2023-06-10' },
  { id: 3, type: 'expense', category: 'Utilities', amount: 120, date: '2023-06-08' },
  { id: 4, type: 'expense', category: 'Dining', amount: 45.8, date: '2023-06-07' },
];

const DashboardPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  
  const totalIncome = 4200;
  const totalExpenses = 2700;
  const savings = totalIncome - totalExpenses;
  const savingsGoal = 10000;
  const savingsProgress = (savings / savingsGoal) * 100;
  
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your financial overview.</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-secondary rounded-lg p-1">
          {['week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                selectedPeriod === period
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Card */}
        <Card variant="premium" className="border-l-4 border-l-income">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Total Income</span>
              <span className="p-1.5 rounded-full bg-income-light text-income">
                <TrendingUp size={18} />
              </span>
            </CardTitle>
            <CardDescription>Current {selectedPeriod}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{totalIncome.toLocaleString()}</div>
            <div className="mt-2 flex items-center text-xs text-income">
              <ChevronUp size={16} className="mr-1" />
              <span>8.2% from last {selectedPeriod}</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Expenses Card */}
        <Card variant="premium" className="border-l-4 border-l-expense">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Total Expenses</span>
              <span className="p-1.5 rounded-full bg-expense-light text-expense">
                <TrendingDown size={18} />
              </span>
            </CardTitle>
            <CardDescription>Current {selectedPeriod}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{totalExpenses.toLocaleString()}</div>
            <div className="mt-2 flex items-center text-xs text-muted-foreground">
              <TrendingDown size={16} className="mr-1" />
              <span>3.1% from last {selectedPeriod}</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Savings Card */}
        <Card variant="premium" className="border-l-4 border-l-saving">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Total Savings</span>
              <span className="p-1.5 rounded-full bg-saving-light text-saving">
                <Wallet size={18} />
              </span>
            </CardTitle>
            <CardDescription>Current {selectedPeriod}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{savings.toLocaleString()}</div>
            <div className="relative pt-2">
              <div className="overflow-hidden h-2 text-xs flex rounded-full bg-secondary">
                <div
                  style={{ width: `${savingsProgress}%` }}
                  className="animate-pulse-slow shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-saving"
                ></div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                <span>₹{savings.toLocaleString()}</span>
                <span className="mx-1">/</span>
                <span>₹{savingsGoal.toLocaleString()} Goal</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Chart */}
        <Card variant="premium">
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <CardDescription>Comparison over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} width={40} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }} 
                    formatter={(value) => [`₹${value}`, '']}
                  />
                  <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Expense Distribution Chart */}
        <Card variant="premium">
          <CardHeader>
            <CardTitle>Expense Distribution</CardTitle>
            <CardDescription>Where your money goes</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center justify-center">
            <div className="h-64 w-full max-w-xs">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }} 
                    formatter={(value) => [`₹${value}`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 md:mt-0">
              {pieData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                  <div className="text-xs">
                    <div className="font-medium">{entry.name}</div>
                    <div className="text-muted-foreground">₹{entry.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Third Row - Savings Trend and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Savings Trend */}
        <Card variant="premium">
          <CardHeader>
            <CardTitle>Savings Trend</CardTitle>
            <CardDescription>Your progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={lineData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} width={40} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }} 
                    formatter={(value) => [`₹${value}`, '']}
                  />
                  <Line
                    type="monotone"
                    dataKey="savings"
                    stroke="#60a5fa"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Transactions */}
        <Card variant="premium">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest financial activities</CardDescription>
            </div>
            <button className="text-sm text-primary font-medium flex items-center hover:underline">
              View All <ArrowRight size={14} className="ml-1" />
            </button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      transaction.type === 'income' ? 'bg-income-light text-income' : 'bg-expense-light text-expense'
                    }`}>
                      {transaction.type === 'income' ? <DollarSign size={16} /> : <CreditCard size={16} />}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.category}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    transaction.type === 'income' ? 'text-income' : 'text-expense'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
