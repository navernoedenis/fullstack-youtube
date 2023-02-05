import React, { useReducer } from "react";
import ModalShadow from "components/modal-shadow";
import UploadVideoModal from "./upload-video-modal";
import { IconButton, Icon } from "./styles";

function UploadVideo() {
  const [showUploadMenu, toggleUploadMenu] = useReducer((prev) => !prev, false);

  return (
    <>
      <IconButton onClick={toggleUploadMenu}>
        <Icon />
      </IconButton>

      {showUploadMenu && (
        <ModalShadow>
          <UploadVideoModal onClose={toggleUploadMenu} />
        </ModalShadow>
      )}
    </>
  );
}

export default UploadVideo;
