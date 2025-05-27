// Standard and Vars

export const toUpperCaseFirstLetter = (text: string) => {
  if (text === null || text === undefined) {
    return text;
  }
  const temp = text.split(" ");
  const temp2 = [];
  for (let i = 0; i < temp.length; i += 1) {
    temp2.push(temp[i].charAt(0).toUpperCase() + temp[i].slice(1));
  }

  let returnedText = "";
  for (let i = 0; i < temp2.length; i += 1) {
    returnedText = `${returnedText}${temp2[i]}`;

    if (i !== temp2.length - 1) {
      returnedText = `${returnedText} `;
    }
  }
  return returnedText;
};

export const replaceEmptyStringWithHyphen = (text: string) => {
  if (["", null, undefined]?.includes(text)) return "-";
  return text;
};
