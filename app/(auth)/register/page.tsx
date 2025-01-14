import React from "react";
import RegisterForm from "../components/forms/RegisterForm";
import Link from "next/link";

function RegisterPage() {
  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-5xl font-bold">Join Us Today</h1>
        <p className="text-muted-foreground">
          Create an account to unlock amazing features and get started!
        </p>
      </div>
      <RegisterForm />
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href={"/login"} className="underline">
          Log In
        </Link>
      </div>
    </>
  );
}

export default RegisterPage;
