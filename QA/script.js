let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById('question-text');
const optionsDiv = document.getElementById('options');
const feedbackSpan = document.getElementById('feedback');
const scoreSpan = document.getElementById('score');

// 从 CSV 文件读取数据
async function loadQuestionsFromCSV() {
  try {
    const response = await fetch('questions.csv');
    const csvText = await response.text();
    const rows = csvText.split('\n');
    rows.forEach(row => {
      const [question, option1, option2, option3, option4, answerIndex] = row.split(',');
      if (question && option1 && option2 && option3 && option4 && answerIndex) {
        questions.push({
          question,
          options: [option1, option2, option3, option4],
          answer: parseInt(answerIndex)
        });
      }
    });
    showQuestion();
  } catch (error) {
    console.error('读取 CSV 文件时出错:', error);
  }
}

// 显示当前问题
function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  optionsDiv.innerHTML = '';
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('option-btn');
    button.addEventListener('click', () => checkAnswer(index));
    optionsDiv.appendChild(button);
    optionsDiv.appendChild(document.createElement('br'));
  });
  feedbackSpan.textContent = '';
}

// 检查答案
function checkAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedIndex === currentQuestion.answer) {
    score++;
    feedbackSpan.textContent = '回答正确！';
    feedbackSpan.classList.add('correct');
    feedbackSpan.classList.remove('incorrect');
  } else {
    const correctAnswer = currentQuestion.options[currentQuestion.answer];
    feedbackSpan.innerHTML = `回答错误！正确答案是: <span class="correct-answer">${correctAnswer}</span>`;
    feedbackSpan.classList.add('incorrect');
    feedbackSpan.classList.remove('correct');
  }
  scoreSpan.textContent = score;
  // 禁用所有选项按钮，防止再次点击
  const optionButtons = document.querySelectorAll('.option-btn');
  optionButtons.forEach(button => {
    button.disabled = true;
  });
  // 延迟一段时间后进入下一题
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      questionText.textContent = '答题结束！';
      optionsDiv.innerHTML = '';
    }
  }, 800);
}

// 初始化加载题目
loadQuestionsFromCSV();