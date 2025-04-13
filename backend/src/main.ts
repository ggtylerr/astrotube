import * as uWS from 'uWebSockets.js';
import channel from "./v1/routes/channel";
import { createClient } from "./lib/client";
import { default as log, error } from "./lib/log";
import { getQuery } from "./lib/http";

log("Fetching Innertube client (may take some time...)");
// @ts-ignore
global.client = await createClient();
log("Validating client...")
// @ts-ignore
const testVid = await global.client.getBasicInfo("dQw4w9WgXcQ");
if (testVid.basic_info.channel_id != "UCuAXFkgsw1L7xaCfnd5JJOw") {
    if (testVid.playability_status.status == "LOGIN_REQUIRED") error("Got YouTube block :(");
    error("Client validation failed! Please note that videos will very likely not work.");
} else {
    log("All good to go!");
}
uWS.App().get('/*', async (res, req) => {
    res.onAborted( () => res.aborted = true );

    const path = req.getUrl().slice(1).split("/");
    const query = getQuery(req);
    let response = "";
    if (path[0] == "v1") {
        // TODO: Switch to auto import instead of manual selection
        switch (path[1]) {
            case "channels":
                response = await channel(path, query);
                break;
            default:
                response = "{error:\"Invalid request\"}";
                break;
        }
    }

    if (!res.aborted) res.cork( () =>
        res.writeHeader('Content-Type', 'application/json').end(response)
    );
}).listen("0.0.0.0", 4949, (token) => {
    if (token) {
        log('Listening on port 4949');
    } else {
        error('Failed to listen to port 4949 - check if it is already in use.');
    }
});
