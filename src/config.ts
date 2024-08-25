// TODO: Figure out if there's a way to not require 
// ../config.ts to exist for the script to function
import * as hostConfig from "../config.ts";

const config = {
    invapi: (hostConfig.invapi ?? "https://iv.ggtyler.dev") as string,
    theme: (hostConfig.theme ?? "dark") as string,
    full: (hostConfig.full ?? false) as boolean,
    lite: (hostConfig.lite ?? false) as boolean,
}

export default config;
export type ConfigType = typeof config;