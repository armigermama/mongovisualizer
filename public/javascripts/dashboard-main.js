$(function() {

  // click event for the new database connection button
  $('#new-db-form').submit(function(e) {
    e.preventDefault();

    $('#db-input-form').closest('.form-container').removeClass('hide');

  });

});
