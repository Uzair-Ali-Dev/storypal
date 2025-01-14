import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
  username: z.string().min(5).max(20),
  bio: z.string().min(10).max(500),
  displayName: z.string().min(5).max(50),
});

export const loginSchema = userSchema.pick({
  email: true,
  password: true,
});

export const onboardingSchema = userSchema.pick({
  username: true,
  bio: true,
  displayName: true,
});

export const registerSchema = loginSchema;

// Infer types from schemas
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type OnboardingSchemaType = z.infer<typeof onboardingSchema>;

// Resolvers
export const loginResolver = zodResolver(loginSchema);
export const RegisterResolver = zodResolver(registerSchema);
export const OnboardingResolver = zodResolver(onboardingSchema);
