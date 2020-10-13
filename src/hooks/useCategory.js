import React, {useState, useEffect} from 'react';
import {fetchCategory} from '../fetch'

function UseCategory(props) { 
    let {onChange} = props
    const [ useCategory, stateCategory] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const CATEGORIES = await fetchCategory()
            let data  = CATEGORIES.map(key => ({value: key.strCategory, name: key.strCategory}))
            stateCategory(data)
        }
        fetchCategories();
    }, []);

  return (
    <select onChange={onChange} className="form-control" name={props.name} >
      <option value="">-- Selecciona Categoría --</option>
      {
        useCategory.map(({value, name}) => (
            <option key={value} value={value} >{name}</option>
        ))
      }
    </select>
  );
}

export default UseCategory