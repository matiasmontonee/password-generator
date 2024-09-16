export const validatePasswordStrength = (password: string): number => {
  let strength = 0;

  if (password.length > 0) strength++;
  if (password.length > 11) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[\W]/.test(password)) strength++;

  return strength;
};