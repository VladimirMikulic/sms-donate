const phneNumInput = document.querySelector('#phone-num');
const loginForm = document.querySelector('#login-form');

var iti = intlTelInput(phneNumInput, {
  autoPlaceholder: 'aggressive',
});

loginForm.addEventListener('submit', (e) => {
  const isNumValid = iti.isValidNumber();

  if (!isNumValid) {
    return alert('Please enter a valid phone number!');
  } else {
    // Firebase
  }
});
