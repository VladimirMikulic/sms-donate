/**
 * Holds Auth UI Config
 * @return {Object} The Auth FirebaseUI config.
 */
function getAuthUIConfig() {
  return {
    callbacks: {
      // Called when the user has been successfully signed in.
      signInSuccessWithAuthResult: function (response) {
        handleSignedInUser(response.user);
        // Do not redirect.
        return false;
      },
    },
    // Opens IDP Providers sign-in flow in a popup.
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: 'image', // another option is 'audio'
          size: 'normal', // other options are 'invisible' or 'compact'
          badge: 'bottomleft', // 'bottomright' or 'inline' applies to invisible.
        },
      },
    ],
  };
}

/**
 * Starts Auth UI Flow
 */
function handleSignedOutUser() {
  ui.start('#firebaseui-container', getAuthUIConfig());
}

/**
 * Removes element
 * @param {String} selector DOM element selector
 */
function removeElement(selector) {
  const element = document.querySelector(selector);

  if (element) element.remove();
  return element;
}

/**
 * Displays the Donation Form
 * @param {Object} user Firebase user object
 */
function handleSignedInUser(user) {
  // Remove Auth FirebaseUI container
  removeElement('.firebaseui-container');

  const donateTemplate = document.querySelector('#donate-form-template');
  const donateForm = donateTemplate.content.cloneNode(true);

  document.body.appendChild(donateForm);

  // Disable phone number editing
  const senderPhoneEl = document.querySelector('#sender-phone');
  senderPhoneEl.value = user.phoneNumber;
  senderPhoneEl.disabled = true;

  document.forms[0].addEventListener('submit', handleDonateFormSubmit);

  // Initilaze Materialize character counter on message field
  new M.CharacterCounter(document.querySelector('#message'));
}

function handleDonateFormSubmit(e) {
  e.preventDefault();
  alert("We haven't integrated payment process yet :)");
}

// Initialize the Auth FirebaseUI Widget
var ui = new firebaseui.auth.AuthUI(firebase.auth());
handleSignedOutUser();
