utils = (function(){
  let API = {}
  API.setListeners = function(){
    document.querySelector('#jsNewGoals form').addEventListener('click', listeners.addGoal);
    document.querySelector('#jsNewGoals form').addEventListener('submit', listeners.parseGoalForm);
    document.querySelector('.goals_input').addEventListener('click', listeners.deleteGoal);
    const displayTogglers = document.querySelectorAll('.hide_content');
    displayTogglers.forEach((toggle)=> toggle.addEventListener('click', listeners.hideSibling))
    document.querySelector('#jsCheckInDiv select').addEventListener('change', listeners.checkInUpdate)
  }

  API.firstCheckIn = function(){

  }

  API.lastCheckIn = function(){

  }

  API.currentMonth = function(){
    const today = new Date()
    let month = today.getMonth();
    let year = today.getFullYear();
    return `y${year}m${month}`
  }

  API.currentWeek = function(){
    // compare to list of checkin days, get index of first <= to present
    // or see what getDate()-getDay()/7 floored is
    //months are 0 index, new Date(year, n, 0).getDate() returns length of month n-1
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const monthLength = new Date(year, month+1, 0).getDate()
    const weekShift = new Date(year, month, 1).getDay()
    console.log(year, month, monthLength, weekShift, weekDays[weekShift])
  };

  API.nthWeek = function(dateObj, checkIn){
    /*
    day, shift, checkin -> nth week
    1, s, s+0 -> 0
    d, s, s+0 -> ceil(((d-1)/7)
    (1, 2), s, s+1 -> 0
    d, s, s+1 ->
    */
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const monthLength = new Date(year, month+1, 0).getDate();
    const weekShift = new Date(year, month, 1).getDay();
    const dayOfWeek = dateObj.getDay()
    const today = dateObj.getDate()-1;
    const fullWeeks = Math.floor(today/7);
    const weekRemainder = today % 7;
    const gap2 = (checkIn - weekShift)%7 ;
    const bonus2 = (dayOfWeek > gap2) ? 1 : 0;
    console.log(today)
    // return fullWeeks + bonus2
    return fullWeeks
  };

  API.checkInDays = function(){
    const today = new Date()

  }

  API.saveState = function(){
    localStorage.setItem('state', JSON.stringify(state));
  }

  API.loadState = function(){
    return JSON.parse(localStorage.getItem('state')) || {};
  }
  return API
})()

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

console.log('farts')
const state = utils.loadState()
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

utils.setListeners()
