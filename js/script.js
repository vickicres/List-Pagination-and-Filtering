/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


// create a variable to store student list item elements in the student-list
const studentListItems = document.querySelectorAll('.student-item');

//create variable to store the number of students per each page
const studentsPerPage = 10;


// Create the `showPage` function to hide all of the items in the list except for the ten you want to show.
const showPage = (list, page) => {

    //Create two variables to store the start index and the end index of the list items to be displayed on the given page
    const startIndex = (page * studentsPerPage) - studentsPerPage;
    const endIndex = page * studentsPerPage;

    /*
    Loop over items in the list parameter
    -- If the index of a list item is >= the index of the first item that should be shown on the page
    -- && the list item index is <= the index of the last item that should be shown on the page, show it
    */
    for (let i = 0; i < list.length; i += 1) {
        if (i >= startIndex && i < endIndex) {
            list[i].style.display = 'block';
        } else {
            list[i].style.display = 'none';
        }
    }

};

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const appendPageLinks = (list) => {

    //reference the parent element
    const mainDiv = document.querySelector('.page');

    //To prevent the pagination link form building up everytime when input some search values.
    const pagLinks = document.querySelector('.pagination');
    if (pagLinks !== null) {
        mainDiv.removeChild(pagLinks);
    }

    // 1. Determine how many pages are needed for the list by dividing the total number of list items by the max number of items per page

    const numbersOfPages = Math.ceil(list.length / studentsPerPage);

    // 2. Create a div, give it the “pagination” class, and append it to the .page div
    // 3. Add a ul to the “pagination” div to store the pagination links
    const pagDiv = document.createElement('div');
    const pagUl = document.createElement('ul');
    pagDiv.className = 'pagination';
    mainDiv.appendChild(pagDiv);
    pagDiv.appendChild(pagUl);


    // If the student names does not include a value in the user input, a text will be displayed in the HTML that says 'No Results Found'.
    if (list.length === 0) {
        const noResults = document.createElement('span');
        noResults.textContent = 'No Results Found';
        noResults.style.color = 'red';
        noResults.style.textTransform = 'uppercase';
        noResults.style.fontSize = '20px';
        pagDiv.appendChild(noResults);
    }

    // 4. for every page, add li and a tags with the page number text
    for (let i = 0; i < numbersOfPages; i += 1) {
        const pagLi = document.createElement('li');
        const pagATag = document.createElement('a');
        // add # to a tag
        pagATag.href = '#';
        pagATag.textContent = i + 1;
        //use if statement to set the start page to 1 instead 0
        if (i === 0) {
            pagATag.className = 'active';
        }
        pagUl.appendChild(pagLi);
        pagLi.appendChild(pagATag);
    }

    //5. Add an event listener to each a tag. When they are clicked call the showPage function to display the appropriate page

    const a = document.querySelectorAll('a');
    //This loop is used in adding event listener to each 'a' element.
    for (let i = 0; i < a.length; i += 1) {
        a[i].addEventListener('click', (e) => {
            for (let i = 0; i < a.length; i += 1) { // This loop removes 'active' class name in all page links.
                a[i].classList.remove('active');
            };
            e.target.classList.add('active'); // Adds the 'active' class name only to the clicked page link.
            showPage(list, e.target.textContent); //Calling this function will show the student list of the clicked page.
        });
    }
};


// Extra creadit: create a search bar

// Display the search result arrays
function searchFilter(input, names) {
    //    const inputValue = searchInput.value;
    const searchResults = []; // set search result as an empty array to store values.
    // if the input field is emptied, it will return to the original student list.
    if (input === null) {
        return list;
    } else {
        // otherwise this will loops through all the student list to find the matching result
        for (let i = 0; i < names.length; i += 1) {
            //call out the h3 element that conatins student names in each list
            const studentNames = names[i].querySelector('h3').textContent.toLowerCase();
            names[i].style.display = 'none';
            // if the student names match the input result, then the list will push out the value inside of the arrays
            if (studentNames.includes(input.toLowerCase())) {
                searchResults.push(names[i]);
            }
        }
        return searchResults;
    }
}

// create a div and give it class name "student-search" and append it to the .page div
const addSearch = () => {
    const pageDiv = document.querySelector('.page-header');

    // create search div
    const searchDiv = document.createElement('div');
    searchDiv.className = 'student-search';
    pageDiv.appendChild(searchDiv);

    //create a search input element to strore valueable
    const searchInput = document.createElement('input');
    searchInput.placeholder = 'Search for students...';
    searchDiv.appendChild(searchInput);

    // create a search button
    const searchButton = document.createElement('button');
    searchButton.textContent = 'Search';
    searchDiv.appendChild(searchButton);

    //add event listener to the search button
    searchButton.addEventListener('keyup', (e) => {
        e.preventDefault();
        const inputValue = searchInput.value;
        const results = searchFilter(inputValue, studentListItems);
        showPage(results, 1);
        appendPageLinks(results);
    });

    // add event listener to the  search input
    searchInput.addEventListener('keyup', (e) => {
        const results = searchFilter(e.target.value, studentListItems);
        showPage(results, 1);
        appendPageLinks(results);

    });
};


// show the search result
addSearch();
// show the paginations list
showPage(studentListItems, 1);
// it will show the list of students on the page when the page button was clicked
appendPageLinks(studentListItems);