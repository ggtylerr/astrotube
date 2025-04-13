import { Innertube } from "youtubei.js";
import { JSDOM } from "jsdom";
// @ts-ignore (cause TS is dumb and thinks its cjs for this one specific pkg)
import { BG } from "bgutils-js";
// @ts-ignore
import type { BgConfig } from "bgutils-js";

/**
 * Creates a new Innertube client. Adapted from BgUtils and Invidious Companion.
 * Sources:
 * - https://github.com/LuanRT/BgUtils/blob/main/examples/node/index.ts
 * - https://github.com/iv-org/invidious-companion/blob/master/src/lib/jobs/potoken.ts
 */
export const createClient = async (): Promise<Innertube> =>  {
    const requestKey = "O43z0dpjhgX20SCx4KAo";
    let client = await Innertube.create({ retrieve_player: false });
    const visitorData = client.session.context.client.visitorData;
    if (!visitorData) throw new Error("Couldn't get visitor data :(");

    const dom = new JSDOM();
    Object.assign(globalThis, {
        window: dom.window,
        document: dom.window.document
    });

    const bgConfig: BgConfig = {
        fetch: (input: string | URL | globalThis.Request, init?: RequestInit) => fetch(input, init),
        globalObj: globalThis,
        identifier: visitorData,
        requestKey
    };
    const challenge = await BG.Challenge.create(bgConfig);
    if (!challenge) throw new Error('Could not get challenge');

    // I love long variable names!!!
    const interpreterJavascript = challenge.interpreterJavascript.privateDoNotAccessOrElseSafeScriptWrappedValue;
    if (interpreterJavascript) new Function(interpreterJavascript)();
    else throw new Error('Could not load VM');

    const result = await BG.PoToken.generate({
        program: challenge.program,
        globalName: challenge.globalName,
        bgConfig
    });

    BG.PoToken.generatePlaceholder(visitorData);

    return Innertube.create({
        po_token: result.poToken,
        visitor_data: visitorData,
        generate_session_locally: true
    });
}
