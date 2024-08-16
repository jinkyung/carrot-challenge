"use client";

import { useFormState } from "react-dom";
import { login } from "./actions";
import Button from "@/components/button";
import Input from "@/components/input";
import MailIcon from "@/components/icon/mail";
import UserIcon from "@/components/icon/user";
import KeyIcon from "@/components/icon/key";
import CheckBadgeIcon from "@/components/icon/check-badge";
import FireIcon from "@/components/icon/fire";

export default function Login() {
  const [state, dispatch] = useFormState(login, null);
  return (
    <div className="flex flex-col w-full max-w-md gap-10 px-6 py-8 mx-auto mt-5">
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
          errors={state?.error?.fieldErrors.email}
        />
        <Input
          icon={<UserIcon />}
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.error?.fieldErrors.username}
        />
        <Input
          icon={<KeyIcon />}
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.error?.fieldErrors.password}
        />
        <Button text="Log in" />
        {state?.success ? (
          <div className="flex items-center p-4 text-sm font-medium rounded-2xl bg-emerald-500 gap-x-4">
            <CheckBadgeIcon />
            Welcome back!
          </div>
        ) : null}
      </form>
    </div>
  );
}
