function viewInitialize(){
  if(typeof state.checkInDay === 'undefined'){
    // do checkInDay prompt
    document.querySelector('#jsCheckInDiv').innerHTML = renderer.checkInDayPrompt()
    return
  }
  if(typeof state[currentMonth()]==='undefined'){
    // do set goals prompt
    return
  }
  if(setNextMonthsGolsCheck()){
    //
    return
  }
}

function currentMonth(){
  const today = new Date()
  let month = today.getMonth();
  let year = today.getFullYear();
  return `y${year}m${month}`
}

function saveState(){
  localStorage.setItem('state', JSON.stringify(state));
}

function loadState(){
  return JSON.parse(localStorage.getItem('state')) || {};
}

console.log('farts')
const state = loadState()
const weekDays = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday']
const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December']

var demoState = {
  'y2017m2': {
    'weeks':[
      {'dailyProgress':[
        [false, false],
        [false, false],
        [false, false],
        [true, false],
        [false, false],
        [false, false],
        [false, false],
        ],
      'weeklyReflection':['minimal progress', 'no progress']
      },
    ],
    'goals':['guitar', 'programming']
  }
}
