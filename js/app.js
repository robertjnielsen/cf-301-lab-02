'use strict';

// Declare array to hold Image instances.
const allImages = [];

// Define Image constructor function.
function Image(newImg) {
  this.image_url = newImg.image_url;
  this.title = newImg.title;
  this.description = newImg.description;
  this.keyword = newImg.keyword;
  this.horns = newImg.horns;
  allImages.push(this);
}

Image.prototype.render = function() {
  // Grab html template used to render Image objects to page.
  const photoTemplate = $('#photo-template').html();

  // Create a new <section> element.
  const $newSection = $('<section></section>');

  $newSection.html(photoTemplate);

  // Append the Image instance data to the new <section> element.
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('img').attr('alt', this.title);
  $newSection.find('p').text(this.description);

  // Append the new <section> element to the <main> element.
  $('main').append($newSection);
};

$.ajax('./data/page-1.json', { method: 'GET', dataType: 'JSON' }).then(data => {
  data.forEach(img => {
    let newImg = new Image(img);
    newImg.render();
  });
});
