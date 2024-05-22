import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be minimum length of 8 characters")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).+$/,
      "Password must include at least one letter, one number, and one special character."
    ),
  name: z.string(),
});

export type User = z.infer<typeof UserSchema>;

const processZodErrors = <T extends Record<string, string>>(
  errors: z.ZodIssue[]
): Record<keyof T, string[]> =>
  errors.reduce((acc: Record<keyof T, string[]>, err) => {
    const path = err.path.join(".") as keyof T;
    acc[path] = acc[path] ? [...acc[path], err.message] : [err.message];
    return acc;
  }, {} as Record<keyof T, string[]>);

export const validateFullUser = (
  value: User
): { valid: boolean; errors: Record<keyof typeof value, string[]> | {} } => {
  try {
    UserSchema.parse(value);
    return { valid: true, errors: {} };
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      return { valid: false, errors: processZodErrors<typeof value>(e.errors) };
    }
    return {
      valid: false,
      errors: { general: ["An unexpected error occurred: " + e.message] },
    };
  }
};

export const validateEmailPassword = (
  value: Pick<User, "email" | "password">
): { valid: boolean; errors: Record<keyof typeof value, string[]> | {} } => {
  try {
    UserSchema.pick({ email: true, password: true }).parse(value);
    return { valid: true, errors: {} };
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      return { valid: false, errors: processZodErrors<typeof value>(e.errors) };
    }
    return {
      valid: false,
      errors: { general: ["An unexpected error occurred: " + e.message] },
    };
  }
};
