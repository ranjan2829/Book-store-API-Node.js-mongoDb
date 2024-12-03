function displayResult(containerId, data) {
    const container = document.getElementById(containerId);
    
    // Format the JSON with syntax highlighting
    const formattedJson = JSON.stringify(data, null, 2)
        .replace(/"(\w+)":/g, '<span class="json-key">"$1":</span>')
        .replace(/"([^"]+)"(?=,|\n|\s*})/g, '<span class="json-string">"$1"</span>')
        .replace(/:\s*(\d+)/g, ': <span class="json-number">$1</span>')
        .replace(/:\s*(true|false)/g, ': <span class="json-boolean">$1</span>');

    container.innerHTML = `<pre>${formattedJson}</pre>`;
    
    // Add success/error class
    container.className = `result-container ${data.success ? 'success' : 'error'}`;
}

// Add New Book
document.getElementById('addBookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('/api/books/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: document.getElementById('title').value,
                author: document.getElementById('author').value
            }),
        });

        const data = await response.json();
        displayResult('addBookResult', data);

        if (data.success) {
            document.getElementById('addBookForm').reset();
            // Refresh the books list
            getAllBooks();
        }
    } catch (error) {
        displayResult('addBookResult', { success: false, message: error.message });
    }
});

// Get All Books
async function getAllBooks() {
    try {
        const response = await fetch('/api/books/get');
        const data = await response.json();
        displayResult('getAllBooksResult', data);
    } catch (error) {
        displayResult('getAllBooksResult', { success: false, message: error.message });
    }
}

// Add click event for Get All Books button
document.getElementById('getAllBooks').addEventListener('click', getAllBooks);

// Get Single Book
document.getElementById('getSingleBookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const bookId = document.getElementById('single-book-id').value;
    try {
        const response = await fetch(`/api/books/get/${bookId}`);
        const data = await response.json();
        displayResult('getSingleBookResult', data);
    } catch (error) {
        displayResult('getSingleBookResult', { success: false, message: error.message });
    }
});

// Update Book
document.getElementById('updateBookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const bookId = document.getElementById('update-book-id').value;
    try {
        const response = await fetch(`/api/books/update/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: document.getElementById('update-title').value,
                author: document.getElementById('update-author').value
            }),
        });

        const data = await response.json();
        displayResult('updateBookResult', data);

        if (data.success) {
            document.getElementById('updateBookForm').reset();
            // Refresh the books list
            getAllBooks();
        }
    } catch (error) {
        displayResult('updateBookResult', { success: false, message: error.message });
    }
});

// Load books when page loads
document.addEventListener('DOMContentLoaded', getAllBooks);



