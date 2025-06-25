import { createClient } from "next-sanity";
// We no longer need to import stegaEncodeSourceMap, so you can remove that line.
import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { token } from "./token";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token,
  stega: {
    enabled: true,
    studioUrl,
    filter: (source) => {
      // check if the field is startDate or endDate
      if (
        source.sourcePath.includes("startDate") ||
        source.sourcePath.includes("endDate")
      ) {
        // encode this field as stega
        return true;
      }

      // for other fields, do not encode stega (id slug whatever)
      return source.filterDefault(source);
    },
  },
});
