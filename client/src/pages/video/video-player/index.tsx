import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addVideoView } from "api/video";
import useVideo from "hooks/useVideo";

import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PauseIcon from "@mui/icons-material/Pause";
import PlayIcon from "@mui/icons-material/PlayArrow";
import VolumeIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

import {
  Buttons,
  IconButton,
  LeftButtons,
  Management,
  Progress,
  ProgressBar,
  RightButtons,
  TimeDuration,
  Video,
  VideoPlayerContainer,
  Volume,
  VolumeBar,
  Wrapper,
} from "./styles";

interface VideoPlayerProps {
  videoId: string;
  videoUrl: string;
}

function VideoPlayer({ videoId, videoUrl }: VideoPlayerProps) {
  const [isVideoViewed, setVideoViewed] = useState(false);

  const {
    changeCurrentTime,
    changeVolume,
    currentTime,
    isMuted,
    isPlaying,
    progress,
    progressBarRef,
    toggleFullscreen,
    toggleMute,
    togglePlay,
    totalTime,
    videoRef,
    volume,
    volumeBarRef,
  } = useVideo();

  const { mutate: addVideoViewMutate } = useMutation(addVideoView);

  const onVideoEnded = () => {
    togglePlay();
    setVideoViewed(false);
  };

  const onStartPlayingAndAddView = () => {
    if (!isVideoViewed) {
      setVideoViewed(true);
      addVideoViewMutate(videoId);
    }
  };

  return (
    <VideoPlayerContainer>
      <Wrapper>
        <Video
          muted={isMuted}
          onEnded={onVideoEnded}
          onPlay={onStartPlayingAndAddView}
          playsInline
          ref={videoRef}
          src={videoUrl}
        />

        <Management className="management">
          <Progress onClick={changeCurrentTime} ref={progressBarRef}>
            <ProgressBar sx={{ width: `${progress}%` }} />
          </Progress>

          <Buttons>
            <LeftButtons>
              <IconButton onClick={togglePlay}>
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </IconButton>

              <IconButton onClick={toggleMute}>
                {isMuted ? <VolumeOffIcon /> : <VolumeIcon />}
              </IconButton>

              <Volume
                className="volume"
                onClick={changeVolume}
                ref={volumeBarRef}
              >
                <VolumeBar sx={{ width: `${volume * 100}%` }} />
              </Volume>

              <TimeDuration>
                {currentTime} / {totalTime}
              </TimeDuration>
            </LeftButtons>

            <RightButtons>
              <IconButton onClick={toggleFullscreen}>
                <FullscreenIcon />
              </IconButton>
            </RightButtons>
          </Buttons>
        </Management>
      </Wrapper>
    </VideoPlayerContainer>
  );
}

export default VideoPlayer;
