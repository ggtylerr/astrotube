// TODO: Figure out if there's a way to not require 
// ../config.ts to exist for the script to function
import * as hostConfig from "../config.ts";

export let invapi: string = hostConfig.invapi ?? "https://iv.ggtyler.dev";
export let theme: string = hostConfig.theme ?? "dark";
export let domain: string = hostConfig.host ?? "http://localhost:4321";