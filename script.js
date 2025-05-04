const myLibrary = []

function Book(title, author, pages, read) {
	// book constructor (title, author, number of pages, read, rUUID)
	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
	this.rUUID = crypto.randomUUID()
}

function addBookToLibrary(title, author, pages, read) {
	// take params, create a book then store it in the array
	const book = new Book(title, author, pages, read)
	myLibrary.push(book)
}

const bookContainer = document.getElementById("book-container")

function createLibrary() {
	// loops library array and creates book on page
	bookContainer.innerHTML = ""

	myLibrary.forEach((element) => {
		createBook(element.title, element.author, element.pages, element.read)
	})
}

const newBookButton = document.getElementById("New-Book")

newBookButton.addEventListener("click", function () {
	// Prompt book info and add book to library
	const title = prompt("Book title:")
	const author = prompt("Author name:")
	const pages = prompt("Amount of pages:") + " pages"
	const readStatus = prompt("Did you finish it?")
	const read = readStatus == true ? "Finished" : "Not Finished"

	addBookToLibrary(title, author, pages, read)
	createLibrary()
})

function createBook(title, author, pages, read) {
	// create a book inside the book-container in html
	const book = document.createElement("div")
	book.className = "book"

	const info1 = document.createElement("div")
	info1.className = "info1"
	info1.innerHTML = `<h1>${title}</h1><h2>${author}</h2>`
	book.appendChild(info1)

	const info2 = document.createElement("div")
	info2.className = "info2"
	info2.innerHTML = `<h3>${pages}</h3><h4>${read}</h4>`
	book.appendChild(info2)

	const cross = document.createElement("div")
	cross.className = "delete"
	cross.innerHTML =
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-thick</title><path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" /></svg>'
	book.appendChild(cross)

	bookContainer.appendChild(book)
}

// testing
addBookToLibrary("Harry Potter", "J.K Rowling", "700 pages", false)
createLibrary()
