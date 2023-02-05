import React from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getUserByUsername } from "api/user";

import UserAbout from "./user-about";
import UserChannels from "./user-channels";
import UserInfo from "./user-info";
import UserTabs from "./user-tabs";
import UserVideos from "./user-videos";

import { UserPageContainer, Main } from "./styles";

function UserPage() {
  const { username } = useParams<{ username: string }>();

  const { isLoading, data: user } = useQuery({
    queryKey: ["user-profile", username as string],
    queryFn: () => getUserByUsername(username as string),
  });

  if (isLoading) {
    return <h2>USER LOADING...</h2>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  const name = user.profile.username;

  return (
    <UserPageContainer>
      <UserInfo user={user} />
      <UserTabs />
      <Main>
        <Routes>
          <Route index element={<UserVideos username={name} />} />
          <Route path="videos" element={<UserVideos username={name} />} />
          <Route path="channels" element={<UserChannels username={name} />} />
          <Route path="about" element={<UserAbout user={user} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Main>
    </UserPageContainer>
  );
}

export default UserPage;
