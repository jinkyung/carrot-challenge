"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col w-full gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.fieldErrors.username}
          minLength={3}
          maxLength={10}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          minLength={4}
          required
          errors={state?.fieldErrors.password}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          required
          minLength={4}
          errors={state?.fieldErrors.confirm_password}
        />
        <Button text="Create account" />
        <div className="text-sm text-center">or</div>
        <Link
          href="/login"
          className="py-3 text-sm font-semibold transition rounded-full bg-neutral-100 hover:bg-neutral-200 focus:scale-90 text-center"
        >
          Log in
        </Link>
      </form>
    </div>
  );
}
