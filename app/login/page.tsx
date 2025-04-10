"use client";
 import React from 'react';
 import { useAuth } from '@/contexts/AuthContext';
 import { LogIn } from 'lucide-react';
 
 const Login = () => {
   const { signInWithGoogle } = useAuth();
 
   return (
     <div className="flex items-center justify-center min-h-screen bg-gray-50">
       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
         <div className="text-center">
           <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome</h2>
           <p className="text-gray-600">Sign in to access your account</p>
         </div>
         
         <button
           onClick={signInWithGoogle}
           className="w-full flex items-center justify-center gap-3 px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
         >
           <LogIn className="w-5 h-5" />
           <span>Sign in with Google</span>
         </button>
       </div>
     </div>
   );
 };
 
 export default Login;