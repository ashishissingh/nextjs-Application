import React from 'react';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface YesNoRadioGroupProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  yesId: string;
  noId: string;
}

export const YesNoRadioGroup: React.FC<YesNoRadioGroupProps> = ({
  value,
  onValueChange,
  disabled,
  yesId,
  noId
}) => (
  <RadioGroup
    onValueChange={(val) => onValueChange(val === 'true')}
    defaultValue={value ? 'true' : 'false'}
    className="flex space-x-4"
    disabled={disabled}
  >
    <FormItem className="flex items-center space-x-2 space-y-0">
      <FormControl>
        <RadioGroupItem value="true" id={yesId} />
      </FormControl>
      <FormLabel htmlFor={yesId} className="font-normal">Yes</FormLabel>
    </FormItem>
    <FormItem className="flex items-center space-x-2 space-y-0">
      <FormControl>
        <RadioGroupItem value="false" id={noId} />
      </FormControl>
      <FormLabel htmlFor={noId} className="font-normal">No</FormLabel>
    </FormItem>
  </RadioGroup>
);