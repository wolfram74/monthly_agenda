utils = (function(){
  let API = {}
  API.setListeners = function(){
    document.querySelector('#jsNewGoals form').addEventListener(
      'click', listeners.addGoal
      );
    document.querySelector('#jsNewGoals form').addEventListener(
      'submit', listeners.parseGoalForm
      );
    document.querySelector('.goals_input').addEventListener(
      'click', listeners.deleteGoal
      );
    const displayTogglers = document.querySelectorAll('.hide_content');
    displayTogglers.forEach(
      (toggle) => {toggle.addEventListener(
              'click', listeners.hideSibling
              )}
      );
    document.querySelector('#jsCheckInDiv select').addEventListener(
      'change', listeners.checkInUpdate
      );
    document.addEventListener('change',utils.saveState)
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

  API.nextEmptyMonth = function(){
    //return object {year, month}
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    if( state[API.currentMonth()] === undefined ){
      return {year, month}
    }
    const nextMonth = new Date(
      year, 1+month
      )
    return {year: nextMonth.getFullYear(), month: nextMonth.getMonth()}
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
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const daysSinceMonthStart = dateObj.getDate()-1;

    const monthLength = new Date(year, month+1, 0).getDate();
    const weekShift = new Date(year, month, 1).getDay();

    const fullWeeks = Math.floor( daysSinceMonthStart/7 );
    const weekRemainder = daysSinceMonthStart % 7;

    const firstWeekLength = (checkIn - weekShift + 7)%7;
    const bonus = (weekRemainder > firstWeekLength) ? 1 : 0;
    const result = fullWeeks+bonus;

    if( (result*7 + firstWeekLength) >= monthLength){
      return 0
    }
    return result
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
  API.stateMaintainer = function(){
    const currentWeek = API.nthWeek(new Date(), state.checkInDay);
    const currentMonth = API.currentMonth()
    const goalCount = state[currentMonth].goals.length
    if(state[currentMonth].weeks[currentWeek]===undefined){
      state[currentMonth].weeks[currentWeek] = API.blankWeek(goalCount)
    }
    for(let week=0; week<currentWeek; week++){
      if(state[currentMonth].weeks[week]===undefined){
        state[currentMonth].weeks[week] = API.blankWeek(goalCount)
      }
    }
    API.saveState()
  }

  API.blankWeek = function(goalCount){
    let week= {dailyChecks:[], weeklyProgress:[], weeklyReflection:[]}
    for(let goal = 0; goal<goalCount; goal++){
      for(let day=0; day<7; day++){
        week.dailyChecks[goal]=[]
        week.dailyChecks[goal][day]=false
      }
    }
    for(let goal = 0; goal<goalCount; goal++){
      week.weeklyProgress[goal]=0
      week.weeklyReflection[goal]=''
    }
    return week
  }
  return API
})()


console.log('farts')
const state = utils.loadState()
const currentMonth = utils.currentMonth()
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

utils.setListeners();
renderer.initialize();
