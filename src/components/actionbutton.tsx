import { ActionResult } from "@/lib/action_result";
import Button, { ButtonProps } from "./button";
import { useState } from "react";
import { Toast } from "@base-ui-components/react";
import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type ActionButtonProps = Omit<ButtonProps, "onClick"> & {
  action: () => Promise<ActionResult>;
  onSuccess?: () => void;
};

export default function ActionButton({
  children,
  action,
  onSuccess,
  disabled,
  ...buttonProps
}: ActionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const toastManager = Toast.useToastManager();

  const handleClick = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    const result = await action();
    if (result.error) {
      toastManager.add({
        title: "Error",
        description: result.error,
        type: "danger",
      });
    } else {
      onSuccess?.();
    }

    setIsLoading(false);
  };

  return (
    <Button
      {...buttonProps}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {!isLoading ? (
        children
      ) : (
        <HugeiconsIcon icon={Loading03Icon} className="animate-spin" />
      )}
    </Button>
  );
}
