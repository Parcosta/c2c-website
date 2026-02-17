import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { dataset, projectId, studioUrl } from "@/sanity/config";
import { schemaTypes } from "@/sanity/schemas";

export const studioConfig = defineConfig({
  name: "default",
  title: "C2C Studio",
  projectId,
  dataset,
  basePath: studioUrl,
  plugins: [deskTool()],
  schema: { types: schemaTypes }
});

