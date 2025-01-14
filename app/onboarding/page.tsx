"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

import { OnboardingResolver, OnboardingSchemaType } from "@/schema/user";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const generateRandomDigits = (length = 4) => {
  return Math.floor(1000 + Math.random() * 9000)
    .toString()
    .substring(0, length);
};

export default function OnboardingPage() {
  const [isPending, setIsPending] = useState(false);
  const [randomDigits] = useState(generateRandomDigits());
  const [usernameInput, setUsernameInput] = useState("");
  const { data: session, update: updateSession } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<OnboardingSchemaType>({
    resolver: OnboardingResolver,
    defaultValues: {
      bio: "",
      displayName: "",
      username: "",
    },
  });

  const onSubmit = async (values: OnboardingSchemaType) => {
    const formData = { ...values, username: usernameInput + randomDigits };

    setIsPending(true);

    try {
      if (!session?.user?.id) throw new Error("No user ID found");

      const userRef = doc(db, "users", session.user.id);
      await updateDoc(userRef, {
        ...formData,
        isProfileComplete: true,
        updatedAt: new Date().toISOString(),
      });

      await updateSession({
        user: {
          ...session.user,
          isProfileComplete: true,
        },
      });

      toast({
        title: "Success",
        description: "Profile updated successfully.",
      });

      router.push("/studio/dashboard");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description:
          "There was an issue updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Dialog open={true}>
        <DialogContent className="overflow-hidden">
          <DialogHeader>
            <DialogTitle className="md:text-3xl">
              Complete Your Profile
            </DialogTitle>
            <DialogDescription className="md:text-base">
              Help us get to know you better by completing your profile. It’ll
              only take a few moments!
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <div>
                <div className="flex w-full">
                  <div className="flex-grow">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl className="flex-grow">
                            <Input
                              {...field}
                              placeholder="johndoe"
                              value={usernameInput}
                              onChange={(e) => {
                                setUsernameInput(
                                  e.target.value
                                    .replace(/\s/g, "")
                                    .toLowerCase()
                                ); // Remove spaces in real-time
                                form.setValue(
                                  "username",
                                  e.target.value.replace(/\s/g, "")
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormItem
                    className={`ml-2 transition-all duration-700 ease-in-out ${
                      usernameInput
                        ? "w-auto opacity-100 translate-x-0"
                        : "w-0 ml-0 opacity-0 translate-x-10 "
                    }`}
                  >
                    <FormLabel className="whitespace-nowrap">
                      Unique Tag
                    </FormLabel>
                    <Input
                      disabled={true}
                      value={randomDigits}
                      className="text-gray-500 font-mono"
                    />
                  </FormItem>
                </div>

                <p
                  className={cn(
                    "text-sm text-gray-500 transition-all duration-300  ease-in-out mt-1",
                    usernameInput ? "h-auto opacity-100" : "h-0 opacity-0"
                  )}
                >
                  Your username will be {usernameInput}
                  {randomDigits}
                </p>
              </div>

              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} placeholder="Your bio" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <Loader fullScreen={false} size="sm" />
                ) : (
                  "Complete Profile"
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
