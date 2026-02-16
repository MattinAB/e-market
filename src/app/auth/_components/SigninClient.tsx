"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook } from "lucide-react";

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
          toast.success("Signed in!");
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

  function handleFacebookLogin() {
    authClient.signIn.social({ provider: "facebook" });
  }

  return (
    <div className="flex min-h-[calc(100vh-var(--nav-height,4rem))] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            {isRegistering ? "Create an account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isRegistering
              ? "Enter your details to get started"
              : "Sign in to your account to continue"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          {isRegistering && (
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-11"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="h-11"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full gap-2"
          >
            {loading && <Spinner className="size-5" />}
            {isRegistering ? "Create account" : "Sign in"}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full gap-3"
            onClick={handleFacebookLogin}
          >
            <Facebook className="size-5" />
            Continue with Facebook
          </Button>
        </div>

        {error && (
          <p className="mt-4 text-center text-sm text-destructive">{error}</p>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isRegistering ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="font-medium text-primary hover:underline"
          >
            {isRegistering ? "Sign in" : "Create account"}
          </button>
        </p>
      </div>
    </div>
  );
}
