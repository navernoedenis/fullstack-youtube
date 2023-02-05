import React, { useReducer } from "react";
import { User } from "types/user";
import {
  UserInfoContainer,
  Avatar,
  AvatarSkeleton,
  Info,
  Username,
  Email,
} from "./styles";

interface UserInfoProps {
  me: User;
}

function UserInfo({ me }: UserInfoProps) {
  const { avatar } = me.profile;

  const [isAvatarLoaded, toggleAvatarLoaded] = useReducer(
    (prev) => !prev,
    false
  );

  return (
    <UserInfoContainer>
      {avatar && !isAvatarLoaded && <AvatarSkeleton variant="circular" />}
      {avatar ? (
        <Avatar
          onLoad={toggleAvatarLoaded}
          src={avatar}
          sx={{ display: isAvatarLoaded ? "flex" : "none" }}
        />
      ) : (
        <Avatar src="" />
      )}
      <Info>
        <Username>{me.profile.username}</Username>
        <Email>{me.email}</Email>
      </Info>
    </UserInfoContainer>
  );
}

export default UserInfo;
