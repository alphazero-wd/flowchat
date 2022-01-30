import { ChangeEvent, FC } from "react";

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  name: string;
  type?: string;
}

const AuthInput: FC<Props> = ({ onChange, value, placeholder, name, type }) => {
  return (
    <div>
      <label htmlFor="email-address" className="sr-only">
        {placeholder}
      </label>
      <input
        name={name}
        type={type || "text"}
        className="auth-input"
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};
export default AuthInput;
