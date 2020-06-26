/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

// create a variable to store student list item elements in the student-list
const studentListItems = document.querySelectorAll('.student-item');
//console.log(studentListItems);

//create variable to store the number of items per each page
const itemsPerPage = 10;

//reference the main page elements inside of the parent div
const page = document.querySelector('.page');


/*** 
   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

// Create the `showPage` function to hide all of the items in the list except for the ten you want to show.
function showPage(list, page) {

    //Create two variables to store the start index and the end index of the list items to be displayed on the given page
    const startIndex = (page * itemsPerPage) - itemsPerPage;
    const endIndex = (page * itemsPerPage) - 1;

    //loop over the list and hide all the list items except for the 10 items to show at the start page
    for (let i = 0; i < list.length; i += 1) {
        list[i].style.display = 'none';
    }
    /*
    Loop over items in the list parameter
    -- If the index of a list item is >= the index of the first item that should be shown on the page
    -- && the list item index is <= the index of the last item that should be shown on the page, show it
    */
    for (let i = 0; i < list.length; i += 1) {
        if (i >= startIndex && i <= endIndex) {
            list[i].style.display = '';
        }
    }
}

//showPage(studentListItems, 1);

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks(list) {

    // 1. Determine how many pages are needed for the list by dividing the total number of list items by the max number of items per page

    const numberOfPages = Math.max(list.length / itemsPerPage);

    // 2. Create a div, give it the “pagination” class, and append it to the .page div
    const pagDiv = document.createElement('div');
    pagDiv.className = 'pagination';
    page.appendChild(pagDiv);

    // 3. Add a ul to the “pagination” div to store the pagination links
    const ul = document.createElement('ul');
    pagDiv.appendChild(ul);

    // 4. for every page, add li and a tags with the page number text
    for (let i = 0; i < numberOfPages; i += 1) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        ul.appendChild(li);
        li.appendChild(a);
        // add # to a tag
        a.href = '#';
        //use if statement to set the start page to 1 instead 0
        a.textContent = i + 1;
        if (i == 0) {
            a.className = 'active';
        }

    }

    //5. Add an event listener to each a tag. When they are clicked call the showPage function to display the appropriate page
    // select the ul child element
        const links = document.querySelector('div.pagination').firstElementChild;
    
        for (let i = 0; i < links.children.length; i += 1) {
    
            links.children[i].addEventListener('click', (e) => {
                e.preventDefault();
                showPage(list, links.children[i].firstElementChild.textContent);
    //6. Loop over pagination links to remove active class from all appendPageLinks   
                for (let i = 0; i < links.children.length; i += 1) { 
                    links.children[i].firstElementChild.classList.remove('active');
                }
     //7. Add the active class to the link that was just clicked. You can identify that clicked link using event.target           
                e.target.className = 'active';
    
            });
        }
}


// Extra creadit: create a search bar
function createSearchBar() {
// create a div and give it class name "student-search" and append it to the .page div
const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
page.appendChild(searchDiv);

//create an element to strore valueable
const input = document.createElement('input');
input.textContent = 'Search for students...';
searchDiv.appendChild(input);

// create a button
const button = document.createElement('button');
button.textContent = 'Search';
searchDiv.appendChild(button);
    
return searchDiv;
    
}



// show the paginations on the bottom of the list
showPage(studentListItems, 1);
// it will show the list of students on the page when the page button was clicked
appendPageLinks(studentListItems);




// Remember to delete the comments that came with this file, and replace them with your own code comments.
