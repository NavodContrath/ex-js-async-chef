/* 
Consegna
In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id).
Questa funzione accetta un id di una ricetta e deve:
Recuperare la ricetta da https://dummyjson.com/recipes/{id}
Estrarre la proprietà userId dalla ricetta
Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
Restituire la data di nascita dello chef

Note del docente
Scrivi la funzione getChefBirthday(id), che deve:
Essere asincrona (async).
Utilizzare await per chiamare le API.
Restituire una Promise con la data di nascita dello chef.
Gestire gli errori con try/catch

Esempio di utilizzo
getChefBirthday(1)
  .then(birthday => console.log("Data di nascita dello chef:", birthday))
  .catch(error => console.error("Errore:", error.message));
Esempio di output atteso
Data di nascita dello chef: 1990-06-15
🎯 Bonus 1
Attualmente, se la prima richiesta non trova una ricetta, 
la seconda richiesta potrebbe comunque essere eseguita causando errori a cascata.
Modifica getChefBirthday(id) per intercettare eventuali errori prima di fare la seconda richiesta.
🎯 Bonus 2
Utilizza la libreria dayjs per formattare la data di nascita nel formato giorno/mese/anno.
*/
//funzione generica per il fetching con async/await
async function fetchJson(url) {
    const response = await fetch(url)
    const object = await response.json()
    return object
}
//funzione per il recupero della data di compleanno
const getChefBirthday = async (id) => {
    let recipes
    try {
        recipes = await fetchJson(`https://dummyjson.com/recipes/${id}`)

    } catch (error) {
        throw new Error(`recipe with id ${id} was not found`)
    }
    if (recipes.message) {
        throw new Error(recipes.message)
    }

    let user
    try {
        user = await fetchJson(`https://dummyjson.com/users/${recipes.userId}`)
    } catch (error) {
        throw new Error(`user with recipeUserId ${recipes.userId} was not found`)
    }
    if (user.message) {
        throw new Error(user.message)
    }
    return dayjs(user.birthDate).format('DD/MM/YYYY')
}
//funzione anonima per utilizzo
(async () => {
    try {
        const recipes = await getChefBirthday(1)
        console.log(recipes)
    } catch (error) {
        console.error(error)
    } finally {
        console.log("fine codice")
    }

})()



