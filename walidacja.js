// Upewnij się, że DOM jest w pełni załadowany przed wykonaniem kodu
document.addEventListener('DOMContentLoaded', function() {
  // Pobranie elementów formularza i pól wejściowych
  var form = document.getElementById('contact-form');
  var nameInput = document.getElementById('name');
  var emailInput = document.getElementById('email');
  var messageInput = document.getElementById('message');

  // Pobranie elementów do wyświetlania błędów
  var nameError = document.getElementById('name-error');
  var emailError = document.getElementById('email-error');
  var messageError = document.getElementById('message-error');

  // Funkcja walidacji pola "Imię i nazwisko"
  function validateName() {
    if (nameInput.value.trim().length < 2) {
      nameError.textContent = 'Proszę podać co najmniej 2 znaki.';
      nameError.style.color = 'red';
      return false;
    } else {
      nameError.textContent = '';
      return true;
    }
  }

  // Funkcja walidacji pola "Adres e-mail"
  function validateEmail() {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Wzorzec dla poprawnego adresu e-mail
    if (!emailPattern.test(emailInput.value.trim())) {
      emailError.textContent = 'Proszę podać poprawny adres e-mail.';
      emailError.style.color = 'red';
      return false;
    } else {
      emailError.textContent = '';
      return true;
    }
  }

  // Funkcja walidacji pola "Wiadomość"
  function validateMessage() {
    if (messageInput.value.trim().length < 10) {
      messageError.textContent = 'Wiadomość musi mieć co najmniej 10 znaków.';
      messageError.style.color = 'red';
      return false;
    } else {
      messageError.textContent = '';
      return true;
    }
  }

  // Obsługa zdarzenia "submit" dla formularza
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Zapobiegnięcie domyślnemu wysyłaniu formularza

    // Walidacja wszystkich pól
    var isNameValid = validateName();
    var isEmailValid = validateEmail();
    var isMessageValid = validateMessage();

    // Jeśli wszystkie pola są poprawne
    if (isNameValid && isEmailValid && isMessageValid) {
      // Wyświetlenie komunikatu o sukcesie
      var successMessage = document.getElementById('success-message');
      if (!successMessage) {
        successMessage = document.createElement('div');
        successMessage.id = 'success-message';
        successMessage.style.color = 'green';
        successMessage.style.marginTop = '10px';
        form.appendChild(successMessage);
      }
      successMessage.textContent = 'Dziękujemy za kontakt! Formularz został wysłany.';

      // Zresetowanie formularza
      form.reset();

      // Usunięcie komunikatu o sukcesie po 5 sekundach
      setTimeout(() => {
        if (successMessage) {
          successMessage.textContent = '';
        }
      }, 5000);
    }
  });

  // Obsługa zdarzeń "input" dla pól wejściowych (walidacja w czasie rzeczywistym)
  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  messageInput.addEventListener('input', validateMessage);
});
