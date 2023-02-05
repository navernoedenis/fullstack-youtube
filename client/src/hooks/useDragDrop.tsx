import { useEffect, ChangeEvent, useRef } from "react";

function useDragDrop(onDrop: (file: File) => void, dropAreaBgColor = "") {
  const dropAreaRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const selectFile = () => {
    inputRef?.current?.click();
  };

  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files?.length) {
      const file = files[0];
      onDrop(file);
    }
  };

  const onDragOver = (event: globalThis.DragEvent) => {
    event.preventDefault();

    if (dropAreaRef.current && dropAreaBgColor) {
      dropAreaRef.current.style.backgroundColor = dropAreaBgColor;
    }
  };

  const onDragLeave = () => {
    if (dropAreaRef.current && dropAreaBgColor) {
      dropAreaRef.current.style.backgroundColor = "";
    }
  };

  const onDragDrop = (event: globalThis.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];

    if (file) {
      onDrop(file);
      event.dataTransfer.clearData();
    }

    onDragLeave();
  };

  useEffect(() => {
    const dropArea = dropAreaRef.current;
    if (!dropArea) return undefined;

    dropArea.addEventListener("dragover", onDragOver);
    dropArea.addEventListener("dragleave", onDragLeave);
    dropArea.addEventListener("drop", onDragDrop);

    return () => {
      dropArea.removeEventListener("dragover", onDragOver);
      dropArea.removeEventListener("dragleave", onDragLeave);
      dropArea.removeEventListener("drop", onDragDrop);
    };
  });

  return { dropAreaRef, inputRef, selectFile, onSelectFile };
}

export default useDragDrop;
