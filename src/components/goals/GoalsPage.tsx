
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { PlusCircle, Target, Trash2, Edit, ChevronRight, LightbulbIcon, TrendingUp, Pencil, Check, Clock } from 'lucide-react';

interface SavingGoal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  description?: string;
}

const initialGoals: SavingGoal[] = [
  {
    id: 1,
    name: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 5000,
    deadline: '2023-12-31',
    description: '6 months of living expenses'
  },
  {
    id: 2,
    name: 'Vacation',
    targetAmount: 2500,
    currentAmount: 1200,
    deadline: '2023-09-30',
    description: 'Summer trip to Europe'
  },
  {
    id: 3,
    name: 'New Laptop',
    targetAmount: 1800,
    currentAmount: 700,
    deadline: '2023-11-15',
    description: 'For work and personal use'
  }
];

const savingTips = [
  "Set aside 20% of your income for savings and investments",
  "Create a budget and track your expenses to identify saving opportunities",
  "Automate your savings by setting up automatic transfers",
  "Cut unnecessary subscriptions and memberships",
  "Use the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings",
  "Pay yourself first - transfer money to savings before spending"
];

const GoalsPage: React.FC = () => {
  const [goals, setGoals] = useState<SavingGoal[]>(initialGoals);
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    description: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [incomeInput, setIncomeInput] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState(4200);
  const [isEditingIncome, setIsEditingIncome] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing goal
      setGoals(goals.map(goal => 
        goal.id === editingId 
          ? {
              ...goal,
              name: formData.name,
              targetAmount: parseFloat(formData.targetAmount),
              currentAmount: parseFloat(formData.currentAmount),
              deadline: formData.deadline,
              description: formData.description,
            }
          : goal
      ));
      setEditingId(null);
    } else {
      // Add new goal
      const newGoal: SavingGoal = {
        id: Date.now(),
        name: formData.name,
        targetAmount: parseFloat(formData.targetAmount),
        currentAmount: parseFloat(formData.currentAmount),
        deadline: formData.deadline,
        description: formData.description,
      };
      
      setGoals([...goals, newGoal]);
    }
    
    // Reset form
    setFormData({
      name: '',
      targetAmount: '',
      currentAmount: '',
      deadline: '',
      description: '',
    });
    
    setShowForm(false);
  };

  const handleEdit = (goal: SavingGoal) => {
    setFormData({
      name: goal.name,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      deadline: goal.deadline,
      description: goal.description || '',
    });
    setEditingId(goal.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const totalSavingsTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrentSavings = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const overallProgress = Math.round((totalCurrentSavings / totalSavingsTarget) * 100) || 0;
  
  // Calculate recommended monthly savings based on income
  const recommendedSavings = Math.round(monthlyIncome * 0.2);
  
  const handleIncomeSubmit = () => {
    if (incomeInput) {
      setMonthlyIncome(parseFloat(incomeInput));
      setIncomeInput('');
    }
    setIsEditingIncome(false);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-1">Saving Goals</h1>
          <p className="text-muted-foreground">Set and track your financial goals</p>
        </div>
        
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              name: '',
              targetAmount: '',
              currentAmount: '',
              deadline: '',
              description: '',
            });
            setShowForm(!showForm);
          }}
          className="mt-4 md:mt-0 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          <PlusCircle size={16} className="mr-2" />
          Add New Goal
        </button>
      </div>
      
      {/* Monthly Income & Recommendation */}
      <Card className="variant-premium">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp size={20} className="mr-2 text-primary" />
              Monthly Income & Saving Recommendations
            </div>
            <button 
              onClick={() => setIsEditingIncome(!isEditingIncome)}
              className="p-1 rounded-full hover:bg-secondary"
            >
              <Pencil size={16} />
            </button>
          </CardTitle>
          <CardDescription>Based on your income, here's what we suggest</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="md:w-1/3">
              <p className="text-sm text-muted-foreground mb-1">Your Monthly Income</p>
              {isEditingIncome ? (
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <input
                      type="number"
                      value={incomeInput}
                      onChange={(e) => setIncomeInput(e.target.value)}
                      placeholder={monthlyIncome.toString()}
                      className="w-full rounded-md border border-input bg-background pl-7 pr-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>
                  <button 
                    onClick={handleIncomeSubmit}
                    className="p-2 rounded-full bg-primary text-primary-foreground"
                  >
                    <Check size={16} />
                  </button>
                </div>
              ) : (
                <div className="text-2xl font-bold">₹{monthlyIncome.toLocaleString()}</div>
              )}
            </div>
            
            <div className="md:w-1/3">
              <p className="text-sm text-muted-foreground mb-1">Recommended Monthly Savings</p>
              <div className="text-2xl font-bold text-saving">₹{recommendedSavings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">20% of your income</p>
            </div>
            
            <div className="md:w-1/3">
              <p className="text-sm text-muted-foreground mb-1">Annual Saving Potential</p>
              <div className="text-2xl font-bold text-primary">₹{(recommendedSavings * 12).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">If you save consistently</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Add/Edit Goal Form */}
      {showForm && (
        <Card className="variant-premium animate-fade-in">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Saving Goal' : 'Add New Saving Goal'}</CardTitle>
            <CardDescription>
              {editingId ? 'Update your goal details' : 'Create a new saving goal'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Goal Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                    placeholder="Emergency Fund, Vacation, etc."
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="targetAmount" className="text-sm font-medium">
                    Target Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <input
                      id="targetAmount"
                      name="targetAmount"
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.targetAmount}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-input bg-background pl-7 pr-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="currentAmount" className="text-sm font-medium">
                    Current Amount Saved
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <input
                      id="currentAmount"
                      name="currentAmount"
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.currentAmount}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-input bg-background pl-7 pr-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="deadline" className="text-sm font-medium">
                    Target Date
                  </label>
                  <input
                    id="deadline"
                    name="deadline"
                    type="date"
                    required
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
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
                    placeholder="What are you saving for?"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
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
                  {editingId ? 'Update Goal' : 'Add Goal'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Overall Progress */}
      <Card className="variant-premium overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 text-primary" size={20} />
            Overall Savings Progress
          </CardTitle>
          <CardDescription>Combined progress across all your goals</CardDescription>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <div className="text-4xl font-bold">₹{totalCurrentSavings.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">
                of ₹{totalSavingsTarget.toLocaleString()} target
              </div>
            </div>
            <div className="text-3xl font-bold text-primary mt-2 md:mt-0">
              {overallProgress}%
            </div>
          </div>
          
          <div className="relative pt-1 w-full mb-6">
            <div className="overflow-hidden h-3 text-xs flex rounded-full bg-secondary">
              <div
                style={{ width: `${overallProgress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500 ease-in-out"
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Saving Tips */}
      <Card className="variant-premium">
        <CardHeader>
          <CardTitle className="flex items-center">
            <LightbulbIcon className="mr-2 text-primary" size={20} />
            Smart Saving Tips
          </CardTitle>
          <CardDescription>Expert advice to help you reach your goals faster</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savingTips.map((tip, index) => (
              <div
                key={index}
                className="flex p-3 rounded-lg bg-secondary/40 hover:bg-secondary transition-colors"
              >
                <div className="mr-3 p-2 bg-primary/10 rounded-full text-primary">
                  <ChevronRight size={16} />
                </div>
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Goals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100);
          const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          
          // Calculate monthly savings needed
          const monthsLeft = daysLeft / 30;
          const amountNeeded = goal.targetAmount - goal.currentAmount;
          const monthlySavingsNeeded = monthsLeft > 0 ? Math.ceil(amountNeeded / monthsLeft) : 0;
          
          return (
            <Card key={goal.id} className="variant-premium overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{goal.name}</CardTitle>
                <CardDescription>{goal.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-0">
                <div className="mb-2">
                  <div className="text-xs text-muted-foreground mb-1">Progress</div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded-full bg-secondary">
                      <div
                        style={{ width: `${progress}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ease-in-out ${
                          progress < 25 ? 'bg-red-500' : progress < 50 ? 'bg-orange-500' : progress < 75 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">₹{goal.currentAmount.toLocaleString()}</span>
                      <span className="text-xs font-medium">{progress}%</span>
                      <span className="text-xs text-muted-foreground">₹{goal.targetAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock size={14} className="mr-1" />
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                  </div>
                  <div className="text-xs font-medium">
                    Need: <span className="text-primary">₹{monthlySavingsNeeded}/mo</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2 pt-4 mt-4 border-t">
                <button
                  onClick={() => handleEdit(goal)}
                  className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  aria-label="Edit"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(goal.id)}
                  className="p-1 rounded-full text-muted-foreground hover:text-destructive hover:bg-secondary transition-colors"
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      {goals.length === 0 && (
        <div className="text-center py-12">
          <Target size={40} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-1">No saving goals yet</h3>
          <p className="text-muted-foreground mb-4">Create your first saving goal to start tracking your progress</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            <PlusCircle size={16} className="mr-2" />
            Add a Goal
          </button>
        </div>
      )}
    </div>
  );
};

export default GoalsPage;
