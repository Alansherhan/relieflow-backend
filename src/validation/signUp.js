export function signupFormValidation(body) {
  if (!body) {
    return { success: false, message: 'body not exist' };
  }
  if (!body.name) {
    return { success: false, message: 'name not exist' };
  }
  if (!body.email) {
    return { success: false, message: 'email not exist' };
  }
  if (!body.password) {
    return { success: false, message: 'password not exist' };
  }
  if (!body.phoneNumber) {
    return { success: false, message: 'phone number not exist' };
  }
  if (!body.address) {
    return { success: false, message: 'address not exist' };
  }
  return { success: true };
}
