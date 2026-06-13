import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dynamicComplexity",
      title: "Dynamic Complexity",
      type: "string",
      description: 'e.g., "O(V log V + E)"',
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "productionUrl",
      title: "Production URL",
      type: "url",
    }),
    defineField({
      name: "technicalHurdles",
      title: "Technical Hurdles",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});
