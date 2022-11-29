const newGameBtn = document.querySelector("#new-game-btn");
const displayRulesBtn = document.querySelector("#rules-btn");
const displayScoreBtn = document.querySelector("#score-btn");
const startBtn = document.querySelector("#start-btn");
const easyLevelBtn = document.querySelector("#easy-level-btn");
const mediumLevelBtn = document.querySelector("#medium-level-btn");
const hardLevelBtn = document.querySelector("#hard-level-btn");
const soundOnBtn = document.querySelector("#sound-on-btn");
const soundOffBtn = document.querySelector("#sound-off-btn");
const easyScoreBtn = document.querySelector("#easy-score-btn");
const mediumScoreBtn = document.querySelector("#medium-score-btn");
const hardScoreBtn = document.querySelector("#hard-score-btn");
const homeBtn = document.querySelector("#home-btn");
const backBtn = document.querySelector("#back-btn");

const difficultyContainer = document.querySelector("#difficulty-container");
const rulesContainer = document.querySelector("#rules-container");
const scoreContainer = document.querySelector("#score-container");
const gameContainer = document.querySelector("#game-container");
const regContainer = document.querySelector("#reg-container");

const themeSound = document.querySelector("#theme-sound");
const difficultyText = document.querySelector("#select-difficulty");
const scoreForm = document.querySelector("#score-form");
const userScoreInfo = document.querySelector("#user-score-info");

let index = 0;
const correctAnswersArr =
  JSON.parse(localStorage.getItem("Incorrect answers ")) || [];
const incorrectAnswersArr =
  JSON.parse(localStorage.getItem("Correct answers ")) || [];
const questionsArr = JSON.parse(localStorage.getItem("Questions ")) || [];

window.addEventListener("load", () => {
  localStorage.clear();
});

homeBtn.addEventListener("click", () => {
  document.location.reload();
});

startBtn.addEventListener("click", () => {
  newGameBtn.style.display = "block";
  displayRulesBtn.style.display = "block";
  displayScoreBtn.style.display = "block";
  startBtn.style.display = "none";
});

backBtn.addEventListener("click", () => {
  newGameBtn.style.display = "block";
  displayRulesBtn.style.display = "block";
  displayScoreBtn.style.display = "block";
  scoreContainer.style.display = "none";
  easyLevelBtn.style.display = "none";
  mediumLevelBtn.style.display = "none";
  hardLevelBtn.style.display = "none";
  difficultyText.style.display = "none";
  easyScoreBtn.style.display = "none";
  mediumScoreBtn.style.display = "none";
  hardScoreBtn.style.display = "none";
  backBtn.style.display = "none";
});

soundOnBtn.addEventListener("click", () => {
  themeSound.play();
});

soundOffBtn.addEventListener("click", () => {
  themeSound.pause();
  themeSound.currentTime = 0;
});

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
  backBtn.style.display = "block";
  easyLevelBtn.style.display = "block";
  mediumLevelBtn.style.display = "block";
  hardLevelBtn.style.display = "block";
  difficultyText.style.display = "block";
  localStorage.clear();
});

displayScoreBtn.addEventListener("click", () => {
  scoreContainer.style.display = "none";
  displayRulesBtn.style.display = "none";
  displayScoreBtn.style.display = "none";
  rulesContainer.style.display = "none";
  newGameBtn.style.display = "none";
  backBtn.style.display = "block";
  easyScoreBtn.style.display = "block";
  mediumScoreBtn.style.display = "block";
  hardScoreBtn.style.display = "block";
});

easyScoreBtn.addEventListener("click", () => {
  localStorage.setItem("level", `"easy"`);
  getData();
  easyScoreBtn.style.display = "none";
  mediumScoreBtn.style.display = "none";
  hardScoreBtn.style.display = "none";
});

easyLevelBtn.addEventListener("click", () => {
  getEasyQuestions();
  gameContainer.style.padding = "2rem";
  difficultyContainer.style.display = "none";
  backBtn.style.display = "none";
});

mediumScoreBtn.addEventListener("click", () => {
  localStorage.setItem("level", `"medium"`);
  getData();
  easyScoreBtn.style.display = "none";
  mediumScoreBtn.style.display = "none";
  hardScoreBtn.style.display = "none";
});

mediumLevelBtn.addEventListener("click", () => {
  getMediumQuestions();
  gameContainer.style.padding = "2rem";
  difficultyContainer.style.display = "none";
  backBtn.style.display = "none";
});

hardScoreBtn.addEventListener("click", () => {
  localStorage.setItem("level", `"hard"`);
  getData();
  easyScoreBtn.style.display = "none";
  mediumScoreBtn.style.display = "none";
  hardScoreBtn.style.display = "none";
});

