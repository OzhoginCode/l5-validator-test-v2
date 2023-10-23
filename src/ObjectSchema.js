export default class ObjectSchema {
  constructor(validators) {
    this.validators = validators || [(value) => typeof (value) === 'object'];
  }

  isValid(value) {
    return this.validators.every((validator) => validator(value));
  }

  shape(schema) {
    const validator = (value) => {
      const keys = Object.keys(schema);
      if (keys.length !== Object.keys(value).length) return false;
      return keys.every((key) => schema[key].isValid(value[key]));
    };
    return new ObjectSchema([...this.validators, validator]);
  }
}
