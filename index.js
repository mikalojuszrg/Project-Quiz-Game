const newGameBtn = document.querySelector("#new-game-btn");
const displayRulesBtn = document.querySelector("#rules-btn");
const displayScoreBtn = document.querySelector("#score-btn");

const easyLevelBtn = document.querySelector("#easy-level-btn");
const mediumLevelBtn = document.querySelector("#medium-level-btn");
const hardLevelBtn = document.querySelector("#hard-level-btn");
const difficultyText = document.querySelector("#select-difficulty");

const difficultyContainer = document.querySelector("#difficulty-container");
const rulesContainer = document.querySelector("#rules-container");
const scoreContainer = document.querySelector("#score-container");
const gameContainer = document.querySelector("#game-container");
const regContainer = document.querySelector("#reg-container");

const scoreForm = document.querySelector("#score-form");
const userScoreInfo = document.querySelector("#user-score-info");

let index = 0;
const correctAnswersArr =
  JSON.parse(localStorage.getItem("Incorrect answers ")) || [];
const incorrectAnswersArr =
  JSON.parse(localStorage.getItem("Correct answers ")) || [];

const getEasyQuestions = () => {
  fetch(
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      renderQuestions(data.results[index]);
      console.log(data.results[0]);
    })
    .catch((err) => {
      console.error(err);
    });
};

const getMediumQuestions = () => {
  fetch(
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      renderQuestions(data.results[0]);
      console.log(data.results[0]);
    })
    .catch((err) => {
      console.error(err);
    });
};

const gethardQuestions = () => {
  fetch(
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      renderQuestions(data.results[0]);
      console.log(data.results[0]);
    })
    .catch((err) => {
      console.error(err);
    });
};

const setTimer = (elem) => {
  let timeLeft = 10;
  let timerId = setInterval(countdown, 500);

  function countdown() {
    if (timeLeft === -1) {
      clearInterval(timerId);
      console.log("DONE");
    } else {
      elem.innerHTML = `Time left: ${timeLeft}`;
      timeLeft--;
    }
  }
  countdown();
};

displayRulesBtn.addEventListener("click", () => {
  if (rulesContainer.style.display === "block") {
    rulesContainer.style.display = "none";
  } else {
    rulesContainer.style.display = "block";
  }
});

newGameBtn.addEventListener("click", () => {
  rulesContainer.style.display = "none";
  displayRulesBtn.style.display = "none";
  scoreContainer.style.display = "none";
  displayScoreBtn.style.display = "none";
  newGameBtn.style.display = "none";
  easyLevelBtn.style.display = "block";
  mediumLevelBtn.style.display = "block";
  hardLevelBtn.style.display = "block";
  difficultyText.style.display = "block";
  localStorage.clear();
});

displayScoreBtn.addEventListener("click", () => {
  if (rulesContainer.style.display === "block") {
    rulesContainer.style.display = "none";
  }
  getEasyQuestions();
});

const playEasyGame = () => {
  getEasyQuestions();
};

easyLevelBtn.addEventListener("click", () => {
  playEasyGame();
  difficultyContainer.style.display = "none";
});

const playMediumGame = () => {
  getMediumQuestions();
};

mediumLevelBtn.addEventListener("click", () => {
  playMediumGame();
  console.log("medium btn");
  difficultyContainer.style.display = "none";
});

const playHardGame = () => {
  gethardQuestions();
};

hardLevelBtn.addEventListener("click", () => {
  playHardGame();
  difficultyContainer.style.display = "none";
});

const getNextQuestion = (obj) => {
  if (obj.difficulty === "medium") {
    setTimeout(() => {
      getMediumQuestions();
    }, "2000");
  } else if (obj.difficulty === "hard") {
    setTimeout(() => {
      gethardQuestions();
    }, "2000");
  } else {
    setTimeout(() => {
      getEasyQuestions();
    }, "2000");
  }
};

const showUserScore = () => {
  let answersTotal = correctAnswersArr.length;
  const levelArr = JSON.parse(localStorage.getItem("level"));
  userScoreInfo.textContent = `you've scored ${answersTotal} out of 10. Level: ${levelArr}`;
};

