let result = document.getElementById("result");
let opeArray = ["+", "-", "*", "/"];
let mode = "int";
let calcAfter = false;

function acClick(){
  result.value = "0";
  mode = "int";
  calcAfter = false;
}

function numClick(val){
  if (calcAfter) {
    result.value = "0";
    calcAfter = false;
  }

  // 演算子入力後の「０」以降の入力に制限を設ける
  if (opeArray.includes(result.value.slice(-1)) && val == "0") {
    result.value += val;
    mode = "zero";
  }

  if (result.value == "0" && (val == "0" || val == "00")) {
    result.value = "0";
  } else if (opeArray.includes(result.value.slice(-1)) &&  val == "00") {
    result.value;
  } else if (mode == "zero") {
    result.value;
  } else if (result.value == "0") {
    result.value = val;
  } else {
    result.value += val;
  }
}

function dotClick(val){
  if (calcAfter) calcAfter = false;

  if (result.value == "0") {
    result.value = "0.";
    mode = "decimal";
  } else if (mode == "decimal") {
    result.value;
  } else {
    result.value += val;
    mode = "decimal";
  }
}

function opeClick(val){
  let nonMinus = ["+", "*", "/"]
  
  if (calcAfter) calcAfter = false;

  if (result.value == "0" && val == "-") {
    result.value = "-";
    mode = "int";
  } else if (nonMinus.includes(result.value.slice(-1)) && val == "-") {
    result.value += val;
  } else if (result.value.slice(-1) == "-" || result.value.slice(-1) == '.') {
    result.value;
  } else if (opeArray.includes(result.value.slice(-1))) {
    result.value = result.value.slice(0, -1) + val;
  } else {
    result.value += val;
    mode = "int";
  }
}

function equalClick(){
  if (opeArray.includes(result.value.slice(-1))) {
    result.value = result.value.slice(0, -1);
    // 末尾が「*-」などになっていた場合
    if (opeArray.includes(result.value.slice(-1))) {
      result.value = result.value.slice(0, -1);
    }
  }

  let calcResult = new Function("return " + result.value)();

  if(calcResult == Infinity || Number.isNaN(calcResult)){
    result.value = "Error";
  } else {
    calcResult = roundOff(calcResult);
    result.value = calcResult;
    calcAfter = true;
  }

  // 計算結果が少数だった場合の「.」の入力を防ぐ
  if (result.value.includes(".")) {
    mode = "decimal";
  } else {
    mode = "int";
  }
}

// 丸め誤差
function roundOff(val) {
  let strVal = String(val);
  let dotLength = strVal.length - strVal.indexOf(".");

  if (dotLength > 11) {
    val = Math.round(val * 1000);
    val /= 1000;
  }
  return val;
}