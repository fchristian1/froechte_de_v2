import fs from "fs";
export const checkAndCreatePath = (path: string) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, {
            recursive: true,
        });
    }
};
