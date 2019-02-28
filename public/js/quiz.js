let quizLength = 20;

const getQuiz = fetch(`https://opentdb.com/api.php?amount=${quizLength}&type=multiple`)
                .then(blob => blob.json)
                .then(function(results) {
                    const quizData = results.results;
                    quiz(quizData);
                });

function quiz(data) {
    const insertCorrectAnswer = (answersArr, correctAnswer, insertIndex) => {
        return answersArr.splice(insertIndex, 0, correctAnswer);
    };

    const getCorrectAnswers = questions => {
        const correctAnswers = [];
        questions.forEach(q => correctAnswers.push(q.correct_answer));
        return correctAnswers;
    };

    const displayChoices = (arr, id) => {
        const choiceList = document.createElement("div");

        arr.forEach(choice => {
            const choiceWrapper = document.createElement("div");
            const choiceItem = document.createElement("label");
            const choiceSelect = document.createElement("input");
            const choiceSelected = document.createElement("span");
            choiceWrapper.className = "choice";
            choiceItem.innerHTML = choice;
            choiceItem.setAttribute("class", "choice-text");
            choiceSelect.setAttribute("type", "radio");
            choiceSelect.setAttribute("name", id);
            choiceSelect.setAttribute("value", choice);
            choiceSelect.setAttribute("class", "choice-radio");
            choiceSelected.setAttribute("class", "choice-selected");
            choiceItem.appendChild(choiceSelect);
            choiceItem.appendChild(choiceSelected);
            choiceWrapper.appendChild(choiceItem);
            choiceList.appendChild(choiceWrapper);
        });

        choiceList.className = "choices-wrapper";
        return choiceList;
    };

    const displayQuestions = quiz => {
        const questionsWrapper = document.getElementById("questions");
        const questions = quiz;

        for (let i = 0; i < questions.length; i++) {
            const insertIndex = Math.floor(Math.random() * 4);
            const answers = questions[i].incorrect_answers;
            const correctAnswer = questions[i].correct_answer;
            insertCorrectAnswer(answers, correctAnswer, insertIndex);

            const questionNum = i + 1;
            const id = "a-" + questionNum;

            const question = document.createElement("div");
            const questionText = document.createElement("h3");
            question.classList.add("question");
            questionText.classList.add("question-text");
            questionText.innerHTML = `${questionNum}. ${questions[i].question}`;
            question.appendChild(questionText);
            question.appendChild(displayChoices(answers, id));
            questionsWrapper.appendChild(question);
        }
    };
    displayQuestions(data);

    const choiceDeselect = (clicked) => {
        if (clicked.tagName == "LABEL") {
            const siblings = clicked.parentNode.parentNode.getElementsByTagName("label");
            for (sib of siblings) {
                sib.classList.remove("choice-text--selected");
            }
        }

        if (clicked.tagName == "INPUT") {
            const siblings = clicked.parentNode.parentNode.parentNode.getElementsByTagName("input");
            for (sib of siblings) {
                sib.classList.remove("choice-text--selected");
            }
        }
    };

    const selectedChoice = () => {
        const allChoices = document.getElementsByTagName("label");

        for (let i = 0; i < allChoices.length; i++) {
            const choice = allChoices[i];
            choice.addEventListener("click", e => {
                choiceDeselect(e.target);
                e.target.classList.add("choice-text--selected");
            });
        }
    };

    selectedChoice();

    const incomplete = () => alert(`You haven't answered all of the questions!`);

    let score = 0;

    const markAnswers = answers => {
        const correctAnswers = answers;
        const selectedAnswers = document.querySelectorAll("input.choice-text--selected");
        const total = answers.length;

        for (let x = 0; x < total; x++) {
            if (selectedAnswers[x].value == correctAnswers[x]) {
                score++;
                selectedAnswers[x].parentNode.classList.add("choice-text--selected-correct");
            } else {
                selectedAnswers[x].parentNode.classList.add("choice-text--selected-incorrect");
            }
        }

        let result = `${score} out of ${total}`;
        const resultPercent = score / total * 100;

        if (resultPercent == 100) result += `! You smashed it!`;
        else if (resultPercent > 70) result += `! Very good!`;
        else if (resultPercent < 50) result += `.. Really really terrible effort...`;
        else result += `. Ehh...you did alright.`;

        displayResults(result);
    };

    const blur = modal => {
        const modalVisibility = modal.style.display;
        const container = [...document.getElementsByClassName("container")[0].children].slice(0, 3);
        for (let child of container) {
            modalVisibility == "block" ? child.classList.add("blur") : child.classList.remove("blur");
        }
    }

    const noScroll = modal => {
        const body = document.getElementsByTagName("body")[0];
        return modal.style.display == "block" ? body.classList.add("no-scroll") : body.classList.remove("no-scroll");
    };

    const closeModal = () => {
        const modal = document.getElementById("results");
        modal.style.display = "none";
        blur(modal);
        window.setTimeout(noScroll(modal), 1000);
    };

    const displayResults = result => {
        const modal = document.getElementById("results");
        const modalText = document.getElementById("results-text");
        modalText.textContent = result;
        modal.style.display = "block";

        blur(modal);
        noScroll(modal);

        close();
    };

    const submitButton = document.getElementById("submit-quiz");
    submitButton.addEventListener("click", e => {
        const selectedAnswers = document.querySelectorAll("input.choice-text--selected");
        return selectedAnswers.length === quizLength ? markAnswers(getCorrectAnswers(data)) : incomplete();
    });

    const getInfo = questions => {
        const questionsInfo = [];
        questions.forEach(q => questionsInfo.push(q.correct_answer));

        const questionDivs = document.querySelectorAll(".question");
        const choiceWrappers = document.querySelectorAll(".choices-wrapper");

        for (let i = 0; i < questionDivs.length; i++) {
            const choiceWrapper = choiceWrappers[i];
            const questionInfo = document.createElement("p");
            questionInfo.setAttribute("class", "more-info");
            questionDivs[i].insertBefore(questionInfo, choiceWrapper);
        }

        const infoParagraphs = document.getElementsByClassName("more-info");
        questionsInfo.forEach((q, i) => {
            infoParagraphs[i].textContent = `Correct answer: ${q}`;
            infoParagraphs[i].style.display = "block";
        });
    };

    const disableAll = () => {
        const all = document.querySelectorAll(".choice-text, .choice-radio");
        const unselected = document.querySelectorAll(".choice-text:not(.choice-text--selected), .choice-radio:not(.choice-text--selected)");

        for (let a = 0; a < unselected.length; a++) {
            unselected[a].classList.add("disabled");
        }

        for (let i = 0; i < all.length; i++) {
            all[i].setAttribute("disabled", "");
            all[i].style.cursor = "not-allowed";
        }
        submitButton.setAttribute("disabled", "");
        submitButton.style.cursor = "not-allowed";
    };

    const displayReset = () => {
        if (!document.getElementById("restart-2")) {
            const container = document.querySelector(".container");
            const restartButton = document.createElement("button");
            const modal = document.getElementById("results");
            restartButton.setAttribute("id", "restart-2");
            restartButton.classList.add("btn", "restart", "restart-b")
            restartButton.textContent = "Restart";
            container.insertBefore(restartButton, modal);

            restartButton.addEventListener("click", reset);
        }
    };

    const displayAnswers = () => {
        disableAll();
        closeModal();
        getInfo(data);
        displayReset();
    };

    const close = () => {
        const closeButton = document.getElementsByClassName("close")[0];
        closeButton.addEventListener("click", displayAnswers);
    };

    const answersButton = document.getElementById("answers");
    answersButton.addEventListener("click", displayAnswers);

    const deselectAll = () => {
        const all = document.querySelectorAll(".choice-text, .choice-radio");
        for (choice of all) {
            choice.classList.remove("choice-text--selected");
            choice.classList.remove("choice-text--selected-correct");
            choice.classList.remove("choice-text--selected-incorrect");
        }
    };

    const uncheckAll = () => {
        const inputs = document.querySelectorAll(".choice-radio");
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].checked) inputs[i].checked = false;
        }
    };

    const hideInfo = () => {
        const questions = document.querySelectorAll(".question");
        for (let q of questions) {
            let para = q.querySelector(".more-info");
            q.removeChild(para);
        }
    };

    const enableAll = () => {
        const all = document.querySelectorAll(".choice-text, .choice-radio");

        for (let i of all) {
            i.removeAttribute("disabled");
            i.style.cursor = "pointer";
            i.classList.remove("disabled");
        }
        submitButton.removeAttribute("disabled");
        submitButton.style.cursor = "pointer";
    };

    const reset = () => {
        closeModal();
        deselectAll();
        uncheckAll();
        score = 0;
        hideInfo();
        enableAll();
    };

    const resetButton = document.getElementById("restart");
    resetButton.addEventListener("click", reset);
}