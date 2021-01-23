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
  },

  {
    name: 'June',
    numData: 400,
    numUnit: '$'
  },

]

const largestValue = dataObj => {
  let storeArr = [];
  for(let i = 0; i < expenseDataObj.length; i++) {
    storeArr.push(dataObj[i].numData);
  }

  return Math.max(...storeArr);
}


$(document).ready(() => {

  $('#topTick').html(largestValue(expenseDataObj) + expenseDataObj[0].numUnit);
  $('#midTick').html(largestValue(expenseDataObj)/2 + expenseDataObj[0].numUnit);
  $('#bottomTick').html(0 + expenseDataObj[0].numUnit);

  let xAxisWidth = expenseDataObj.length * 100 + 'px';
  console.log(xAxisWidth);
  $('.bars').css('width', xAxisWidth);


  for (let j = 0; j < expenseDataObj.length; j++) {
    let fromDataSet = expenseDataObj[j].numData;
    let dataPercent = Math.floor( 100 * fromDataSet / largestValue(expenseDataObj) );
    let dataName = expenseDataObj[j].name;

    let newStr = "<li><div class='bar' data-percentage='" + dataPercent +  "' value='" + fromDataSet + expenseDataObj[j].numUnit + "'></div><span>" + dataName + "</span></li>";

    $('.bars').append(newStr);
  }

  $('.bars li .bar').each((i, value) => {
    value.dataset.percentage = 100 * expenseDataObj[i].numData / largestValue(expenseDataObj);

    let heightPercent = Math.floor(value.dataset.percentage) + '%';

    $(value).css('height', heightPercent);
  });


});


















// drawBarChart(data, options, element);

