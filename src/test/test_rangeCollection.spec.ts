import { expect } from 'chai';
import RangeCollection from '../rangeCollection';

const rc = new RangeCollection();

describe('rangeCollection', () => {
  describe('add [1, 5]', () => {
    it('should display range in format: [1, 5)', () => {
      rc.add([1, 5]);
      expect(rc.print()).to.equal('[1, 5)');
    });
  });
  describe('add [10, 20]', () => {
    it('should display range in format: [1, 5) [10, 20)', () => {
      rc.add([10, 20]);
      expect(rc.print()).to.equal('[1, 5) [10, 20)');
    });
  });
  describe('add [20, 20]', () => {
    it('should display range in format: [1, 5) [10, 20)', () => {
      rc.add([20, 20]);
      expect(rc.print()).to.equal('[1, 5) [10, 20)');
    });
  });
  describe('add [20, 21]', () => {
    it('should display range in format: [1, 5) [10, 21)', () => {
      rc.add([20, 21]);
      expect(rc.print()).to.equal('[1, 5) [10, 21)');
    });
  });
  describe('add [2, 4]', () => {
    it('should display range in format: [1, 5) [10, 21)', () => {
      rc.add([20, 21]);
      expect(rc.print()).to.equal('[1, 5) [10, 21)');
    });
  });
  describe('add [3, 8]', () => {
    it('should display range in format: [1, 8) [10, 21)', () => {
      rc.add([3, 8]);
      expect(rc.print()).to.equal('[1, 8) [10, 21)');
    });
  });
  describe('remove [10, 10]', () => {
    it('should display range in format: [1, 8) [10, 21)', () => {
      rc.remove([10, 10]);
      expect(rc.print()).to.equal('[1, 8) [10, 21)');
    });
  });
  describe('remove [10, 11]', () => {
    it('should display range in format: [1, 8) [11, 21)', () => {
      rc.remove([10, 11]);
      expect(rc.print()).to.equal('[1, 8) [11, 21)');
    });
  });
  describe('remove [15, 17]', () => {
    it('should display range in format: [1, 8) [11, 15) [17, 21)', () => {
      rc.remove([15, 17]);
      expect(rc.print()).to.equal('[1, 8) [11, 15) [17, 21)');
    });
  });
  describe('remove [3, 19]', () => {
    it('should display range in format: [1, 3) [19, 21)', () => {
      rc.remove([3, 19]);
      expect(rc.print()).to.equal('[1, 3) [19, 21)');
    });
  });
  describe('add [2, 19]', () => {
    it('should display range in format: [1, 21)', () => {
      rc.add([2, 19]);
      expect(rc.print()).to.equal('[1, 21)');
    });
  });
  describe('add [0, 200]', () => {
    it('should display range in format: [0, 200)', () => {
      rc.add([0, 200]);
      expect(rc.print()).to.equal('[0, 200)');
    });
  });
  describe('add [50, 50]', () => {
    it('should display range in format: [0, 200)', () => {
      rc.add([50, 50]);
      expect(rc.print()).to.equal('[0, 200)');
    });
  });
  describe('remove [50, 50]', () => {
    it('should display range in format: [0, 200)', () => {
      rc.remove([50, 50]);
      expect(rc.print()).to.equal('[0, 200)');
    });
  });
  describe('add [250, 255]', () => {
    it('should display range in format: [0, 200) [250, 255)', () => {
      rc.add([250, 255]);
      expect(rc.print()).to.equal('[0, 200) [250, 255)');
    });
  });
  describe('remove [250, 250]', () => {
    it('should display range in format: [0, 200) [250, 255)', () => {
      rc.remove([250, 250]);
      expect(rc.print()).to.equal('[0, 200) [250, 255)');
    });
  });
  describe('add [21, 256]', () => {
    it('should display range in format: [0, 256)', () => {
      rc.add([21, 256]);
      expect(rc.print()).to.equal('[0, 256)');
    });
  });
  describe('add [300, 400]', () => {
    it('should display range in format: [0, 256) [300, 400)', () => {
      rc.add([300, 400]);
      expect(rc.print()).to.equal('[0, 256) [300, 400)');
    });
  });
  describe('error input 1', () => {
    it('should throw error with message: "Wrong input provided, input range is not an array"', () => {
      expect(function () {
        // @ts-ignore
        rc.add('');
      }).to.throw(Error, 'Wrong input provided, input range is not an array');
    });
  });
  describe('error input 2', () => {
    it('should throw error with message: "Wrong input provided, input range array must have only two integers"', () => {
      expect(function () {
        // @ts-ignore
        rc.add([2]);
      }).to.throw(Error, 'Wrong input provided, input range array must have only two integers');
    });
  });
  describe('error input 3', () => {
    it('should throw error with message: "Wrong input provided, values in range array must be initeger"', () => {
      expect(function () {
        // @ts-ignore
        rc.add([2, '3']);
      }).to.throw(Error, 'Wrong input provided, values in range array must be initeger');
    });
  });
  describe('error input 4', () => {
    it('should throw error with message: "Wrong input provided, start value of range (first item in input array) should be lower or equal than end range value (second item in input array)"', () => {
      expect(function () {
        rc.add([5, 2]);
      }).to.throw(Error, 'Wrong input provided, start value of range (first item in input array) should be lower or equal than end range value (second item in input array)');
    });
  });
});
