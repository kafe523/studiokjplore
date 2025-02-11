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

export const collections = { dump };
