import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Filter, Calendar, Download, PieChart as PieChartIcon, BarChart3, TrendingUp, LineChart as LineChartIcon, RefreshCw } from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  LineChart, 
  Line, 
  CartesianGrid,
  Legend 
} from 'recharts';

// Sample data
const monthlyData = [
  { name: 'Jan', income: 3200, expenses: 2400, savings: 800 },
  { name: 'Feb', income: 3500, expenses: 2800, savings: 700 },
  { name: 'Mar', income: 3700, expenses: 2900, savings: 800 },
  { name: 'Apr', income: 3000, expenses: 2300, savings: 700 },
  { name: 'May', income: 3900, expenses: 2800, savings: 1100 },
  { name: 'Jun', income: 4100, expenses: 3100, savings: 1000 },
];

const expensesByCategory = [
  { name: 'Housing', value: 1200, color: '#3b82f6' },
  { name: 'Food', value: 600, color: '#10b981' },
  { name: 'Transport', value: 300, color: '#f59e0b' },
  { name: 'Entertainment', value: 250, color: '#8b5cf6' },
  { name: 'Healthcare', value: 150, color: '#ec4899' },
  { name: 'Utilities', value: 180, color: '#6366f1' },
  { name: 'Others', value: 220, color: '#a855f7' },
];

const incomeBySource = [
  { name: 'Salary', value: 3200, color: '#10b981' },
  { name: 'Freelance', value: 800, color: '#3b82f6' },
  { name: 'Investments', value: 500, color: '#f59e0b' },
  { name: 'Other', value: 150, color: '#a855f7' },
];

const ReportsPage: React.FC = () => {
  const [periodFilter, setPeriodFilter] = useState('month');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  
  // Calculate totals
  const totalIncome = monthlyData.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = monthlyData.reduce((sum, item) => sum + item.expenses, 0);
  const totalSavings = monthlyData.reduce((sum, item) => sum + item.savings, 0);
  const savingsRate = Math.round((totalSavings / totalIncome) * 100);
  
  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-1">Reports</h1>
          <p className="text-muted-foreground">Visualize and analyze your financial data</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <div className="flex items-center space-x-2 bg-secondary rounded-lg p-1">
            {['month', 'quarter', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setPeriodFilter(period)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  periodFilter === period
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleGenerateReport}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
            disabled={isGeneratingReport}
          >
            {isGeneratingReport ? (
              <>
                <RefreshCw size={16} className="mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download size={16} className="mr-2" />
                Generate Report
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Card */}
        <Card variant="premium">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base">
              <TrendingUp size={18} className="mr-2 text-income" />
              Total Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-income">₹{totalIncome.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        {/* Expenses Card */}
        <Card variant="premium">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base">
              <BarChart3 size={18} className="mr-2 text-expense" />
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-expense">₹{totalExpenses.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        {/* Savings Rate Card */}
        <Card variant="premium">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base">
              <LineChartIcon size={18} className="mr-2 text-saving" />
              Savings Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-saving">{savingsRate}%</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses vs Savings */}
        <Card variant="premium">
          <CardHeader>
            <CardTitle>Income, Expenses & Savings</CardTitle>
            <CardDescription>Monthly comparison over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
                  <Legend />
                  <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" name="Expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="savings" name="Savings" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Expense Distribution */}
        <Card variant="premium">
          <CardHeader>
            <CardTitle>Expense Distribution</CardTitle>
            <CardDescription>Breakdown by category</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expensesByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`₹${value}`, 'Amount']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Second Row of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Sources */}
        <Card variant="premium">
          <CardHeader>
            <CardTitle>Income Sources</CardTitle>
            <CardDescription>Where your money comes from</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incomeBySource}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {incomeBySource.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`₹${value}`, 'Amount']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
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
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="savings"
                    name="Savings"
                    stroke="#60a5fa"
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#60a5fa' }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="income"
                    name="Income"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#10b981' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;

