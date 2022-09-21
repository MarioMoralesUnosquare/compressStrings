/* Some testing cases*/
const originalString = 'uuueeeenzzzzz';
//const originalString = 'uuueeeennzzzzz';
//const originalString = 'ab4444444444444444444444444444444444';
//const originalString = 'uubbhhyu';
//const originalString = 'uuueeeenzzzzzuuubbhhyu';
//const originalString = 'ab4444444444444444444444444444444444333334554asdadddddd';
//const originalString = 'ab41234568bghdf465df5df5fd25';
//const originalString = 'aaab44441234568bghdf465df5df5fd25';
/* This array allow us to save the char information to print it lately */
const compressedString = [];
let stringToCompress = originalString;
let isStringCompressed = false;

function printCompressString() {
  let stringToPrint = '';
  compressedString.map((element) => {
    const charLength = (elementLength) => {
      if (elementLength === 1 || elementLength === '^1') return '';
      if (elementLength === 2 || elementLength === '^2') return element.char;
      if (elementLength === '^3') return element.char.concat(element.char);
      return elementLength;
    };
    stringToPrint = stringToPrint.concat(element.char,charLength(element.length));
  });
  console.log(`Original string: ${originalString}`);
  if (isStringCompressed) {
    console.log(`Compressed string: ${stringToPrint}`);
  } else {
    console.log(`There is no need to compress the string`);
  }
}

function compressString() {
  let counter = 1;
  const charToEvaluate = stringToCompress[0];
  const stringLength = stringToCompress.length;
  let evaluatedChar;

  while (counter <= stringLength) {
    evaluatedChar = stringToCompress[counter];
    if (counter !== stringLength && evaluatedChar === charToEvaluate) {
      counter++;
    } else {
      stringToCompress = counter === stringLength ? '' : stringToCompress.slice(counter, stringLength);
      compressedString.push({
        char: charToEvaluate,
        /*
          BONUS 1: To identify the difference between numbers and times to repeat it I used the exponent symbol
          as it is used on theory of computation to show regular expressions. 
        */
        length: isNaN(charToEvaluate) ? counter : `^${counter}`,
      });
      /*
        BONUS 2: The only cases when we are not going to see a real change on the string compression is when we have 1 or 2 characters together otherwise the word is gonna be shorter
        that's the reason of this conditional if detects that counter is greater than 2 it means that the string is gonna change its size.

        For numbers we need to validate if the counter is greater than 3 because of the extra symbol (^) I used
      */
      if ((isNaN(charToEvaluate) && counter > 2) || !isNaN(charToEvaluate) && counter > 3) {
        isStringCompressed = true;
      }
      break;
    }
  }

  if (stringToCompress.length > 0) {
    compressString();
  } else {
    printCompressString();
  }
}

compressString();
