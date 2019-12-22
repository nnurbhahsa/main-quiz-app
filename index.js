let quesNum = 0;
let score = 0;

// increment score
function changeScore () {
    score ++;
}

// increment question number
function changeQues () {
    quesNum ++;
    $('.quesNum').text(quesNum+1);
}

// to start quiz
function startQuiz () {
    $('.quizStart').on('click', '.startButton', function (event) {
        $('.quizStart').remove();
        $('.qAform').css('display', 'block');
        $('.quesNum').text(1);
    });
}

// how question will be displayed
function quesDisp () {
    if (quesNum < STORE.length) {
        return `<section class="question-${quesNum}">
        <h2>${STORE[quesNum].question}</h2>
            <form>
                <fieldset>
                    <label>
                        <input type="radio" value="${STORE[quesNum].answers[0]}" name="answer" required>
                            <span>${STORE[quesNum].answers[0]}</span>
                    </label>
                    <label>
                        <input type="radio" value="${STORE[quesNum].answers[1]}" name="answer" required>
                            <span>${STORE[quesNum].answers[1]}</span>
                    </label>
                    <label>
                        <input type="radio" value="${STORE[quesNum].answers[2]}" name="answer" required>
                            <span>${STORE[quesNum].answers[2]}</span>
                    </label>
                    <label>
                        <input type="radio" value="${STORE[quesNum].answers[3]}" name="answer" required>
                            <span>${STORE[quesNum].answers[3]}</span>
                    </label>
                    <button type="submit" class="submitButton">Submit</button>
                </fieldset>
            </form>
            </section>`;
    } else {
        resultsPage();
        restartQuiz();
        $('.quesNum').text(10)
    }
}

// next question display
function newQues () {
    $('.qAform').html(quesDisp());
}

// when selecting answer
function selectAnswer () {
    $('form').on('submit', function (event) {
        event.preventDefault();
        
        let selected = $('input:checked');
        let answer = selected.val();
        let correctAnswer = `${STORE[quesNum].correctAnswer}`;
        
        if (answer === correctAnswer) {
            selected.parent().addClass('correct');
            rightAns();
        } else {
            selected.parent().addClass('wrong');
            wrongAns();
        }
    });
}

function wrongAns () {
    wrongFeedback();
}

function rightAns () {
    rightFeedback();
    updateScore();
}

function wrongFeedback () {
    let correctAnswer = `${STORE[quesNum].correctAnswer}`;
    $('.qAform').html(`<section class="correctFeedback"><p><b>INCORRECT</b><br>correct answer: <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></section>`);
}

function rightFeedback () {
    let correctAnswer = `${STORE[quesNum].correctAnswer}`;
    $('.qAform').html(`<section class="correctFeedback"><p><b>CORRECT</b></p><button type=button class="nextButton">Next</button></section>`);
}

function updateScore () {
    changeScore();
    $('.score').text(score);
}

function resultsPage () {
    if (score >= 8) {
    $('.qAform').html(`<section class="results correctFeedback"><h3>Great job!</h3><p>You got ${score} / 10</p><button class="restartButton">Restart Quiz</button></section>`);
    } else if (score < 8 && score >= 5) {
    $('.qAform').html(`<section class="results correctFeedback"><h3>Almost there!</h3><p>You got ${score} / 10</p><button class="restartButton">Restart Quiz</button></section>`);
    } else {
    $('.qAform').html(`<section class="results correctFeedback"><h3>Nice try!</h3><p>You got ${score} / 10</p><button class="restartButton">Restart Quiz</button></section>`);
    }
}

function nextQuestion () {
    $('main').on('click', '.nextButton', function (event) {
        changeQues();
        newQues();
        selectAnswer();
    });
}

function restartQuiz () {
    $('main').on('click', '.restartButton', function (event) {
        location.reload();
    });
}

// calling all quiz functions
function createQuiz () {
    startQuiz();
    newQues();
    selectAnswer();
    nextQuestion();
}

$(createQuiz);