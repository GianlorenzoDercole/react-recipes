

import {
    useState,
    useEffect
} from 'react'
import Label from './Label'
export default function Recipe() {

    const [input, setInput] = useState('pie')
    const [recipes, setRecipes] = useState([])

    useEffect(() => {

        fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${input}&app_id=750505cc&app_key=4d9f46de2a4199d804217a16f108cf24`)
        .then(res => res.json())
        .then(information => {

            const recipeData = information.hits
            console.log(recipeData)
            setRecipes(recipeData)


        })
    }, [input])



    const recipeLabels = recipes.map((recipeLabel, idx) => {
        return (
            <div>
                <Label key={`key${idx}`} recipeLabel={recipeLabel}/>
            </div>
        )
    })
        console.log(recipes)
    return (
        <div>
            <div className='inputAndTitle'>
                <h1>Recipe Finder</h1>

                <div>

                    <form >
                        <label htmlFor='name-input'> </label>
                        <input
                            type='text'
                            id='name-input'
                            value={input}
                            onChange={(e) => { setInput(e.target.value)}}
                        />
                    </form>
                </div>
                <h2>search an ingredient or dish for recipes</h2>
            </div>


            <div className='recipes'>
                {recipeLabels}
            </div>


        </div>

    )
}
