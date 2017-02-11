describe("Meta", function() {

  beforeEach(function() {
  });

  it("should be able to run tests", function() {
    expect(true).toEqual(true);
  });
});

describe('utils module', function(){
  describe('#nthWeek', function(){
    it('should identify days before the first threshold', function(){
      let day1 = new Date(2017, 1, 1);
      let day2 = new Date(2017, 1, 3);
      let day3 = new Date(2017, 6, 1);
      expect(utils.nthWeek(day1, 0)).toEqual(0)
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
      expect(utils.nthWeek(day1, 0)).toEqual(0)
      expect(utils.nthWeek(day2, 9)).toEqual(0)
      expect(utils.nthWeek(day3, 4)).toEqual(0)
    })
  })
})
