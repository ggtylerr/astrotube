import { Innertube } from "youtubei.js";

declare global {
    namespace NodeJS {
        interface Global {
            client: Innertube;
        }
    }
}
