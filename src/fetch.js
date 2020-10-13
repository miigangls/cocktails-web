
import axios from 'axios'

const serverIPAdrress  = 'https://www.thecocktaildb.com/api/json/v1/1'
/**
 * Created by: Miguel Angel Mendoza Cardenas -  @miigangls
 */
export async function fetchCategory () {
    return await new Promise( (resolve, reject) => {
        axios.get(`${serverIPAdrress}/list.php?c=list`).then((response) => {
            if (!response.data) return console.log('ERROR DATOS');
            resolve(response.data.drinks)
        }).catch(e => console.log(e.message) )
    })
}


/**
 * Created by: Miguel Angel Mendoza Cardenas. -  @miigangls
 * @param {*} ingredient
 * @param {*} category 
 */
export async function fetchRecipe(ingredient, category) {
    return  await new Promise ((resolve, reject)=> {
        axios.get(`${serverIPAdrress}/filter.php?i=${ingredient}&c=${category}`).then((response) => {
            if (!response.data) return console.log('ERROR DATOS');
            let {drinks} =  response.data
            let data = []
            drinks.forEach(({idDrink, strDrink, strDrinkThumb}) => {
                data.push({id: idDrink, drink: strDrink, img: strDrinkThumb })
            });
            resolve(data)
        }).catch(e => console.log(e.message) )
    })
}



/**
 * Created by: Miguel Angel Mendoza Cardenas. -  @miigangls
 * @param {*} ingredient
 * @param {*} category 
 */
export async function fetchLoohup(id) {
    return await new Promise ((resolve, reject)=> {
        axios.get(`${serverIPAdrress}/lookup.php?i=${id}`).then((response) => {
            if (!response.data) return console.log('ERROR DATOS');
            resolve(response.data.drinks[0])
        }).catch(e => console.log(e.message) )
    })
}