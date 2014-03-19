$(function() {

  // unhide db-input-form
  // click event for the new database connection button
  $('#new-db-form').submit(function(e) {
    e.preventDefault();

    $('#db-input-form').closest('.form-container').removeClass('hide');

  }); /** end of #new-db-form submit button event handler **/

  // click event for db-input-form
  $('#db-input-form').submit(function(e) {
    e.preventDefault();
    var count = 0;

    // ajax to render the mongodb entered in db-input-form onto sbDataForm
    $.ajax({
      type: 'post',
      url: '/dashboard/add',
      data: $('#db-input-form').serialize(),
      success: function(data) {
        ++count;
        var dbDataFormID = 'dbDataForm'.concat(count);

        var newDbForm = $('.dbDataTemplate').
          clone().
          removeClass('dbDataTemplate').
          addClass(dbDataFormID).
          attr('id', data._id);

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

        $('#active-db-nickname').text(data.databaseNickName);
        newDbForm.removeClass('hide');

      }
    }); /** end of #db-input-form post /dashboard/add ajax **/
  }); /** end of #db-input-form submit event handler **/

  // click event to activate a mongodb
  $(document).on('click','.btn-active-db', function(e){
    e.preventDefault();
    var dbID = $(this).closest('.form-container').attr('id');
    $('.btn-active-db').removeClass('btn-success').addClass('btn-primary');
    $(this).removeClass('btn-primary').addClass('btn-success');
    
    $.ajax({
      type: 'post',
      url: '/dashboard/active/' + dbID,
      data: dbID,
      success: function(data) {
        console.log('active db data: ', data);
        $('#collection-data-table').find('tbody').empty();
        $('#collection-data-table').find('tbody').append("<tr><th>collection</th><th># of documents</th></tr>");
        for (var i=0; i<data.length; i++) {
          $.each(data[i], function(key, value) {
            console.log('key: ', key, 'value: ', value);
            var rowHTML = "<tr><td>" + key + "</td><td>" + value + "</td></tr>";
            $('#collection-data-table').find('tbody').append(rowHTML);
          });
        }
        
        $('#collection-data-table').removeClass('hide');
      }
    }); /** end of #db-input-form post /dashboard/active/:id ajax **/
  }); /** end of #db-input-form submit event handler **/

}); /** end of on-loading jQuery function **/
