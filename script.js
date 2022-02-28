//As of feb 8, 2022. We have almost finished. We just need to add the delete books function
//

let myLibrary = [];

function Book(author, title, numOfpgs, beenReadTorF) {
  this.author = author;
  this.title = title;
  this.numOfpgs = numOfpgs;
  this.beenRead = beenReadTorF;
}

function addBookToLibrary(userAuthor, userTitle, userNumOfpgs, userBeenTorF) {
  let book = new Book(userAuthor, userTitle, userNumOfpgs, userBeenTorF);
  myLibrary.push(book);
}

function btnPressed() {
  console.log("hello pressed!!!");

  //we will change our form pop up form from 'none' (Which makes it invisible). to 'block' (which reveals the form).
  popUpform.style.display = "block";
}

function submitBtnPressed() {
  console.log("Flag1");

  //we take that textcontent from the input fields and save them into variables.
  AuthorFormInput = authorText.value;
  inTitleFormInput = titleText.value;
  inPagesFormInput = pagesText.value;

  //we take our variables and pass them to our object constructions.
  addBookToLibrary(AuthorFormInput, inTitleFormInput, inPagesFormInput, 0);

  //showInputValues();
  //showCurrentBooks();

  //here we create our divs containers. EAch will act as "books" in our library. SO each time a book object is created, we create a "book" in our webpage
  // that will correspond to that object.
  let div1 = document.createElement("div");
  div1.classList.add("book");
  div1.id = `book${numberofbooks + 1}`;

  let btnShowInfo = document.createElement("button");
  btnShowInfo.innerHTML = "Show Book info";
  btnShowInfo.classList.add("btnShow");
  div1.appendChild(btnShowInfo);
  btnShowInfo.setAttribute("data-idnum", numberofbooks + 1);
  console.log("ok here I am" + btnShowInfo.dataset.idnum);
  //let btnShowid = btnShowInfo.id;
  //console.log("#23" + btnShowInfo.id);

  //this will create a button event for the show info in the book
  btnShowInfo.addEventListener("click", showBookInfo);

  let btnRemove = document.createElement("button");
  btnRemove.innerHTML = "X";
  btnRemove.classList.add(`btnRemove${numberofbooks + 1}`);
  div1.appendChild(btnRemove);
  //idk but if idRemove, the "R" is capatalized. It will not work. So it must be "idremove"
  btnRemove.setAttribute("data-idremove", numberofbooks + 1);

  //This will create a button event to delete a book
  btnRemove.addEventListener("click", deleteBook);

  //this will create add id to each div, and the id will correspond to the library array. So when we want to target a specific book in the library to delete
  //we can select it by its ID number. Since each div will have an id that corresponds to the library object array position.

  bookCointainer.appendChild(div1);

  console.log(div1.id);

  //we need to append divs into our document everytime a book is added.
  //

  numberofbooks++;
  console.log("Flag2");

  popUpform.style.display = "none";
}

//this shows the current books we have created and that have been stored in the arrays
function showCurrentBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    console.log(myLibrary[i]);
  }
}

//this is used to check if values from input are being stored correctlyt and to pop off the form.
function showInputValues() {
  console.log(AuthorFormInput);
  console.log(inTitleFormInput);
  console.log(inPagesFormInput);
  popUpform.style.display = "none";
}

