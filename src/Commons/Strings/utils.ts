export function FormatString(str: string, ...val: string[]) {

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < val.length; index++) {
        // eslint-disable-next-line no-param-reassign
        str = str.replace(`{${index}}`, val[index]);
    }
    return str;
}
