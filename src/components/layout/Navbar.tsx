
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Bell, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!isDarkMode).toString());
  };

  // Check for dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
    
    // Add scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-background/70 border-b",
        isScrolled ? "py-3 shadow-sm" : "py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? (
              <X size={20} className="transition-all duration-300" />
            ) : (
              <Menu size={20} className="transition-all duration-300" />
            )}
          </button>
          
          <div className="font-semibold text-lg md:text-xl tracking-tight ml-2">
            <span className="text-primary">Finance</span>
            <span>Tracker</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center relative rounded-full bg-secondary border border-border px-3 py-1.5 w-72">
          <Search size={16} className="absolute left-3 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none pl-7 w-full text-sm focus:ring-0"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun size={18} className="transition-all duration-300" />
            ) : (
              <Moon size={18} className="transition-all duration-300" />
            )}
          </button>
          
          <button className="relative p-2 rounded-full hover:bg-secondary transition-colors">
            <Bell size={18} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full"></span>
          </button>
          
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            JD
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
