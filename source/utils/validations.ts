export function validatePhnNumber(phoneNumber: string): boolean {
    const phoneNo = /^\d{10}$/;
    return phoneNo.test(phoneNumber);
  }
  
  export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
    return email === '' ? true : emailRegex.test(email);
  }
  export const emailRegex =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/;