"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!agree) {
      alert("You must agree to the Terms & Conditions");
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
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
            <span>
              I agree to the{" "}
              <a href="#" className="text-purple-400 hover:underline">
                Terms & Conditions
              </a>
            </span>
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
            <button className="bg-red-600 px-4 py-2 rounded-md">Google</button>
            <button className="bg-gray-600 px-4 py-2 rounded-md">Apple</button>
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
