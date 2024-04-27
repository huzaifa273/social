exports.generateOTP = () => {
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    const randValue = Math.floor(Math.random() * 10);
    OTP += randValue;
  }
  return OTP;
};
