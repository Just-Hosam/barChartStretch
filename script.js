const expenseDataObj = [
  {
    name: 'January',
    numData: 600,
    numUnit: '$'
  },

  {
    name: 'February',
    numData: 350,
    numUnit: '$'
  },

  {
    name: 'March',
    numData: 400,
    numUnit: '$'
  },

  {
    name: 'April',
    numData: 135,
    numUnit: '$'
  },

  {
    name: 'May',
    numData: 500,
    numUnit: '$'
  }

]

const largestValue = dataObj => {
  let storeArr = [];
  for(let i = 0; i < expenseDataObj.length; i++) {
    storeArr.push(dataObj[i].numData);
  }

  return Math.max(...storeArr);
}


$(document).ready(() => {

  // updates y-axis values to match given data
  $('#topTick').html(largestValue(expenseDataObj) + expenseDataObj[0].numUnit);
  $('#midTick').html(largestValue(expenseDataObj)/2 + expenseDataObj[0].numUnit);
  $('#bottomTick').html(0 + expenseDataObj[0].numUnit);

  // updates width of x-axis based on the number of given data values
  $('.bars').css('width', (expenseDataObj.length * 100 + 'px'));


  // adds the bars html elements using the given data
  for (let j = 0; j < expenseDataObj.length; j++) {
    let fromDataSet = expenseDataObj[j].numData;
    let dataPercent = Math.floor( 100 * fromDataSet / largestValue(expenseDataObj) );
    let dataName = expenseDataObj[j].name;

    let newStr = "<li><div class='bar top' data-percentage='" + dataPercent +  "' value='" + fromDataSet + expenseDataObj[j].numUnit +  "'></div><span>" + dataName + "</span></li>";

    $('.bars').append(newStr);
  }

  // updates the height of each bar
  $('.bars li .bar').each((i, value) => {
    value.dataset.percentage = 100 * expenseDataObj[i].numData / largestValue(expenseDataObj);

    let heightPercent = Math.floor(value.dataset.percentage) + '%';

    $(value).css('height', heightPercent);
  });


  $('.bars .bar').on('click', (event) => {
    let testingElement = $(event.currentTarget).attr('class');
    if (testingElement.includes('top')) {
      $(event.currentTarget).removeClass('top').addClass('mid');
    } else if (testingElement.includes('mid')) {
      $(event.currentTarget).removeClass('mid').addClass('bottom');
    } else if (testingElement.includes('bottom')) {
      $(event.currentTarget).removeClass('bottom').addClass('top');
    }
  })


});


















// drawBarChart(data, options, element);

