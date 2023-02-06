class StylesResources {
    constructor() {}
    
    // public --> start region /////////////////////////////////////////////
    public get color() {
        return {
            black: '#000000',
            white: '#ffffff',
            blue: '#00A8F4',
            violet: '#673AB6',
            warn: '',
        }
    }
    public get favoritesColor() {
        return ['#00A8F4', '#CDDC39', '#607D8A', '#00A8F4', '#673AB6', '#ed9c10', '#ed577d', '#3f3c1a'];
    }
    // public --> end region ///////////////////////////////////////////////

    // private --> start region ////////////////////////////////////////////
    // private --> end region //////////////////////////////////////////////
}
export default new StylesResources();