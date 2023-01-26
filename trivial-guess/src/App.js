import './App.css';
import { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { he } from 'he'; // might use this later 

function App() {
  return (
    <div>
      <Cats /> 
    </div>
  )
} 


function Cats() {
  const [categories, setCategories] = useState([]); 

  useEffect(() => {
    axios 
    .get('https://opentdb.com/api_category.php')
    .then((response) => {
      setCategories(response.data.trivia_categories);
  }); 
}, []) 

const [selectedCategory, setSelectedCategory] = useState("") 

if (selectedCategory) {

  console.log(selectedCategory)

  return <Quest /> 
}

  return (
      <div>
        <h1>Trivial Guess</h1>
        <div className="Cats-the-musical"> 
          { categories.map(categories => (
              <button className="boop" onClick={() => setSelectedCategory(categories.id)} key={categories.id}><li>{categories.name}</li></button>
            ))}
        </div> 
      </div> 
  )
}


 function Quest(selectedCategory) {
  const [question, setQuestion] = useState([])

      useEffect(() => {
      axios 
      .get('https://opentdb.com/api.php?amount=4')
      .then((response) =>{setQuestion(response.data.results.map(obj => [obj.question, obj.incorrect_answers, obj.correct_answer]))})
    }, [selectedCategory])

  
  return (
    <>
     {question && question.map((q) =>

(
<div>
<h1 className="qtitle" key={selectedCategory}>{q[0].replace('&quot;','"').replace('&quot;','"').replace('&#039;', "'")}</h1>

<ul className='questions'>
<li className='category'><button>{q[1][0]}</button></li>
<br/> 
<li className='category'><button>{q[1][1]}</button></li>
<br/> 
<li className='category'><button>{q[1][2]}</button></li>
<br/>
<li className='category'><button>{q[2]}</button></li>
</ul>

</div>)

)}
    </>
  )

 }

  


export default App;
