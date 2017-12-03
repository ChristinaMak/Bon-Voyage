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

$(document).ready(function() {
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

    start = moment($('#start-date').data('mk-datepicker').date)
    end = moment($('#end-date').data('mk-datepicker').date)
    difference = end.diff(start, 'days');
    console.log(difference);
});
