import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export function VideoThumbnailSkeleton() {
  return (
    <Skeleton
      className="video-link-thumbnail"
      sx={{
        flexShrink: "0",
        borderRadius: "10px",

        height: "100%",
        width: "100%",
      }}
    />
  );
}

export function VideoAuthorImageSkeleton() {
  return (
    <Skeleton
      className="video-link-avatar"
      sx={{
        marginRight: "14px",
        flexShrink: "0",
        height: "36px",
        width: "36px",
      }}
      variant="circular"
    />
  );
}

function VideoLinkSkeleton() {
  return (
    <Box className="video-link">
      <VideoThumbnailSkeleton />
      <Box
        className="video-link-information"
        sx={{ marginTop: "10px", display: "flex", width: "100%" }}
      >
        <VideoAuthorImageSkeleton />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Skeleton
            className="video-link-title"
            sx={{ height: "16px", width: "80%" }}
          />
          <Skeleton sx={{ marginTop: "7px", height: "12px", width: "55%" }} />
          <Skeleton sx={{ marginTop: "7px", height: "12px", width: "88%" }} />
        </Box>
      </Box>
    </Box>
  );
}

export default VideoLinkSkeleton;
