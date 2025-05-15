// Dane quizu: pytania, opcje odpowiedzi i poprawne odpowiedzi
const quizData = [
  {
    question: "Jakie jest podstawowe narzędzie do nakładania podkładu?",
    options: ["Pędzel", "Gąbka", "Palce", "Szczoteczka"],
    answer: 1
  },
  {
    question: "Który kolor cieni do powiek jest najbardziej uniwersalny?",
    options: ["Brązowy", "Niebieski", "Zielony", "Fioletowy"],
    answer: 0
  },
  {
    question: "Jak nazywa się technika podkreślania brwi?",
    options: ["Konturowanie", "Wypełnianie", "Rozświetlanie", "Matowienie"],
    answer: 1
  },
  {
    question: "Jaki produkt służy do utrwalenia makijażu?",
    options: ["Baza", "Puder", "Fixer", "Korektor"],
    answer: 2
  },
  {
    question: "Co to jest 'smokey eye'?",
    options: ["Rodzaj szminki", "Technika makijażu oczu", "Typ pędzla", "Marka kosmetyków"],
    answer: 1
  },
  {
    question: "Jakie narzędzie służy do aplikacji różu?",
    options: ["Pędzel do różu", "Gąbka", "Palce", "Szczoteczka do rzęs"],
    answer: 0
  },
  {
    question: "Co to jest 'primer'?",
    options: ["Podkład", "Baza pod makijaż", "Korektor", "Puder"],
    answer: 1
  },
  {
    question: "Jakie są trzy podstawowe kolory cieni do powiek?",
    options: ["Czerwony, zielony, niebieski", "Brązowy, beżowy, czarny", "Żółty, pomarańczowy, różowy", "Fioletowy, szary, biały"],
    answer: 1
  },
  {
    question: "Jak nazywa się produkt do podkreślania rzęs?",
    options: ["Eyeliner", "Tusze do rzęs", "Korektor", "Baza"],
    answer: 1
  },
  {
    question: "Co to jest konturowanie?",
    options: ["Modelowanie twarzy światłem i cieniem", "Nakładanie podkładu", "Malowanie ust", "Utrwalanie makijażu"],
    answer: 0
  },
  {
    question: "Jakie są popularne rodzaje szminek?",
    options: ["Matowa, błyszcząca, kremowa", "Płynna, proszkowa, żelowa", "Sucha, mokra, tłusta", "Metaliczna, matowa, perłowa"],
    answer: 0
  },
  {
    question: "Co to jest 'baking' w makijażu?",
    options: ["Technika utrwalania pudrem", "Nakładanie podkładu", "Malowanie brwi", "Używanie różu"],
    answer: 0
  },
  {
    question: "Jakie narzędzie służy do blendowania cieni?",
    options: ["Pędzel do blendowania", "Gąbka", "Palce", "Pędzel do różu"],
    answer: 0
  },
  {
    question: "Co to jest 'highlighting'?",
    options: ["Rozświetlanie wybranych partii twarzy", "Matowienie skóry", "Nakładanie podkładu", "Malowanie ust"],
    answer: 0
  },
  {
    question: "Jakie są podstawowe kroki makijażu?",
    options: ["Baza, podkład, korektor, puder", "Tylko podkład i puder", "Korektor i róż", "Tylko baza i tusz do rzęs"],
    answer: 0
  }
];

// Zmienne do przechowywania aktualnego pytania i wyniku
let currentQuestion = 0;
let score = 0;

// Pobranie elementów DOM
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const submitBtn = document.getElementById('submit');
const resultEl = document.getElementById('result');

// Funkcja do załadowania pytania
function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question; // Wyświetlenie pytania
  optionsEl.innerHTML = ''; // Wyczyszczenie poprzednich opcji

  // Tworzenie opcji odpowiedzi
  q.options.forEach((option, index) => {
    const li = document.createElement('li');
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'option';
    input.value = index;
    label.appendChild(input);
    label.appendChild(document.createTextNode(option));
    li.appendChild(label);
    optionsEl.appendChild(li);
  });

  // Wyłączenie przycisku wysyłania odpowiedzi, dopóki nie zostanie wybrana opcja
  submitBtn.disabled = true;
}

// Obsługa kliknięcia przycisku wysyłania odpowiedzi
submitBtn.addEventListener('click', () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert('Proszę wybrać odpowiedź.'); // Komunikat, jeśli nie wybrano odpowiedzi
    return;
  }

  const answer = parseInt(selected.value);
  if (answer === quizData[currentQuestion].answer) {
    score++; // Zwiększenie wyniku, jeśli odpowiedź jest poprawna
  }

  currentQuestion++; // Przejście do następnego pytania

  if (currentQuestion < quizData.length) {
    loadQuestion(); // Załadowanie kolejnego pytania
  } else {
    showResult(); // Wyświetlenie wyniku, jeśli to było ostatnie pytanie
  }
});

// Obsługa zmiany opcji odpowiedzi
optionsEl.addEventListener('change', () => {
  const selected = document.querySelector('input[name="option"]:checked');
  submitBtn.disabled = !selected; // Włączenie przycisku wysyłania, jeśli wybrano opcję
});

// Funkcja do wyświetlenia wyniku
function showResult() {
  questionEl.textContent = ''; // Wyczyszczenie pytania
  optionsEl.innerHTML = ''; // Wyczyszczenie opcji odpowiedzi
  submitBtn.style.display = 'none'; // Ukrycie przycisku wysyłania

  // Wyświetlenie wyniku
  resultEl.textContent = `Twój wynik: ${score} z ${quizData.length}`;

  // Dodanie przycisku restartu quizu
  const restartBtn = document.createElement('button');
  restartBtn.textContent = 'Restartuj quiz';
  restartBtn.id = 'restart-btn';
  resultEl.appendChild(restartBtn);

  // Obsługa restartu quizu
  restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    resultEl.textContent = '';
    submitBtn.style.display = 'inline-block';
    loadQuestion();
  });
}

// Inicjalizacja quizu po załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
  loadQuestion();
});
