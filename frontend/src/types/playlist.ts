import type { VideoObject } from "./objects";

export interface PlaylistData {
    type: "playlist",
    title: string,
    playlistId: string,
    playlistThumbnail: string,
    author: string,
    authorId: string,
    authorUrl: string,
    authorVerified: boolean,
    videoCount: number,
    videos: VideoObject[],
}