hardLevelBtn.addEventListener("click", () => {
  gethardQuestions();
  gameContainer.style.padding = "2rem";
  difficultyContainer.style.display = "none";
  backBtn.style.display = "none";
});

scoreForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveScore();
  setTimeout(() => {
    getData();
  }, 2000);
  regContainer.style.display = "none";
});

const getEasyQuestions = () => {
  fetch(
    "https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      renderQuestions(data.results[0]);
    })
    .catch((err) => {
      console.error(err);
    });
};

const getMediumQuestions = () => {
  fetch(
    "https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      renderQuestions(data.results[0]);
    })
    .catch((err) => {
      console.error(err);
    });
};

const gethardQuestions = () => {
  fetch(
    "https://opentdb.com/api.php?amount=1&category=9&difficulty=hard&type=multiple"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      renderQuestions(data.results[0]);
    })
    .catch((err) => {
      console.error(err);
    });
};

const setTimer = (elem) => {
  let timeLeft = 10;
  let timerId = setInterval(countdown, 1000);

  function countdown() {
    if (timeLeft === 0) {
      clearInterval(timerId);
      elem.textContent = "You've run out of time 🥲";
    } else {
      elem.textContent = `Time left: ${timeLeft}`;
      timeLeft--;
    }
  }
  countdown();
  console.log(timeLeft);
};

const getNextQuestionFast = (obj) => {
  if (obj.difficulty === "medium") {
    getMediumQuestions();
  } else if (obj.difficulty === "hard") {
    gethardQuestions();
  } else {
    getEasyQuestions();
  }
};

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
  elem.style.padding = "1rem";
};

const endGame = (elem) => {
  if (elem >= 11) {
    gameContainer.style.display = "none";
    showUserScore(userScoreInfo);
    scoreForm.style.display = "flex";
  }
};

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

const playCorrectSound = () => {
  let audio = new Audio("audio/correct-6033.mp3");
  audio.play();
};

const playIncorrectSound = () => {
  let audio = new Audio("audio/wrong-answer-126515.mp3");
  audio.play();
};

