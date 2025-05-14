import { FieldError, UseFormRegister } from "react-hook-form";

interface TextAreaFieldProps {
  register: UseFormRegister<any>;
  name: string;
  placeholder: string;
  error?: FieldError;
}

const TextAreaField = ({
  register,
  name,
  placeholder,
  error,
}: TextAreaFieldProps) => {
  return (
    <>
      <textarea
        {...register(name)}
        placeholder={placeholder}
        style={{ resize: "none" }}
        rows={3}
        className={`border-2 rounded px-2 py-1 text-sm border-gray-300 focus:border-indigo-600 focus:outline-none ${
          error ? "border-red-500 focus:border-red-500" : ""
        }`}
      />
      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </>
  );
};

export default TextAreaField;