function showBookInfo() {
  console.log("im showing  book num info # " + numberofbooks);
  // we are using numberofbooks to be our library objects reference. So we can use it
  // as an index to the library object.
  // colsole.log("this id for this div is: " + dataset.idnum);

  //FUCK ME. THHIS SHIT WORKS. I NEED TO WRITE A PAGE HERE TO SAY WHAT THIS SHIT IS DOING
  //AMA GO TO BED AFTER THIS SHIT. BUT HOLYSHIT.
  //Explanation for this: So The issue I was running into was that When a book was added into the
  //library. I needed to associate that added book with a special IDnum. An Identifier that
  //would also corespond to the books location in our Library Array holding the book objects.
  //So the meta data Idnum tag would work like an identifier, telling us the location of
  //book in the library Object Array
  //And to be more definitive, the idnum would act as the index in the array in which the
  //corresponding book is located.
  //Easy, we have come up with a way to create uniqeness in our website. To when a book is clicked
  //It will be able to reference its proper location in the object.
  //The next problem we ran into, is how would we pass our IDNUM in our evenhandler function.
  //How would our Click Eventhandler associate the idnum with the button that was being pressed at
  //momment. How would an eventhandler be able to have a reference to our currenly pressed buttons
  //IDNUM, which is used to locate our book in the Library Array.
  // So inorder to acomplish this. We use the
  // currentTarget.dataTarget.dataset.idnum
  // I used the following https://salesforce.stackexchange.com/questions/261849/how-do-i-get-the-value-from-an-attribute-after-onclick-event
  //for the definition of 'currentTarget'
  // https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
  //The currentTarget read-only property of the Event interface identifies the current
  //target for the event, as the event traverses the DOM. It always refers to the element to
  //which the event handler has been attached, as opposed to Event.target,
  //which identifies the element on which the event occurred and which may be its descendant.
  //
  //so currentTarget targets the element that is associated with the eventhandler. In our case
  //it targets the button.
  //*note we need event to follow currentTarget.)
  console.log("omg plz work " + event.currentTarget.dataset.idnum);

  let tempnum = event.currentTarget.dataset.idnum;
  //this is used to verify that we are in the correct library index
  //console.log(myLibrary[numberofbooks].author);
  //console.log(myLibrary[numberofbooks].title);
  //console.log(myLibrary[numberofbooks].numOfpgs);
  //console.log(myLibrary[numberofbooks].beenReadTorF);

  showButInfo.style.display = "block";

  //next we will show book info in a pop up window.
  console.log("av000##  " + tempnum);
  h1AUTHOR.innerHTML = " " + myLibrary[tempnum].author;
  h1TITLE.innerHTML = " " + myLibrary[tempnum].title;
  h1NUMOFPGS.innerHTML = " " + myLibrary[tempnum].numOfpgs;

  //we need to enable a button that will close this showinfo popup.

  let closeButton = document.querySelector(".closeButton");

  closeButton.addEventListener("click", closeX);
}

function deleteBook() {
  console.log("im in delete book");
  console.log("Working: " + event.currentTarget.dataset.idremove);

  let idremovenum = event.currentTarget.dataset.idremove;

  //we get the reference for the book we want to delete, by referencing its idname.
  let remobook = document.querySelector(`#book${idremovenum}`);

  //from document, we look for the parent node of the book we want to delete and then we delete
  //the specified book from the container.
  document.querySelector(".BigPopa").removeChild(remobook);

  delete myLibrary[idremovenum];
}

function closeX() {
  showButInfo.style.display = "none";
}

//This will be used to get the book cointainer. So we can add our book divs.
let bookCointainer = document.querySelector(".BigPopa");

//This will be our add book button which will add a book and pop up a form
const ADDbtn1 = document.querySelector("#btn");

//this button will submit our form and close the form.
const SubBtn = document.querySelector(".btnSubmit");

//this will be used to pop up our form and take it away.
const popUpform = document.querySelector(".overBox");

//showinfobutton
const showButInfo = document.querySelector(".showInfo");

//updates to textcontent
const h1AUTHOR = document.querySelector(".h1AUTHOR");

const h1NUMOFPGS = document.querySelector(".h1NUMOFPGS");

const h1TITLE = document.querySelector(".h1TITLE");

//This is the even handler for click
ADDbtn1.addEventListener("click", btnPressed);

//This is the event handler for when the submit button is submit;
SubBtn.addEventListener("click", submitBtnPressed);

const authorText = document.querySelector(".inAuthor");
const titleText = document.querySelector(".inTitle");
const pagesText = document.querySelector(".inPages");

let AuthorFormInput;
let inTitleFormInput;
let inPagesFormInput;

//need to start at -1, so when we add + 1 it will correspond to object library.
let numberofbooks = -1;

/*
userAuthor = "orwel";
userTitle = "1984";
userNumOfpgs = "234";
userBeenTorF = true;

addBookToLibrary();

userAuthor = "johnSteinbeck";
userTitle = "Pearl";
userNumOfpgs = "100";
userBeenTorF = true;

addBookToLibrary();
*/
//console.log("Object1 " + myLibrary[0].author);

//console.log("Object2 " + myLibrary[1].author);
