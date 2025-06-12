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
*/

//funzione generica per il fetching con async/await
async function fetchJson(url) {
    const response = await fetch(url)
    const object = await response.json()
    return object
}
//funzione per il recupero della data di compleanno
const getChefBirthday = async (id) => {
    const recipes = await fetchJson(`https://dummyjson.com/recipes/${id}`)
    const user = await fetchJson(`https://dummyjson.com/users/${recipes.userId}`)
    return { ...recipes, user }
}
//funzione anonima per utilizzo
(async () => {
    const recipes = await getChefBirthday(1)
    console.log(recipes)
})()



