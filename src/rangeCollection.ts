export type Range = [number, number];

/**
 * RangeCollection class
 */
export default class RangeCollection {
  private collection: Range[];

  constructor() {
    this.collection = [];
  }

  private isOverlap(currentRange: Range, inputRange: Range) {
    if (currentRange[0] > inputRange[1] || currentRange[1] < inputRange[0]) {
      return false;
    }
    return true;
  }

  private testInput(inputRange: Range) {
    if (!Array.isArray(inputRange)) {
      throw new Error('Wrong input provided, input range is not an array');
    }
    if (inputRange.length !== 2) {
      throw new Error('Wrong input provided, input range array must have only two integers');
    }
    if (!Number.isInteger(inputRange[0]) || !Number.isInteger(inputRange[1])) {
      throw new Error('Wrong input provided, values in range array must be initeger');
    }
    if (inputRange[0] > inputRange[1]) {
      throw new Error('Wrong input provided, start value of range (first item in input array) should be lower or equal than end range value (second item in input array)');
    }
  }

  /**
   * Adds a range to the collection
   */
  public add(inputRange: Range) {
    this.testInput(inputRange);

    let pushed = false;
    const newCollection: Range[] = [];

    this.collection.forEach(currentRange => {
      if (currentRange[0] > inputRange[1] && !pushed) {
        newCollection.push(inputRange);
        pushed = true;
      }
      if (this.isOverlap(currentRange, inputRange)) {
        inputRange[0] = Math.min(inputRange[0], currentRange[0]);
        inputRange[1] = Math.max(inputRange[1], currentRange[1]);
      } else {
        newCollection.push(currentRange);
      }
    });
    if (!pushed) {
      newCollection.push(inputRange);
    }
    this.collection = [...newCollection];
  }

  /**
   * Removes a range from the collection
   */
  public remove(inputRange: Range) {
    this.testInput(inputRange);

    const newCollection: Range[] = [];

    this.collection.forEach(currentRange => {
      if (this.isOverlap(currentRange, inputRange)) {
        if (currentRange[0] < inputRange[0] &&
          currentRange[1] > inputRange[1] &&
          inputRange[0] === inputRange[1]
        ) {
          newCollection.push(currentRange);
        } else {
          if (currentRange[0] < inputRange[0]) {
            newCollection.push([currentRange[0], inputRange[0]]);
          }
          if (currentRange[1] > inputRange[1]) {
            newCollection.push([inputRange[1], currentRange[1]]);
          }
        }
      } else {
        newCollection.push(currentRange);
      }
    });
    this.collection = [...newCollection];
  }
  /**
   * Prints out the list of ranges in the range collection
   */
  public print() {
    let collectionDisplay = '';

    this.collection.forEach(currentRange => {
      collectionDisplay += `[${currentRange[0]}, ${currentRange[1]}) `;
    });
    return collectionDisplay.trim();
  }
}