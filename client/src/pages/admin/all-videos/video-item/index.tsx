import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ConfirmModal from "components/confirm-modal";
import ModalShadow from "components/modal-shadow";

import { deleteVideo } from "api/video";
import { Video } from "types/video";
import {
  AuthorLink,
  DeleteButton,
  EditButton,
  InformationItem,
  InformationList,
  Manage,
  Thumnbail,
  Title,
  VideoItemContainer,
  VisitButton,
} from "./styles";

interface VideoitemProsp {
  video: Video;
}

function VideoItem({ video }: VideoitemProsp) {
  const queryClient = useQueryClient();

  const { t } = useTranslation("translation", {
    keyPrefix: "pages.admin.all-videos.video-item",
  });

  const [showDeleteModal, setDeleteModal] = useState(false);

  const onShowDeleteModal = () => {
    setDeleteModal(true);
  };

  const onHideDeleteModal = () => {
    setDeleteModal(false);
  };

  const { mutate: deleteVideoMutate } = useMutation(
    () => deleteVideo(video.id),
    {
      onSuccess: () => {
        toast.success(`${t("video-removed")}!`);
        queryClient.invalidateQueries({ queryKey: ["all-videos"] });
        queryClient.invalidateQueries({ queryKey: ["home-videos"] });
        onHideDeleteModal();
      },
    }
  );

  const navigate = useNavigate();

  return (
    <>
      <VideoItemContainer>
        <Thumnbail sx={{ backgroundImage: `url(${video.thumbnail})` }} />

        <InformationList>
          <InformationItem>
            <Title variant="caption">{t("author")}:</Title>
            <AuthorLink to={`/user/${video.user.profile.username}`}>
              {video.user.profile.username}
            </AuthorLink>
          </InformationItem>

          <InformationItem>
            <Title variant="caption">{t("title")}:</Title>
            {video.title}
          </InformationItem>

          {video.description && (
            <InformationItem>
              <Title variant="caption">{t("description")}:</Title>
              {video.description}
            </InformationItem>
          )}
        </InformationList>

        <Manage>
          <VisitButton onClick={() => navigate(`/video/${video.id}`)}>
            {t("open")}
          </VisitButton>
          <EditButton onClick={() => navigate(`video/${video.id}/edit`)}>
            {t("edit")}
          </EditButton>
          <DeleteButton onClick={onShowDeleteModal}>{t("delete")}</DeleteButton>
        </Manage>
      </VideoItemContainer>

      {showDeleteModal && (
        <ModalShadow>
          <ConfirmModal
            confirmButtonText={t("delete") as string}
            onCancel={onHideDeleteModal}
            onCofirm={deleteVideoMutate}
            text={t("modal-text")}
            title={t("modal-title") as string}
          />
        </ModalShadow>
      )}
    </>
  );
}

export default VideoItem;
