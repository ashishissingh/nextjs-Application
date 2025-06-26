import React from 'react';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormLabelWithTooltip } from '@/components/shared/FormLabelWithTooltip';
import { AVAILABLE_LLM_MODELS } from '@/lib/constants';
import { FORM_PLACEHOLDERS } from '@/lib/config/form.config';
import { Control } from 'react-hook-form';
import { CreateBotFormValues } from '@/lib/schemas/bot.schema';

interface BasicInfoSectionProps {
  control: Control<CreateBotFormValues>;
  isLoading: boolean;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ control, isLoading }) => (
  <>
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabelWithTooltip label="Name" tooltipText="The display name for your bot." htmlFor="name" required />
        <FormControl>
          <Input
            id="name"
            placeholder={FORM_PLACEHOLDERS.BOT_NAME}
            className="placeholder:text-form-description"
            {...field}
            disabled={isLoading}
          />
        </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
    
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabelWithTooltip label="Description" tooltipText="A brief description of what your bot does." htmlFor="description" />
          <FormControl>
            <Textarea
              id="description"
              placeholder={FORM_PLACEHOLDERS.BOT_DESCRIPTION}
              className="min-h-[80px] resize-y placeholder:text-form-description"
              {...field}
              disabled={isLoading}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    
    <FormField
      control={control}
      name="model"
      render={({ field }) => (
        <FormItem>
          <FormLabelWithTooltip label="Select Model" tooltipText="Choose the underlying Large Language Model for your bot." htmlFor="model" required />
          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
            <FormControl>
              <SelectTrigger id="model">
                <SelectValue placeholder={FORM_PLACEHOLDERS.SELECT_MODEL} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {AVAILABLE_LLM_MODELS.map(model => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
    
    <FormField
      control={control}
      name="instructions"
      render={({ field }) => (
        <FormItem>
          <FormLabelWithTooltip label="Instructions" tooltipText="System-level instructions or persona for the bot." htmlFor="instructions" />
          <FormControl>
            <Textarea
              id="instructions"
              placeholder={FORM_PLACEHOLDERS.BOT_INSTRUCTIONS}
              className="min-h-[100px] resize-y placeholder:text-form-description"
              {...field}
              disabled={isLoading}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);