const dataTest = [
  {
    name: 'January',
    numData: 15
  },

  {
    name: 'February',
    numData: 25
  },

  {
    name: 'March',
    numData: 65
  },

  {
    name: 'April',
    numData: 75
  },

  {
    name: 'May',
    numData: 45
  }
]

let newDataTest = [
  ['January', '15%'],
  ['February', '25%'],
  ['March', '65%'],
  ['April', '75%']
]

$(document).ready(() => {
  for (let j = 0; j < dataTest.length; j++) {
    let dataPercent = dataTest[j].numData;
    let dataName = dataTest[j].name;
    let newStr = "<li><div class='bar' data-percentage='" + dataPercent + "'></div><span>" + dataName + "</span></li>";
    $('.bars').append(newStr);
  }

  $('.bars li .bar').each((i, value) => {
    value.dataset.percentage = dataTest[i].numData;
    let heightPercent = value.dataset.percentage + '%';
    $(value).css('height', heightPercent);
  });


});

/*    let divElement = $('<div></div>').text('');
    $('.bars li').append(divElement);
    let spanElement = $('<span></span>').text('');
    $('.bars li div').append(spanElement);
    */


















// drawBarChart(data, options, element);

