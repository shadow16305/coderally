import { Button } from "./button";
import { User } from "@prisma/client";
import { useSidebar } from "@/hooks/use-sidebar";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProfileButtonProps {
  user: User;
  setIsOpen: (open: boolean) => void;
}

export const ProfileButton = ({ user, setIsOpen }: ProfileButtonProps) => {
  const { open, animate } = useSidebar();

  return (
    <Button
      variant="ghost"
      className="flex items-center justify-start gap-2 group/sidebar p-0"
      onClick={() => setIsOpen(true)}>
      {user?.image ? (
        <div className="relative size-8">
          <Image src={user.image} alt="User" fill className="rounded-full" />
        </div>
      ) : (
        <div className="relative size-8">
          <Image src="/images/placeholder.png" alt="User" fill className="rounded-full" />
        </div>
      )}
      {user?.name && (
        <motion.span
          animate={{
            display: animate ? (open ? "inline-block" : "none") : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
          {user.name}
        </motion.span>
      )}
    </Button>
  );
};
