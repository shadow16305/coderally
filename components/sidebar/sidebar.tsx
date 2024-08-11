"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

import { IconBrandTabler } from "@tabler/icons-react";
import { Bookmark, ChartBarStacked, LogIn, ThumbsUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { SidebarBody } from "./sidebar-body";
import { SidebarLink } from "./sidebar-link";

import { Button } from "../ui/button";
import { ProfileModal } from "../modals/profile-modal";

import getCurrentUser from "@/lib/actions/get-current-user";
import { AnimatePresence, motion } from "framer-motion";
import { useSidebar } from "@/hooks/use-sidebar";

const links = [
  {
    label: "Home",
    href: "/",
    icon: <IconBrandTabler className="text-red-500 h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "Categories",
    href: "/categories",
    icon: <ChartBarStacked className="text-green-500 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "Saved Posts",
    href: "#",
    icon: <Bookmark className="text-yellow-500 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "Liked Posts",
    href: "#",
    icon: <ThumbsUp className="text-blue-500 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  },
];

export function Sidebar({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const { data: session } = useSession();
  const { open, animate } = useSidebar();

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    getUser();
  }, []);

  return (
    <>
      <div
        className={cn(
          "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen"
        )}>
        <SidebarBody className="justify-between">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <span className="text-xl font-semibold">CodeRally</span>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          {!session ? (
            <SidebarLink
              link={{
                label: "Log in",
                href: "/login",
                icon: <LogIn />,
              }}
              data-test="login-link"
            />
          ) : (
            <div>
              <Button
                variant="ghost"
                className="flex items-center justify-start gap-2 group/sidebar p-0"
                onClick={() => setIsOpen(!isOpen)}>
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
            </div>
          )}
        </SidebarBody>
        <main className="size-full">{children}</main>
      </div>
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="bg-black/40 absolute top-0 left-0 w-screen h-screen z-40 overflow-hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="z-50 absolute inset-0 size-fit m-auto">
              <ProfileModal isOpen={isOpen} onClose={() => setIsOpen(false)} currentUser={user!} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
