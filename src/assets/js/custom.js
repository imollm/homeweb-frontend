'use strict'

$('app-header > nav > button').click((e) => {
  console.log('click');
  let navbarButton = $('#navbarColor02');
  if (navbarButton.hasClass('show')) {
    navbarButton.removeClass('show');
  } else {
    navbarButton.addClass('show');
  }
});
