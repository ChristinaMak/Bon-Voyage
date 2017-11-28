function formatDate(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  return month + '/' + day + '/' + year;
}

/* Datepicker from https://codepen.io/MarkitDigital/pen/mVarxm */
$(function () {
  var today = formatDate(new Date());
  console.log("today");
  console.log(today);
  var $pickers = $('.mk-datepicker-trigger');
      $pickers.mkdatepicker(
          {
              inline: true,
              initial: today,
              min: today
          }
      );
      $pickers.on('change.mk-datepicker', function(e, date) {
          console.info('formatted date: ', this.value);
          console.info('raw date object: ', date);
      });
});

function init_datepicker() {
  $('input[name="datefilter"]').daterangepicker({
      autoUpdateInput: false,
      locale: {
          cancelLabel: 'Clear'
      }
  });

  $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
      $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
  });

  $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
      $(this).val('');
  });

};

$(document).ready(function() {
    init_datepicker();
    console.log(document.getElementById("datespicker"));
    console.log(localStorage.getItem('datesValues'));
    console.log(localStorage.getItem('dates'));
    console.log(localStorage.getItem('datesStart'));
    console.log(localStorage.getItem('datesEnd'));
    if (document.getElementById("datespicker") != null &&
        localStorage.getItem('datesValues') != null) {
        //$('#datespicker').data('daterangepicker').startDate = localStorage.getItem('datesStart');// = localStorage.getItem('datesValues');
        //$('#datespicker').data('daterangepicker').endDate = localStorage.getItem('datesEnd');
        document.getElementById("datespicker").value = localStorage.getItem('datesValues');
    }
/*
    var start = $('#datespicker').data('daterangepicker').startDate;
    var end = $('#datespicker').data('daterangepicker').endDate;
    console.log("end");
    console.log(end);
    var difference = end.diff(start, 'days');
    console.log("difference");
    console.log(difference);
*/
    start = moment($('#start-date').data('mk-datepicker').date)
    end = moment($('#end-date').data('mk-datepicker').date)
    difference = end.diff(start, 'days');
    console.log(difference);
});
