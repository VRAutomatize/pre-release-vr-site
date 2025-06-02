
import React from "react";
import { NativeCard } from "@/components/ui/native-card";
import { NativeButton } from "@/components/ui/native-button";

interface NativeEmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const NativeEmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className
}: NativeEmptyStateProps) => {
  return (
    <NativeCard variant="glass" padding="lg" className={className}>
      <div className="text-center py-8">
        <div className="h-20 w-20 bg-gray-400/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          {icon}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-100 mb-2">
          {title}
        </h3>
        
        <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">
          {description}
        </p>
        
        {actionLabel && onAction && (
          <NativeButton variant="primary" onClick={onAction}>
            {actionLabel}
          </NativeButton>
        )}
      </div>
    </NativeCard>
  );
};

export default NativeEmptyState;
