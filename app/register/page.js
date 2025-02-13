"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateName = (name) => /^[A-Za-z]+$/.test(name);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateName(firstName) || !validateName(lastName)) {
      alert("First and Last name should only contain alphabets.");
      return;
    }
    if (password.length < 8) {
      alert("Password should be at least 8 characters long.");
      return;
    }
    if (!agree) {
      alert("You must agree to the Terms & Conditions.");
      return;
    }
    localStorage.setItem("user", JSON.stringify({ username, password }));
    alert("Registration Successful!");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Create an account</h2>
        <form onSubmit={handleRegister}>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First name"
              className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (min 8 characters)"
              className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-white"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </span>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2"
              checked={agree}
              onChange={() => setAgree(!agree)}
              required
            />
            <span>
              I agree to the{" "}
              <a href="#" className="text-purple-400 hover:underline">
                Terms & Conditions
              </a>
            </span>
          </div>
          <div className="border p-4 mb-4 rounded-md bg-gray-700 text-white">
            <h3 className="font-bold mb-2">Terms & Conditions</h3>
            <ul className="list-disc list-inside text-sm">
              <li>You must be at least 18 years old to register.</li>
              <li>Your data will be used for authentication purposes only.</li>
              <li>By registering, you agree to our privacy policy.</li>
            </ul>
            <div className="mt-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={agree}
                onChange={() => setAgree(!agree)}
                required
              />
              <label>I accept the Terms & Conditions</label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 p-2 rounded-md hover:bg-purple-700"
          >
            Create account
          </button>
        </form>
        <div className="text-center mt-4">
          <p>Or register with</p>
          <div className="flex justify-center gap-4 mt-2">
            <button
              className="bg-red-600 px-4 py-2 rounded-md"
              onClick={() =>
                window.location.href = "https://accounts.google.com/signup"
              }
            >
              Google
            </button>
            <button
              className="bg-yellow-600 px-4 py-2 rounded-md"
              onClick={() =>
                window.location.href = "https://appleid.apple.com/account"
              }
            >
              Apple
            </button>
          </div>
          <p className="mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-purple-400 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
