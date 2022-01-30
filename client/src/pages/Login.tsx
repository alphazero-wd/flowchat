import {
  ErrorResponse,
  LoginInput,
  useLoginMutation,
} from "../generated/graphql";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "../components/auth/AuthInput";
import Loading from "../components/shared/Loading";

const Login = () => {
  const navigate = useNavigate();
  const [login, { loading }] = useLoginMutation();
  const [error, setError] = useState<ErrorResponse>({
    field: "",
    message: "",
  });
  const [loginFields, setLoginFields] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginFields({ ...loginFields, [e.target.name]: e.target.value });
    setError({ field: "", message: "" });
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { data } = await login({
      variables: {
        user: loginFields,
      },
    });
    if (data?.login.error) {
      setError({
        field: data.login.error.field,
        message: data.login.error.message,
      });
    } else if (data?.login.user) {
      localStorage.setItem("token", data.login.user.token);
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
            Login to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              register FlowChat today
            </Link>
          </p>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <AuthInput
              placeholder="Email address"
              value={loginFields.email}
              name="email"
              onChange={onChange}
              error={error}
            />
            <AuthInput
              placeholder="Password"
              value={loginFields.password}
              name="password"
              type="password"
              onChange={onChange}
              error={error}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading && <Loading />}
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
