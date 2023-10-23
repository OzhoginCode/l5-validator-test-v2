export default class StringSchema {
  constructor(validators) {
    this.validators = validators || [(value) => typeof (value) === 'string'];
  }

  isValid(value) {
    return this.validators.every((validator) => validator(value));
  }

  startsFromUpperCase() {
    const validator = (value) => {
      if (!value.length) return false;
      return value[0].match(/[A-Z]/);
    };
    return new StringSchema([...this.validators, validator]);
  }

  length(neededLength) {
    const validator = (value) => {
      if (!value.length) return false;
      return value.length === neededLength;
    };
    return new StringSchema([...this.validators, validator]);
  }

  hasExclamation() {
    const validator = (value) => value.includes('!');
    return new StringSchema([...this.validators, validator]);
  }
}
