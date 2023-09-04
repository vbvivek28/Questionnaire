
function validateForm() {
  var form = document.querySelector('form');
  var question1Input = document.getElementById('question1');
  var question2Input = document.getElementById('question2');
  var question10Input = document.getElementById('question10');

  var question1Error = document.getElementById('question1-error');
  var question2Error = document.getElementById('question2-error');
  var question10Error = document.getElementById('question10-error');

  question1Error.textContent = '';
  question2Error.textContent = '';
  question10Error.textContent = '';

  if (!question1Input.checkValidity()) {
    question1Error.textContent = 'Please answer Question 1.';
    return false;
  }

  if (!question2Input.checkValidity()) {
    question2Error.textContent = 'Please answer Question 2.';
    return false;
  }


  if (!question10Input.checkValidity()) {
    question10Error.textContent = 'Please answer Question 10.';
    return false;
  }

  // Form is valid, proceed with submission or further processing
  return true;
}
  
