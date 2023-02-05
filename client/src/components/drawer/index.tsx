import React from "react";
import MuiDrawer from "@mui/material/Drawer";
import Aside from "components/aside";

interface DrawerProps {
  isOpen: boolean;
  onToggleAside: () => void;
}

function Drawer({ isOpen, onToggleAside }: DrawerProps) {
  return (
    <MuiDrawer anchor="left" open={isOpen} onClose={onToggleAside}>
      <Aside />
    </MuiDrawer>
  );
}

export default Drawer;
