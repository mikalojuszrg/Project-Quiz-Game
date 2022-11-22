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
const questionsArr = JSON.parse(localStorage.getItem("Questions ")) || [];

const getEasyQuestions = () => {
  fetch(
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      renderQuestions(data.results[index]);
      // if (data.results[index].question === data.results[index].question)
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
      renderQuestions(data.results[index]);
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
      renderQuestions(data.results[index]);
      console.log(data.results);
    })
    .catch((err) => {
      console.error(err);
    });
};

const changeCharacters = (string) => {
  JSON.stringify(string)
    .replaceAll("&quot;", "")
    .replaceAll("&#039;", "'")
    .replaceAll("&ldquo;", "")
    .replaceAll("&rsquo;", "'")
    .replaceAll("&aacute;", "a")
    .replaceAll("&iacute;", "i")
    .replaceAll(".&rdquo;", "s");
};

const setTimer = (elem) => {
  let timeLeft = 10;
  let timerId = setInterval(countdown, 1000);

  function countdown() {
    if (timeLeft === 0) {
      // document.body.append(a);
      // a.textContent = "asdaskdaksndkasnkdsa";
      // a.style.display = "block";
      clearInterval(timerId);
      elem.textContent = "You've run out of time";
      // document.body.style.pointerEvents = "none";
      // document.getElementById("1").style.pointerEvents = "none";
      // document.getElementById("2").style.pointerEvents = "none";
      // document.getElementById("3").style.pointerEvents = "none";
      // document.getElementById("4").style.pointerEvents = "none";
    } else {
      elem.textContent = `Time left: ${timeLeft}`;
      timeLeft--;
    }
  }
  countdown();
  console.log(timeLeft);
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
  if (scoreContainer.style.display === "block") {
    scoreContainer.style.display = "none";
  } else {
    scoreContainer.style.display = "block";
    getData();
  }
});

easyLevelBtn.addEventListener("click", () => {
  getEasyQuestions();
  difficultyContainer.style.display = "none";
});

mediumLevelBtn.addEventListener("click", () => {
  getMediumQuestions();
  difficultyContainer.style.display = "none";
});

