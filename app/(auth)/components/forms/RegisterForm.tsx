"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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

import { auth, db } from "@/lib/firebase";
import { RegisterResolver, RegisterSchemaType } from "@/schema/user";
import { FirebaseError } from "firebase/app";

function RegisterForm() {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<RegisterSchemaType>({
    resolver: RegisterResolver,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const createUserProfile = async (userId: string, email: string) => {
    const userProfileRef = doc(db, "users", userId);

    // Create initial profile document
    await setDoc(userProfileRef, {
      email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isProfileComplete: false,
      displayName: "",
      username: "",
      bio: "",
    });
  };

  const onSubmit = async (values: RegisterSchemaType) => {
    const { email, password } = values;

    setIsPending(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await createUserProfile(userCredential.user.uid, email);

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      toast({
        title: "Success",
        description: "You have successfully registered! Welcome!",
      });

      router.push("/onboarding");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          toast({
            title: "Error",
            description: "An account with this email already exists",
            variant: "destructive",
          });
        } else if (error.code === "auth/weak-password") {
          toast({
            title: "Error",
            description: "Password should be at least 6 characters",
            variant: "destructive",
          });
        } else {
          console.error("Signup error:", error);
          toast({
            title: "Error",
            description: "An error occurred during sign-up",
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
          {isPending ? <Loader fullScreen={false} size="sm" /> : "Register"}
        </Button>
      </form>
    </Form>
  );
}

export default RegisterForm;
