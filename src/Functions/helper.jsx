import { isCurrentPassValid, isNewPasswordValid } from "./conditions";

export function isDecimalNumber(number) {
  let singleNumber = Math.floor(number);
  return singleNumber !== number;
}

export function getTimeObj(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000),
    totalMinutes = Math.floor(totalSeconds / 60),
    totalHours = Math.floor(totalMinutes / 60),
    days = Math.floor(totalHours / 24),
    seconds = Math.floor(totalSeconds % 60),
    minutes = Math.floor(totalMinutes % 60),
    hours = Math.floor(totalHours % 24),
    timeObj = {
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
    };
  return { ...timeObj };
}

export function getTimeInMilliseconds(days, hours, minutes, seconds) {
  const millisecondsPerSecond = 1000,
    millisecondsPerMinute = millisecondsPerSecond * 60,
    millisecondsPerHour = millisecondsPerMinute * 60,
    millisecondsPerDay = millisecondsPerHour * 24,
    totalMilliseconds =
      days * millisecondsPerDay +
      hours * millisecondsPerHour +
      minutes * millisecondsPerMinute +
      seconds * millisecondsPerSecond;
  return totalMilliseconds;
}

export function getFormattedTime(time) {
  return {
    days: padStart(time.days),
    hours: padStart(time.hours),
    minutes: padStart(time.minutes),
    seconds: padStart(time.seconds),
  };
}

export const padStart = (num) => `${num}`.padStart(2, "0");

export function checkIsObjExistInArr(arr, obj) {
  for (let i = 0; i < arr.length; i++) {
    let dataIsEqual = [];

    for (const key in arr[i]) {
      dataIsEqual.push(arr[i][key] === obj[key]);
    }

    const isObjExist = dataIsEqual.every((val) => val);
    if (isObjExist) return true;
  }

  return false;
}

export function uniqueArr(arr) {
  return [...new Set(arr)];
}

export function compareDataToObjValue(data, obj, keyName) {
  const filteredData = data.filter(
    (dataObj) => dataObj[keyName] === obj[keyName]
  );
  return filteredData.length > 0;
}

export function checkDateBeforeMonthToPresent(getDate) {
  const monthByMilliSeconds = 2_629_056_000;
  const currentDate = new Date().getTime();
  const requitedDate = new Date(getDate).getTime() + monthByMilliSeconds;
  return currentDate > requitedDate;
}

export function capitalize(str) {
  return str?.slice(0, 1).toUpperCase() + str?.slice(1, str.length);
}

export function updateClassOnCondition(
  input,
  condition,
  className = "invalid"
) {
  const methodName = condition ? "remove" : "add";
  input.classList[methodName](className);
}

export function checkIsInputsValid(inputs) {
  return [...inputs].every((input) => !input.classList.contains("invalid"));
}

export function checkEmailValidation(emailInput) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
  const isEmailValid = emailRegex.test(emailInput.value);
  updateClassOnCondition(emailInput, isEmailValid);
}

export function checkPasswordInputs(passwordInputs, password) {
  const currPassInp = passwordInputs[0];
  const newPassInp = passwordInputs[1];
  const confirmPassInput = passwordInputs[2];

  const isCurrPassCorrect = isCurrentPassValid(currPassInp, password);
  const isNewPassValid = isNewPasswordValid(newPassInp);
  const isCurrPassEqualsNew = confirmPassInput.value === newPassInp.value;

  updateClassOnCondition(currPassInp, isCurrPassCorrect);
  updateClassOnCondition(newPassInp, isNewPassValid);
  updateClassOnCondition(confirmPassInput, isCurrPassEqualsNew);
}

export function getSpecificRepo(repos, id) {
  return repos?.find((repo) => repo.id === id);
}

export const scrollToTop = () => window.scrollTo({ top: 0 });
