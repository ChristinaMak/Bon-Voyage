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
        document.getElementById("datespicker").value = localStorage.getItem('datesValues');
    }
});
