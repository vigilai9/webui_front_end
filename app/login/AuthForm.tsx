"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

const AuthForm = ({ component }: { component: string }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    signIn("credentials", data);
  }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2 w-full">
        {component === "signup" && (
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="name">
              <span className="text-sm text-gray-400">Name</span>
            </label>
            <div>
              <input
                name="name"
                className="w-[100%]  border border-gray-600 rounded px-4 py-2"
                type="text"
                required
              />
            </div>
          </div>
        )}

        <div className="w-full flex flex-col gap-1">
          <label htmlFor="email">
            <span className="text-sm text-gray-500">Email address</span>
          </label>
          <div>
            <input
              name="email"
              className="w-[100%] border border-gray-300 rounded px-4 py-1 placeholder:text-sm"
              type="email"
              required
              placeholder="Enter your email address"
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-1">
          <label htmlFor="password">
            <span className="text-sm text-gray-500">Password</span>
          </label>
          <div>
            <input
              name="password"
              className="w-[100%] border border-gray-300 rounded px-4 py-1 placeholder:text-sm"
              type="password"
              required
              placeholder="Enter password"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className=" text-white bg-indigo-500 py-1 rounded mt-6 cursor-pointer"
        >
          Continue
        </button>

       <div className="flex justify-center mt-2">
          <h2 className="text-gray-500 text-sm">Don’t have an account? <span className="text-indigo-500 font-medium">Sign up</span></h2>
       </div>

      </form>
    );
  };

  export default AuthForm;