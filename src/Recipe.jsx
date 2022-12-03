import {
    useState,
    useEffect
} from 'react'
import Label from './Label'
export default function Recipe() {
//////////////////////////
//
//////////////////////////
    const [input, setInput] = useState('pie')
    const [recipes, setRecipes] = useState([])
    const [item, setItem] = useState({
        pic: '',
        label: ''
    })
    const [showItem, setShowItem] = useState(true)



    useEffect(() => {

        fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${input}&app_id=750505cc&app_key=4d9f46de2a4199d804217a16f108cf24`)
        .then(res => res.json())
        .then(information => {
            // console.log(information.hits[0].recipe.image)

            const recipeInformation = [ information.hits[2].recipe.label  ]

            setItem({...item, pic: information.hits[2].recipe.image, label: recipeInformation, pic22: information.hits[3].recipe.image, label22: information.hits[3].recipe.label})

            const recipeData = information.hits
            console.log(recipeData)
            setRecipes(recipeData)




        })
    }, [input])


    const handleSubmit = (e) => {
        e.preventDefault()

            setShowItem(true)
            // console.log(recipes)
            // console.log(input)
            // console.log(item)
            // console.log(recipes)
            // console.log(recipes[5].recipe.label)
        }

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

                    <form onSubmit={e => handleSubmit(e, input, setInput)}>
                        <label htmlFor='name-input'> </label>
                        <input
                            type='text'
                            // placeholder='name'
                            id='name-input'
                            value={input}
                            onChange={(e) => { setInput(e.target.value)
                            setShowItem(false)}}
                        />
                        {/* <button type='submit' >add</button> */}
                    </form>
                </div>
                <h3>search an ingredient or dish for recipes</h3>
            </div>


            <div className='recipes'>
            {recipeLabels}
            </div>


        {/* { showItem ?
            <img src={item.pic}></img> : ''

        }

        { showItem ?
            <div>
                {item.label}
            </div> : ''
        }

        { showItem ?
            <img src={item.pic22}></img> : ''

        }
        { showItem ?
            <div>
                {item.label22}
            </div> : ''
        } */}

        </div>

    )
}

