// url api libri
const url = 'https://striveschool-api.herokuapp.com/books';

// fetch con api libri
fetch(url)
    .then(response => {
        return response.json();
    })
    .then(books => {
        // ciclo su ogni elemento dell'array books
        books.forEach(book => {
            // per ogni elemento lancio la funnzione che crea la card
            createCard(book);
        });
    })
    .catch(error => {
        console.log(error);
    })

// funzione che crea la card del libro
function createCard(book) {
    // Punto la row bookList
    const bookList = document.getElementById('bookList');
    // creo il div che contiene la card
    let card = document.createElement('div');
    // aggiungo le classi bootstrap per la gestion delle colonne
    card.classList.add('col-6','col-md-4', 'col-lg-3', 'p-2');
    // creo il div card con l'html che gestisce i contenuti
    card.innerHTML = `
        <div id="${book.asin}" class="card p-3 d-flex flex-column">
            <img src="${book.img}" class="book-img img-thumbnail border-0 p-0" alt="${book.title}">
            <p class="book-title pt-2 m-0">${book.title}</p>
            <div class="d-flex justify-content-between align-items-center pb-2">
                <strong>$${book.price}</strong>
                <span class="badge text-bg-secondary">${book.category}</span>
            </div>
            <a type="button" class="btn btn-success" onclick="addToCart(${book.asin})">Add to cart</a>
        </div>
    `
    // inserisco la col contenente la card nella row bookList
    bookList.appendChild(card);
}