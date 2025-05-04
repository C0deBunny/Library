const myLibrary = []

function Book(title, author, pages, read) {
	// constructor (title, author, number of pages, read, rUUID)
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

// testing
addBookToLibrary("Harry Potter", "J.K. Rowling", 500, "false")
console.log(myLibrary)

const newBookButton = document.getElementById("New-Book")

newBookButton.addEventListener("click", function () {
	// testing
	console.log("Click!")
})
