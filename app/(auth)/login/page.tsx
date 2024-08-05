"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  const { register, handleSubmit } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
        setError("Invalid credentials");
      }

      if (callback?.ok && !callback?.error) {
        router.push("/");
      }
    });
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <form
        className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 rounded-2xl ring-1 ring-neutral-950/50"
        onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <p className="text-red-600" data-test="login-credential-error">
            {error}
          </p>
        )}
        <h1 className="mb-5 w-full text-2xl font-bold">Sign In</h1>
        <label className="w-full text-sm">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full h-8 border border-solid border-black rounded p-2"
          {...register("email", { required: true })}
          data-test="login-email-input"
        />
        <label className="w-full text-sm">Password</label>
        <div className="flex w-full">
          <input
            type="password"
            placeholder="Password"
            className="w-full h-8 border border-solid border-black rounded p-2"
            {...register("password", { required: true })}
            data-test="login-password-input"
          />
        </div>
        <Button type="submit" className="w-full" data-test="login-submit">
          Sign in
        </Button>
        <div className="flex items-center gap-x-2 w-full">
          <Button type="button" onClick={() => signIn("google")} className="w-1/2">
            <IconBrandGoogle />
          </Button>
          <Button type="button" onClick={() => signIn("github")} className="w-1/2">
            <IconBrandGithub />
          </Button>
        </div>
        <Link
          href="/signup"
          className="text-sm text-[#888] transition duration-150 ease hover:text-black"
          data-test="signup-link">
          Don't have an account?
        </Link>
      </form>
    </section>
  );
}