const renderQuestions = (questions) => {
  gameContainer.innerHTML = "";
  const questionDiv = document.createElement("div");

  const timer = document.createElement("p");
  const timerText = document.createElement("p");
  timerText.style.display = "none";
  setTimer(timer);

  const userScore = document.createElement("p");
  showUserScore(userScore);
  let answersTotal = correctAnswersArr.length;
  userScore.textContent = `you've scored: ${answersTotal}`;

  if (questionsArr.includes(questions.question)) {
    console.log("ALERREAOKRAEOROAEKRKEOROAEORK");
    getNextQuestionFast(questions);
    questionIndexText.textContent = `Question number: ${index - 1}`;
  }

  const nextQ = document.createElement("button");
  nextQ.setAttribute("class", "button-styles");
  nextQ.textContent = `Next question`;
  nextQ.addEventListener("click", () => {
    getNextQuestionFast(questions);
  });

  index += 1;
  if (index === 10) {
    nextQ.textContent = "Finish the game";
  }
  endGame(index);

  localStorage.setItem("level", JSON.stringify(questions.difficulty));
  questionsArr.push(questions.question);

  const questionTitle = document.createElement("h2");
  questionTitle.textContent = questions.question
    .replaceAll("&quot;", "")
    .replaceAll("&#039;", "'")
    .replaceAll("&ldquo;", "")
    .replaceAll("&rsquo;", "'")
    .replaceAll("&aacute;", "a")
    .replaceAll("&iacute;", "i")
    .replaceAll(".&rdquo;", "s")
    .replaceAll("&shy;", "")
    .replaceAll("&hellip;&rdquo;", "")
    .replaceAll("&oacute;", "o");

  const questionIndexText = document.createElement("p");
  questionIndexText.textContent = `Question number: ${index}`;

  const correctAnswerBtn = document.createElement("button");
  correctAnswerBtn.setAttribute("id", (id = 1));
  correctAnswerBtn.setAttribute("class", "button-styles");
  correctAnswerBtn.textContent = questions.correct_answer
  .replaceAll("&quot;", "")
  .replaceAll("&#039;", "'")
  .replaceAll("&ldquo;", "")
  .replaceAll("&rsquo;", "'")
  .replaceAll("&aacute;", "a")
  .replaceAll("&iacute;", "i")
  .replaceAll(".&rdquo;", "s")
  .replaceAll("&shy;", "")
  .replaceAll("&hellip;&rdquo;", "")
  .replaceAll("&oacute;", "o");

  correctAnswerBtn.addEventListener("click", () => {
    playCorrectSound();
    correctAnswerBtn.style.backgroundImage =
      "linear-gradient(rgb(15, 235, 206), rgb(0, 255, 47))";
    correctAnswerBtn.style.pointerEvents = "none";
    incorrectAnswer1.style.pointerEvents = "none";
    incorrectAnswer2.style.pointerEvents = "none";
    incorrectAnswer3.style.pointerEvents = "none";
    getNextQuestion(questions);
    timer.style.display = "none";
    timerText.textContent = "Correct ✅";
    timerText.style.display = "block";
    correctAnswersArr.push("Correct" + index);
    localStorage.setItem("Correct answers", JSON.stringify(correctAnswersArr));
    localStorage.setItem("question", JSON.stringify(questionsArr));
  });

  const incorrectAnswer1 = document.createElement("button");
  incorrectAnswer1.setAttribute("id", (id = 2));
  incorrectAnswer1.setAttribute("class", "button-styles");
  incorrectAnswer1.textContent = questions.incorrect_answers[0]
  .replaceAll("&quot;", "")
  .replaceAll("&#039;", "'")
  .replaceAll("&ldquo;", "")
  .replaceAll("&rsquo;", "'")
  .replaceAll("&aacute;", "a")
  .replaceAll("&iacute;", "i")
  .replaceAll(".&rdquo;", "s")
  .replaceAll("&shy;", "")
  .replaceAll("&hellip;&rdquo;", "")
  .replaceAll("&oacute;", "o");

  incorrectAnswer1.addEventListener("click", () => {
    playIncorrectSound();
    incorrectAnswer1.style.backgroundImage =
      "linear-gradient(rgb(235, 111, 70), rgb(255, 0, 0))";
    correctAnswerBtn.style.pointerEvents = "none";
    incorrectAnswer1.style.pointerEvents = "none";
    incorrectAnswer2.style.pointerEvents = "none";
    incorrectAnswer3.style.pointerEvents = "none";
    timer.style.display = "none";
    timerText.textContent = "Incorrect ❌";
    timerText.style.display = "block";
    getNextQuestion(questions);
    incorrectAnswersArr.push("Incorrect" + index);
    localStorage.setItem(
      "Incorrect answers",
      JSON.stringify(incorrectAnswersArr)
    );
    localStorage.setItem("question", JSON.stringify(questionsArr));
  });

  const incorrectAnswer2 = document.createElement("button");
  incorrectAnswer2.setAttribute("class", "button-styles");
  incorrectAnswer2.setAttribute("id", (id = 3));
  incorrectAnswer2.textContent = questions.incorrect_answers[1]
  .replaceAll("&quot;", "")
  .replaceAll("&#039;", "'")
  .replaceAll("&ldquo;", "")
  .replaceAll("&rsquo;", "'")
  .replaceAll("&aacute;", "a")
  .replaceAll("&iacute;", "i")
  .replaceAll(".&rdquo;", "s")
  .replaceAll("&shy;", "")
  .replaceAll("&hellip;&rdquo;", "")
  .replaceAll("&oacute;", "o");

  incorrectAnswer2.addEventListener("click", () => {
    playIncorrectSound();
    incorrectAnswer2.style.backgroundImage =
      "linear-gradient(rgb(235, 111, 70), rgb(255, 0, 0))";
    correctAnswerBtn.style.pointerEvents = "none";
    incorrectAnswer2.style.pointerEvents = "none";
    incorrectAnswer1.style.pointerEvents = "none";
    incorrectAnswer3.style.pointerEvents = "none";
    timer.style.display = "none";
    timerText.textContent = "Incorrect ❌";
    timerText.style.display = "block";
    getNextQuestion(questions);
    incorrectAnswersArr.push("Incorrect" + index);
    localStorage.setItem(
      "Incorrect answers",
      JSON.stringify(incorrectAnswersArr)
    );
    localStorage.setItem("question", JSON.stringify(questionsArr));
  });

  const incorrectAnswer3 = document.createElement("button");
  incorrectAnswer3.setAttribute("class", "button-styles");
  incorrectAnswer3.setAttribute("id", (id = 4));
  incorrectAnswer3.textContent = questions.incorrect_answers[2]
  .replaceAll("&quot;", "")
  .replaceAll("&#039;", "'")
  .replaceAll("&ldquo;", "")
  .replaceAll("&rsquo;", "'")
  .replaceAll("&aacute;", "a")
  .replaceAll("&iacute;", "i")
  .replaceAll(".&rdquo;", "s")
  .replaceAll("&shy;", "")
  .replaceAll("&hellip;&rdquo;", "")
  .replaceAll("&oacute;", "o");

  incorrectAnswer3.addEventListener("click", () => {
    playIncorrectSound();
    incorrectAnswer3.style.backgroundImage =
      "linear-gradient(rgb(235, 111, 70), rgb(255, 0, 0))";
    incorrectAnswer3.style.pointerEvents = "none";
    correctAnswerBtn.style.pointerEvents = "none";
    incorrectAnswer1.style.pointerEvents = "none";
    incorrectAnswer2.style.pointerEvents = "none";
    getNextQuestion(questions);
    timer.style.display = "none";
    timerText.textContent = "Incorrect ❌";
    timerText.style.display = "block";
    incorrectAnswersArr.push("Incorrect" + index);
    localStorage.setItem(
      "Incorrect answers",
      JSON.stringify(incorrectAnswersArr)
    );
    localStorage.setItem("question", JSON.stringify(questionsArr));
  });

  questionDiv.appendChild(timer);
  questionDiv.prepend(timerText);
  questionDiv.appendChild(userScore);
  questionDiv.appendChild(questionIndexText);
  questionDiv.appendChild(questionTitle);
  gameContainer.append(questionDiv);

  const btnDiv = document.createElement("div");
  const randomBtnFunc = (a, b) => {
    return 0.5 - Math.random();
  };

  const btnArr = [];
  btnArr.push(correctAnswerBtn);
  btnArr.push(incorrectAnswer1);
  btnArr.push(incorrectAnswer2);
  btnArr.push(incorrectAnswer3);
  let btnArrSorted = btnArr.sort(randomBtnFunc);

  btnArrSorted.forEach((obj) => {
    questionDiv.appendChild(obj);
    btnDiv.append(questionDiv);
    gameContainer.append(btnDiv);
  });

  setTimeout(() => {
    correctAnswerBtn.style.pointerEvents = "none";
    incorrectAnswer1.style.pointerEvents = "none";
    incorrectAnswer2.style.pointerEvents = "none";
    incorrectAnswer3.style.pointerEvents = "none";
  }, 10000);

  setTimeout(() => {
    correctAnswerBtn.style.backgroundImage =
      "linear-gradient(rgb(15, 235, 206), rgb(0, 255, 80))";
    correctAnswerBtn.style.color = "black";
    incorrectAnswer1.style.backgroundImage =
      "linear-gradient(rgb(235, 111, 70), rgb(255, 0, 0))";
    incorrectAnswer2.style.backgroundImage =
      "linear-gradient(rgb(235, 111, 70), rgb(255, 0, 0))";
    incorrectAnswer3.style.backgroundImage =
      "linear-gradient(rgb(235, 111, 70), rgb(255, 0, 0))";
    questionDiv.prepend(nextQ);
    timer.style.display = "none";
    endGame(index);
  }, "12000");
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

      const mediumTop = mediumLeaderbord.splice(0, 10);
      const easyTop = easyLeaderbord.splice(0, 10);
      const hardTop = hardLeaderbord.splice(0, 10);

      scoreContainer.style.display = "flex";
      scoreContainer.innerHTML = "";

      const easyNotTopPosition =
        easyLeaderbord.findIndex(
          (element) => element.username === scoreForm[0].value
        ) + 11;

      const mediumNotTopPosition =
        mediumLeaderbord.findIndex(
          (element) => element.username === scoreForm[0].value
        ) + 11;

      const hardNotTopPosition =
        hardLeaderbord.findIndex(
          (element) => element.username === scoreForm[0].value
        ) + 11;

      const p = document.createElement("p");
      p.style.width = "22rem";
      p.style.display = "none";
      scoreContainer.style.padding = "1rem";
      scoreContainer.append(p);

      if (JSON.parse(localStorage.getItem("level")) === "easy") {
        scoreContainer.append(makeOl(easyTop));
        if (easyNotTopPosition > 10) {
          p.style.display = "block";
          p.textContent = `Unfortunately, you're not among top 10 players. Your position is ${easyNotTopPosition}`;
        }
      } else if (JSON.parse(localStorage.getItem("level")) === "medium") {
        scoreContainer.append(makeOl(mediumTop));
        if (easyNotTopPosition > 10) {
          p.style.display = "block";
          p.textContent = `Unfortunately, you're not among top 10 players. Your position is ${mediumNotTopPosition}`;
        }
      } else if (JSON.parse(localStorage.getItem("level")) === "hard") {
        scoreContainer.append(makeOl(hardTop));
        if (easyNotTopPosition > 10) {
          p.style.display = "block";
          p.textContent = `Unfortunately, you're not among top 10 players. Your position is ${hardNotTopPosition}`;
        }
      }

      const newGameBtn = document.createElement("button");
      newGameBtn.textContent = "New game";
      newGameBtn.addEventListener("click", () => {
        document.location.reload();
      });

      if (JSON.parse(localStorage.getItem("question")).length > 0) {
        scoreContainer.append(newGameBtn);
      }
    });
};

const makeOl = (array) => {
  let list = document.createElement("ol");
  list.style.width = "300px";
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
