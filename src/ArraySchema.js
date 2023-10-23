export default class ArraySchema {
  constructor(validators) {
    this.validators = validators || [(value) => Array.isArray(value)];
  }

  isValid(value) {
    return this.validators.every((validator) => validator(value));
  }

  maxDepth(depth) {
    const validator = (value) => {
      const iter = (currentValue, currentDepth = 0) => {
        if (!Array.isArray(currentValue)) return currentDepth - 1;
        const array = currentValue.flatMap((e) => iter(e, currentDepth + 1));
        return Math.max(...array);
      };
      return iter(value) <= depth;
    };
    return new ArraySchema([...this.validators, validator]);
  }
}
