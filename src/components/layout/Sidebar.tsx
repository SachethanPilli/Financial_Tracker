
import React from 'react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  ArrowDownToLine,
  ArrowUpFromLine,
  History,
  PieChart,
  Target,
  Settings,
  HelpCircle,
  LucideIcon
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, to, isActive }) => (
  <Link 
    to={to}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
      isActive 
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
    )}
  >
    <Icon size={18} className={cn(isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/70")} />
    <span>{label}</span>
  </Link>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: ArrowDownToLine, label: 'Income', path: '/income' },
    { icon: ArrowUpFromLine, label: 'Expenses', path: '/expenses' },
    { icon: History, label: 'History', path: '/history' },
    { icon: PieChart, label: 'Reports', path: '/reports' },
    { icon: Target, label: 'Saving Goals', path: '/goals' },
  ];
  
  const bottomItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help', path: '/help' },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 bottom-0 bg-sidebar z-40 border-r border-sidebar-border transition-all duration-300 ease-in-out pt-16",
        isOpen ? "w-64" : "w-0 -translate-x-full md:translate-x-0 md:w-20"
      )}
    >
      <div className="h-full flex flex-col justify-between overflow-y-auto custom-scrollbar">
        <nav className="p-3 flex-1">
          <div className="mb-4 px-4">
            <p className={cn(
              "text-xs uppercase tracking-wider text-sidebar-foreground/50 transition-all duration-300",
              !isOpen && "opacity-0 md:opacity-100 md:text-center md:px-0"
            )}>
              Menu
            </p>
          </div>
          
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <NavItem 
                key={item.path}
                icon={item.icon}
                label={item.label}
                to={item.path}
                isActive={
                  currentPath === item.path || 
                  (currentPath === '/' && item.path === '/')
                }
              />
            ))}
          </div>
        </nav>
        
        <div className="p-3 border-t border-sidebar-border/30">
          <div className="space-y-1">
            {bottomItems.map((item) => (
              <NavItem 
                key={item.path}
                icon={item.icon}
                label={item.label}
                to={item.path}
                isActive={currentPath === item.path}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
