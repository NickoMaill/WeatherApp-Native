export const frenchDays = (string: string) => {
    switch (string) {
        case 'Mon':
            return 'LUN';
        case 'Tue':
            return 'MAR';
        case 'Wed':
            return 'MER';
        case 'Thu':
            return 'JEU';
        case 'Fri':
            return 'VEN';
        case 'Sat':
            return 'SAM';
        case 'Sun':
            return 'DIM';
        default:
            break;
    }
};
