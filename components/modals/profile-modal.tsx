"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";

export const ProfileModal = ({
  isOpen,
  onClose,
  name,
}: {
  isOpen: boolean;
  onClose: () => void;
  name: string | null | undefined;
}) => {
  const { data: session } = useSession();
  const [imageSrc, setImageSrc] = useState(session?.user?.image || "");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (result: any) => {
    if (result?.event === "success") {
      const newImageUrl = result.info.secure_url;
      setImageSrc(newImageUrl);

      try {
        setLoading(true);
        await axios.post("/api/update-profile", {
          image: newImageUrl,
          name: session?.user?.name,
        });
      } catch (error) {
        console.error("Error updating profile image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile | {name}</DialogTitle>
          <DialogDescription>Edit your profile</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between">
          {imageSrc ? (
            <Image src={imageSrc} alt="user avatar" width={128} height={128} className="rounded-full" />
          ) : (
            <div className="rounded-full bg-neutral-300 p-2">
              <UserRound size={96} />
            </div>
          )}
          <div className="flex flex-col gap-y-2">
            <CldUploadButton
              options={{ maxFiles: 1 }}
              onSuccess={handleImageUpload}
              uploadPreset="kgdxzou4"
              className="px-4 py-2 rounded-xl text-sm bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 transition-colors">
              Change Profile Image
            </CldUploadButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
