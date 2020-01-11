'use strict';

/**********************************/
/* Data related to Filter Menu. */
/**********************************/

// Declare array to hold all UNIQUE options.
const allOptionsOne = [];

// Declare function to generate filter <option> elements.
function newOptions() {
  allHornsOne.forEach(horn => {
    if (!allOptionsOne.includes(horn.keyword)) {
      allOptionsOne.push(horn.keyword);
    }
  });
}

// Declare function to populate filter <option> elements to page.
function renderOptions() {
  const userSelect = $('#filter-horns');
  allOptionsOne.forEach(option => {
    const newOption = $(`<option value="${option}">${option}</option>`);
    userSelect.append(newOption);
  });
}

// Declare function that populates filtered Horn instances to page.
function filterHorns() {
  $('#filter-horns').on('change', function() {
    $('div').hide();
    let selectedHorn = $(this).val();
    allHornsOne.forEach(horn => {
      if (selectedHorn === horn.keyword) {
        $('#horns-template-embed').append(horn.renderHorns());
      } else if (selectedHorn === 'default') {
        $('#horns-template-embed').append(horn.renderHorns());
      }
    });
  });
}

/******************************/
/* Data related to Sort Menu. */
/******************************/

// Declare function to sort Horn instances by title.
function sortHornsByTitle() {
  allHornsOne.sort(function(a, b) {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  });
  allHornsOne.forEach(horn => horn.renderHorns());
}

// Declare function to sort Horn instances by horns.
function sortHornsByHorns() {
  allHornsOne.sort(function(a, b) {
    if (a.horns < b.horns) {
      return -1;
    } else if (a.horns > b.horns) {
      return 1;
    } else {
      return 0;
    }
  });
  allHornsOne.forEach(horn => horn.renderHorns());
}

// Declare function to sort Horn instances.
function sortHorns() {
  $('#sort-horns').on('change', function() {
    $('div').hide();
    let sortedHorns = $(this).val();
    console.log(sortedHorns);
    if (sortedHorns === 'title') {
      sortHornsByTitle();
    } else if (sortedHorns === 'horns') {
      sortHornsByHorns();
    }
  });
}

/***********************************/
/* Data related to AJAX config(s). */
/***********************************/

const ajaxLocal = {
  method: 'GET',
  dataType: 'JSON',
};

/************************************************/
/* Data related to function calls and DOM load. */
/************************************************/

$(document).ready(() => {
  $.ajax('./data/page-1.json', ajaxLocal).then(data => {
    data.forEach(value => {
      let newHorn = new Horn(value);
      allHornsOne.push(newHorn);
      newHorn.renderHorns();
    });
    newOptions();
    renderOptions();
  });
  filterHorns();
  sortHorns();
});
