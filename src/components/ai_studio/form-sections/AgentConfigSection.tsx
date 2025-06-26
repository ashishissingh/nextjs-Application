import React from 'react';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FormLabelWithTooltip } from '@/components/shared/FormLabelWithTooltip';
import { YesNoRadioGroup } from '@/components/shared/YesNoRadioGroup';
import { Control } from 'react-hook-form';
import { CreateBotFormValues } from '@/lib/schemas/bot.schema';

interface AgentConfigSectionProps {
  control: Control<CreateBotFormValues>;
  isLoading: boolean;
}

export const AgentConfigSection: React.FC<AgentConfigSectionProps> = ({ control, isLoading }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <FormField
      control={control}
      name="isAgent"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabelWithTooltip label="Agent" tooltipText="Enable agent capabilities for this bot?" />
          <FormControl>
            <YesNoRadioGroup
              value={field.value}
              onValueChange={field.onChange}
              disabled={isLoading}
              yesId="isAgent-yes"
              noId="isAgent-no"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    
    <FormField
      control={control}
      name="isSubAgent"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabelWithTooltip label="Sub Agent" tooltipText="Can this bot function as a sub-agent to another bot?" />
          <FormControl>
            <YesNoRadioGroup
              value={field.value}
              onValueChange={field.onChange}
              disabled={isLoading}
              yesId="isSubAgent-yes"
              noId="isSubAgent-no"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);