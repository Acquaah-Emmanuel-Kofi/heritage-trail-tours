import { useFieldArray, Control } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookingFormData } from '../types';

interface GuestFormProps {
  control: Control<BookingFormData>;
}

export const GuestForm = ({ control }: GuestFormProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'guests',
  });

  const addGuest = () => {
    append({
      name: '',
      age: undefined,
      gender: '',
      nationality: '',
      passportNumber: '',
      occupation: '',
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Traveler Details</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Guest {index + 1}</h4>
            <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
              Remove
            </Button>
          </div>
          <Input
            {...control.register(`guests.${index}.name`)}
            placeholder="Full Name"
          />
          <Input
            {...control.register(`guests.${index}.age`, { valueAsNumber: true })}
            type="number"
            placeholder="Age"
          />
          <Select onValueChange={(value) => console.log(`guests.${index}.gender`, value)}>
            <SelectTrigger>
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
          <Input
            {...control.register(`guests.${index}.nationality`)}
            placeholder="Nationality"
          />
          <Input
            {...control.register(`guests.${index}.passportNumber`)}
            placeholder="Passport Number (optional)"
          />
          <Input
            {...control.register(`guests.${index}.occupation`)}
            placeholder="Occupation (optional)"
          />
        </div>
      ))}
      <Button type="button" onClick={addGuest} variant="outline">
        Add Another Guest
      </Button>
    </div>
  );
};