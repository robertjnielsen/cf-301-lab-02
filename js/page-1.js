'use strict';

/**********************************/
/* Data related to Dropdown Menu. */
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
    console.log(selectedHorn);
    allHornsOne.forEach(horn => {
      if (selectedHorn === horn.keyword) {
        $('#horns-template-embed').append(horn.renderHorns());
      } else if (selectedHorn === 'default') {
        $('#horns-template-embed').append(horn.renderHorns());
      }
    });
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
});
