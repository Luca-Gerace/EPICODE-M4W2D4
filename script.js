// url api libri
const url = 'https://striveschool-api.herokuapp.com/books';

// Punto la row bookList
const bookList = document.getElementById('bookList');

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
    // creo il div che contiene la card
    let card = document.createElement('div');
    // aggiungo le classi bootstrap per la gestion delle colonne
    card.classList.add('col-12','col-md-4', 'col-lg-3', 'p-2');
    // creo il div card con l'html che gestisce i contenuti
    card.innerHTML = `
        <div id="${book.asin}" class="card p-3 d-flex flex-column">
            <img src="${book.img}" class="book-img img-thumbnail border-0 p-0" alt="${book.title}">
            <p class="book-title pt-2 m-0">${book.title}</p>
            <div class="d-flex justify-content-between align-items-center pb-2">
                <strong>$${book.price}</strong>
                <span class="badge text-bg-secondary">${book.category}</span>
            </div>
            <a type="button" class="btn btn-success text-white" onclick="addToCart(${book.asin})">
                <i class="bi-cart"></i>
                Add to cart
            </a>
        </div>
    `
    // inserisco la col contenente la card nella row bookList
    bookList.appendChild(card);
}

// funzione che cerca i libri in base all'input inserito dall'utente
function searchProducts() {
    const research = document.getElementById('searchProducts');
    const title = research.value.toLowerCase().trim(); // Converti il titolo inserito dall'utente in minuscolo e rimuovo spazi ad inizio/fine testo

    // Pulisci la lista dei libri prima di riempirla con i risultati della ricerca
    bookList.innerHTML = '';

    fetch(url)
        .then(response => response.json())
        .then(books => {
            // Cicla sui libri
            books.forEach(book => {
                // Se il titolo del libro è incluso nella stringa inserita dall'utente
                if (book.title.toLowerCase().trim().includes(title)) {
                    // crea la card
                    createCard(book)
                }
            });
        })
        .catch(error => {
            console.log(error);
        });
}

// nuovo array carrello
let cart = [];

function addToCart(id) {
console.log(id);

    fetch(url)
    .then(response => response.json())
    .then(books => {
        // Cerco il libro corrispondente all'ID
        const bookToAdd = books.find(book => book.asin.toString() === id.toString());
        
        if (bookToAdd) {
            // Aggiungo il libro al carrello
            cart.push(bookToAdd);
            console.log(cart);
            let cartContent = document.getElementById('cartContent');

            let cartTitle = document.getElementById('cartTitle');
            cartTitle.classList.add('d-none');

            let cardToCart = document.createElement('div')

            cardToCart.classList.add('col-12');


            cart.forEach(item => {
                cardToCart.innerHTML = `
                    <div class="border rounded-2 p-2 d-flex mb-2">
                        <img src="${item.img}" class="img-thumbnail cart-img border-0 p-0" alt="${item.title}">
                        <div class="d-flex justify-content-between align-items-center container-fluid ps-2 pe-0">
                            <div class="d-flex flex-column justify-content-center ps-2">
                                <p class="pe-3">${item.title}</p>
                                <strong>$${item.price}</strong>
                            </div>
                            <div>
                                <a type="button" class="btn btn-danger text-white" onclick="removeToCart(cart-${item.asin})">
                                    <i class="bi-trash"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                `
                cartContent.appendChild(cardToCart);
            })
        }
    })
    .catch(error => {
        console.log(error);
    });
}