"use server";

import {
  EMAIL_REGEX,
  EMAIL_REGEX_ERROR,
  USERNAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";

import { z } from "zod";

const formSchema = z.object({
  email: z.string().email().regex(EMAIL_REGEX, EMAIL_REGEX_ERROR),
  username: z.string().min(USERNAME_MIN_LENGTH),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  return { success: result.success, error: result.error?.flatten() };
}
