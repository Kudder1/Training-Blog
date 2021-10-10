export const getDate = (date: number | string) => {
    if (typeof date === 'string') {
        return new Date(date).toLocaleDateString('ru-RU');
    }
    return new Date(date * 1000).toLocaleDateString('ru-RU');
};

export const isOverdue = (dealine: string) => {
    return new Date() > new Date(dealine)
};

export const getWeekView = (weekStart: number | Date, weekEnd: number | Date) => {
    const start = new Date(weekStart).toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric' });
    const end = new Date(weekEnd).toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric' })
    return `${start} - ${end}`
}