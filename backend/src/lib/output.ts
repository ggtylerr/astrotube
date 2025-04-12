import { YT, YTNodes, Misc } from "youtubei.js";
import type { AuthorStub } from "output";
import {debug} from "./log";

/**
 * Send a JSON object as a response
 * @param object
 */
export function obj(object: Object) {
    return JSON.stringify(object);
}

/**
 * Send an error message
 * @param message
 */
export function error(message: string) {
    return obj({error: message});
}

/**
 * Format a string that has a number with suffix (K, M, B)
 * @param text
 */
export function formatNum(text: string) {
    // replacing commas if formated like so: "1,000",
    // then matching if the number has a suffix (K, M, B)
    const match = text.replace(/,/g, '').match(/([\d.]+)([KMB]?)/i);
    if (!match) return NaN;
    const value = parseFloat(match[1]);
    const unit = match[2].toUpperCase();
    switch (unit) {
        case "K": return value * 1e3;
        case "M": return value * 1e6;
        case "B": return value * 1e9;
        default: return value;
    }
}

/**
 * Format a date string to a Unix timestamp
 * @param text
 */
export function formatDate(text: string) {
    return Math.floor(new Date(text.trim()).getTime() / 1000);
}

/**
 * Format a string that has a length of time (e.g. "1 hour ago")
 * @param text
 */
export function formatLength(text: string) {
    const now = new Date();
    const parts = text.split(" ");

    if (parts.length < 3 || parts[2] !== "ago") return NaN;

    const amount = parseInt(parts[0]);
    const unit = parts[1].toLowerCase();
    if (isNaN(amount)) return NaN;
    let ms = 0;

    switch (unit) {
        case "second":
        case "seconds":
            ms = amount * 1000;
            break;
        case "minute":
        case "minutes":
            ms = amount * 60000;
            break;
        case "hour":
        case "hours":
            ms = amount * 3600000;
            break;
        case "day":
        case "days":
            ms = amount * 86400000;
            break;
        case "week":
        case "weeks":
            ms = amount * 604800000;
            break;
        case "month":
        case "months":
            ms = amount * 2628288000; // approx. 30.44 days
            break;
        case "year":
        case "years":
            ms = amount * 31536000000; // approx. 365 days
            break;
        default:
            return NaN;
    }
    return Math.floor((now.getTime() - ms) / 1000);
}

/**
 * Format a string to be HTML-compatible
 * @param text
 */
export function formatHtml(text: string) {
    return text
        .replaceAll(/</g, '&lt;')
        .replaceAll(/>/g, '&gt;')
        .replaceAll(/&/g, '&amp;')
        .replaceAll("\n","<br>")
        .replaceAll("\"","&quot;")
        .replaceAll(/'/g, '&#39;');
}

export function channelVideo(video: YTNodes.Video | YTNodes.CompactVideo |
        YTNodes.GridVideo | YTNodes.PlaylistPanelVideo | YTNodes.PlaylistVideo |
        YTNodes.ReelItem | YTNodes.ShortsLockupView | YTNodes.WatchCardCompactVideo,
        author?: AuthorStub) {

    if (!video.is(YTNodes.Video)) {
        return {
            type: "unsupported",
            title: "Unsupported video type",
            videoId: "unsupported",
            author: author.name,
            authorId: author.id,
            authorUrl: author.url,
            authorVerified: author.is_verified,
            videoThumbnails: [],
            description: "This video type is not supported",
            descriptionHtml: "This video type is not supported",
            viewCount: 0,
            viewCountText: "0",
            published: 0,
            publishedText: "0",
            lengthSeconds: 0,
            liveNow: false,
            premium: false,
            isUpcoming: false,
            isNew: false,
            is4k: false,
            is8k: false,
            isVr180: false,
            isVr360: false,
            is3d: false,
            hasCaptions: false
        }
    } else {
        if (!author) {
            author = {
                name: video.author.name,
                id: video.author.id,
                url: video.author.url,
                is_verified: video.author.is_verified
            }
        }
        let views = video.view_count ? video.view_count.toString() : "0";
        let viewsText = video.view_count ? video.view_count.toHTML() : "0 views";
        return {
            type: "video",
            title: video.title,
            videoId: video.video_id,
            author: author.name,
            authorId: author.id,
            authorUrl: author.url,
            authorVerified: author.is_verified,
            videoThumbnails: video.thumbnails,
            description: video.description,
            descriptionHtml: formatHtml(video.description), // unsupported properly
            viewCount: views,
            viewCountText: viewsText,
            published: formatLength(video.published.toString()),
            publishedText: video.published.toHTML(),
            lengthSeconds: video.duration.seconds,
            liveNow: video.is_live,
            premium: false, // unsupported
            isUpcoming: video.is_upcoming,
            isNew: false, // unsupported
            is4k: video.is_4k,
            is8k: video.is_4k, // unsupported
            isVr180: false, // unsupported
            isVr360: false, // unsupported
            is3d: false, // unsupported (most likely deprecated)
            hasCaptions: video.has_captions
        }
    }
}

export function channelRelated(channel: YTNodes.Channel | YTNodes.GridChannel) {
    let extras = {
        autoGenerated: false,
        subCount: 0,
        description: "",
        descriptionHtml: ""
    }
    if (channel.is(YTNodes.Channel)) {
        extras.subCount = formatNum(channel.subscriber_count.toString());
        extras.description = channel.description_snippet.toString();
        extras.descriptionHtml = channel.description_snippet.toHTML();
    } else {
        extras.subCount = formatNum(channel.subscribers.toString());
        // description not supported (?)
        // could possibly be done with getChannel(channel.author.id).metadata.description
        // but would need a new request per channel :sob:
    }
    if (channel.author.name.endsWith(" - Topic") ||
        ["Popular on YouTube", "Music", "Sports", "Gaming"].includes(channel.author.name)) {
        extras.autoGenerated = true
    }

    return {
        type: "channel",
        author: channel.author.name,
        authorId: channel.author.id,
        authorUrl: channel.author.url,
        authorVerified: channel.author.is_verified,
        authorThumbnails: channel.author.thumbnails,
        autoGenerated: extras.autoGenerated,
        subCount: extras.subCount,
        videoCount: formatNum(channel.video_count.toString()),
        description: extras.description,
        descriptionHtml: extras.descriptionHtml
    }
}
