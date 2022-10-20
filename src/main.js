import "./css/index.css"

const ccBgColorOne = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColorTwo = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")


function setCardType(type){
  const colors = {
    visa: ["#40E0D0", "#EE82EE"],
    mastercard: ["#FFDCDC", "#00A4A4"],
    discover: ["#FF1493", "#FFD910"],
    cielo: ["#00008B", "#01AEF0"],
    default: ["black", "gray"],
  }

  ccBgColorOne.setAttribute("fill", colors[type] [0])
  ccBgColorTwo.setAttribute("fill", colors[type] [1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

setCardType("mastercard")

globalThis.setCardType = setCardType