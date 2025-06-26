import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface FormLabelWithTooltipProps {
  label: string;
  tooltipText: string;
  htmlFor?: string;
  required?: boolean;
}

export const FormLabelWithTooltip: React.FC<FormLabelWithTooltipProps> = ({ 
  label, 
  tooltipText, 
  htmlFor, 
  required 
}) => (
  <div className="flex items-center gap-1">
    <FormLabel htmlFor={htmlFor} className="text-sidebar-foreground">
      {label}
      {required && <span className="text-destructive"> *</span>}
    </FormLabel>
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
);