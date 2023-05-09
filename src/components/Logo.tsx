import { styled } from "@mui/material/styles";
import agronodLogo from "../assets/agronodlogo.png";
import React from "react";

type LogoProps = {
  size: "small" | "large";
};

const Logo = ({ size }: LogoProps) => {
  const StyledImg = styled("img")({});
  return (
    <StyledImg
      src={agronodLogo}
      alt="Logo image"
      sx={{
        width: size === "small" ? 108 : 148,
      }}
    />
  );
};

export default Logo;
