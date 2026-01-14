async function uploadFile() {
  const file = document.getElementById('fileInput').files[0];
  const formData = new FormData();
  formData.append('file',file);

  try {
    const response = await fetch('/api/upload',{
      method:'POST',
      body:formData
    })
    const data = response.json();

    let file_card_success = document.createElement('div');
    file_card_success.classList.add('file-card');
    file_card_success.classList.toggle('success')
    file_card_success.innerHTML = `
          <div class="file-icon primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>
        <div class="file-content">
          <div class="file-header">
            <span class="file-name">${file.name}</span>
            <div class="file-action">
              <div class="check-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="progress-bar">
            <div class="progress-fill success" style="width: 100%;"></div>
          </div>
          <div class="status-row">
            <span class="status-text success">Upload Successful!</span>
            <span class="status-percent">100%</span>
          </div>
        </div>
    `
    let file_cards = document.querySelector('.file-cards');
    file_cards.append(file_card_success);

    console.log(data);
    

  } catch (error) {
    console.log(error);    
  }

}

