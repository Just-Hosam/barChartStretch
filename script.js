// helper function to find the largest value in an object
const largestValue = dataObj => {
  let storeArr = [];
  for(let i = 0; i < dataObj.length; i++) {
    storeArr.push(dataObj[i].numData);
  }

  return Math.max(...storeArr);
}


// main function that draws the chart
const drawBarChart = (expenseDataObj, options) => {
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

    // updates the bars to what the user wants
    $('.bars .bar').css('background-color', options.barColor);
    $('.bars li').css('color', options.labelColor);

    // adjusts bar, y-axis & y-axis values heightes to match given height
    let yAxisHeight = options.yAxisHeightValue + 'px';
    $('.bars').css('height', yAxisHeight);
    $('.bars li').css('height', yAxisHeight);
    $('.y-axis-values').css('height', yAxisHeight);
    let spaceBtnTicks = options.yAxisHeightValue/2 + 'px';
    $('.y-axis-values li').css('height', spaceBtnTicks);
  });
}


// INPUT CODE
$(document).ready(() => {

  // clicking on button creates 2 input boxes and a delete button
  $('#addRowButton').on('click', () => {
    let tableRow = '<tr>';
    tableRow += '<td><input type="text" name="xLabels" placeholder="Enter Month"></td>';
    tableRow += '<td><input type="text" name="yValues" placeholder="Enter Expense"></td>';
    tableRow += '<td><input type="button" value="Delete Row" class="deleteButton"></td>';
    tableRow += '</tr>';
    $('table tbody').append(tableRow);
  });

  // deletes table row on button click
  $('table tbody').on('click',  '.deleteButton',(event) => {
    $(event.currentTarget).closest('tr').remove();
  });

  // deletes ALL table rows on button click
  $('#resetButton').on('click',() => {
    $('tbody tr').remove();
  });

  // dynamically sets the chart title
  $('#title-text').on('keyup', () => {
    let newStr = $('#title-text')[0].value;
    $('#barTitle').html(newStr);
  });

  // dynamically sets the color of the chart title
  $('#title-color').on('change', () => {
    $('#barTitle').css('color', $('#title-color')[0].value);
  });

  // dynamically sets the font size of the chart title
  $('#title-size').on('change', () => {
    let titleSizeAndUnit = $('#title-size')[0].value + 'px';
    $('#barTitle').css('font-size', titleSizeAndUnit);
  });
})

// data collection
let dataArr = [];
let options = {};

// function that on submission resets the chart, takes input from the user and draws the bars for the chart
const getTableData = () => {
  $(document).ready(() => {
    $('.submissionBtn').on('click', () => {
      dataArr = [];
      barChartReset();
      let counter = 0;

      // loops through input table and sets data into the dataArr
      $('table tbody tr').each((index, key) => {
        dataArr.push({})
        dataArr[index].name = $('table tbody tr input')[counter].value;
        counter++;
        dataArr[index].numData = $('table tbody tr input')[counter].value;
        counter += 2;
      })

      // updates the customization options for the bar chart
      options.unit = $('#cust-labelUnit')[0].value;
      options.barColor = $('#cust-barColor')[0].value;
      options.labelColor = $('#cust-labelColor')[0].value;
      options.yAxisHeightValue = $('#cust-yAxisHeightValue')[0].value;

      // prevents undefined values incase of an empty submission
      if(dataArr.length > 0) {
        drawBarChart(dataArr, options);
      } else {
        barChartReset();
      }
    })
  })
}

// function to reset the values and bars on the chart bar
const barChartReset = () => {
  $('#topTick').empty();
  $('#midTick').empty();
  $('#bottomTick').empty();

  $('.bars li').remove();
}

// main function run
getTableData();





