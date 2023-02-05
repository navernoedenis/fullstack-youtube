import React from "react";
import { useAuth } from "context/auth";

import SignInButton from "components/sign-in-button";
import CustomScrollbar from "components/custom-scrollbar";

import MyPanel from "./my-panel";
import MySubscriptions from "./my-subscriptions";

import { AsideContainer, SignInButtonContainer } from "./styles";

function Aside() {
  const { me } = useAuth();

  return (
    <AsideContainer>
      <CustomScrollbar>
        <MyPanel />
        {me && <MySubscriptions me={me} />}

        {!me && (
          <SignInButtonContainer>
            <SignInButton />
          </SignInButtonContainer>
        )}
      </CustomScrollbar>
    </AsideContainer>
  );
}

export default Aside;
