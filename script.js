const myLibrary = []
const bookContainer = document.getElementById("book-container")
const closeModal = document.getElementById("close-modal")
const newBookButton = document.getElementById("New-Book")
const dialog = document.getElementById("dialog")
const form = dialog.querySelector("form")
const removeBook = document.querySelectorAll(".delete")

function Book(title, author, pages, read) {
	// book constructor (title, author, number of pages, read, rUUID)
	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
	this.rUUID = crypto.randomUUID()
}

Book.prototype.toggleRead = function () {
	// Add method to Books: Toggle read state
	this.read = this.read == "Finished" ? "Not Finished" : "Finished"
}

function addBookToLibrary(title, author, pages, read) {
	// take params, create book and store in myLibrary
	const book = new Book(title, author, pages, read)
	myLibrary.push(book)
}

function createLibrary() {
	// loop myLibrary and create books on page
	bookContainer.innerHTML = ""

	myLibrary.forEach((book) => createBook(book))
}

newBookButton.addEventListener("click", function () {
	dialog.showModal()
})

closeModal.addEventListener("click", function () {
	dialog.close()
	form.reset()
})

form.addEventListener("submit", function (event) {
	// submit form and add book to myLibrary
	event.preventDefault()

	const formData = new FormData(form)

	const read = formData.get("read") == "on" ? "Finished" : "Not Finished"

	addBookToLibrary(formData.get("title"), formData.get("author"), formData.get("pages"), read)
	dialog.close()
	form.reset()
	createLibrary()
})

function createBook(bookObj) {
	// create book on page
	const { title, author, pages, read, rUUID } = bookObj

	const book = document.createElement("div")
	book.className = "book"

	const info1 = document.createElement("div")
	info1.className = "info1"
	info1.innerHTML = `<h1>${title}</h1><h2>${author}</h2>`
	book.appendChild(info1)

	const info2 = document.createElement("div")
	info2.className = "info2"
	info2.innerHTML = `<h3>${pages}</h3>`
	book.appendChild(info2)

	const bookStatus = document.createElement("h4")
	bookStatus.textContent = read
	info2.appendChild(bookStatus)

	bookStatus.addEventListener("click", function () {
		bookObj.toggleRead()
		this.textContent = bookObj.read
	})

	const cross = document.createElement("div")
	cross.className = "delete"
	cross.innerHTML =
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-thick</title><path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" /></svg>'
	cross.dataset.id = rUUID
	book.appendChild(cross)

	cross.addEventListener("click", function () {
		// get id and remove book from library
		removeBookFromLibrary(this.dataset.id)
	})

	bookContainer.appendChild(book)
}

function removeBookFromLibrary(id) {
	const index = myLibrary.findIndex((book) => book.rUUID === id)
	if (index !== -1) {
		myLibrary.splice(index, 1)
	}
	createLibrary()
}

// Testing books
addBookToLibrary("Harry Potter and the Order of the Phoenix", "J.K Rowling", "700 pages", "Finished")
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", "800 pages", "Finished")
addBookToLibrary("To Kill a Mockingbird", "H. Lee", "690 pages", "Finished")
createLibrary()
