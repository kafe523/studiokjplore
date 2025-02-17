import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";
import * as std_csv from "@std/csv";

const dump = defineCollection({
  loader: file("src/data/dump.tsv", {
    parser: (text) => {
      const dumpResult = std_csv.parse(text, {
        separator: "\t",
        trimLeadingSpace: true,
        columns: ["n", "c", "ch", "s"],
      });

      // I don't why have to unwrap, but it works.
      // somehow it become an Array.
      return { ...dumpResult };
    },
  }),
  schema: z.object({
    n: z.string(),
    c: z.string(),
    ch: z.string(),
    s: z.string(),
  }),
});

const dump_2 = defineCollection({
  loader: file("src/data/dump_2.tsv", {
    parser: (text) => {
      const dumpResult = std_csv.parse(text, {
        separator: "\t",
        trimLeadingSpace: true,
        columns: ["n", "nh", "c", "ch"],
      });

      // I don't why have to unwrap, but it works.
      // somehow it become an Array.
      return { ...dumpResult };
    },
  }),
  schema: z.object({
    n: z.string(),
    nh: z.string(),
    c: z.string(),
    ch: z.string(),
  }),
});

export const collections = { dump, dump_2 };
