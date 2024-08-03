"use client";
import React, { useEffect, useState } from "react";
import { IconBrandTabler } from "@tabler/icons-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SidebarBody } from "./sidebar-body";
import { SidebarLink } from "./sidebar-link";
import { Bookmark, ChartBarStacked, UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { ProfileModal } from "../modals/profile-modal";
import { User } from "@prisma/client";
import getCurrentUser from "@/lib/actions/get-current-user";
import { motion } from "framer-motion";
import { useSidebar } from "@/hooks/use-sidebar";

export function Sidebar() {
  const links = [
    {
      label: "Home",
      href: "#",
      icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Saved Posts",
      href: "#",
      icon: <Bookmark className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Categories",
      href: "#",
      icon: <ChartBarStacked className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    getUser();
  }, []);

  const { open, animate } = useSidebar();

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
              }}
            />
          ) : (
            <div>
              <Button
                variant="ghost"
                className="flex items-center justify-start gap-2 group/sidebar p-0"
                onClick={() => setIsOpen(!isOpen)}>
                {user?.image ? <Image src={user.image} alt="User" width={36} height={36} /> : <UserRound />}
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
        {/* <Dashboard /> */}
      </div>
      <ProfileModal isOpen={isOpen} onClose={() => setIsOpen(false)} name={user?.name} />
    </>
  );
}

// const Dashboard = () => {
//   return (
//     <div className="flex flex-1">
//       <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
//         <div className="flex gap-2">
//           {[...new Array(4)].map((i) => (
//             <div
//               key={"first-array" + i}
//               className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"></div>
//           ))}
//         </div>
//         <div className="flex gap-2 flex-1">
//           {[...new Array(2)].map((i) => (
//             <div
//               key={"second-array" + i}
//               className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"></div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
