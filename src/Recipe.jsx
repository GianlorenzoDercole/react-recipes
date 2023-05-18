

import axios from 'axios'
import {
    useState,
    useEffect,
    useRef,
} from 'react'

import Label from './Label'

export default function Recipe() {

    const [userInput, setUserInput] = useState('pie')
    const [recipes, setRecipes] = useState([])
    const inputEl = useRef('pie')

    useEffect(() => {

        const getRecipes = async () => {
            const responseWithInput = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${inputEl.current.value}&app_id=750505cc&app_key=4d9f46de2a4199d804217a16f108cf24`)
            const responseDefault = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=$pie&app_id=750505cc&app_key=4d9f46de2a4199d804217a16f108cf24`)
            const recipeDataInput = responseWithInput.data.hits
            const recipeDataDefault = responseDefault.data.hits

            {inputEl.current.value ? setRecipes(recipeDataInput) : setRecipes(recipeDataDefault)}

        }

        getRecipes()

    }, [inputEl.current.value])


    const handleSubmit = (e) => {
        e.preventDefault()
        setUserInput(inputEl.current.value)
    }

    const recipeLabels = recipes.map((recipeLabel, idx) => {
        return (
            <div>
                <Label key={`key${idx}`} recipeLabel={recipeLabel}/>
            </div>
        )
    })


    return (
        <div >
            <div className='inputAndTitle'>

                <h1>Recipe Finder</h1>

                <div>

                    <input ref={inputEl} type='text' />
                    <button className='searchButton' onClick={handleSubmit}>find recipes</button>
                </div>
                <h2>search an ingredient or dish for recipes</h2>
            </div>

            <div className='recipes'>
                {recipeLabels}
            </div>

        </div>

    )
}





////////////////////// Use State Solution //////////////////////////

// import {
//     useState,
//     useEffect
// } from 'react'

// import Label from './Label'

// export default function Recipe() {
//     // save user input in state
//     const [input, setInput] = useState('pie')
//     // save array of recipes to map over for pictures and ingredients
//     const [recipes, setRecipes] = useState([])
//     useEffect(() => {
//         // retrieve data from api
//         fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${input}&app_id=750505cc&app_key=4d9f46de2a4199d804217a16f108cf24`)
//         .then(res => res.json())
//         .then(information => {
//             // save array of recipes from api
//             const recipeData = information.hits
//             console.log(recipeData)
//             setRecipes(recipeData)

//         })
//     }, [input])

//     // map over recipes array and use label component for pictures and ingredients
//     const recipeLabels = recipes.map((recipeLabel, idx) => {
//         return (
//             <div>
//                 <Label key={`key${idx}`} recipeLabel={recipeLabel}/>
//             </div>
//         )
//     })

//     return (
//         <div>
//             <div className='inputAndTitle'>
//                 <h1>Recipe Finder</h1>

//                 <div>
//                     {/* set input from this form to input which is used for api */}
//                     <form >
//                         <label htmlFor='name-input'> </label>
//                         <input
//                             type='text'
//                             id='name-input'
//                             value={input}
//                             onChange={(e) => { setInput(e.target.value)}}
//                         />
//                     </form>
//                 </div>
//                 <h2>search an ingredient or dish for recipes</h2>
//             </div>
//             {/* show recipes pictures and titles */}
//             <div className='recipes'>
//                 {recipeLabels}
//             </div>

//         </div>

//     )
// }
