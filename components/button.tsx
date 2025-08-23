import { TouchableOpacity } from "react-native";

type variant = "primary" | "secondary" | "outline" | "ghost";

interface Props {
    children: React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
    className?: string;
    variant?: variant;
}

const variantStyles: Record<variant, string> = {
    primary : "bg-white text-black",
    secondary : "bg-neutral-800 text-zinc-100",
    outline : "border border-gray-300 text-white bg-transparent",
    ghost : "bg-transparent text-white"
}

export const Button = ({ children, onPress, disabled, className, variant }: Props) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        className={`${variantStyles[variant || "primary"]} h-12 rounded-xl flex items-center justify-center px-2 py-1 ${className}`}
        activeOpacity={0.8}
    >
        {children}
    </TouchableOpacity>
  )
}
