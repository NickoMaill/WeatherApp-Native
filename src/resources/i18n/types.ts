export type TranslationResourcesType = {
    common: {
        toast: {
            noCityTitle;
            noCityMessage;
            favoriteAddedTitle;
            favoriteAddedMessage;
            favoriteDeletedTitle;
            favoriteDeletedMessage;
        };
        yes;
        no;
    };
    hello: {
        splashMessage1;
        splashMessage2;
        chooseCity;
    };
    home: {
        toast: {};
    };
    favorites: {
        yourFavorites;
        toast: {
            deletedTitle;
            deletedContent;
        };
    };
    setup: {
        title;
        about;
        defaultCity: {
            title;
            modalTitle;
            citySample;
            preventTitle;
            preventMessage;
        };
        defaultUnits;
        languageSelection;
        toast: {
            successLanguage;
            successUnits;
            successCity;
        };
    };
};
