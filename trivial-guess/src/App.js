import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import he from "he";

function App() {
  return (
    <>
      <header>
        <h1 className="title">Trivial Guess</h1>
      </header>
      <main>
        <div className="App">
            <Category />
        </div>
      </main>
    </>
  );
}

function Category({ id, name }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((res) =>
        setCategories(
          res.data.trivia_categories.map((obj) => [obj.id, obj.name])
        )
      );
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("");
  if (selectedCategory) {
    return <CatQuestion selectedCategory={selectedCategory} />;
  }

  return (
    <div>
        {categories.map(([catId, catName]) => (
          <div className="category" onClick={() => setSelectedCategory(catId)} key={catId}>
            <button className="silly">{catName}</button>
          </div>
        ))}
    </div>
  );
}

function CatQuestion({ selectedCategory }) {
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=1&category=${selectedCategory}`)
      .then((res) => {
        setQuestion(
          res.data.results.map((obj) => ({
            question: he.decode(obj.question),
            correctAnswer: obj.correct_answer,
            answerChoices: [obj.correct_answer, ...obj.incorrect_answers],
          }))
        );
      });
  }, [selectedCategory]);

  if (answer) {
    if (answer === question.correctAnswer) {
      setScore(score + 1);
    }
    return <CatQuestion selectedCategory={selectedCategory} setScore={setScore} />;
  }

  return (
    <div className="question">
      {question.map((quest) => (
        <div key={selectedCategory}>
          <h1>{quest.question}</h1>
          <ul className="answers" key={quest}>
            {quest.answerChoices.map((a) => (
              <div className="answerz" onClick={() => setAnswer(he.decode(a))} key={a}>
                <button className="bop">{he.decode(a)}</button>
              </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;