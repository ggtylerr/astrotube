import { HttpRequest } from "uWebSockets.js";

export const getQuery = (req: HttpRequest, name?: string): {} => {
    let queryString = req.getQuery();
    if (!queryString) {
        return {};
    } else {
        const query = {};
        const params = queryString.split("&");
        for (let i = 0; i < params.length; i++) {
            const param = params[i].split("=");
            if (param[0] && param[1]) {
                query[param[0]] = decodeURIComponent(param[1]);
            }
        }
        if (name) {
            return query[name];
        } else {
            return query;
        }
    }
}
