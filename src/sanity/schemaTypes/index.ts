import { type SchemaTypeDefinition } from "sanity";
import { seoType } from "./seoType";
import { pageType } from "./pageType";
import { projectType } from "./projectType";

export const schemaTypes: SchemaTypeDefinition[] = [
  seoType,
  pageType,
  projectType,
];
