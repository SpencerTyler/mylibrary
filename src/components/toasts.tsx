"use client";

import { Toast } from "@base-ui-components/react";
import { ReactNode } from "react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { twMerge } from "tailwind-merge";

export default function Toasts({ children }: { children: ReactNode }) {
  return (
    <Toast.Provider>
      {children}
      <Toast.Portal>
        <Toast.Viewport className="fixed z-10 top-auto right-[1rem] bottom-[1rem] mx-auto flex w-[250px] ">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function ToastList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((toast) => (
    <Toast.Root
      key={toast.id}
      toast={toast}
      className={twMerge(
        "absolute right-0 bottom-0 left-auto flex flex-col gap-2",
        "z-[calc(1000-var(--toast-index))] mr-0 w-full",
        "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+calc(min(var(--toast-index),10)*-15px)))_scale(calc(max(0,1-(var(--toast-index)*0.1))))]",
        "rounded-lg border border-gray-200 bg-gray-50 bg-clip-padding p-4 shadow-lg transition-all [transition-property:opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] select-none after:absolute after:bottom-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-[ending-style]:opacity-0 data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-offset-y)-1+calc(var(--toast-index)var(--gap)*-1)+var(--toast-swipe-movement-y)))] data-[limited]:opacity-0 data-[starting-style]:[transform:translateY(150%)] data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-[expanded]:data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-[expanded]:data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-[expanded]:data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))] data-[expanded]:data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))] data-[ending-style]:[&:not([data-limited])]:[transform:translateY(150%)]",
        toast.type === "danger" && "bg-red-200"
      )}
      style={{
        ["--gap" as string]: "1rem",
        ["--offset-y" as string]:
          "calc(var(--toast-offset-y) * -1 + (var(--toast-index) * var(--gap) * -1) + var(--toast-swipe-movement-y))",
      }}
    >
      <Toast.Title className="text-xl leading-5 font-medium" />
      <Toast.Description className="text-lg leading-5 text-gray-800" />
      <Toast.Close className="absolute top-2 right-2 cursor-pointer bg-transparent hover:bg-gray-500/50 rounded p-0.5">
        <HugeiconsIcon icon={Cancel01Icon} />
      </Toast.Close>
    </Toast.Root>
  ));
}
