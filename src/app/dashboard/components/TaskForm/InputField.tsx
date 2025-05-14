import { FieldError, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  register: UseFormRegister<any>;
  name: string;
  placeholder: string;
  error?: FieldError;
}

const InputField = ({
  register,
  name,
  placeholder,
  error,
}: InputFieldProps) => {
  return (
    <>
      <input
        {...register(name, { required: true })}
        placeholder={placeholder}
        aria-label="Task Title"
        className={`border-2 rounded px-2 py-1 text-sm border-gray-300 focus:border-indigo-600 focus:outline-none ${
          error ? "border-red-500 focus:border-red-500" : ""
        }`}
      />
      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </>
  );
};

export default InputField;
