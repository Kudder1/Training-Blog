export const getDate = (date: number | string) => {
    if (typeof date === 'string') {
        return new Date(date).toLocaleDateString();
    }
    return new Date(date * 1000).toLocaleDateString();
};

export const isOverdue = (dealine: string) => {
    return new Date(Date.now()) > new Date(dealine)
};