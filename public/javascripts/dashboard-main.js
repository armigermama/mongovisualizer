$(function() {

  // unhide db-input-form
  // click event for the new database connection button
  $('#new-db-form').submit(function(e) {
    e.preventDefault();

    $('#db-input-form').closest('.form-container').removeClass('hide');

  });

  // click event for db-input-form
  $('#db-input-form').submit(function(e) {
    e.preventDefault();
    var count = 0;

    $.ajax({
      type: 'post',
      url: '/dashboard/add',
      data: $('#db-input-form').serialize(),
      success: function(data) {
        console.log('#db-input-form data', data);
        ++count;
        var dbDataFormID = 'dbDataForm'.concat(count);
        console.log('dbDataFormID', dbDataFormID);
        console.log('.dbDataTemplate', $('.dbDataTemplate'));

        var newDbForm = $('.dbDataTemplate').
          clone().
          removeClass('dbDataTemplate').
          addClass(dbDataFormID);

        $('.dbDataTemplate').before(newDbForm);

        newDbForm
          .find('.db-nickname-data')
          .text(data.databaseNickName);
        newDbForm
          .find('.db-host-data')
          .text(data.databaseHost);
        newDbForm
          .find('.db-port-data')
          .text(data.databasePort);
        newDbForm
          .find('.db-name-data')
          .text(data.mongodbName);

        $('#'active-db-nickname).text(data.databaseNickName);
        newDbForm.removeClass('hide');


         
      }
    });
  });

});
