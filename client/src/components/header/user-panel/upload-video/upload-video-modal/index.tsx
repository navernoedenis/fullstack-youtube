import React from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { uploadVideo } from "api/video";
import { uploadVideoFile } from "api/upload";

import { checkFileType } from "helpers/file";

import { CreateVideoData } from "types/video";
import { VideoDescriptionForm } from "types/forms";

import useDragDrop from "hooks/useDragDrop";

import SelectFile from "./select-file";
import VideoDescription from "./video-description";

import {
  Content,
  Header,
  HeaderButton,
  HeaderButtonIcon,
  HeaderTitle,
  Hint,
  HintBottomText,
  HintTopText,
  UploadVideoModalContainer,
} from "./styles";

const dropAreaActiveBgColor = "var(--upload-video-droparea-active-bg)";

interface UploadVideoModalProps {
  onClose: () => void;
}

function UploadVideoModal({ onClose }: UploadVideoModalProps) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const uploadVideoPrefix = "components.header.upload-video";

  const {
    data: videoFileData,
    isLoading: isVideoFileLoading,
    mutate: uploadVideoFileMutate,
  } = useMutation(uploadVideoFile, {
    onSuccess: () => {
      toast.success(t("toasts.video-file-uploaded"));
    },
  });

  const { isLoading: isVideoLoading, mutate: uploadVideoMutate } = useMutation(
    uploadVideo,
    {
      onSuccess: () => {
        toast.success(t("toasts.successfully"));
        queryClient.invalidateQueries({ queryKey: ["home-videos"] });
        queryClient.invalidateQueries({ queryKey: ["all-videos"] });
        onClose();
      },
    }
  );

  const onFormSubmit = (videoDescription: VideoDescriptionForm) => {
    if (!videoFileData) return;

    const videoData: CreateVideoData = {
      ...videoFileData,
      ...videoDescription,
    };

    if (!videoData.description?.length) {
      delete videoData.description;
    }

    uploadVideoMutate(videoData);
  };

  const { dropAreaRef, inputRef, onSelectFile, selectFile } = useDragDrop(
    (file: File) => {
      if (!checkFileType(file, "video")) {
        toast.error(t("toasts.check-video-file-error"));
        return;
      }
      uploadVideoFileMutate(file);
    },
    dropAreaActiveBgColor
  );

  const isLoading = isVideoFileLoading || isVideoLoading;
  const isVideoFileUploaded = Boolean(videoFileData?.url);

  return (
    <UploadVideoModalContainer>
      <Header>
        <HeaderTitle>{t(`${uploadVideoPrefix}.title`)}</HeaderTitle>
        <HeaderButton onClick={onClose}>
          <HeaderButtonIcon />
        </HeaderButton>
      </Header>
      <Content ref={dropAreaRef}>
        {isLoading && <h2>Loading...</h2>}

        {!isLoading && !isVideoFileUploaded && (
          <>
            <SelectFile selectFile={selectFile} />
            <input
              accept="video/*"
              onChange={onSelectFile}
              ref={inputRef}
              style={{ display: "none" }}
              type="file"
            />
          </>
        )}

        {!isLoading && isVideoFileUploaded && (
          <VideoDescription onFormSubmit={onFormSubmit} />
        )}
      </Content>
      <Hint>
        <HintTopText>{t(`${uploadVideoPrefix}.hint-top`)}.</HintTopText>
        <HintBottomText>{t(`${uploadVideoPrefix}.hint-bottom`)}</HintBottomText>
      </Hint>
    </UploadVideoModalContainer>
  );
}

export default UploadVideoModal;
