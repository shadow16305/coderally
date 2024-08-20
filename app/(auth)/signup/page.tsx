"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const [error, setError] = useState<string>();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    try {
      await axios.post("/api/register", formData);
      await signIn("credentials", { ...formData, redirect: false });
      reset();
      router.push("/");
    } catch {
      setError("User already exists!");
    }
  };

  const socialAction = (action: string) => {
    signIn(action, { redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error("Invalid credentials");
      }
      if (callback?.ok && !callback?.error) {
        toast.success("Signed up!");
        router.push("/");
      }
    });
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 rounded-2xl ring-1 ring-neutral-950/50">
        {error && (
          <p className="text-red-600" data-test="signup-error-message">
            {error}
          </p>
        )}
        <h1 className="mb-5 w-full text-2xl font-bold">Sign up</h1>
        <label className="w-full text-sm">Username</label>
        <Input
          type="text"
          placeholder="Full Name"
          className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
          {...register("name", { required: true })}
          data-test="signup-name-input"
        />
        <label className="w-full text-sm">Email</label>
        <Input
          type="email"
          placeholder="Email"
          className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded"
          {...register("email", { required: true })}
          data-test="signup-email-input"
        />
        <label className="w-full text-sm">Password</label>
        <div className="flex w-full">
          <Input
            type="password"
            placeholder="Password"
            className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded"
            {...register("password", { required: true })}
            data-test="signup-password-input"
          />
        </div>
        <Button type="submit" className="w-full" data-test="signup-submit">
          Sign up
        </Button>
        <div className="flex items-center gap-x-2 w-full">
          <Button type="button" onClick={() => socialAction("google")} className="w-1/2">
            <IconBrandGoogle />
          </Button>
          <Button type="button" onClick={() => socialAction("github")} className="w-1/2">
            <IconBrandGithub />
          </Button>
        </div>
        <Link
          href="/login"
          className="text-sm text-[#888] transition duration-150 ease hover:text-black"
          data-test="auth-login-link">
          Already have an account?
        </Link>
      </form>
    </section>
  );
}
