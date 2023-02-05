export function replaceUrlFileExtension(url: string, ext: "jpg" | "png") {
  return url.replace(/\.[^/.]+$/, `.${ext}`);
}

export function checkFileType(file: File, type: "image" | "video") {
  return file.type.startsWith(type);
}