const endGame = (elem) => {
  if (elem > 10) {
    gameContainer.style.display = "none";
    showUserScore();
    scoreForm.style.display = "block";
  }
};

scoreForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveScore();
});

const saveScore = () => {
  fetch("https://testapi.io/api/mikalojuszrg/resource/quiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: scoreForm[0].value,
      score: correctAnswersArr.length,
      level: JSON.parse(localStorage.getItem("level")),
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
    });
};

// const displayForm = () => {
//   scoreForm.style.display = "block";
// };

const renderQuestions = (questions) => {
  // let qArr = [];
  // qArr.push(questions);
  // console.log(qArr);
  const randomNumber = Math.floor(Math.random() * 2);
  console.log(randomNumber);

  console.log(questions);

  const timer = document.createElement("p");
  setTimer(timer);

  index += 1;
  endGame(index);
  localStorage.setItem("level", JSON.stringify(questions.difficulty));
  gameContainer.innerHTML = "";
  const questionDiv = document.createElement("div");
  questionDiv.style.width = "400px";
  questionDiv.style.height = "400px";
  questionDiv.style.border = "1px solid black";

  const questionTitle = document.createElement("h2");
  questionTitle.style.margin = "0";
  questionTitle.style.marginRight = "10px";
  questionTitle.textContent = questions.question;

  // const nextQuestionBtn = document.createElement("button");
  // nextQuestionBtn.textContent = "Next question";

  // nextQuestionBtn.addEventListener("click", () => {
  //   getMediumQuestions();
  // });

  const questionIndexText = document.createElement("p");
  questionIndexText.textContent = `Question number: ${index}`;

  const correctAnswerBtn = document.createElement("button");
  correctAnswerBtn.style.backgroundColor = "blue";
  correctAnswerBtn.style.marginRight = "10px";
  correctAnswerBtn.setAttribute("id", (id = 1));
  correctAnswerBtn.textContent = questions.correct_answer;

  correctAnswerBtn.addEventListener("click", () => {
    correctAnswerBtn.style.backgroundColor = "green";
    incorrectAnswer1.style.visibility = "hidden";
    incorrectAnswer2.style.visibility = "hidden";
    incorrectAnswer3.style.visibility = "hidden";
    incorrectAnswer1.disabled = true;
    incorrectAnswer2.disabled = true;
    incorrectAnswer3.disabled = true;
    correctAnswerBtn.style.pointerEvents = "none";
    incorrectAnswer1.style.pointerEvents = "none";
    incorrectAnswer2.style.pointerEvents = "none";
    incorrectAnswer3.style.pointerEvents = "none";
    getNextQuestion(questions);
    timer.style.visibility = "hidden";
    correctAnswersArr.push("Correct" + index);
    localStorage.setItem("Correct answers", JSON.stringify(correctAnswersArr));
  });

  const incorrectAnswer1 = document.createElement("button");
  incorrectAnswer1.style.backgroundColor = "blue";
  incorrectAnswer1.style.marginRight = "10px";
  incorrectAnswer1.setAttribute("id", (id = 2));
  incorrectAnswer1.textContent = questions.incorrect_answers[0];

  incorrectAnswer1.addEventListener("click", () => {
    incorrectAnswer1.style.backgroundColor = "red";
    correctAnswerBtn.disabled = true;
    incorrectAnswer2.disabled = true;
    incorrectAnswer3.disabled = true;
    correctAnswerBtn.style.pointerEvents = "none";
    incorrectAnswer1.style.pointerEvents = "none";
    incorrectAnswer2.style.pointerEvents = "none";
    incorrectAnswer3.style.pointerEvents = "none";
    getNextQuestion(questions);
    timer.style.visibility = "hidden";
    incorrectAnswersArr.push("Incorrect" + index);
    localStorage.setItem(
      "Incorrect answers",
      JSON.stringify(incorrectAnswersArr)
    );
  });

  const incorrectAnswer2 = document.createElement("button");
  incorrectAnswer2.style.backgroundColor = "blue";
  incorrectAnswer2.style.marginRight = "10px";
  incorrectAnswer2.setAttribute("id", (id = 3));
  incorrectAnswer2.textContent = questions.incorrect_answers[1];

  incorrectAnswer2.addEventListener("click", () => {
    incorrectAnswer2.style.backgroundColor = "red";
    correctAnswerBtn.disabled = true;
    incorrectAnswer1.disabled = true;
    incorrectAnswer3.disabled = true;
    correctAnswerBtn.style.pointerEvents = "none";
    incorrectAnswer2.style.pointerEvents = "none";
    incorrectAnswer1.style.pointerEvents = "none";
    incorrectAnswer3.style.pointerEvents = "none";
    timer.style.visibility = "hidden";
    getNextQuestion(questions);
    incorrectAnswersArr.push("Incorrect" + index);
    localStorage.setItem(
      "Incorrect answers",
      JSON.stringify(incorrectAnswersArr)
    );
  });

  const incorrectAnswer3 = document.createElement("button");
  incorrectAnswer3.style.backgroundColor = "blue";
  incorrectAnswer3.style.marginRight = "10px";
  incorrectAnswer3.setAttribute("id", (id = 4));
  incorrectAnswer3.textContent = questions.incorrect_answers[2];

  incorrectAnswer3.addEventListener("click", () => {
    incorrectAnswer3.style.backgroundColor = "red";
    correctAnswerBtn.disabled = true;
    incorrectAnswer1.disabled = true;
    incorrectAnswer2.disabled = true;
    incorrectAnswer3.style.pointerEvents = "none";
    correctAnswerBtn.style.pointerEvents = "none";
    incorrectAnswer1.style.pointerEvents = "none";
    incorrectAnswer2.style.pointerEvents = "none";

    getNextQuestion(questions);
    timer.style.visibility = "hidden";
    incorrectAnswersArr.push("Incorrect" + index);
    localStorage.setItem(
      "Incorrect answers",
      JSON.stringify(incorrectAnswersArr)
    );
  });

  questionDiv.appendChild(timer);
  // questionDiv.appendChild(nextQuestionBtn);
  questionDiv.appendChild(questionIndexText);
  questionDiv.appendChild(questionTitle);
  // const b = questionDiv.appendChild(incorrectAnswer1);
  // const a = questionDiv.appendChild(correctAnswerBtn);
  // const c = questionDiv.appendChild(incorrectAnswer2);
  // const d = questionDiv.appendChild(incorrectAnswer3);
  gameContainer.append(questionDiv);

  const div = document.createElement("div");

  let arr = [];
  arr.push(correctAnswerBtn);
  arr.push(incorrectAnswer1);
  arr.push(incorrectAnswer2);
  arr.push(incorrectAnswer3);
  console.log(arr);
  var s = arr.sort(func);

  function func(a, b) {
    return 0.5 - Math.random();
  }

  s.forEach((obj) => {
    questionDiv.appendChild(obj);
    div.append(questionDiv);
    gameContainer.append(div);
    console.log(obj);
  });
};

const getData = () => {
  fetch("https://testapi.io/api/mikalojuszrg/resource/quiz", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      const easyScores = data.data.filter((obj) => obj.level === "easy");
      const mediumScores = data.data.filter((obj) => obj.level === "medium");
      const hardScores = data.data.filter((obj) => obj.level === "hard");

      const easyScoresSorted = easyScores.sort((a, b) => b.score - a.score);
      const mediumScoresSorted = mediumScores.sort((a, b) => b.score - a.score);
      const hardScoresSorted = mediumScores.sort((a, b) => b.score - a.score);
      scoreContainer.textContent = JSON.stringify(mediumScoresSorted);
      console.log(mediumScoresSorted);
      console.log(mediumScores);
      // mediumLeaderbord = mediumScoresSorted.map(
      //   ({ username, score }) => mediumScoresSorted.username,
      //   mediumScoresSorted.score
      // );
      mediumLeaderbord = mediumScoresSorted.map(({ score }) => score);
      console.log(mediumLeaderbord);
      // let result = objArray.map(({ foo }) => foo);
      // const planetSorted = planets.sort((a,b) => a.name.length - b.name.length); // sixth task
    });
};

getData();
