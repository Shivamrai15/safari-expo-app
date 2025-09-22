import { View } from 'react-native';
import { cn } from '@/lib/utils';

interface ProgressProps {
    value: number; // 0-100
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'success' | 'warning' | 'danger';
    showBackground?: boolean;
}

export const Progress = ({ 
    value = 0, 
    className,
    size = 'md',
    variant = 'default',
    showBackground = true 
}: ProgressProps) => {
    
    // Clamp value between 0 and 100
    const clampedValue = Math.min(Math.max(value, 0), 100);
    
    // Size variants
    const sizeClasses = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3'
    };
    
    // Color variants for progress bar
    const variantClasses = {
        default: 'bg-blue-500',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        danger: 'bg-red-500'
    };
    
    return (
        <View 
            className={cn(
                'w-full rounded-full overflow-hidden bg-neutral-800',
                sizeClasses[size],
                className
            )}
        >
            <View 
                className={cn(
                    'h-full rounded-full transition-all duration-300 ease-out',
                    variantClasses[variant]
                )}
                style={{ width: `${clampedValue}%` }}
            />
        </View>
    );
};