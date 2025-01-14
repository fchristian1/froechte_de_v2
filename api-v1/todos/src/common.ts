import fs from "fs";
import crypto from "crypto";
import { NextFunction, Request, Response } from "express";

export const middleware1Auth = (req: Request, res: Response, next: NextFunction) => {
    // token without bearer
    let token = req.headers.authorization?.split(" ")[1];
    req.body.userid = token;
    next();
};
export const middleware2Auth = (req: Request, res: Response, next: NextFunction) => {
    next();
};
export const checkAndCreatePath = (path: string) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, {
            recursive: true,
        });
    }
};

export const createToken = () => {
    return crypto.randomUUID().replace(/-/g, "");
};
export const hashPassword = (password: string, salt: string): string => {
    const hmac = crypto.createHmac("sha256", "secret");
    hmac.update(password + salt);
    return hmac.digest("hex");
};
export const checkToken = (token: string): string => {
    accData.logins?.forEach((login) => {
        if (login.token === token) {
            return login.userId;
        }
    });
    return "";
};
export const createUser = (username: string, password: string) => {
    const date = Date.now();
    const id = crypto.randomUUID();
    const passwordHash = hashPassword(password, date.toString());
    let user = accData.users?.find((user) => user.username === username);
    if (user) {
        return;
    }
    accData.users?.push({
        id: id,
        username: username,
        passwordHash: passwordHash,
        dateUnixString: date.toString(),
    });
    console.log(accData);
    dataSet(accData);
};

export const login = (username: string, password: string) => {
    //username in data
    let user = accData.users?.find((user) => user.username === username);
    if (!user) {
        return;
    }
    //password match
    let passwordHash = hashPassword(password, user.dateUnixString);
    if (user.passwordHash !== passwordHash) {
        return;
    }
    //create token
    let token = createToken();
    //add token to data
    let login = accData.logins?.find((login) => login.userId === user.id);
    if (login) {
        login.token = token;
    }
    if (!login) {
        accData.logins?.push({
            id: crypto.randomUUID(),
            userId: user.id,
            token: token,
        });
    }
    dataSet(accData);
    return token;
};
export const getUserIdByToken = (token: string) => {
    let login = accData.logins?.find((login) => login.token === token);
    if (login) {
        return login.userId;
    }
    return "";
};
export type Data = {
    users?: {
        id: string;
        username: string;
        passwordHash: string;
        dateUnixString: string;
    }[];
    logins?: {
        id: string;
        userId: string;
        token: string;
    }[];
};

let accData: Data;

export const dataSet = (data: Data) => {
    fs.writeFileSync("./data/data.json", JSON.stringify(data, null, 2));
    accData = data;
};
export const dataGet = () => {
    accData = JSON.parse(fs.readFileSync("./data/data.json", "utf-8"));
};
export const checkDataFile = () => {
    //check path
    checkAndCreatePath("./data");
    //check file
    if (!fs.existsSync("./data/data.json")) {
        dataSet({
            users: [],
            logins: [],
        });
    }
};
checkDataFile();
dataGet();
createUser("admin", "admin");
createUser("user", "user");
