/* subscribe.js - handles newsletter subscription modal and MailerLite API integration */
document.addEventListener('DOMContentLoaded', function() {
  var subscribeButton = document.getElementById('subscribe-button');
  var modal = document.getElementById('subscribe-modal');
  var closeBtn = modal ? modal.querySelector('.close-modal') : null;
  var form = modal ? modal.querySelector('form') : null;
  var messageEl = document.getElementById('subscribe-message');
  var emailInput = document.getElementById('subscriber-email');

  if (subscribeButton && modal && closeBtn && form) {
    subscribeButton.addEventListener('click', function() {
      modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
      messageEl.textContent = '';
      emailInput.value = '';
    });

    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        messageEl.textContent = '';
        emailInput.value = '';
      }
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var email = emailInput.value.trim();
      if (!email) {
        messageEl.textContent = 'Please enter a valid email address.';
        return;
      }

      // Replace the placeholders below with your actual MailerLite API token and group ID
      var apiToken = 'API_TOKEN_PLACEHOLDER';
      var groupId = 'GROUP_ID_PLACEHOLDER';

      fetch('https://api.mailerlite.com/api/v2/groups/' + groupId + '/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': apiToken
        },
        body: JSON.stringify({ email: email })
      })
      .then(function(response) {
        if (response.ok) {
          messageEl.textContent = 'Thank you for subscribing!';
          emailInput.value = '';
        } else {
          messageEl.textContent = 'There was an error. Please try again later.';
        }
      })
      .catch(function() {
        messageEl.textContent = 'There was an error. Please try again later.';
      });
    });
  }
});
