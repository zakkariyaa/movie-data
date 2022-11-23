const movieData = {
  'The Darjeeling Limited': {
    plot: "A year after their father's funeral, three brothers travel across India by train in an attempt to bond with each other.",
    cast: ['Jason Schwartzman', 'Owen Wilson', 'Adrien Brody'],
    runtime: 151,
    rating: 7.2,
    year: 2007,
  },
  'The Royal Tenenbaums': {
    plot: 'The eccentric members of a dysfunctional family reluctantly gather under the same roof for various reasons',
    rating: 7.6,
    year: 2001,
    cast: ['Gene Hackman', 'Gwnyeth Paltrow', 'Anjelica Huston'],
    runtime: 170,
  },
  'Fantastic Mr. Fox': {
    year: 2009,
    plot: "An urbane fox cannot resist returning to his farm raiding ways and then must help his community survive the farmers' retaliation.",
    cast: [
      'George Clooney',
      'Meryl Streep',
      'Bill Murray',
      'Jason Schwartzman',
    ],
    runtime: 147,
    rating: 7.9,
  },
  'The Grand Budapest Hotel': {
    rating: 8.1,
    runtime: 159,
    year: 2014,
    plot: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
    cast: ['Ralph Fiennes', 'F. Murray Abraham', 'Mathieu Amalric'],
  },
};

const deletedMovies = [];

// **************************************
// Display movies on the page section
const movieSection = document.querySelector('#movies');
const div = document.createElement('div');

// create an article for each movie
const createMovieArticle = (movie, castNames, obj) => {
  const article = document.createElement('article');

  const contentDiv = document.createElement('div');
  contentDiv.className = 'contents';
  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'buttons';

  const title = document.createElement('h3');
  title.textContent = `${movie} (${obj[movie]['year']})`;

  const plot = document.createElement('p');
  plot.textContent = obj[movie]['plot'];

  const runtime = document.createElement('p');
  runtime.textContent = `Runtime: ${obj[movie]['runtime']}`;

  const rating = document.createElement('p');
  rating.textContent = `Rating: ${obj[movie]['rating']}`;

  const cast = document.createElement('p');
  cast.textContent = `Cast: ${castNames}`;

  const editButton = document.createElement('button');
  editButton.className = 'editButton';
  editButton.innerHTML = '<i class="uil uil-edit"></i>';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'deleteButton';
  deleteButton.innerHTML = '<i class="uil uil-trash"></i>';

  contentDiv.append(title);
  contentDiv.append(plot);
  contentDiv.append(runtime);
  contentDiv.append(rating);
  contentDiv.append(cast);

  buttonsDiv.append(editButton);
  buttonsDiv.append(deleteButton);

  article.append(contentDiv);
  article.append(buttonsDiv);

  return article;
};

// insert comma between names if they are > 2 and/or add the word'and'
const sanitizeNames = (movie, obj) => {
  let castNames = '';

  if (obj[movie]['cast'].length > 2) {
    castNames =
      obj[movie]['cast'].slice(0, -1).join(', ') +
      ' and ' +
      obj[movie]['cast'].slice(-1);
  } else if (obj[movie]['cast'].length === 2) {
    castNames = obj[movie]['cast'][0] + ' and ' + obj[movie]['cast'][1];
  } else {
    castNames = obj[movie]['cast'][0];
  }

  return castNames;
};

// display movies on the dom as articles
const displayMovieData = (obj) => {
  div.innerHTML = '';
  for (let movie of Object.keys(obj)) {
    // filter out deleted movies
    if (!deletedMovies.includes(movie)) {
      const castNames = sanitizeNames(movie, obj);
      const movieArticle = createMovieArticle(movie, castNames, obj);
      div.append(movieArticle);
      movieSection.append(div);
    }
  }
};

displayMovieData(movieData);

// **************************************
// Sorting functionality setcion
const dateButton = document.querySelector('#date');
const nameButton = document.querySelector('#name');

