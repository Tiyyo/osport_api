const associateStringToNumber = (str) => {
    switch (str.toLowerCase()) {
        case 'beginner':
            return 2;
        case 'intermediate':
            return 5;
        case 'advanced':
            return 8;
        default:
            return 5;
    }
};
export default associateStringToNumber;
