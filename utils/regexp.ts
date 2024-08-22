const RegExpPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+\\-]).{8,}$/;
const RegExpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export { RegExpEmail, RegExpPassword };
