"use client";

import { useFormState } from "react-dom";
import { login } from "./actions";
import Button from "@/components/button";
import Input from "@/components/input";
import MailIcon from "@/components/icon/mail";
import KeyIcon from "@/components/icon/key";
import FireIcon from "@/components/icon/fire";
import Link from "next/link";

export default function Login() {
  const [state, dispatch] = useFormState(login, null);
  return (
    <div className="flex flex-col w-full gap-10 px-6 py-8">
      <div className="flex justify-center">
        <FireIcon />
      </div>
      <form className="flex flex-col gap-3" action={dispatch}>
        <Input
          icon={<MailIcon />}
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          icon={<KeyIcon />}
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors.password}
        />
        <Button text="Log in" />
        <div className="text-sm text-center">or</div>
        <Link
          href="/create-account"
          className="py-3 text-sm font-semibold transition rounded-full bg-neutral-100 hover:bg-neutral-200 focus:scale-90 text-center"
        >
          Create Account
        </Link>
      </form>
    </div>
  );
}
