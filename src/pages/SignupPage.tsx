import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CheckSquare, User, Mail, Phone, Lock } from "lucide-react";

import { signup } from "../api/user";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { Role } from "../types";

// ── Validation matches your Pydantic schema exactly ──────────────────────────
const schema = z
  .object({
    name: z
      .string()
      .min(5, "Name must be at least 5 characters")
      .max(50, "Name can't exceed 50 characters"),
    email: z.string().email("Enter a valid email"),
    mob_no: z
      .string()
      .min(5, "Mobile number too short")
      .max(10, "Mobile number too long"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[0-9]/, "Must contain a number"),
    confirm_password: z.string(),
    role: z.enum(["user", "tasker", "member"] as const),
  })
  .refine((d) => d.password === d.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

type Form = z.infer<typeof schema>;

export default function SignupPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { role: "user" },
  });

  const mutation = useMutation({
    mutationFn: (data: Form) => {
      const { confirm_password, ...payload } = data;
      return signup({ ...payload, role: payload.role as Role });
    },
    onSuccess: () => {
      toast.success(
        "Account created! Check your email to verify your account.",
        { duration: 5000 }
      );
      navigate("/login");
    },
    onError: (err: any) => {
      const detail = err?.response?.data?.detail;
      if (Array.isArray(detail)) {
        detail.forEach((d: any) => toast.error(d.msg));
      } else {
        toast.error(detail ?? "Signup failed. Please try again.");
      }
    },
  });

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-brand-orange flex items-center justify-center mb-3 shadow-lg shadow-orange-200">
              <CheckSquare size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-brand-navy">
              Create Account
            </h1>
            <p className="text-sm text-gray-400 mt-1">Join TaskReady today</p>
          </div>

          <form
            onSubmit={handleSubmit((d) => mutation.mutate(d))}
            className="space-y-4"
          >
            <Input
              label="Full Name"
              placeholder="John Doe"
              leftIcon={<User size={15} />}
              error={errors.name?.message}
              {...register("name")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                leftIcon={<Mail size={15} />}
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                label="Mobile No."
                type="tel"
                placeholder="9876543210"
                leftIcon={<Phone size={15} />}
                error={errors.mob_no?.message}
                {...register("mob_no")}
              />
            </div>

            {/* Role selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-brand-navy">
                I am a…
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["user", "tasker", "member"] as const).map((r) => (
                  <label key={r} className="relative cursor-pointer">
                    <input
                      type="radio"
                      value={r}
                      className="peer sr-only"
                      {...register("role")}
                    />
                    <div className="text-center py-2.5 px-2 rounded-xl border-2 text-sm font-semibold capitalize transition-all border-gray-200 text-gray-500 peer-checked:border-brand-orange peer-checked:bg-brand-orange/5 peer-checked:text-brand-orange hover:border-brand-orange/50">
                      {r}
                    </div>
                  </label>
                ))}
              </div>
              {errors.role && (
                <p className="text-xs text-red-500">{errors.role.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                leftIcon={<Lock size={15} />}
                error={errors.password?.message}
                {...register("password")}
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                leftIcon={<Lock size={15} />}
                error={errors.confirm_password?.message}
                {...register("confirm_password")}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full mt-2"
              loading={mutation.isPending}
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-brand-orange font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}