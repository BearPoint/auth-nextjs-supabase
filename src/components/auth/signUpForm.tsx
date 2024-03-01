"use client";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignUpForm() {
  const [form, setForm] = useState<SignUpForm>({} as SignUpForm);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const onChangeHandler = (field: string, value: string) => {
    setForm((oldForm) => ({
      ...oldForm,
      [field]: value,
    }));
  };
  const submitHandler = async (e: any) => {
    e.preventDefault();
    const { password, confirmPassword, email } = form;
    if (password !== confirmPassword) {
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/callback",
      },
    });
    if (!error) {
      router.push("/");
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="grid gap-2 my-3">
        <Label htmlFor="email">email</Label>
        <Input
          id="email"
          type="email"
          onChange={(e) => onChangeHandler("email", e.target.value)}
        />
      </div>
      <div className="grid gap-2 my-3">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          onChange={(e) => onChangeHandler("password", e.target.value)}
        />
      </div>
      <div className="grid gap-2 my-3">
        <Label htmlFor="password1">re write Password</Label>
        <Input
          id="password1"
          type="password"
          onChange={(e) => onChangeHandler("confirmPassword", e.target.value)}
        />
      </div>
      <div>
        <Button className="w-full" type="submit">
          Create account
        </Button>
      </div>
    </form>
  );
}
