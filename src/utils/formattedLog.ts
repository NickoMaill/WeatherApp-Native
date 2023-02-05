export const formattedLog = (obj: any) => {
    const json = JSON.stringify(obj, null, 2);
    console.log(json);
};
