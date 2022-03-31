const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const calculatorScreen = document.querySelector('.calculator-screen')
const equalSign = document.querySelector('.equal-sign')
const clearScreen = document.querySelector('.all-clear')
const decimal = document.querySelector('.decimal')
const percentage = document.querySelector('.percentage')

// Menampilkan ke console
numbers.forEach(number => {
    number.addEventListener("click", (event) => {
        console.log(event.target.value)
    })
})

// Menampilkan value
const updateScreen = (number) => {
    calculatorScreen.value = number
}

let prevNumber = ''
let calculationOperator = ''
let secondOperator = ''
let currentNumber = '0'
let tempNumber = ''
let flagNumber = true
let flagCalculate = false

// Untuk pengecekan menginput angka
const inputNumber = (number) => {
    if (currentNumber === '0') {
        currentNumber = number
    } else if (flagNumber == true){
        currentNumber += number
    } else if (flagNumber == false) {
        currentNumber = number
    }
    // Setelah input angka, operator dapat digunakan
    flagOperator = true
    // Mencegah penambahan angka setelah hasil
    checkOperator = false
    flagNumber = true
}

// Menampilkan inputan di screen 
numbers.forEach(number => {
    number.addEventListener("click", (event) => {
        inputNumber(event.target.value)
        updateScreen(currentNumber)
    })
})

// Menampilkan di console
operators.forEach(operator => {
    operator.addEventListener("click", (event) => {
        console.log(event.target.value)
    })
})

const inputOperator = (operator) => {
    if (calculationOperator === '') {
        prevNumber = currentNumber
        flagOperator = false
        tempNumber = currentNumber
    } else if (flagOperator == true){
        calculate()
        updateScreen(currentNumber)
        prevNumber = currentNumber
        calculationOperator = secondOperator
    }
    calculationOperator = operator
    currentNumber = '0'
    flagCalculate = false
    checkOperator = true
}

// Menyimpan operator yang dipilih
operators.forEach(operator => {
    operator.addEventListener("click", (event) => {
        inputOperator(event.target.value)
    })
})

// Fungsi perhitungan
const calculate = () => {
    if (flagCalculate == false) {
        let result = ''
        switch (calculationOperator) {
            case "*":
                result = parseFloat(prevNumber) * parseFloat(currentNumber)
                break;
            case "/":
                result = parseFloat(prevNumber) / parseFloat(currentNumber)
                break;
            case "+":
                result = parseFloat(prevNumber) + parseFloat(currentNumber)
                break;
            case "-":
                result = parseFloat(prevNumber) - parseFloat(currentNumber)
                break;
            default:
                result = currentNumber
                break
        }
    tempNumber = currentNumber
    currentNumber = result
    secondOperator = calculationOperator
    calculationOperator = ''
    flagCalculate = true
    checkOperator = true
    } else if (flagCalculate == true && checkOperator == true) {
        result = currentNumber
        switch(secondOperator) {
            case "*":
                result = result * parseFloat(tempNumber)
                break;
            case "/":
                result = result / parseFloat(tempNumber)
                break;
            case "+":
                result = result + parseFloat(tempNumber)
                break;
            case "-":
                result = result - parseFloat(tempNumber)
                break;
            default:
                result = currentNumber
                break
        }
        currentNumber = result
    } else {
        currentNumber = '0'
    }
    flagOperator = false    
    flagNumber = false
}

// Menampilkan hasil kalkulasi
equalSign.addEventListener("click", (event) => {
    calculate()
    updateScreen(currentNumber)
})

// Fungsi menghapus semua isi variabel
const clearAll = () => {
    prevNumber = ''
    calculationOperator = ''
    currentNumber = '0'
}

// Menampilkan hasil setelah dihapus
clearScreen.addEventListener("click", () => {
    clearAll()
    updateScreen(currentNumber)
    flagCalculate = false
})

const inputDecimal = (dot) => {
    flagNumber = true
    // Jika pertama kali ditekan akan menampilkan 0.
    if (flagCalculate == true){
        currentNumber = '0'
        flagCalculate = false
    }
    // Jika menambahkan koma setelah input angka
    else if (flagCalculate == false) {
        
        if (currentNumber.includes('.')) {
            return
        }
    }
    currentNumber += dot
}

// Menampilkan ke console

decimal.addEventListener("click", (event) => {
    console.log(event.target.value)
})

decimal.addEventListener('click', (event) => {
    inputDecimal(event.target.value)
    updateScreen(currentNumber)
})

const calcPercentage = (percentage) => {
    currentNumber = currentNumber / 100
}

percentage.addEventListener('click', () => {
    calcPercentage()
    updateScreen(currentNumber)
})
