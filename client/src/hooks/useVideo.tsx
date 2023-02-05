import { useState, useCallback, useEffect, useRef, MouseEvent } from "react";

function useVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const volumeBarRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setPlaying] = useState(false);
  const [isMuted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [totalTime, setTotalTime] = useState("00:00");
  const [duration, setDuration] = useState(0);

  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(volume);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  }, [isPlaying]);

  const toggleMute = () => {
    if (!videoRef.current) return;

    if (isMuted) {
      setMuted(false);
      setVolume(prevVolume);
      videoRef.current.volume = prevVolume;
    } else {
      setMuted(true);
      setPrevVolume(volume);
      setVolume(0);
    }
  };

  const toggleFullscreen = () => {
    videoRef.current?.requestFullscreen();
  };

  const fixTimeDuration = (duration: number) => {
    return duration < 10 ? `0${duration}` : duration;
  };

  const changeVolume = (event: MouseEvent<HTMLDivElement>) => {
    if (!volumeBarRef.current || !videoRef.current) return;

    const { offsetX } = event.nativeEvent;
    const { clientWidth } = volumeBarRef.current;

    const volume = +(offsetX / clientWidth).toFixed(1);
    videoRef.current.volume = volume;

    setVolume(volume);
    setMuted(volume === 0.0);
  };

  const changeCurrentTime = (event: MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressBarRef.current) return;

    const video = videoRef.current;
    const { offsetX } = event.nativeEvent;
    const { clientWidth } = progressBarRef.current;

    video.currentTime = (offsetX / clientWidth) * video.duration;
  };

  const getVideoTime = useCallback((duration: number) => {
    let time = "";

    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);

    if (hours) {
      time += `:${fixTimeDuration(hours)}`;
    }

    time += `:${fixTimeDuration(minutes)}`;
    time += `:${fixTimeDuration(seconds)}`;

    return time.slice(1);
  }, []);

  const onTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    const currentTime = Math.floor(video.currentTime);
    const progress = Math.round((video.currentTime / video.duration) * 100);

    setCurrentTime(getVideoTime(currentTime));
    setProgress(progress);
  }, [getVideoTime]);

  useEffect(() => {
    if (!videoRef.current) return undefined;
    const video = videoRef.current;

    const onLoadMetaData = () => {
      setDuration(video.duration);
      setTotalTime(getVideoTime(video.duration));
    };

    const resetVideo = () => {
      video.currentTime = 0;
    };

    video.addEventListener("click", togglePlay);
    video.addEventListener("ended", resetVideo);
    video.addEventListener("loadedmetadata", onLoadMetaData);
    video.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      video.removeEventListener("click", togglePlay);
      video.removeEventListener("ended", resetVideo);
      video.removeEventListener("loadedmetadata", onLoadMetaData);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [getVideoTime, onTimeUpdate, togglePlay, videoRef]);

  return {
    changeCurrentTime,
    changeVolume,
    currentTime,
    duration,
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
  };
}

export default useVideo;
