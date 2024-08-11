import { useSession } from "next-auth/react";

import { IconBrandTabler } from "@tabler/icons-react";
import { Bookmark, ChartBarStacked, LogIn, ThumbsUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { SidebarBody } from "./sidebar-body";
import { SidebarLink } from "./sidebar-link";

import { ProfileModal } from "../modals/profile-modal";

import getCurrentUser from "@/lib/actions/get-current-user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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

export async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  const session = getServerSession(authOptions);

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
              <ProfileModal currentUser={currentUser!} />
            </div>
          )}
        </SidebarBody>
        <main className="size-full">{children}</main>
      </div>
    </>
  );
}
