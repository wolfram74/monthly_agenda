describe("Meta", function() {

  beforeEach(function() {
  });

  it("should be able to run tests", function() {
    expect(true).toEqual(true);
  });
});

describe('utils module', function(){
  describe('#nthWeek', function(){
    it('if checkin is also the first day of the month, first day of the month is in week 0', function(){
      let day1 = new Date(2017,1,1);
      let day2 = new Date(2017,3,1);
      expect(utils.nthWeek(day1, 3)).toEqual(0)
      expect(utils.nthWeek(day2, 6)).toEqual(0)
    })
    it('if checkin is also the first day of the month, 2nd day of the month is in week 1', function(){
      let day1 = new Date(2017,1,2);
      let day2 = new Date(2017,4,2);
      expect(utils.nthWeek(day1, 3)).toEqual(1)
      expect(utils.nthWeek(day2, 1)).toEqual(1)
    })
    it('should identify days before the first threshold', function(){
      let day1 = new Date(2017, 1, 1);
      let day2 = new Date(2017, 1, 3);
      let day3 = new Date(2017, 6, 1);
      let day4 = new Date(2017, 1, 2);
      expect(utils.nthWeek(day1, 0)).toEqual(0)
      expect(utils.nthWeek(day1, 3)).toEqual(1)
      expect(utils.nthWeek(day2, 6)).toEqual(0)
      expect(utils.nthWeek(day3, 1)).toEqual(0)
    })
    it('should identify days before the fourth threshold', function(){
      let day1 = new Date(2017, 1, 24);
      let day2 = new Date(2017, 1, 26);
      let day3 = new Date(2017, 6, 28);
      expect(utils.nthWeek(day1, 0)).toEqual(3)
      expect(utils.nthWeek(day2, 2)).toEqual(3)
      expect(utils.nthWeek(day3, 1)).toEqual(4)
    })
    it('should identify days before the first threshold in the next month', function(){
      let day1 = new Date(2017, 0, 30);
      let day2 = new Date(2017, 1, 27);
      let day3 = new Date(2017, 6, 28);
      expect(utils.nthWeek(day1, 0)).toEqual(0) // there is no 6th sunday in jan
      expect(utils.nthWeek(day2, 5)).toEqual(0) // there is no 5th friday in feb
      expect(utils.nthWeek(day3, 4)).toEqual(0) // there is no 5th thursday in july
    })
  })
})
