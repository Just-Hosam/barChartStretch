const expenseDataObj = [
  {
    name: 'January',
    numData: 600
  },

  {
    name: 'February',
    numData: 350
  },

  {
    name: 'March',
    numData: 400
  },

  {
    name: 'April',
    numData: 200
  },

  {
    name: 'May',
    numData: 500
  }

]

options = {
  unit: '$',
  barColor: 'red',
  labelColor: 'black',
  titleText: 'This is a bar chart title',
  titleColor: 'black',
  titleFontSize: 20,
  titleFontUnit: 'px',
  yAxisHeightValue: 600,
  yAxisHeightUnit: 'px'
}

const largestValue = dataObj => {
  let storeArr = [];
  for(let i = 0; i < expenseDataObj.length; i++) {
    storeArr.push(dataObj[i].numData);
  }

  return Math.max(...storeArr);
}


$(document).ready(() => {

  // updates y-axis values to match given data
  $('#topTick').html(largestValue(expenseDataObj) + options.unit);
  $('#midTick').html(largestValue(expenseDataObj)/2 + options.unit);
  $('#bottomTick').html(0 + options.unit);

  // updates width of x-axis based on the number of given data values
  $('.bars').css('width', (expenseDataObj.length * 100 + 'px'));


  // adds the bars html elements using the given data
  for (let j = 0; j < expenseDataObj.length; j++) {
    let fromDataSet = expenseDataObj[j].numData;
    let dataPercent = Math.floor( 100 * fromDataSet / largestValue(expenseDataObj) );
    let dataName = expenseDataObj[j].name;

    let newStr = "<li><div class='bar top' data-percentage='" + dataPercent +  "' value='" + fromDataSet + options.unit +  "'></div><span>" + dataName + "</span></li>";

    $('.bars').append(newStr);
  }

  // updates the height of each bar
  $('.bars li .bar').each((i, value) => {
    value.dataset.percentage = 100 * expenseDataObj[i].numData / largestValue(expenseDataObj);

    let heightPercent = Math.floor(value.dataset.percentage) + '%';

    $(value).css('height', heightPercent);
  });


  // moves the values on bars (top, mid, bottom)
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

  // updates the bar charts to what the user wants
  $('.bars .bar').css('background-color', options.barColor);
  $('.bars li').css('color', options.labelColor);
  $('#barTitle').html(options.titleText);
  $('#barTitle').css('color', options.titleColor);
  $('#barTitle').css('font-size', options.titleFontSize + options.titleFontUnit);

  // adjusts bar, y-axis & y-axis values to match given height
  let yAxisHeight = options.yAxisHeightValue + options.yAxisHeightUnit;
  $('.bars').css('height', yAxisHeight);
  $('.bars li').css('height', yAxisHeight);
  $('.y-axis-values').css('height', yAxisHeight);
  let spaceBtnTicks = options.yAxisHeightValue/2 + options.yAxisHeightUnit;
  $('.y-axis-values li').css('height', spaceBtnTicks);


});


















// drawBarChart(data, options, element);

