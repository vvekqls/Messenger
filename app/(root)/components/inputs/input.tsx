import clsx from 'clsx';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface inputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const input: React.FC<inputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div>
      <label
        className="
        block
        text-sm
        font-medium
        leading-6
        text-gray-900
      "
        htmlFor={id}
      >
        {label}
      </label>
      <div className='mt-2'>

      </div>
    </div>
  );
};

export default input;
