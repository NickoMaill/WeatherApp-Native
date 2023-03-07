class StylesResources {
    constructor() {}

    // public --> start region /////////////////////////////////////////////
    public get color() {
        return {
            black: '#0D0D0D',
            customBlack: '#1F1F1F',
            white: '#ffffff',
            blue: '#00A8F4',
            violet: '#673AB6',
            warn: '#ed9c10',
            transparent: '#00000000',
        };
    }
    public get favoritesColor() {
        return ['#00A8F4', '#CDDC39', '#607D8A', '#00A8F4', '#673AB6', '#ed9c10', '#ed577d', '#3f3c1a'];
    }
    // public --> end region ///////////////////////////////////////////////

    // private --> start region ////////////////////////////////////////////
    // private --> end region //////////////////////////////////////////////
}
export default new StylesResources();
