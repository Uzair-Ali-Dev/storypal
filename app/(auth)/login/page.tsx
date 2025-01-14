import Link from "next/link";
import LoginForm from "../components/forms/LoginForm";

function LoginPage() {
  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-5xl font-bold ">Welcome Back</h1>
        <p className="text-muted-foreground">
          Please enter your credentials to access your account.
        </p>
      </div>
      <LoginForm />
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href={"/register"} className="underline">
          Sign up
        </Link>
      </div>
    </>
  );
}

export default LoginPage;
