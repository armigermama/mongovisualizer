$(function() {

  $('#form-collection-for-chart').submit(function(e) {
    e.preventDefault();
    var thisCollection = $('#collection-select').text();

    $.ajax({
      type: 'post',
      url: '/dataview/' + dbID,
      data: dbID,
      success: function(data) {
        
      }

    });
  })

});