hardLevelBtn.addEventListener("click", () => {
  gethardQuestions();
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

const showUserScore = (elem) => {
  let answersTotal = correctAnswersArr.length;
  const levelArr = JSON.parse(localStorage.getItem("level"));
  elem.textContent = `you've scored ${answersTotal} out of 10. Level: ${levelArr}`;
};

const endGame = (elem) => {
  if (elem >= 11) {
    gameContainer.style.display = "none";
    showUserScore(userScoreInfo);
    scoreForm.style.display = "block";
  }
};

scoreForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveScore();
  getData();
  regContainer.style.display = "none";
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

// if (a === "asdaskdaksndkasnkdsa") {
//   document.getElementById("1").style.backgroundColor = "green";
// }
// console.log(a);

const renderQuestions = (questions) => {
  const randomNumber = Math.floor(Math.random() * 2);
  const timer = document.createElement("p");
  const userScore = document.createElement("p");
  showUserScore(userScore);
  const nextQ = document.createElement("button");
  nextQ.textContent = "Next question";
  nextQ.addEventListener("click", () => {
    getNextQuestion(questions);
  });
  // nextQ.style.display = "none";

  setTimeout(() => {
    correctAnswerBtn.style.backgroundColor = "green";
    incorrectAnswer1.style.backgroundColor = "red";
    incorrectAnswer2.style.backgroundColor = "red";
    incorrectAnswer3.style.backgroundColor = "red";
    correctAnswerBtn.style.pointerEvents = "none";
    incorrectAnswer1.style.pointerEvents = "none";
    incorrectAnswer2.style.pointerEvents = "none";
    incorrectAnswer3.style.pointerEvents = "none";
    questionDiv.append(nextQ);
    endGame(index);
    // getNextQuestion(questions);
  }, "10000");

  let answersTotal = correctAnswersArr.length;
  const levelArr = JSON.parse(localStorage.getItem("level"));
  userScore.textContent = `you've scored: ${answersTotal}`;

  setTimer(timer);
  index += 1;
  endGame(index);

  localStorage.setItem("level", JSON.stringify(questions.difficulty));
  questionsArr.push(questions.question);

  const test = localStorage.getItem("level");
  gameContainer.innerHTML = "";
  const questionDiv = document.createElement("div");
  questionDiv.style.width = "400px";
  questionDiv.style.height = "400px";
  questionDiv.style.border = "1px solid black";

  const questionTitle = document.createElement("h2");
  questionTitle.style.margin = "0";
  questionTitle.style.marginRight = "10px";
  questionTitle.textContent = questions.question
    .replaceAll("&quot;", "")
    .replaceAll("&#039;", "'")
    .replaceAll("&ldquo;", "")
    .replaceAll("&rsquo;", "'")
    .replaceAll("&aacute;", "a")
    .replaceAll("&iacute;", "i")
    .replaceAll(".&rdquo;", "s")
    .replaceAll("&shy;", "");

  // console.log(questions.question);
  // if (
  //   questionsArr.length > 0 &&
  //   JSON.parse(localStorage.getItem("question")).includes(questions.questions)
  // ) {
  //   alert("aismdmas");
  // }

  const questionIndexText = document.createElement("p");
  questionIndexText.textContent = `Question number: ${index}`;

  const correctAnswerBtn = document.createElement("button");
  correctAnswerBtn.style.backgroundImage =
    "linear-gradient(rgb(28, 143, 127), rgb(48, 33, 108))";
  correctAnswerBtn.style.marginRight = "10px";
  correctAnswerBtn.setAttribute("id", (id = 1));
  correctAnswerBtn.textContent = questions.correct_answer
    .replaceAll("&quot;", "")
    .replaceAll("&#039;", "'");

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
    localStorage.setItem("question", JSON.stringify(questionsArr));
  });

  const incorrectAnswer1 = document.createElement("button");
  incorrectAnswer1.style.backgroundImage =
    "linear-gradient(rgb(28, 143, 127), rgb(48, 33, 108))";
  incorrectAnswer1.style.marginRight = "10px";
  incorrectAnswer1.setAttribute("id", (id = 2));
  incorrectAnswer1.textContent = questions.incorrect_answers[0]
    .replaceAll("&quot;", "")
    .replaceAll("&#039;", "'");

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
    localStorage.setItem("question", JSON.stringify(questionsArr));
  });

  const incorrectAnswer2 = document.createElement("button");
  incorrectAnswer2.style.backgroundImage =
    "linear-gradient(rgb(28, 143, 127), rgb(48, 33, 108))";
  incorrectAnswer2.style.marginRight = "10px";
  incorrectAnswer2.setAttribute("id", (id = 3));
  incorrectAnswer2.textContent = questions.incorrect_answers[1]
    .replaceAll("&quot;", "")
    .replaceAll("&#039;", "'");

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
    localStorage.setItem("question", JSON.stringify(questionsArr));
  });

  const incorrectAnswer3 = document.createElement("button");
  incorrectAnswer3.style.backgroundImage =
    "linear-gradient(rgb(28, 143, 127), rgb(48, 33, 108))";
  incorrectAnswer3.style.marginRight = "10px";
  incorrectAnswer3.setAttribute("id", (id = 4));
  incorrectAnswer3.textContent = questions.incorrect_answers[2]
    .replaceAll("&quot;", "")
    .replaceAll("&#039;", "'");

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
    localStorage.setItem("question", JSON.stringify(questionsArr));
  });

  questionDiv.appendChild(timer);
  questionDiv.appendChild(userScore);
  // questionDiv.appendChild(noTimerText);
  // questionDiv.appendChild(nextQuestionBtn);
  questionDiv.appendChild(questionIndexText);
  questionDiv.appendChild(questionTitle);
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
      const easyLeaderbord = data.data
        .filter((obj) => obj.level === "easy")
        .sort((a, b) => b.score - a.score)
        .map((value) => {
          return { username: value.username, score: value.score };
        });
      const mediumLeaderbord = data.data
        .filter((obj) => obj.level === "medium")
        .sort((a, b) => b.score - a.score)
        .map((value) => {
          return { username: value.username, score: value.score };
        });
      const hardLeaderbord = data.data
        .filter((obj) => obj.level === "hard")
        .sort((a, b) => b.score - a.score)
        .map((value) => {
          return { username: value.username, score: value.score };
        });

      const mediumTop = mediumLeaderbord.splice(0, 10); // TOP 10
      const easyTop = easyLeaderbord.splice(0, 10);
      const hardTop = hardLeaderbord.splice(0, 10);

      scoreContainer.style.display = "block";
      scoreContainer.innerHTML = "";

      if (JSON.parse(localStorage.getItem("level")) === "easy") {
        scoreContainer.append(makeOl(easyTop));
      } else if (JSON.parse(localStorage.getItem("level")) === "medium") {
        scoreContainer.append(makeOl(mediumTop));
      } else if (JSON.parse(localStorage.getItem("level")) === "hard") {
        scoreContainer.append(makeOl(hardTop));
      } else {
        scoreContainer.append(makeOl(easyTop));
        scoreContainer.append(makeOl(mediumTop));
        scoreContainer.append(makeOl(hardTop));
      }
    });
};

const makeOl = (array) => {
  let list = document.createElement("ol");
  for (let i = 0; i < array.length; i++) {
    let item = document.createElement("li");
    item.appendChild(
      document.createTextNode(
        `${JSON.stringify(array[i].username).replaceAll('"', "")} - 
          ${JSON.stringify(array[i].score)} correct answers`
      )
    );
    list.appendChild(item);
  }
  return list;
};
