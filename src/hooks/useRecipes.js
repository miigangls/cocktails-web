import React, {useState, useEffect} from 'react';
import { fetchRecipe, fetchPopular } from '../fetch'
import Recipe from '../components/recipe'

function UseRecipe(props) { 
    const [useRecipe, stateRecipe ] = useState([])
    useEffect(() => {
        const fetchRecipes = async () => {

            let dataRecipe = await fetchRecipe(props.ingredient, props.category)
            stateRecipe(dataRecipe)

        }
        fetchRecipes();
    }, [{props}]);
  return (<div className="row mt-5">
        {useRecipe.map(recipe => (
                <Recipe 
                    key={recipe.id}
                    recipe={recipe}
                />
            ))}
    </div>
  );
}

export default UseRecipe
/*
*/ 