import validators from "./gateway";
class gatewayValidators {
  ip(value) {
    let isIpValid = validators.isIpValid(value);
    return isIpValid;
  }
}

export default gatewayValidators;
