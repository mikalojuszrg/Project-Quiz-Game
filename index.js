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
  let timeLeft = 30;
  let timerId = setInterval(countdown, 1000);

  function countdown() {
    if (timeLeft === -1) {
      clearTimeout(timerId);
    } else {
      elem.innerHTML = `Time left: ${timeLeft}`;
      timeLeft--;
    }
  }
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
});

displayScoreBtn.addEventListener("click", () => {
  if (rulesContainer.style.display === "block") {
    rulesContainer.style.display = "none";
  }
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

const renderQuestions = (questions) => {
  const randomNumber = Math.floor(Math.random() * 2);
  console.log(randomNumber);

  console.log(questions);

  const timer = document.createElement("p");
  setTimer(timer);

  index += 1;
  gameContainer.innerHTML = "";
  const questionDiv = document.createElement("div");
  questionDiv.style.width = "400px";
  questionDiv.style.height = "400px";
  questionDiv.style.border = "1px solid black";

  const questionTitle = document.createElement("h2");
  questionTitle.style.margin = "0";
  questionTitle.style.marginRight = "10px";
  questionTitle.textContent = questions.question;

  const nextQuestionBtn = document.createElement("button");
  nextQuestionBtn.textContent = "Next question";

  nextQuestionBtn.addEventListener("click", () => {
    getMediumQuestions();
  });

  const questionIndexText = document.createElement("p");
  questionIndexText.textContent = `Question number: ${index}`;

  const correctAnswerBtn = document.createElement("button");
  correctAnswerBtn.style.backgroundColor = "blue";
  correctAnswerBtn.style.marginRight = "10px";
  correctAnswerBtn.setAttribute("id", (id = 1));
  correctAnswerBtn.textContent = questions.correct_answer;

  correctAnswerBtn.addEventListener("click", () => {
    correctAnswerBtn.style.backgroundColor = "green";
    incorrectAnswer1.disabled = true;
    incorrectAnswer2.disabled = true;
    incorrectAnswer3.disabled = true;
    getMediumQuestions();
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
    getMediumQuestions();
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
    getMediumQuestions();
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
    incorrectAnswer2.disabled = true;
    incorrectAnswer1.disabled = true;
    getMediumQuestions();
    incorrectAnswersArr.push("Incorrect" + index);
    localStorage.setItem(
      "Incorrect answers",
      JSON.stringify(incorrectAnswersArr)
    );
  });

  questionDiv.appendChild(timer);
  questionDiv.appendChild(nextQuestionBtn);
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
