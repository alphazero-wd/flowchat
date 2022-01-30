import { FC } from "react";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "../components/auth/AuthInput";
import {
  ErrorResponse,
  RegisterInput,
  useRegisterMutation,
} from "../generated/graphql";
import Loading from "../components/shared/Loading";

const Register: FC = () => {
  const navigate = useNavigate();
  const [register, { loading }] = useRegisterMutation();
  const [registerFields, setReigsterFields] = useState<RegisterInput>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<ErrorResponse>({ field: "", message: "" });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReigsterFields({ ...registerFields, [e.target.name]: e.target.value });
    setError({ field: "", message: "" });
  };
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { data } = await register({
      variables: {
        user: registerFields,
      },
    });

    if (data?.register.error) {
      setError({
        field: data.register.error.field,
        message: data.register.error.message,
      });
    } else if (data?.register.user) {
      localStorage.setItem("token", data.register.user.token);
      navigate("/");
    }
    return;
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register FlowChat today
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              login to your account
            </Link>
          </p>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <AuthInput
              placeholder="Username"
              value={registerFields.username}
              name="username"
              onChange={onChange}
              error={error}
            />
            <AuthInput
              placeholder="Email address"
              value={registerFields.email}
              name="email"
              onChange={onChange}
              error={error}
            />
            <AuthInput
              placeholder="Password"
              value={registerFields.password}
              name="password"
              type="password"
              onChange={onChange}
              error={error}
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading && <Loading />}
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
