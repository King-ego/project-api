export const removeNullOrUndefinedKeys = (obj: any): any => {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in obj) {
        if (obj[key] === null || obj[key] === undefined) {
            // eslint-disable-next-line no-param-reassign
            delete obj[key];
        }
    }

    return obj;
};