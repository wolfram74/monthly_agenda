utils = (function(){
  let API = {}
  API.setListeners = function(){
    document.querySelector('#jsNewGoals form').addEventListener('click', listeners.addGoal);
    document.querySelector('#jsNewGoals form').addEventListener('submit', listeners.parseGoalForm);
    document.querySelector('.goals_input').addEventListener('click', listeners.deleteGoal);
    const displayTogglers = document.querySelectorAll('.hide_content');
    displayTogglers.forEach((toggle)=> toggle.addEventListener('click', listeners.hideSibling))
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
