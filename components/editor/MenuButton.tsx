import { Button } from "../ui/button";

interface MenuButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
  children: React.ReactNode;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  onClick,
  disabled,
  isActive,
  children,
}) => (
  <Button
    variant={"outline"}
    onClick={onClick}
    disabled={disabled}
    className={`px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed ${
      isActive ? "bg-purple-100 text-purple-800" : "bg-gray-100"
    }`}
  >
    {children}
  </Button>
);

export default MenuButton;
