$(function() {

  $('#form-collection-for-chart').submit(function(e) {
    e.preventDefault();
    var thisCollection = $('#collection-select option:selected').text();
    console.log('thisCollection: ', thisCollection);

    $.ajax({
      type: 'post',
      url: '/dataview/query',
      data: thisCollection,
      success: function(data) {
        console.log('form-collection data: ', data);
      }

    });
  })

});