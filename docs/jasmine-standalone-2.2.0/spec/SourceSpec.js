describe("Meta", function() {

  beforeEach(function() {
  });

  it("should be able to run tests", function() {
    expect(true).toEqual(true);
  });
});

describe('utils module', function(){
  describe('#nthWeek', function(){
    describe('week 0 results', function(){
      it('2017 february 1st is before or on the first wednesday', function(){
        let day1 = new Date(2017,1,1);
        expect(utils.nthWeek(day1, 3)).toEqual(0)
      })
      it('2017 may 1st is before or on the first saturday', function(){
        let day2 = new Date(2017,3,1);
        expect(utils.nthWeek(day2, 6)).toEqual(0)
      })
      it('2017 feb 1st is before or on the first sunday', function(){
        let day1 = new Date(2017, 1, 1);
        expect(utils.nthWeek(day1, 0)).toEqual(0)
      })
      it('2017 july 1st is before or on the first saturday', function(){
        let day3 = new Date(2017, 6, 1);
        expect(utils.nthWeek(day3, 6)).toEqual(0)
      })
      it('2017 feb 2nd is before or on the first monday', function(){
        let day4 = new Date(2017, 1, 2);
        expect(utils.nthWeek(day4, 1)).toEqual(0)
      })
    })
    describe('week 1 results', function(){
      it('2017 feb 2nd is before or on the second wednesday',function(){
        let day1 = new Date(2017,1,2);
        expect(utils.nthWeek(day1, 3)).toEqual(1)
      })
      it('2017 april 2nd is before or on the second monday',function(){
        let day2 = new Date(2017,4,2);
        expect(utils.nthWeek(day2, 1)).toEqual(1)
      })
      it('2017 feb 3rd is before or on the second wednesday', function(){
        let day2 = new Date(2017, 1, 3);
        expect(utils.nthWeek(day2, 3)).toEqual(1)
      })
    })
    describe('week 2 results', function(){
      it('2017 feb 19th is on or before the third tuesday', function(){
        let day2 = new Date(2017, 1, 19);
        expect(utils.nthWeek(day2, 2)).toEqual(2)
      })
    })
    describe('week 3 results', function(){
      it('2017 feb 24th is on or before the fourth sunday', function(){
        let day1 = new Date(2017, 1, 24);
        expect(utils.nthWeek(day1, 0)).toEqual(3)
      })
    })
    describe('week 4 results', function(){
      it('2017 july 28th is on or before the fifth monday', function(){
        let day3 = new Date(2017, 6, 28);
        expect(utils.nthWeek(day3, 1)).toEqual(4)
      })
    })
    describe('Roll over results', function(){
      it('2017 jan 30th is on or before the first sunday of feb', function(){
        let day1 = new Date(2017, 0, 30);
        expect(utils.nthWeek(day1, 0)).toEqual(0) // there is no 6th sunday in jan
      })
      it('2017 feb 27th is on or before the first friday of march', function(){
        let day2 = new Date(2017, 1, 27);
        expect(utils.nthWeek(day2, 5)).toEqual(0) // there is no 5th friday in feb
      })
      it('2017 july 28th is on or before the first thursday of august', function(){
        let day3 = new Date(2017, 6, 28);
        expect(utils.nthWeek(day3, 4)).toEqual(0)
      })
    })
  })
})
