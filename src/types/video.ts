// TODO: stronger typesetting
export interface VideoData {
    type: string;
    title: string;
    videoId: string;
    videoThumbnails: VideoThumbnail[]
    lengthSeconds: number;
    author: string;
    authorId: string;
    authorUrl: string;
    published: number;
    publishedText: string;
    viewCount: number;
}
export interface VideoThumbnail {
    quality: string;
    url: string;
    width: number;
    height: number;
}