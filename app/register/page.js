"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    // Check for alphabet-only first name and last name
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      alert("First name and Last name should contain only alphabets.");
      return;
    }

    // Check for password length
    if (password.length < 7) {
      alert("Password should be at least 7 characters long.");
      return;
    }

    if (!agree) {
      alert("You must agree to the Terms & Conditions");
      return;
    }
    if (!termsChecked) {
      alert("You must accept the Terms & Conditions inside the modal");
      setShowTerms(true); // Reopen the modal if not checked
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ firstName, lastName, username, password })
    );
    alert("Registration Successful!");
    router.push("/login");
  };

  const handleGoogleSignIn = () => {
    window.location.href = "https://accounts.google.com/signin";
  };

  const handleAppleSignIn = () => {
    window.location.href = "https://appleid.apple.com/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-white">Create an account</h2>
        <form onSubmit={handleRegister}>
          {/* First and Last Name Side by Side */}
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="First name"
              className="w-1/2 p-2 rounded-md bg-gray-700 text-white"
              value={firstName}
              onChange={(e) => {
                // Allow only alphabets
                if (/^[A-Za-z]*$/.test(e.target.value)) {
                  setFirstName(e.target.value);
                }
              }}
              required
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-1/2 p-2 rounded-md bg-gray-700 text-white"
              value={lastName}
              onChange={(e) => {
                // Allow only alphabets
                if (/^[A-Za-z]*$/.test(e.target.value)) {
                  setLastName(e.target.value);
                }
              }}
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

          {/* Password with Eye Icon */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 rounded-md bg-gray-700 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-2 top-2 cursor-pointer text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
            <span className="text-white">
              I agree to the{" "}
              <button
                type="button"
                className="text-purple-400 hover:underline"
                onClick={() => setShowTerms(true)}
              >
                Terms & Conditions
              </button>
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 p-2 rounded-md hover:bg-purple-700 transition duration-300"
          >
            Create account
          </button>
        </form>

        <div className="text-center mt-4 text-white">
          <p>Or register with</p>
          <div className="flex justify-center gap-4 mt-2">
            {/* Google Button */}
            <button
              onClick={handleGoogleSignIn}
              className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition transform hover:scale-105 duration-300"
            >
              Google
            </button>

            {/* Apple Button */}
            <button
              onClick={handleAppleSignIn}
              className="bg-yellow-600 px-4 py-2 rounded-md hover:bg-yellow-700 transition transform hover:scale-105 duration-300"
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

      {/* Terms & Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-11/12 max-w-2xl">
            <h3 className="text-2xl font-bold mb-4">Terms & Conditions</h3>
            <p className="mb-4 text-black font-bold">
              By using this application, you agree to comply with all the terms
              and conditions stated herein. We reserve the right to change these
              terms at any time without prior notice. Please read carefully.
              Your continued use of this application indicates acceptance of the
              latest terms.
            </p>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                className="mr-2"
                checked={termsChecked}
                onChange={() => setTermsChecked(!termsChecked)}
              />
              <span className="text-black font-bold">
                I have read and accept the Terms & Conditions
              </span>
            </div>
            <button
              onClick={() => {
                if (termsChecked) {
                  setShowTerms(false);
                } else {
                  alert(
                    "You must check the box to accept the Terms & Conditions"
                  );
                }
              }}
              className="bg-purple-600 p-2 rounded-md hover:bg-purple-700 transition duration-300 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
