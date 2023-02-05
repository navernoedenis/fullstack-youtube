import LocalStorageService from "services/local-storage";

export type ThemeSchema = "light" | "dark";

export function getAppTheme(): ThemeSchema | null {
  return LocalStorageService.get("theme") as ThemeSchema;
}

export function setAppTheme(schema: ThemeSchema): void {
  document.documentElement.setAttribute("data-theme", schema);
  LocalStorageService.set("theme", schema);
}
