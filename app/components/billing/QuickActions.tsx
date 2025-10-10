import { LucideIcon, Plus, FileText, CreditCard, Download } from "lucide-react";

interface Action {
  label: string;
  icon: LucideIcon;
  variant?: "primary" | "secondary" | "warning" | "success";
  onClick?: () => void;
}

/*interface QuickActionsProps {
  onCreateNewBill: () => void; // parent function to open the form
}*/

//export default function QuickActions({ onCreateNewBill }: QuickActionsProps) {
export default function QuickActions() {
  const actions: Action[] = [
    {
      label: "Create Bill",
      icon: Plus,
      variant: "primary",
      onClick: () => console.log("Create Bill"),
    },
    {
      label: "Generate Report",
      icon: FileText,
      variant: "secondary",
      onClick: () => console.log("Report"),
    },
    {
      label: "Export Bills",
      icon: Download,
      variant: "success",
      onClick: () => console.log("Export Bill"),
    },
    {
      label: "Payment Summary",
      icon: CreditCard,
      variant: "warning",
      onClick: () => console.log("Payment"),
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
