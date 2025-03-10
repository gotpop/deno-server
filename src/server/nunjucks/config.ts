import { componentCss } from "./filters/component-css.ts";
import { configure } from "https://esm.sh/nunjucks@3.2.4";
import { importCss } from "./filters/import-css.ts";
import { isActive } from "./filters/is-active.ts";

const TEMPLATES_DIR = "./src/templates";

export const templateConfig = {
  componentPath: "/src/templates/components",
};

export function setupNunjucks() {
  // Configure Nunjucks
  const nunjucks = configure(TEMPLATES_DIR, {
    autoescape: true,
    noCache: true, // Disable cache for development
  });

  // Add filters
  nunjucks.addFilter("importCss", importCss);
  nunjucks.addFilter("componentCss", componentCss);
  nunjucks.addFilter("isActive", isActive);

  nunjucks.addFilter("debug", function (obj) {
    return JSON.stringify(obj, null, 2);
  });

  nunjucks.addGlobal(
    "loadData",
    async (filepath: string, exportName: string) => {
      const module = await import(filepath);
      console.log("module :", module);
      return module[exportName];
    }
  );

  // Add the getJsonData function to the environment
  nunjucks.addGlobal("getJsonData", async (path: string) => {
    try {
      const data = await Deno.readTextFile(path);
      console.log("data :", data);
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading JSON data:", error);
      return null;
    }
  });

  return nunjucks;
}
