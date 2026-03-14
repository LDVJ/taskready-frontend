import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, XCircle, Loader2, CheckSquare } from "lucide-react";
import { verifyEmail } from "../api/user";
import Button from "../components/ui/Button";

export default function VerifyEmailPage() {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";

  const { isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["verify-email", token],
    queryFn: () => verifyEmail(token),
    enabled: !!token,
    retry: false,
  });

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="w-12 h-12 rounded-2xl bg-brand-orange flex items-center justify-center mb-6 mx-auto shadow-lg shadow-orange-200">
          <CheckSquare size={24} className="text-white" />
        </div>

        {!token && (
          <>
            <XCircle size={48} className="text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-brand-navy mb-2">
              Invalid Link
            </h2>
            <p className="text-gray-400 text-sm">
              This verification link is missing a token.
            </p>
          </>
        )}

        {isLoading && (
          <>
            <Loader2
              size={48}
              className="text-brand-orange mx-auto mb-4 animate-spin"
            />
            <h2 className="text-xl font-bold text-brand-navy mb-2">
              Verifying your email…
            </h2>
            <p className="text-gray-400 text-sm">
              This will only take a moment.
            </p>
          </>
        )}

        {isSuccess && (
          <>
            <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-brand-navy mb-2">
              Email Verified! 🎉
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Your account is now active. You can sign in.
            </p>
            <Link to="/login">
              <Button size="lg" className="w-full">
                Go to Sign In
              </Button>
            </Link>
          </>
        )}

        {isError && (
          <>
            <XCircle size={48} className="text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-brand-navy mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              {(error as any)?.response?.data?.detail ??
                "This link may have expired. Request a new one."}
            </p>
            <Link to="/login">
              <Button variant="outline" className="w-full">
                Back to Login
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}