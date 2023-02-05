import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AllVideosPage from "./all-videos";
import EditVideoPage from "./edit-video";

import { AdminPageContainer } from "./styles";

function AdminPage() {
  return (
    <AdminPageContainer>
      <Routes>
        <Route index element={<AllVideosPage />} />
        <Route path="video/:id/edit" element={<EditVideoPage />} />
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </AdminPageContainer>
  );
}

export default AdminPage;
