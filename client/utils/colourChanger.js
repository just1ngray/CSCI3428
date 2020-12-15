/**
 * This code makes the colour lighter or darker
 *
 * @author Bivash Pandey (A00425523)
 */

/**
 * This function takes hex Color code and value to +/- brightness.
 * @param {string}  colour the hex color code
 * @param {integer} value the brightness/darkness value
 *          positive value is brightness and negative is darkness
 */

export default function colorChanger(colour, value) {
  // removes the hash symbol from the front
  colour = colour.slice(1);

  // convert hexadecimal to decimal
  let num = parseInt(colour, 16);

  // For Red
  // at first num gets converted to binary and then shifts 16 to the right
  // after shifting, binary value is converted to decimal and 'value' is added
  let r = (num >> 16) + value;

  // if value of r is greater than 255, make it 255
  // if value of r is smaller than 0, make it 0
  if (r > 255) {
    r = 255;
  } else if (r < 0) {
    r = 0;
  }

  // For Blue
  let b = ((num >> 8) & 0x00ff) + value;
  if (b > 255) {
    b = 255;
  } else if (b < 0) {
    b = 0;
  }

  // For Green
  let g = (num & 0x0000ff) + value;
  if (g > 255) {
    g = 255;
  } else if (g < 0) {
    g = 0;
  }

  // return the hex string of changed colour by appending '#' at front
  return "#" + (g | (b << 8) | (r << 16)).toString(16);
}
