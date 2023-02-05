import React, { useState, useEffect, MouseEvent } from "react";
import { useLocation } from "react-router-dom";

import Fade from "@mui/material/Fade";
import MoreVerIcon from "@mui/icons-material/MoreVertRounded";

import SignInButton from "components/sign-in-button";
import useOusideClick from "hooks/useOusideClick";

import { useAuth } from "context";

import UploadVideo from "./upload-video";
import UserMenu from "./user-menu";

import {
  Avatar,
  AvatarSkeleton,
  UserMenuButton,
  UserPanelContainer,
} from "./styles";

function UserPanel() {
  const location = useLocation();
  const { me } = useAuth();

  const [isMenuOpened, setMenuOpened] = useState(false);
  const [isAvatarLoaded, setAvatarLoaded] = useState(false);

  const handleOpenMenu = (
    event: MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    if (isMenuOpened) return;
    event.stopPropagation();
    setMenuOpened(true);
  };

  const handleCloseMenu = () => {
    setMenuOpened(false);
  };

  useEffect(handleCloseMenu, [location]);

  const menuRef = useOusideClick(handleCloseMenu);
  const avatar = me?.profile.avatar;

  return (
    <UserPanelContainer>
      {me && (
        <>
          <UploadVideo />
          {avatar && !isAvatarLoaded && <AvatarSkeleton variant="circular" />}
          {avatar ? (
            <Avatar
              onClick={handleOpenMenu}
              onLoad={() => setAvatarLoaded(true)}
              src={avatar}
              sx={{ display: isAvatarLoaded ? "flex" : "none" }}
            />
          ) : (
            <Avatar
              onClick={handleOpenMenu}
              onLoad={() => setAvatarLoaded(true)}
              src=""
            />
          )}
        </>
      )}

      {!me && (
        <>
          <UserMenuButton onClick={handleOpenMenu}>
            <MoreVerIcon />
          </UserMenuButton>
          <SignInButton />
        </>
      )}

      <div>
        {isMenuOpened && (
          <Fade in style={{ transitionDuration: "200ms" }}>
            <div ref={menuRef}>
              <UserMenu />
            </div>
          </Fade>
        )}
      </div>
    </UserPanelContainer>
  );
}

export default UserPanel;
