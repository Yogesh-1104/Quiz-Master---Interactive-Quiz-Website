let questions = {
  History: {
    Beginner: [
      {
        question: "Who was the first president of the USA?",
        options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"],
        correct: 0,
        explanation: "George Washington was the first president of the USA.",
      },
      {
        question: "In what year did World War II end?",
        options: ["1940", "1945", "1950", "1960"],
        correct: 1,
        explanation: "World War II ended in 1945.",
      },
      {
        question: "Where are the Great Pyramids of Giza located?",
        options: ["West bank of the Nile River", "East bank of the Nile River", "Sahara Desert", "Giza Plateau"],
        correct: 0,
        explanation: "Great Pyramids of Giza are located at the West bank of the Nile River.",
      },
    ],
    Intermediate: [
      {
        question: "Who was the Roman emperor during the fall of Rome?",
        options: ["Julius Caesar", "Augustus", "Romulus Augustulus", "Nerva"],
        correct: 2,
        explanation: "Romulus Augustulus was the last emperor of the Western Roman Empire.",
      },
      {
        question: "Who discovered America?",
        options: ["Christopher Columbus", "Vasco da Gama", "Marco Polo", "Leif Erikson"],
        correct: 0,
        explanation: "Christopher Columbus is credited with discovering America in 1492.",
      },
    ],
    Advanced: [
      {
        question: "Who discovered Radium and Polonium?",
        options: ["Marie Curie", "Albert Einstein", "Niels Bohr", "Isaac Newton"],
        correct: 0,
        explanation: "Marie Curie discovered Radium and Polonium.",
      },
    ],
  },
  Science: {
    Beginner: [
      {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "O2", "CO2", "H2"],
        correct: 0,
        explanation: "Water is composed of two hydrogen atoms and one oxygen atom (H2O).",
      },
      {
        question: "How many planets are in the solar system?",
        options: ["7", "8", "9", "10"],
        correct: 1,
        explanation: "There are 8 planets in the solar system.",
      },
    ],
    Intermediate: [
      {
        question: "What is the speed of light?",
        options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
        correct: 0,
        explanation: "The speed of light is approximately 300,000 kilometers per second.",
      },
      {
        question: "What element does 'O' represent?",
        options: ["Oxygen", "Osmium", "Ozone", "Oganesson"],
        correct: 0,
        explanation: "The symbol 'O' represents the element Oxygen.",
      },
    ],
    Advanced: [
      {
        question: "What is the largest desert in the world?",
        options: ["Sahara", "Antarctica", "Thar", "Arabian"],
        correct: 1,
        explanation: "Antarctica is the largest desert on Earth.",
      },
      {
        question: "Which is the only planet that spins clockwise?",
        options: ["Earth", "Mercury", "Pluto", "Venus"],
        correct: 3,
        explanation: "Venus is the only planet that spins clockwise (retrograde rotation).",
      },
      {
        question: "Bees are not present in which continent?",
        options: ["Antarctica", "Australia", "Asia", "Europe"],
        correct: 0,
        explanation: "Antarctica is the only continent without bees.",
      },
      {
        question: "Which freezes quickly, hot water or cold water?",
        options: ["Hot water", "Cold water", "At same time", "Based on environment"],
        correct: 0,
        explanation: "Hot water freezes faster under certain conditions—this is called the Mpemba effect.",
      },
      {
        question: "What was the name of first man-made satellite launched in 1957?",
        options: ["Apollo 11", "Sputnik 1", "Mangalyan", "Chandrayaan"],
        correct: 1,
        explanation: "Sputnik 1 was the first man-made satellite, launched by the Soviet Union in 1957.",
      },
    ],
  },
};

let selectedField = '';
let selectedLevel = '';
let currentQuestions = [];
let userAnswers = [];
let score = 0;
let userName = '';

// Start Quiz after entering the name
function startQuizSelection() {
  userName = document.getElementById('userName').value.trim();
  if (!userName) {
    alert("Please enter your name!");
    return;
  }

  document.querySelector('.name-input-section').style.display = 'none';
  document.querySelector('.quiz-selection').style.display = 'block';
}

// Start quiz with selected field and difficulty
function startQuiz() {
  selectedField = document.getElementById('field').value;
  selectedLevel = document.getElementById('difficulty').value;
  currentQuestions = questions[selectedField][selectedLevel];
  userAnswers = [];
  score = 0;

  document.querySelector('.quiz-selection').style.display = 'none';
  document.getElementById('quizContainer').style.display = 'block';

  displayQuestion(0);
}

// Display each question
function displayQuestion(index) {
  if (index < currentQuestions.length) {
    const question = currentQuestions[index];
    let optionsHtml = question.options.map((option, i) =>
      `<label><input type="radio" name="question${index}" value="${i}"> ${option}</label><br>`).join('');

    document.getElementById('questionContainer').innerHTML = `
      <h3>Q${index + 1}: ${question.question}</h3>
      ${optionsHtml}
      <button onclick="nextQuestion(${index})">Next</button>
    `;
  } else {
    showResult();
  }
}

// Move to the next question
function nextQuestion(index) {
  const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
  if (selectedOption) {
    userAnswers.push(parseInt(selectedOption.value));
    if (parseInt(selectedOption.value) === currentQuestions[index].correct) score++;
    displayQuestion(index + 1);
  } else {
    alert("Please select an option!");
  }
}

// Show the result after quiz completion
function showResult() {
  document.getElementById('quizContainer').style.display = 'none';
  document.getElementById('result').style.display = 'block';

  let resultText = `${userName}<br> You scored ${score} out of ${currentQuestions.length}.<br>`;
  resultText += `<b>Field:</b> ${selectedField}<br><b>Difficulty Level:</b> ${selectedLevel}<br><br>`;

  currentQuestions.forEach((question, index) => {
    resultText += `<p><b>Q${index + 1} Explanation:</b> ${question.explanation}</p>`;
  });

  document.getElementById('score').innerHTML = resultText;
}

// Restart the quiz
function restartQuiz() {
  document.getElementById('result').style.display = 'none';
  document.querySelector('.quiz-selection').style.display = 'block';
}

// Generate certificate with jsPDF
function generateCertificate() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Optional: doc.addImage('background.png', 'PNG', 0, 0, 210, 297);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(40);
  doc.setTextColor(229, 46, 113);
  doc.text('Quiz Master', 105, 50, null, null, 'center');

  doc.setFontSize(24);
  doc.setTextColor(0, 0, 0);
  doc.text('Certificate of Completion', 105, 80, null, null, 'center');

  doc.setFontSize(18);
  doc.setFont('helvetica', 'normal');
  doc.text('This certifies that', 105, 100, null, null, 'center');

  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text(userName, 105, 115, null, null, 'center');

  doc.setFontSize(16);
  doc.setFont('helvetica', 'italic');
  doc.text('has successfully completed the quiz with outstanding performance.', 105, 130, null, null, 'center');

  doc.setFont('helvetica', 'normal');
  doc.text(`Field: ${selectedField}`, 105, 150, null, null, 'center');
  doc.text(`Level: ${selectedLevel}`, 105, 160, null, null, 'center');
  doc.text(`Score: ${score}/${currentQuestions.length}`, 105, 170, null, null, 'center');

  doc.setFontSize(14);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 280);

  doc.save(`${userName}_certificate.pdf`);
}
