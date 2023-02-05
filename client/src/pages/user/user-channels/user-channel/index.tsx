import React from "react";
import SubscribeButton from "components/subscribe-button";
import { User } from "types/user";
import {
  Avatar,
  Subscribers,
  UserChannelContainer,
  UserLink,
  Username,
} from "./styles";

interface UserChannelsProps {
  user: User;
}

function UserChannel({ user }: UserChannelsProps) {
  return (
    <UserChannelContainer>
      <UserLink to={`/user/${user.profile.username}`}>
        <Avatar src={user.profile.avatar || ""} />
        <Username>{user.profile.username}</Username>
        <Subscribers>{user.statistic.subscribers} subscribers</Subscribers>
      </UserLink>
      <SubscribeButton user={user} />
    </UserChannelContainer>
  );
}

export default UserChannel;
