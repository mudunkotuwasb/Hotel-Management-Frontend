import {
  LucideIcon,
  Plus,
  Package,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

interface Action {
  label: string;
  icon: LucideIcon;
  variant?: "primary" | "secondary" | "warning" | "success";
  onClick?: () => void;
}

interface QuickActionsProps {
  onAddNewItem: () => void; // parent function to open the form
}

export default function QuickActions({ onAddNewItem }: QuickActionsProps) {
  const actions: Action[] = [
    {
      label: "Add New Item",
      icon: Plus,
      variant: "primary",
      onClick: onAddNewItem, // use the parent function
    },
    {
      label: "Bulk Restock",
      icon: Package,
      variant: "secondary",
      onClick: () => console.log("Restock"),
    },
    {
      label: "Stock Report",
      icon: TrendingUp,
      variant: "success",
      onClick: () => console.log("Report"),
    },
    {
      label: "Low Stock Alert",
      icon: AlertTriangle,
      variant: "warning",
      onClick: () => console.log("Alert"),
    },
  ];

  const getButtonClasses = (variant: Action["variant"]) => {
    switch (variant) {
      case "primary":
        return "bg-blue-600 hover:bg-blue-700 text-white";
      case "secondary":
      case "warning":
      case "success":
      default:
        return "bg-gray-200 hover:bg-gray-300 text-gray-800";
    }
  };

  return (
    <div className="card mb-6 p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={action.onClick}
              className={`${getButtonClasses(
                action.variant
              )} flex flex-col items-center justify-center w-full h-24 rounded-lg transition-colors`}
            >
              <Icon className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium text-center">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
