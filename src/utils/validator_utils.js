class ValidatorUtils {
    isNotNull(value) {
        return !this.isNull(value);
    }

    isNull(value) {
        return value === undefined || value === null;
    }

    contains(item, values) {
        return values.findIndex((value, index) => value === item) >= 0;
    }

    isEquals = (value1, value2) => value1 === value2;
}

module.exports = new ValidatorUtils();