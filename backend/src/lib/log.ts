const clr = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m',
    bgBlack: '\x1b[40m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m',
    bgWhite: '\x1b[47m',
    bgGray: '\x1b[100m',
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',
}

// TODO: Add log level based on config when that is implemented

export default (msg: any) => {
    gen(`${clr.green}[INFO]${clr.reset} ${msg.toString()}`);
}
export const warn = (msg: any) => {
    gen(`${clr.yellow}[WARN]${clr.reset} ${msg.toString()}`);
}
export const error = (msg: any) => {
    gen(`${clr.red}[ERROR]${clr.reset} ${msg.toString()}`);
}
export const debug = (msg: any) => {
    gen(`${clr.blue}[DEBUG]${clr.reset} ${msg.toString()}`);
}
export const gen = (msg: any) => {
    console.log(`${clr.gray}[${new Date().toLocaleTimeString()}]${clr.reset} ${msg.toString()}`);
}
