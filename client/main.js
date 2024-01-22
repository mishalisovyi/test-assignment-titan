const SERVER_URL = 'http://localhost:3000'

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('handler-form');
  const loader = document.getElementById('loader');
  const result = document.getElementById('result');

  function toggleLoader() {
    loader.style.display = (loader.style.display === 'none' || loader.style.display === '') ? 'block' : 'none';
  }

  function setResult(keyword, occurrences) {
    result.textContent = `Found ${occurrences} occurrences for keyword "${keyword}"`;
  }

  function clearResult() {
    result.textContent = '';
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const pageURL = form.elements.url.value;
    const keyword = form.elements.keyword.value;

    toggleLoader();
    clearResult();

    fetch(`${SERVER_URL}/keyword-occurences?pageURL=${encodeURIComponent(pageURL)}&keyword=${encodeURIComponent(keyword)}`)
      .then(response => response.json())
      .then((data) => {
        toggleLoader();
        setResult(data.keyword, data.occurrences)
      })
      .catch(error => {
        console.error('Error:', error);
        
        toggleLoader();
        clearResult();
      });
  });
})