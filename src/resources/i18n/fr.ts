export const langResource = {
    common: {
        toast: {
            noCityTitle: 'Aucune ville sélectionnée',
            noCityMessage: 'vous devez sélectionner une ville pour acceder a la météo',
            favoriteAddedTitle: 'Favori ajouté !',
            favoriteAddedMessage: (city: string) => `vous avez ajouté ${city} a vos favoris, consultez sa météo a tout moment`,
            favoriteDeletedTitle: 'Favori supprimé !',
            favoriteDeletedMessage: (city: string) => `vous avez supprimé ${city}`

        },
    },
    hello: {
        splashMessage1: 'Bienvenu sur WeatherApp',
        splashMessage2: 'Ceci est une appli de test',
        chooseCity: 'Choisissez une ville',
    },
    home: {
        toast: {

        }
    }
}