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
        for (var i=0; i<data.length; i++) {
          $('#agg-field, #group-by').append("<option>" + data[i] + "</option>");
        }
      }
    });
  });

  $('#form-for-chart').submit(function(e) {
    e.preventDefault();

  $(function () {
          $('#chart-container').highcharts({
              chart: {
                  type: 'column'
              },
              title: {
                  text: 'mongo data visualizer'
              },
              subtitle: {
                  text: 'source: orders'
              },
              xAxis: {
                  categories: [
                      'Jan',
                      'Feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      'Dec'
                  ]
              },
              yAxis: {
                  min: 0,
                  title: {
                      text: 'count'
                  }
              },
              tooltip: {
                  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                  pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                      '<td style="padding:0"><b>{point.y:f} </b></td></tr>',
                  footerFormat: '</table>',
                  shared: true,
                  useHTML: true
              },
              plotOptions: {
                  column: {
                      pointPadding: 0.2,
                      borderWidth: 0
                  }
              },
              series: [{
                  name: 'Tokyo',
                  data: [49, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54]
      
              }, {
                  name: 'New York',
                  data: [83, 78, 98, 93, 106, 84, 105, 104, 91, 83, 106, 92]
      
              }, {
                  name: 'London',
                  data: [48, 38, 39, 41, 47, 48, 59, 59, 52.4, 65, 59, 51]
      
              }, {
                  name: 'Berlin',
                  data: [42, 33, 34, 39, 52, 75, 57, 60, 47.6, 39, 46, 51]
      
              }]
          });
      });

    });

});