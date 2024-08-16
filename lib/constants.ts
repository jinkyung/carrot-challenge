export const EMAIL_REGEX = new RegExp(/@zod\.com$/);
export const EMAIL_REGEX_ERROR = "Email only allows @zod.com.";
export const USERNAME_MIN_LENGTH = 5;
export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_REGEX = new RegExp(/^(?=.*\d).+$/);
export const PASSWORD_REGEX_ERROR =
  "Passwords must contain at least one number.";
