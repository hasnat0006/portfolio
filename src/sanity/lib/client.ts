import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { projectId, dataset, apiVersion, token } from "../env";

const hasConfig = !!projectId;

function createConfiguredClient(options: {
  preview?: boolean;
}): SanityClient | null {
  if (!hasConfig) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !options.preview,
    token: options.preview ? token : undefined,
    stega: {
      studioUrl: "http://localhost:3333",
      enabled: !!options.preview,
    },
  });
}

export const client = createConfiguredClient({ preview: false });
export const previewClient = createConfiguredClient({ preview: true });

const builder = hasConfig && client ? imageUrlBuilder(client) : null;

export function urlFor(source: Parameters<NonNullable<typeof builder>["image"]>[0]) {
  if (!builder) {
    throw new Error("Sanity client not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID.");
  }
  return builder.image(source);
}

export function getClient(preview?: boolean): SanityClient | null {
  return preview ? previewClient : client;
}

/**
 * Safe fetch wrapper that returns null if Sanity isn't configured.
 */
export async function safeFetch<T>(
  query: string,
  params?: Record<string, unknown>,
  options?: { stega?: boolean }
): Promise<T | null> {
  const c = client;
  if (!c) return null;

  return c.fetch<T>(query, params ?? {}, {
    stega: options?.stega ?? false,
  });
}
