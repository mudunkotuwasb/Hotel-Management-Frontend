// /components/LoginForm.tsx
"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  onToggleMode?: () => void; // optional signup toggle
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    // Mock login logic
    setTimeout(() => {
      setIsLoading(false);
      if (email === "admin@hotel.com" && password === "admin123")
        router.push("/dashboard/admin");
      else if (
        email === "receptionist@hotel.com" &&
        password === "reception123"
      )
        router.push("/dashboard/receptionist");
      else if (email === "customer@example.com" && password === "customer123")
        router.push("/dashboard/customer");
      else toast.error("Invalid email or password");
    }, 1000);
  };

  const demoAccounts = [
    { email: "admin@hotel.com", password: "admin123", role: "Admin" },
    {
      email: "receptionist@hotel.com",
      password: "reception123",
      role: "Receptionist",
    },
    {
      email: "customer@example.com",
      password: "customer123",
      role: "Customer",
    },
  ];

  const fillDemoAccount = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Demo accounts */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">Demo Accounts</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {demoAccounts.map((acc, index) => (
            <button
              key={index}
              onClick={() => fillDemoAccount(acc.email, acc.password)}
              className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium text-gray-900">{acc.role}</div>
              <div className="text-sm text-gray-500">{acc.email}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Signup toggle */}
      {onToggleMode && (
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={onToggleMode}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
