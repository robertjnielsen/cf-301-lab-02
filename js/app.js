'use strict';

/**********************************************/
/* Data related to Handlebars.js template(s). */
/**********************************************/

// Grab and compile horns-template.
let hornsTemplate = $('#horns-template').html();
let hornsTemplateRender = Handlebars.compile(hornsTemplate);

/******************************************/
/* Data related to Horn object instances. */
/******************************************/

// Declare array(s) to hold all Horns.
const allHornsOne = [];
const allHornsTwo = [];

// Declare constructor function to create Horn instances.
function Horn(obj) {
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  this.imgURL = obj.image_url;
}

// Declare Horn prototype method to populate template(s) to page.
Horn.prototype.renderHorns = function() {
  $('#horns-template-embed').append(hornsTemplateRender(this));
};

/*******************************/
/* Data related to pagination. */
/*******************************/
