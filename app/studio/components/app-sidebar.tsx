"use client";

import * as React from "react";
import { Compass, Folder, LayoutDashboard, PenTool } from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Discover",
      url: "discover",
      icon: Compass,
    },
    {
      title: "My Stories",
      url: "library",
      icon: Folder,
    },
    {
      title: "Create",
      url: "create",
      icon: PenTool,
    },

    // {
    //   title: "Models",
    //   url: "#",
    //   icon: Bot,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "Genesis",
    //       url: "#",
    //     },
    //     {
    //       title: "Explorer",
    //       url: "#",
    //     },
    //     {
    //       title: "Quantum",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const sidebar = useSidebar();
  const { data: session, status } = useSession();
  const user = session?.user;

  const userData = {
    name: user?.name || "",
    email: user?.email || "",
    avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${user?.name}`,
  };

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      {sidebar.state !== "collapsed" && (
        <SidebarHeader>
          <div className="p-4 text-xl ">
            <span className="font-bold">Story</span>Pal
          </div>
        </SidebarHeader>
      )}
      <SidebarContent className="mt-4">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} isLoading={status == "loading"} />
      </SidebarFooter>
    </Sidebar>
  );
}
