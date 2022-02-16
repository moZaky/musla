
import { useState, useCallback } from "react";
import { UseOpenCloseActionsWithStateResultsType } from "./index.interface";

export const DEFAULT_OPEN_CLOSE_PROVIDER_STATE_OPTIONS: UseOpenCloseActionsWithStateResultsType = Object.freeze(
  {
    visible: false,
    setVisibility: () => null,
    handleOpen: () => null,
    handleClose: () => null
  }
);

const useOpenCloseActionsWithState = (
  defaultOpen?: (() => boolean) | boolean
): UseOpenCloseActionsWithStateResultsType => {
  const [visible, setVisibility] = useState<boolean>(defaultOpen || false);

  const handleOpen = useCallback(() => setVisibility(true), []);
  const handleClose = useCallback(() => setVisibility(false), []);

  return {
    visible,
    setVisibility,
    handleOpen,
    handleClose
  };
};

export default useOpenCloseActionsWithState;