export const getDate = (timestamp: number | string) => {
    if (typeof timestamp === 'string') {
        return new Date(timestamp).toLocaleDateString();
    }
    return new Date(timestamp * 1000).toLocaleDateString();
};