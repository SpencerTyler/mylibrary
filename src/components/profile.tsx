"use client";

import { authClient } from "@/lib/auth_client";
import { Menu } from "@base-ui-components/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon } from "@hugeicons/core-free-icons";
import LoginButton from "./loginbutton";

export default function Profile() {
  const session = authClient.useSession();

  if (session.isPending) {
    return (
      <div className="py-2 px-3 bg-gray-200 rounded flex flex-row items-center gap-2 animate-pulse">
        <div className="size-[30px] rounded-full bg-gray-400"></div>
        <div className="bg-gray-400 w-[70px] rounded">&nbsp;</div>
      </div>
    );
  }

  const handleLogOut = async () => {
    await authClient.signOut();
    window.location.reload();
  };

  if (session.data) {
    return (
      <div className="py-2 px-3 bg-gray-200 rounded flex flex-row items-center gap-2">
        {session.data.user.image && (
          <img
            className="h-[30px] w-auto rounded-full"
            alt=""
            src={session.data.user.image}
          />
        )}
        {session.data.user.name}
        <Menu.Root>
          <Menu.Trigger className="cursor-pointer">
            <HugeiconsIcon icon={Menu01Icon} className="text-gray-500" />
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner sideOffset={4} collisionPadding={15}>
              <Menu.Popup className="bg-gray-200 p-2 shadow-gray-200 rounded border border-gray-800">
                <Menu.Item
                  className="p-1 cursor-pointer hover:bg-gray-100 rounded"
                  onClick={handleLogOut}
                >
                  Log Out
                </Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>
    );
  }

  return <LoginButton />;
}
