import React, { useEffect, useState }from 'react';
import Header from '../components/header'
import UseCategory from '../hooks/useCategory' 
import UserRecipes from '../hooks/useRecipes'

function App() {

  const  [useSearch, saveSearch ] = useState({name: '', category: ''})

  const onSubmit = e => {
    saveSearch({
        ...useSearch,
        [e.target.name] : e.target.value
    })
  }

  return (
    <div className="App">
      <Header />
      <form className="col-12" >
        <fieldset className="text-center" style={{marginTop:10}}>
            <legend>Busca bebidas por Categoría o Ingrediente</legend>
        </fieldset>

        <div className="row mt-4">
            <div className="input-group mb-3 " style={{margin: "0 3rem"}}>
              <input onChange={onSubmit} name="name" className="form-control"  type="text" placeholder="Buscar por Ingrediente"/>
              <UseCategory onChange={onSubmit} className="form-control" name="category" />
              <div className="input-group-append">
                <button type="button" className="btn btn-block btn-danger" >Buscar</button>
              </div>
            </div>
        </div>
      </form>
      <UserRecipes ingredient={useSearch.name}  category={useSearch.category} />
    </div>
  );
}

export default App;
