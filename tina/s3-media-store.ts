import { Media, MediaStore, MediaListOptions, Client } from "tinacms";

export class S3MediaStore implements MediaStore {
  private client: Client;
  private apiUrl = "/api/s3/media";
  public accept = "image/*,video/*,application/pdf";

  constructor(client: Client) {
    this.client = client;
  }

  private async fetcher(input: RequestInfo, init?: RequestInit) {
    return this.client.authProvider.fetchWithToken(input, init);
  }

  private getMediaType(): "file" {
    return "file";
  }

  async persist(media: { file: File; directory: string }[]): Promise<Media[]> {
    const newFiles: Media[] = [];
    for (const item of media) {
      const { file, directory } = item;

      const presignRes = await this.fetcher(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          directory,
          fileType: file.type,
        }),
      });

      if (!presignRes.ok) {
        const error = await presignRes.json();
        throw new Error(error.message || "Failed to get presigned URL");
      }

      const { uploadURL, url, key } = await presignRes.json();

      const uploadRes = await fetch(uploadURL, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadRes.ok) {
        const errorText = await uploadRes.text();
        console.error("S3 Upload Error:", errorText);
        throw new Error("Failed to upload to S3");
      }

      newFiles.push({
        type: this.getMediaType(),
        id: key,
        filename: file.name,
        directory: directory,
        src: url,
        thumbnails: {
          "75x75": url,
          "400x400": url,
          "1000x1000": url,
        },
      });
    }
    return newFiles;
  }

  async delete(media: { id: string }) {
    const res = await this.fetcher(this.apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: media.id }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(
        error.message || `Failed to delete item in media with id: ${media.id}`
      );
    }
  }

  async list(options: MediaListOptions) {
    const { directory = "", offset, limit } = options;
    const params = new URLSearchParams();
    params.append("prefix", directory);
    if (offset) params.append("nextContinuationToken", String(offset));
    if (limit) params.append("limit", String(limit));

    const res = await this.fetcher(`${this.apiUrl}?${params.toString()}`);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to list media");
    }
    const data = await res.json();

    return {
      items: data.items,
      nextOffset: data.nextContinuationToken,
    };
  }

  async previewSrc(src: string) {
    return src;
  }
}
