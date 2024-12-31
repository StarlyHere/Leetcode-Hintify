document.addEventListener('DOMContentLoaded', function () {
    const hintButton = document.getElementById('get-hint-button');
    const hintDisplay = document.getElementById('hint');
    const loadingDisplay = document.getElementById('loading');
  
    function showLoading() {
      if (loadingDisplay) loadingDisplay.style.display = 'block';
      if (hintDisplay) hintDisplay.style.display = 'none';
    }
  
    function hideLoading() {
      if (loadingDisplay) loadingDisplay.style.display = 'none';
      if (hintDisplay) hintDisplay.style.display = 'block';
    }
  
    function showError(message) {
      if (hintDisplay) {
        hintDisplay.textContent = `Error: ${message}`;
        hintDisplay.style.display = 'block';
      }
    }
  
    if (hintButton) {
      hintButton.addEventListener('click', async function () {
        try {
          showLoading();
  
          // Get current tab URL
          const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
          const tabUrl = tabs[0].url;
  
          // Check if we're on a LeetCode problem page
          if (!tabUrl.includes('leetcode.com/problems/')) {
            throw new Error('Please navigate to a LeetCode problem page');
          }
  
          // Extract question name
          const questionName = extractQuestionNameFromUrl(tabUrl);
          if (!questionName) {
            throw new Error('Could not find question name in URL');
          }
  
          console.log('Sending request for question:', questionName);
  
          const response = await fetch('http://localhost:3000/get-hint', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ questionName }),
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to get hint');
          }
  
          const data = await response.json();
          if (hintDisplay) {
            hintDisplay.textContent = data.hint;
          }
  
        } catch (error) {
          console.error('Error:', error);
          showError(error.message);
        } finally {
          hideLoading();
        }
      });
    }
  });
  
  function extractQuestionNameFromUrl(url) {
    const match = url.match(/problems\/([^/]+)/);
    return match ? match[1] : null;
  }