// Sort the movies by year (date)
const sortByYear = (obj) => {
  let newObj = {};
  const years = [];
  for (let movie of Object.keys(obj)) {
    years.push(obj[movie]['year']);
  }

  // Loop through the sorted years array and match with the correct movie.
  // Then store it in the new object variable.
  for (let year of years.sort()) {
    for (let movie of Object.keys(obj)) {
      if (Object.values(obj[movie]).includes(year)) {
        newObj[movie] = obj[movie];
      }
    }
  }

  return newObj;
};

// Sort the movies by name (alphabetically)
const sortByName = (obj) => {
  let newObj = {};
  const names = [];
  for (let movie of Object.keys(obj)) {
    names.push(movie);
  }

  for (let name of names.sort()) {
    for (let movie of Object.keys(obj)) {
      if (movie === name) {
        newObj[movie] = obj[movie];
      }
    }
  }

  return newObj;
};

const sortBy = document.querySelector('#sortby');

sortBy.addEventListener('change', (event) => {
  const selectedOption = event.target.value;
  if (selectedOption === 'name') {
    sortedObj = sortByName(movieData);
    displayMovieData(sortedObj);
    updateEditAndDeleteButtons();
  } else if (selectedOption === 'date') {
    sortedObj = sortByYear(movieData);
    displayMovieData(sortedObj);
    updateEditAndDeleteButtons();
  }
});

// **************************************
// Edit & Delete section
// Generate form automatically
const generateForm = () => {
  const formDiv = document.createElement('form');
  formDiv.className = 'form-div';

  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Title:';
  const titleField = document.createElement('input');
  titleField.required = true;
  titleField.id = 'title';

  const plotLabel = document.createElement('label');
  plotLabel.textContent = 'Plot:';
  const plotField = document.createElement('textarea');
  plotField.required = true;
  plotField.rows = '8';
  plotField.id = 'plot';

  const yearLabel = document.createElement('label');
  yearLabel.textContent = 'Year:';
  const yearField = document.createElement('input');
  yearField.type = 'number';
  yearField.required = true;
  yearField.id = 'year';

  const ratingLabel = document.createElement('label');
  ratingLabel.textContent = 'Rating:';
  const ratingField = document.createElement('input');
  ratingField.type = 'number';
  ratingField.required = true;
  ratingField.id = 'rating';

  const runtimeLabel = document.createElement('label');
  runtimeLabel.textContent = 'Runtime:';
  const runtimeField = document.createElement('input');
  runtimeField.type = 'number';
  runtimeField.required = true;
  runtimeField.id = 'runtime';

  const castLabel = document.createElement('label');
  castLabel.textContent = 'Cast:';
  const castField = document.createElement('input');
  castField.required = true;
  castField.id = 'cast';

  const formButtons = document.createElement('div');
  formButtons.className = 'form-buttons';

  const resetButton = document.createElement('button');
  resetButton.type = 'reset';
  resetButton.id = 'reset-button';
  resetButton.textContent = 'Reset';
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.id = 'submit-button';
  submitButton.textContent = 'Submit';

  formButtons.append(resetButton);
  formButtons.append(submitButton);

  formDiv.append(titleLabel);
  formDiv.append(titleField);
  formDiv.append(plotLabel);
  formDiv.append(plotField);
  formDiv.append(yearLabel);
  formDiv.append(yearField);
  formDiv.append(ratingLabel);
  formDiv.append(ratingField);
  formDiv.append(runtimeLabel);
  formDiv.append(runtimeField);
  formDiv.append(castLabel);
  formDiv.append(castField);
  formDiv.append(formButtons);

  return formDiv;
};

