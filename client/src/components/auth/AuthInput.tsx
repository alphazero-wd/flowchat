import { ChangeEvent, FC } from "react";
import { ErrorResponse } from "../../generated/graphql";

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  name: string;
  type?: string;
  error?: ErrorResponse;
}

const AuthInput: FC<Props> = ({
  onChange,
  value,
  placeholder,
  name,
  type,
  error,
}) => {
  return (
    <div>
      {error && error.field === name && (
        <small className="text-red-500 text-sm mb-1">* {error.message}</small>
      )}
      <label htmlFor="email-address" className="sr-only">
        {placeholder}
      </label>
      <input
        name={name}
        type={type || "text"}
        className={`auth-input ${
          error && error.field === name
            ? "border-red-500 focus:border-red-500"
            : ""
        }`}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};
export default AuthInput;
