"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import "../../app/globals.css";
import AuthForm from "./AuthForm";
import { useAuth } from '@/contexts/AuthContext';

interface IAuth {
  component: string;
  loginHeading: string;
  authWithEmailText: string;
  userAuthOption: string;
  userAuthAction: string;
}

const Login = ({
  component,
  loginHeading,
  authWithEmailText,
  userAuthOption,
  userAuthAction,
}: IAuth) => {

  const { signInWithGoogle } = useAuth();

  return (
    <div className="bg-white h-[100vh] w-[100vw] overflow-x-hidden">
      <div className="h-full w-full flex items-center justify-center">
        <div className=" bg-gray-100 border border-gray-300 p-6 rounded-lg">

          <div className="flex flex-col items-center">
            <div className="">
              <div className="flex flex-col ">
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl  text-center font-bold">
                    Sign in to
                  </h2>
                  <h4 className="text-sm text-center text-gray-400 font-sm">
                    <span>Welcome back! Please sign in to continue</span>
                  </h4>
                </div>
              </div>
              <div className="grid grid-cols-2 pt-2 gap-2">
                <button
                 onClick={signInWithGoogle}
                 className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-black px-8 py-2 rounded cursor-pointer transition-all duration-300">
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt=""
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Google</span>
                </button>

                <button className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-black px-8 py-2 rounded cursor-pointer transition-all duration-300">
                  <img
                    src="https://github.com/favicon.ico"
                    alt=""
                    className="w-5 h-5"
                  />
                  <span className="font-medium">GitHub</span>
                </button>

                <button className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-black px-8 py-2 rounded cursor-pointer transition-all duration-300">
                  <img
                    src="https://www.apple.com/favicon.ico"
                    alt="Apple Logo"
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Apple</span>
                </button>
                <button className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-black px-8 py-2 rounded cursor-pointer transition-all duration-300">
                  <img
                    src="https://img.icons8.com/color/48/discord-logo.png"
                    alt="Discord Logo"
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Discord</span>
                </button>
              </div>

              <div className="flex flex-col w-full items-center justify-center mt-4">
                <div className="flex w-full items-center justify-center space-x-2">
                  <div className="h-[1px] w-full bg-gray-200"></div>
                </div>

                <AuthForm component={component} />

                <h3 className="flex gap-2 justify-center items-center">
                  <span className="text-gray-400">{userAuthOption}</span>{" "}
                  <Link href={component == "signup" ? "/signin" : "signup"}>
                    <span className="text-blue-600">{userAuthAction}</span>
                  </Link>
                </h3>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;