export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}
  
export const generatePassword = (options: PasswordOptions): string => {
  const { length, includeUppercase, includeLowercase, includeNumbers, includeSymbols } = options;
  
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
    let validChars = '';
  if (includeUppercase) validChars += uppercaseChars;
  if (includeLowercase) validChars += lowercaseChars;
  if (includeNumbers) validChars += numberChars;
  if (includeSymbols) validChars += symbolChars;
  
  if (validChars === '') {
    return '';
  }
  
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * validChars.length);
    password += validChars[randomIndex];
  }
  
  return password;
};  