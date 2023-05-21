export function renderLoading(isLoading, submitButton) {
    const textSubmitButton = submitButton.textContent;
    if(isLoading) {
      submitButton.textContent = textSubmitButton + '...';
    }
    else {
      submitButton.textContent = textSubmitButton.slice(0, textSubmitButton.length-3);
    }
  }
  