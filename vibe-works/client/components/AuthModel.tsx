import { useState } from "react";
import axios from "axios";

interface AuthModalProps {
  mode: "login" | "register";
  onClose: () => void;
}

export const AuthModel = ({ mode, onClose }: AuthModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    // Clear previous message
    setMessage("");

    // Basic input validation
    if (!email || !password) {
      setMessage("Please enter both email and password");
      return;
    }

    try {
      const res = await axios.post(`/api/${mode}`, { email, password });

      if (mode === "login") {
        localStorage.setItem("token", res.data.token);
      }

      // Display the exact message from the backend
      setMessage(res.data.message);
      setTimeout(onClose, 1200);
    } catch (err: any) {
      // Display the backend's error message or a fallback
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred";
      setMessage(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white text-center capitalize">
          {mode}
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-3 border rounded-md text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border rounded-md text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {message && (
          <p
            className={`text-sm mb-2 text-center ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition"
        >
          {mode === "register" ? "Create Account" : "Login"}
        </button>
        <button
          onClick={onClose}
          className="mt-3 w-full text-sm text-slate-500 hover:text-slate-700 dark:hover:text-white transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};