// Populate form fields
const populateForm = (movieArticle, newForm) => {
  // original form data
  const movieArticleData = movieArticle.children[0].children;
  const titleAndYear = movieArticleData[0].textContent.split('(');

  const title = titleAndYear[0].trim();
  const year = titleAndYear[1].slice(0, -1);
  const plot = movieArticleData[1].textContent;
  const runtime = movieArticleData[2].textContent.split(' ')[1];
  const rating = movieArticleData[3].textContent.split(' ')[1];
  const cast = movieArticleData[4].textContent.split(':')[1].slice(1);

  // new form fields
  // prettier-ignore
  const formFields = Array.from(newForm.children).filter((field, idx) => idx % 2 !== 0);

  const titleField = formFields[0];
  const plotField = formFields[1];
  const yearField = formFields[2];
  const ratingField = formFields[3];
  const runtimeField = formFields[4];
  const castField = formFields[5];

  // popluate appropriate fields with the right info
  titleField.value = title;
  plotField.value = plot;
  yearField.value = year;
  ratingField.value = rating;
  runtimeField.value = runtime;
  castField.value = cast;

  return title;
};

// update the page with the edited/added data
const updateMovieData = () => {
  const newForm = document.querySelector('.form-div');
  // prettier-ignore
  const formFields = Array.from(newForm.children).filter((field, idx) => idx % 2 !== 0);

  const title = formFields[0].value;
  const plot = formFields[1].value;
  const year = Number(formFields[2].value);
  const rating = Number(formFields[3].value);
  const runtime = Number(formFields[4].value);
  const cast = formFields[5].value
    .split(' ')
    .map((word) => word.replace('and', ','))
    .join(' ')
    .split(',')
    .map((word) => word.trim());

  const newObj = {
    [title]: {
      plot,
      year,
      rating,
      runtime,
      cast,
    },
  };

  return [title, newObj];
};

let deleteButtons = document.querySelectorAll('.deleteButton');
let editButtons = document.querySelectorAll('.editButton');

// delete (hide) selected movie
const deleteMovie = (deleteButton) => {
  const movieArticle = deleteButton.parentElement.parentElement;
  movieArticle.style.display = 'none';

  // prettier-ignore
  const title = deleteButton.parentElement.parentElement.children[0].children[0]
  .textContent.split('(')[0].trim();
  deletedMovies.push(title);
};

// re-add event listeners on the delete buttons
// when the displayMovieData function updates the DOM
const updateDeleteButtons = () => {
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => deleteMovie(deleteButton));
  });
};
updateDeleteButtons();

// Edit selected movie
const editMovie = (editButton) => {
  const movieArticle = editButton.parentElement.parentElement;
  const newForm = generateForm();
  const oldTitle = populateForm(movieArticle, newForm);

  // parent element of all movie articles. Created at the top
  div.replaceChild(newForm, movieArticle);

  // update page
  const editForm = document.querySelector('.form-div');
  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const [newTitle, newObj] = updateMovieData();
    movieData[newTitle] = movieData[oldTitle];
    delete movieData[oldTitle];
    movieData[newTitle] = newObj[newTitle];
    displayMovieData(movieData);

    updateEditAndDeleteButtons();
  });
};

// Same concept as above
const updateEditButtons = () => {
  editButtons.forEach((editButton) => {
    editButton.addEventListener('click', () => editMovie(editButton));
  });
};
updateEditButtons();

// function to update both edit & delete buttons
const updateEditAndDeleteButtons = () => {
  deleteButtons = document.querySelectorAll('.deleteButton');
  updateDeleteButtons();
  editButtons = document.querySelectorAll('.editButton');
  updateEditButtons();
};

// **************************************
// Add movie section
const addButton = document.querySelector('.add');
addButton.addEventListener('click', () => {
  const firstMovie = document.querySelector('#movies article');
  const newForm = generateForm();
  div.insertBefore(newForm, firstMovie);

  const addForm = document.querySelector('.form-div');
  addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const [newTitle, newObj] = updateMovieData();
    movieData[newTitle] = newObj[newTitle];
    div.removeChild(newForm);
    displayMovieData(movieData);
    updateEditAndDeleteButtons();
  });
});
