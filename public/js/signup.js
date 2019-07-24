document.addEventListener("DOMContentLoaded", function() {

  document.getElementById('input-signup-username').oninput = (event) => {
    event.target.setCustomValidity('');
  };

  document.getElementById('input-signup-username').oninvalid = (event) => {
    event.target.setCustomValidity('Username should only contain lowercase letters');
  }
  
});