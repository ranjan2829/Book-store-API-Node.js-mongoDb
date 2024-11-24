
async function makeAPICall(endpoint, method, data = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`/api/books/${endpoint}`, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Something went wrong');
        }

        return result;
    } catch (error) {
        alert(error.message);
        console.error('API Error:', error);
    }
}

// Display books in a formatted way
function displayBooks(books) {
    const container = document.createElement('div');
    container.style.backgroundColor = '#2a2a2a';
    container.style.padding = '20px';
    container.style.borderRadius = '12px';
    container.style.marginTop = '20px';

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.style.marginBottom = '15px';
        bookElement.style.padding = '10px';
        bookElement.style.borderBottom = '1px solid #444';
        bookElement.innerHTML = `
            <p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Year:</strong> ${book.year}</p>
            <p><strong>ID:</strong> ${book._id}</p>
        `;
        container.appendChild(bookElement);
    });

    // Remove any existing book display
    const existingDisplay = document.querySelector('.books-display');
    if (existingDisplay) {
        existingDisplay.remove();
    }

    container.className = 'books-display';
    document.querySelector('.container').appendChild(container);
}

// Add event listeners when the document loads
document.addEventListener('DOMContentLoaded', () => {
    // Add New Book Form
    const addBookForm = document.querySelector('.tile:nth-child(1) .book-form');
    addBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const year = new Date().getFullYear(); // Default to current year

        const result = await makeAPICall('add', 'POST', {
            title,
            author,
            year
        });

        if (result?.success) {
            alert('Book added successfully!');
            addBookForm.reset();
        }
    });

    // Update Book Form
    const updateBookForm = document.querySelector('.tile:nth-child(2) .book-form');
    updateBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('book-id').value;
        const title = document.getElementById('new-title').value;
        const author = document.getElementById('new-author').value;

        const result = await makeAPICall(`update/${id}`, 'PUT', {
            title,
            author
        });

        if (result?.success) {
            alert('Book updated successfully!');
            updateBookForm.reset();
        }
    });

    // Get All Books Button
    const getAllBooksButton = document.querySelector('.action-button');
    getAllBooksButton.addEventListener('click', async () => {
        const result = await makeAPICall('get', 'GET');
        if (result?.success && result.data) {
            displayBooks(result.data);
        }
    });

    // Get Single Book Form
    const getSingleBookForm = document.querySelector('.tile:nth-child(4) .book-form');
    getSingleBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('single-book-id').value;

        const result = await makeAPICall(`get/${id}`, 'GET');
        if (result?.success && result.data) {
            displayBooks([result.data]);
        }
    });

    // Add Delete Button to each book display
    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-book')) {
            const id = e.target.dataset.id;
            if (confirm('Are you sure you want to delete this book?')) {
                const result = await makeAPICall(`delete/${id}`, 'DELETE');
                if (result?.success) {
                    alert('Book deleted successfully!');
                    // Refresh the book list
                    const getAllResult = await makeAPICall('get', 'GET');
                    if (getAllResult?.success && getAllResult.data) {
                        displayBooks(getAllResult.data);
                    }
                }
            }
        }
    });
});