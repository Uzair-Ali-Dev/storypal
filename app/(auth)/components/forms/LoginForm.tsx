"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import Loader from "@/components/Loader";
import { useToast } from "@/hooks/use-toast";

import { loginResolver, LoginSchemaType } from "@/schema/user";
import { FirebaseError } from "firebase/app";

function LoginForm() {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginSchemaType>({
    resolver: loginResolver,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchemaType) => {
    const { email, password } = values;

    setIsPending(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: "Error",
          description: "Invalid email or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "You have logged in successfully.",
        });

        router.push("/studio/dashboard");
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/wrong-password") {
          toast({
            title: "Error",
            description: "Incorrect password",
            variant: "destructive",
          });
        } else if (error.code === "auth/user-not-found") {
          toast({
            title: "Error",
            description: "No account found with this email",
            variant: "destructive",
          });
        } else {
          console.error("Login error:", error);
          toast({
            title: "Error",
            description: "An error occurred during sign-in",
            variant: "destructive",
          });
        }
      } else {
        console.error("Unexpected error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="m@example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Loader fullScreen={false} size="sm" /> : "Login"}
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
