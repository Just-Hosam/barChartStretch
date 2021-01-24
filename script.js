const testObj = [
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

let resetObj = [
  {
    name: '',
    numData: 0
  }
]

options = {
  unit: '$',
  barColor: 'red',
  labelColor: 'black',
  titleText: 'this is not right',
  titleColor: 'black',
  titleFontSize: 25,
  titleFontUnit: 'px',
  yAxisHeightValue: 300,
  yAxisHeightUnit: 'px'
}


const largestValue = dataObj => {
  let storeArr = [];
  for(let i = 0; i < dataObj.length; i++) {
    storeArr.push(dataObj[i].numData);
  }

  return Math.max(...storeArr);
}

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

    // updates the bar charts to what the user wants
    $('.bars .bar').css('background-color', options.barColor);
    $('.bars li').css('color', options.labelColor);
    $('#barTitle').html(options.titleText);
    $('#barTitle').css('color', options.titleColor);
    let titleFontSizeCont = options.titleFontSize + options.titleFontUnit
    $('#barTitle').css('font-size', titleFontSizeCont);

    // adjusts bar, y-axis & y-axis values heightes to match given height
    let yAxisHeight = options.yAxisHeightValue + options.yAxisHeightUnit;
    $('.bars').css('height', yAxisHeight);
    $('.bars li').css('height', yAxisHeight);
    $('.y-axis-values').css('height', yAxisHeight);
    let spaceBtnTicks = options.yAxisHeightValue/2 + options.yAxisHeightUnit;
    $('.y-axis-values li').css('height', spaceBtnTicks);


  });

}


// INPUT CODE


$(document).ready(() => {

  // clicking on button creates 2 input boxes and a delete button
  $('#addRowButton').on('click', () => {
    let tableRow = '<tr>';
    tableRow += '<td><input type="text" name="xLabels" placeholder="Enter Month" value="january"></td>';
    tableRow += '<td><input type="text" name="yValues" placeholder="Enter Expense" value="238942"></td>';
    tableRow += '<td><input type="button" value="Delete Row" class="deleteButton"></td>';
    tableRow += '</tr>';
    $('table tbody').append(tableRow);
  })

  // deletes table row on button click
  $('table tbody').on('click',  '.deleteButton',(event) => {
    $(event.currentTarget).closest('tr').remove();
  })

  // deletes ALL table rows on button click
  $('#resetButton').on('click',() => {
    $('tbody tr').remove();
  })



})

// data collection

let dataArr = [];

const getTableData = () => {
  $(document).ready(() => {
    $('#submitButton').on('click', () => {
      dataArr = [];
      let counter = 0;
      $('table tbody tr').each((index, key) => {
        dataArr.push({})
        dataArr[index].name = $('table tbody tr input')[counter].value;
        counter++;
        dataArr[index].numData = $('table tbody tr input')[counter].value;
        counter += 2;
      })
      console.log(dataArr);
      drawBarChart(dataArr, options);
    })
  })
}






getTableData();





