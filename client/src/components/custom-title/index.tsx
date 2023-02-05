import React, { ReactNode } from "react";
import { CustomTitleContainer } from "./styles";

interface CustomTitleProps {
  align?: "start" | "center" | "end";
  children: ReactNode;
}

function CustomTitle({ children, align }: CustomTitleProps) {
  return (
    <CustomTitleContainer
      className="custom-title"
      sx={{ textAlign: align }}
      variant="h4"
    >
      {children}
    </CustomTitleContainer>
  );
}

CustomTitle.defaultProps = {
  align: "start",
};

export default CustomTitle;
