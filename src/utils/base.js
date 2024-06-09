export function firstLetterToUpperCase(str) {
  if (!str) {return str;} // Return the string as-is if it's empty or null.
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function firstLetterToLowerCase(str) {
  if (!str) {return str;} // Return the string as-is if it's empty or null.
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function isEscapeKeyPressed(event) {
  return event.key === 'Escape' || event.key === 'Esc'; // 'Esc' for older browsers
}
