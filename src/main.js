import "./css/index.css"
import IMask from "imask"

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

globalThis.setCardType = setCardType

// security code
const securityCode = document.querySelector('#security-code')

const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

// Expiration Date
const expirationsDate = document.querySelector("#expiration-date")

const expirationsDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },

    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  }
}

const expirationsDateMasked = IMask(expirationsDate, expirationsDatePattern)

// Card Number

const cardNumber = document.querySelector("#card-number")

const cardNumberPattern = {
  mask: [
    {
      mask: "000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      CardType: "visa",
    },

    {
      mask: "000 0000 0000 0000",
      regex: /^((5(([1-2]|[4-5])[0-9]{8}|0((1|6)([0-9]{7}))|3(0(4((0|[2-9])[0-9]{5})|([0-3]|[5-9])[0-9]{6})|[1-9][0-9]{7})))|((508116)\\d{4,10})|((502121)\\d{4,10})|((589916)\\d{4,10})|(2[0-9]{15})|(67[0-9]{14})|(506387)\\d{4,10})/,
      CardType: "mastercard",
    },
    {
      mask: "000 0000 0000 0000",
      CardType: "default",
    },
  ],

  dispatch: function (appended, dynamicMasked) {
    const number =  (dynamicMasked.value + appended).replace(/\D/g, "")

    const foundMask = dynamicMasked.compiledMasks.find(function(item){
      return number.match(item.regex)
    })

    return foundMask
  },
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)