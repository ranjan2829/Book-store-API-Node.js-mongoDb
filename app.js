// Utility function to display results
function displayResult(data, containerId) {
    // Create or get result container
    let resultContainer = document.getElementById(containerId);
    if (!resultContainer) {
        resultContainer = document.createElement('div');
        resultContainer.id = containerId;
        resultContainer.className = 'result-container';
        document.querySelector(`.tile:has(#${containerId.replace('-result', '')})`).appendChild(resultContainer);
    }
    
    resultContainer.innerHTML = `
        <div class="result">
            <pre>${JSON.stringify(data, null, 2)}</pre>
        </div>
    `;
}

// Add event listeners when the document loads
document.addEventListener('DOMContentLoaded', () => {
    // Add New Book
    const addBookForm = document.querySelector('.tile:has(#title) .book-form');
    addBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/books/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: document.getElementById('title').value,
                    author: document.getElementById('author').value,
                }),
            });
            const data = await response.json();
            displayResult(data, 'add-book-result');
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Update Book
    const updateBookForm = document.querySelector('.tile:has(#book-id) .book-form');
    updateBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const bookId = document.getElementById('book-id').value;
        try {
            const response = await fetch(`/api/books/update/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: document.getElementById('new-title').value,
                    author: document.getElementById('new-author').value,
                }),
            });
            const data = await response.json();
            displayResult(data, 'update-book-result');
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Get All Books
    const getAllBooksButton = document.querySelector('.action-button');
    getAllBooksButton.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/books/get');
            const data = await response.json();
            displayResult(data, 'get-all-books-result');
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Get Single Book
    const getSingleBookForm = document.querySelector('.tile:has(#single-book-id) .book-form');
    getSingleBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const bookId = document.getElementById('single-book-id').value;
        try {
            const response = await fetch(`/api/books/get/${bookId}`);
            const data = await response.json();
            displayResult(data, 'get-single-book-result');
        } catch (error) {
            console.error('Error:', error);
        }
    });
});