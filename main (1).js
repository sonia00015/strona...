// Przycisk do zmiany trybu jasny/ciemny
const modeToggleBtn = document.getElementById('mode-toggle');
// Przełącznik języka
const languageSwitcher = document.getElementById('language-switcher');
// Nawigacja i przycisk menu
const nav = document.querySelector('nav');
const navUl = nav.querySelector('ul');
const menuToggleBtn = document.createElement('button');

// Konfiguracja przycisku menu
menuToggleBtn.classList.add('menu-toggle');
menuToggleBtn.setAttribute('aria-label', 'Toggle menu');
menuToggleBtn.innerHTML = '<div></div><div></div><div></div>';
nav.parentNode.insertBefore(menuToggleBtn, nav.nextSibling);

// Obsługa kliknięcia przycisku menu
menuToggleBtn.addEventListener('click', () => {
  navUl.classList.toggle('open');
  menuToggleBtn.classList.toggle('open');
});

// Obsługa zmiany trybu jasny/ciemny
modeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    modeToggleBtn.textContent = '☀️';
  } else {
    modeToggleBtn.textContent = '🌙';
  }
});

// Obsługa zmiany języka
languageSwitcher.addEventListener('change', (e) => {
  const selectedLang = e.target.value;
  document.documentElement.lang = selectedLang;

  // Wyświetlenie komunikatu o zmianie języka
  let langMessage = document.getElementById('lang-message');
  if (!langMessage) {
    langMessage = document.createElement('div');
    langMessage.id = 'lang-message';
    langMessage.style.position = 'fixed';
    langMessage.style.bottom = '10px';
    langMessage.style.right = '10px';
    langMessage.style.backgroundColor = '#a67cff';
    langMessage.style.color = 'white';
    langMessage.style.padding = '8px 12px';
    langMessage.style.borderRadius = '5px';
    langMessage.style.boxShadow = '0 2px 6px rgba(75, 44, 111, 0.7)';
    document.body.appendChild(langMessage);
  }

  // Mapowanie nazw języków
  let languageNames = {
    pl: 'Polski',
    en: 'English',
    ru: 'Русский',
    ua: 'Українська',
    de: 'Deutsch'
  };
  langMessage.textContent = `Zmiana języka na: ${languageNames[selectedLang] || selectedLang}. W praktyce zaimplementuj tłumaczenia.`;

  // Usunięcie komunikatu po 3 sekundach
  setTimeout(() => {
    if (langMessage) {
      langMessage.remove();
    }
  }, 3000);
});

// Obsługa akordeonów
const accordionButtons = document.querySelectorAll('.accordion-button');
accordionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !expanded);
    const content = button.nextElementSibling;
    if (content) {
      content.hidden = expanded;
    }
  });
});

// Obsługa galerii i modala
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.createElement('div');
modal.classList.add('modal');
modal.style.display = 'none';
modal.setAttribute('role', 'dialog');
modal.setAttribute('aria-modal', 'true');
modal.setAttribute('aria-hidden', 'true');

// Tworzenie zawartości modala
const modalContent = document.createElement('div');
modalContent.id = 'modal-content';
modal.appendChild(modalContent);

const modalClose = document.createElement('button');
modalClose.id = 'modal-close';
modalClose.setAttribute('aria-label', 'Zamknij');
modalClose.textContent = '×';
modalContent.appendChild(modalClose);

document.body.appendChild(modal);

// Obsługa kliknięcia na element galerii
galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    modalContent.innerHTML = '';
    modalContent.appendChild(modalClose);

    if (item.classList.contains('video-thumbnail')) {
      const iframe = document.createElement('iframe');
      iframe.width = '560';
      iframe.height = '315';
      iframe.src = 'https://www.youtube.com/embed/1N6v6Q6Q7xA';
      iframe.title = 'YouTube video player';
      iframe.frameBorder = '0';
      iframe.allowFullscreen = true;
      modalContent.appendChild(iframe);
    } else {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt;
      img.style.maxWidth = '100%';
      img.style.borderRadius = '10px';
      modalContent.appendChild(img);
    }

    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
  });
});

// Obsługa zamykania modala przyciskiem zamknięcia
modalClose.addEventListener('click', () => {
  // Ukrycie modala
  modal.style.display = 'none';
  // Ustawienie atrybutu aria-hidden na true
  modal.setAttribute('aria-hidden', 'true');
});

// Obsługa zamykania modala po kliknięciu poza jego zawartość
modal.addEventListener('click', (e) => {
  // Sprawdzenie, czy kliknięto w tło modala
  if (e.target === modal) {
    // Ukrycie modala
    modal.style.display = 'none';
    // Ustawienie atrybutu aria-hidden na true
    modal.setAttribute('aria-hidden', 'true');
  }
});

// Obsługa zamykania modala klawiszem Escape
document.addEventListener('keydown', (e) => {
  // Sprawdzenie, czy naciśnięto klawisz Escape i czy modal jest widoczny
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    // Ukrycie modala
    modal.style.display = 'none';
    // Ustawienie atrybutu aria-hidden na true
    modal.setAttribute('aria-hidden', 'true');
  }
});
