import isIp from"is-ip";

function isIpValid(ip = "") {
  return isIp.v4(ip);
}

let validators = {
  isIpValid,
};

export default validators;
