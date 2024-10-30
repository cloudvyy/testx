document.getElementById('drawBtn').addEventListener('click', async () => {
    try {
       const response = await fetch('/api/get-winners');
       const data = await response.json();
 
       if (data.winners) {
          const resultDiv = document.getElementById('result');
          resultDiv.innerHTML = `<h2>Winners</h2><ul>${data.winners.map(num => `<li>User ${num}</li>`).join('')}</ul>`;
       } else {
          console.error('No winners received.');
       }
    } catch (error) {
       console.error('Error fetching winners:', error);
    }
 });
 async function checkTwitter(twitterHandle) {
    try {
       const response = await fetch('/api/check-twitter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ twitterHandle })
       });
       const data = await response.json();
       return data.following;
    } catch (error) {
       console.error('Twitter check failed:', error);
       return false;
    }
 }
 