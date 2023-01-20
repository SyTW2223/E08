import jwt from "jwt-decode";

/**
 * Function to convert images to base 64
 * @param {*} file to convert
 * @returns file in base 64
 */
export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

/**
 * Gets the expiration date from token
 * @param {*} token 
 * @returns 
 */
export function getTokenExpiration(token) {
  const decodedToken = jwt(token);
  if (!decodedToken || !decodedToken.exp) {
    return null;
  }
  const expirationDate = new Date(0);
  expirationDate.setUTCSeconds(decodedToken.exp);
  return expirationDate;
}