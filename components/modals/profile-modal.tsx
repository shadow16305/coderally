"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { ProfileButton } from "../ui/profile-button";
import { AnimatePresence, motion } from "framer-motion";

export const ProfileModal = ({ currentUser }: { currentUser: User }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm<FieldValues>({
    defaultValues: {
      image: currentUser?.image || "",
      name: currentUser?.name || "",
    },
  });

  const imageSrc = watch("image");

  const handleImageUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        setIsOpen(false);
        toast.success("Profile Updated!");
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to update profile");
        setLoading(false);
      });
  };

  return (
    <>
      <ProfileButton user={currentUser} setIsOpen={setIsOpen} />
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="bg-black/80 absolute top-0 left-0 w-screen h-screen z-40 overflow-hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.08 }}
              className="z-50 absolute inset-0 size-fit m-auto">
              <div className={`bg-neutral-100 rounded-xl h-fit w-fit space-y-4 p-4 ${isOpen ? "block" : "hidden"}`}>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-semibold">Profile | {currentUser?.name}</p>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="hover:text-neutral-900/90" />
                    </Button>
                  </div>
                  <p className="text-neutral-700">Edit your profile</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex items-center gap-x-8">
                    {imageSrc ? (
                      <div className="relative size-[128px] overflow-hidden">
                        <Image src={imageSrc} alt="user avatar" fill className="rounded-full object-cover" />
                      </div>
                    ) : (
                      <div className="bg-neutral-200 rounded-full p-4">
                        <div className="relative size-[128px] overflow-hidden">
                          <Image
                            src="/images/placeholder.png"
                            alt="user avatar"
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col gap-y-2">
                      <CldUploadButton
                        uploadPreset="kgdxzou4"
                        options={{ maxFiles: 1 }}
                        onSuccess={handleImageUpload}
                        className="bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 px-4 py-2 rounded-md cursor-pointer transition-colors">
                        Change Profile Image
                      </CldUploadButton>
                      <Input {...register("name")} disabled={loading} id="name" placeholder="Change Username" />
                      <Button
                        variant="destructive"
                        type="button"
                        onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}>
                        Log out
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button type="submit" disabled={loading}>
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
