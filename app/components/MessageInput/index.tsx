'use client';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface MessageInpuProps {
  id: string;
  placeholder?: string;
  type?: string;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInpuProps> = ({
  id,
  type,
  required,
  register,
  errors,
  placeholder,
}) => {
  return (
    <div className="relaitve w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="
        text-black
          font-light  
          py-2
          px-4
          bg-neutral-100
          w-full
          rounded-full
          focus:outline-none
        "
      />
    </div>
  );
};

export default MessageInput;
