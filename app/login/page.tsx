// app/login/page.tsx
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login | Dekamond Demo",
};

export default function LoginPage() {
  return (
    <div className="w-full p-3">
      <h1 className="mb-6 text-center text-2xl font-semibold">Sign in</h1>
      <LoginForm />
    </div>
  );
}
