import "./css/index.css"
import "animate.css";
import IMask from "imask"

const cardBackground = document.querySelector(".cc")
const bgColorOne = document.querySelector("#bgColorOne")
const bgColorTwo = document.querySelector("#bgColorTwo")
const ccLogo = document.querySelector("#cc-logo")

function setCardType(type) {

    const colors = {
        visa: ["visa", "blue", "black"],
        mastercard: ["mastercard", "red", "gold"],
        santander: ["santander", "black", "black"],
        itau: ["itau", "#B8860B", "#8B4513"],
        nubank: ["nubank", "#4B0082", "#8B008B"],
        default: ["default", "black", "gray"],
    }

    cardBackground.style.backgroundImage = `url(cc-bg-${colors[type][0]}.svg)`
    bgColorOne.setAttribute("fill", colors[type][1])
    bgColorTwo.setAttribute("fill", colors[type][2])
    ccLogo.setAttribute("src", `cc-${type}.svg`)
}

const cardNumber = document.querySelector("#card-number")
const cardHolder = document.querySelector("#card-holder")
const expirationDate = document.querySelector("#expiration-date")
const securityCode = document.querySelector("#security-code")

const cardNumberMaskFormat = {

    mask: [
        {
            mask: "0000 0000 0000 0000",
            regex: /^4\d{0,15}|^3\d{0,15}/,
            cardtype: "visa",
        },
        {
            mask: "0000 0000 0000 0000",
            regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
            cardtype: "mastercard",
        },
        {
            mask: "0000 0000 0000 0000",
            regex: /^7\d{0,15}|^6\d{0,15}/,
            cardtype: "santander",
        },
        {
            mask: "0000 0000 0000 0000",
            regex: /^1\d{0,15}/,
            cardtype: "itau",
        },
        {
            mask: "0000 0000 0000 0000",
            regex: /^9\d{0,15}|^8\d{0,15}/,
            cardtype: "nubank",
        },
        {
            mask: "0000 0000 0000 0000",
            cardtype: "default",
        },
    ],
    dispatch: function (appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g, "");
        const foundMask = dynamicMasked.compiledMasks.find(function (item) {
            return number.match(item.regex);
        });
        return foundMask;
    }

}

const expirationDateMaskFormat = {
    mask: "MM{/}YY",
    lazy: true,
    autofix: true,
    blocks: {
        MM: { mask: IMask.MaskedRange, from: 1, to: 12, maxlenght: 2 },
        YY: {
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear() + 10).slice(2),
            maxlenght: 2
        },
    }
}

const securityCodeMaskFormat = {
    mask: "0000"
}

const cardNumberMask = IMask(cardNumber, cardNumberMaskFormat)
const expirationDateMask = IMask(expirationDate, expirationDateMaskFormat)
const securityCodeMask = IMask(securityCode, securityCodeMaskFormat)

const form = document.querySelector("form")
const addButton = document.querySelector("#add-cc")

form.addEventListener("submit", event => {
    event.preventDefault();
})

addButton.addEventListener("click", () => {
    alert("Cartão de Cred. adicionado")
})

const ccNumber = document.querySelector(".cc-number")
const ccHolder = document.querySelector(".cc-holder .value")
const ccExpiration = document.querySelector(".cc-expiration .value")
const ccSecurity = document.querySelector(".cc-security .value")

cardNumberMask.on("accept", () => {
    const cardType = cardNumberMask.masked.currentMask.cardtype
    setCardType(cardType)
    ccNumber.textContent = cardNumber.value.length === 0 ? "1234 5678 9012 3456" : cardNumber.value
})

cardHolder.addEventListener("input", () => {
    ccHolder.textContent = cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

expirationDateMask.on("accept", () => {
    ccExpiration.textContent = expirationDate.value.length === 0 ? "01/32" : expirationDate.value
})

securityCodeMask.on('accept', () => {
    ccSecurity.textContent = securityCode.value.length === 0 ? "1234" : securityCode.value
})