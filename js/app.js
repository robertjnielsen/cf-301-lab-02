'use strict';
// Declare array to hold Image instances.
const allImages = [];

// Create array to hold object keywords for <select> element.
const allOptions = [];

// Define Image constructor function.
function Image(newImg) {
  this.imageUrl = newImg.image_url;
  this.title = newImg.title;
  this.description = newImg.description;
  this.keyword = newImg.keyword;
  this.horns = newImg.horns;
  allImages.push(this);
}

Image.prototype.newOption = function() {
  const selectEl = $('#select');
  if (!allOptions.includes(this.keyword)) {
    allOptions.push(this.keyword);
    selectEl.append(`<option value="${this.keyword}">${this.keyword}</option>`);
  }
};

Image.prototype.render = function() {
  // Grab html template used to render Image objects to page.
  const photoTemplate = $('#photo-template').html();

  // Create a new <section> element.
  const $newSection = $('<section></section>');
  $newSection.addClass(this.keyword);

  $newSection.html(photoTemplate);

  // Append the Image instance data to the new <section> element.
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.imageUrl);
  $newSection.find('img').attr('alt', this.title);
  $newSection.find('p').text(this.description);

  // Append the new <section> element to the <main> element.
  $('main').append($newSection);
};

function displayImage() {
  $('section').hide();
  let selectedOption = $(this).val();
  $(`.${selectedOption}`).show();
}

$(document).ready(() => {
  // Grab data from a local file and run through Image constructor.
  // eslint-disable-next-line comma-dangle
  $.ajax('./data/page-1.json', { method: 'GET', dataType: 'JSON' }).then(
    data => {
      data.forEach(img => {
        let newImage = new Image(img);
        newImage.newOption();
        newImage.render();
      });
    }
  );

  $('select').on('change', displayImage);
});
