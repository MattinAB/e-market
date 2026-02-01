"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function SigninClient() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const [loading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");
    setError("");

    if (isRegistering) {
      try {
        setIsLoading(true);
        const { data, error } = await authClient.signUp.email({
          name,
          email,
          password: password as string,
        });
        if (error) {
          setError(error.message);
          toast.error(error.message);
        } else if (data) {
          toast.success("Account created successfully!");
          route.push("/");
          route.refresh();
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unexpected error occurred";
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        const { data, error } = await authClient.signIn.email({
          email,
          password: password as string,
        });
        if (error) {
          setError(error.message);
          toast.error(error.message);
        } else if (data) {
          route.push("/");
          route.refresh();
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unexpected error occurred";
        setError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen font-sans">
      <div className=" bg-gray-50 p-8 rounded-xl shadow-md w-full max-w-100">
        <h1 className="text-center mb-8 text-2xl font-bold text-gray-800">
          {isRegistering ? "Create an Account" : "Sign In"}
        </h1>

        {/* Primary Method: Email & Password */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isRegistering && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              required
              className="p-3 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="p-3 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="p-3 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className=" flex justify-center items-center gap-2 p-3 rounded-md bg-blue-600 text-white font-semibold cursor-pointer text-base mt-2 hover:bg-blue-700 transition-colors"
          >
            {loading && <Spinner className="size-6" />}
            {isRegistering ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Secondary Methods: GitHub & Google */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-3 p-3 rounded-md border border-gray-300 bg-white cursor-pointer font-medium text-gray-800 text-[0.95rem] hover:bg-gray-50 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Continue with GitHub
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-3 p-3 rounded-md border border-gray-300 bg-white cursor-pointer font-medium text-gray-800 text-[0.95rem] hover:bg-gray-50 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-center text-sm mt-4">{error}</p>
        )}
        {/* Toggle */}
        <div className="mt-6 text-center text-sm text-gray-500">
          {isRegistering
            ? "Already have an account? "
            : "Don't have an account? "}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="bg-transparent border-none text-blue-600 cursor-pointer font-semibold text-sm hover:underline"
          >
            {loading && <Spinner />}
            {isRegistering ? "Sign In" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
