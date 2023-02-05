import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminPage from "pages/admin";
import HomePage from "pages/home";
import LikedVideos from "pages/liked-videos";
import MySubscriptionsPage from "pages/my-subscriptions";
import MyVideosPage from "pages/my-videos";
import ResultPage from "pages/result";
import UserPage from "pages/user";
import VideoPage from "pages/video";

import Aside from "components/aside";
import Drawer from "components/drawer";
import Header from "components/header";
import LoginAndRegister from "components/login-and-register";
import ModalShadow from "components/modal-shadow";

import AdminRoutes from "guards/admin-routes";
import MainLayout from "layouts/main";
import useChangeLocation from "hooks/useChangeLocation";

import { useAuth, useSettings } from "context";
import { AsideContainer } from "./styles";

function App() {
  const { me, showAuthModal, toggleAuthModal } = useAuth();
  const { isAsideOpen, isMobile, setAsideOpen, toggleAside } = useSettings();

  useChangeLocation({
    condition: isMobile,
    callback: () => setAsideOpen(false),
  });

  return (
    <>
      {isMobile ? (
        <Drawer isOpen={isAsideOpen} onToggleAside={toggleAside} />
      ) : (
        <AsideContainer isOpen={isAsideOpen}>
          <Aside />
        </AsideContainer>
      )}
      <Header />
      <MainLayout>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/my-subscriptions" element={<MySubscriptionsPage />} />
          <Route path="/my-videos" element={<MyVideosPage />} />
          <Route path="/liked-videos" element={<LikedVideos />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/user/:username/*" element={<UserPage />} />
          <Route path="/video/:videoId" element={<VideoPage />} />

          <Route
            path="/admin/*"
            element={
              <AdminRoutes>
                <AdminPage />
              </AdminRoutes>
            }
          />
        </Routes>
      </MainLayout>

      {showAuthModal && !me && (
        <ModalShadow>
          <LoginAndRegister onClose={toggleAuthModal} />
        </ModalShadow>
      )}
    </>
  );
}

export default App;
