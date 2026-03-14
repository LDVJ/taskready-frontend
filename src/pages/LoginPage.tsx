import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CheckSquare, Mail, Lock } from "lucide-react";

import { login } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type Form = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: ({ email, password }: Form) => login(email, password),
    onSuccess: (data) => {
      // We store the token; user data will be fetched on first protected page
      setAuth(
        { 
          id: "", 
          name: "", 
          email: "", 
          mob_no: "", 
          role: "user", 
          is_verified: false, 
          created_at: "" 
        },
        data.access_token
      );
      toast.success("Welcome back!");
      navigate("/dashboard");
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.detail ?? "Invalid credentials. Try again.";
      toast.error(typeof msg === "string" ? msg : "Login failed.");
    },
  });

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-brand-orange flex items-center justify-center mb-3 shadow-lg shadow-orange-200">
              <CheckSquare size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-brand-navy">TaskReady</h1>
            <p className="text-sm text-gray-400 mt-1">Sign in to your account</p>
          </div>

          <form
            onSubmit={handleSubmit((d) => mutation.mutate(d))}
            className="space-y-5"
          >
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              leftIcon={<Mail size={15} />}
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock size={15} />}
              error={errors.password?.message}
              {...register("password")}
            />

            <Button
              type="submit"
              size="lg"
              className="w-full mt-2"
              loading={mutation.isPending}
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-brand-orange font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}