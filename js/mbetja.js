var canvas1 = document.getElementById("myCanvas1");
var ctx = canvas1.getContext("2d");

var canvas2 = document.getElementById("myCanvas2");
var ctx2 = canvas2.getContext("2d");

const canvas3 = document.getElementById('myCanvas3');
const ctx3 = canvas3.getContext('2d');

ctx.fillStyle = "#FF0000";
ctx.fillRect(50, 50, 150, 150); 

ctx.beginPath();
ctx.arc(300, 150, 70, 0, 2 * Math.PI);
ctx.fillStyle = "#00FF00";
ctx.fill();

ctx.beginPath();
ctx.moveTo(50, 250);
ctx.lineTo(450, 250);
ctx.strokeStyle = "#0000FF";
ctx.lineWidth = 5;
ctx.stroke();

ctx.font = "20px Arial";
ctx.fillStyle = "#000000";
ctx.fillText("Ky është një tekst në canvas", 150, 350);

var gradient = ctx2.createLinearGradient(0, 0, 500, 0);
gradient.addColorStop(0, "#FF0000");
gradient.addColorStop(1, "#0000FF");

ctx2.fillStyle = gradient;
ctx2.fillRect(50, 50, 400, 300);


let translateX = 0;
let translateY = 0;
let rotateAngle = 0;
let scaleX = 1;
let skewX = 0;

function animate() {
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height); // Clear the canvas

    // **Translate** - Move the square
    ctx3.save();
    ctx3.translate(50 + translateX, 50 + translateY); // Update position
    ctx3.fillStyle = 'lightblue';
    ctx3.fillRect(0, 0, 100, 100);
    ctx3.restore();

    // **Rotate** - Rotate the square
    ctx3.save();
    ctx3.translate(200, 200); // Set rotation center
    ctx3.rotate(rotateAngle); // Update rotation
    ctx3.fillStyle = 'orange';
    ctx3.fillRect(-50, -50, 100, 100); // Draw square
    ctx3.restore();

    // **Scale** - Scale the square
    ctx3.save();
    ctx3.translate(350, 100); // Position scaling
    ctx3.scale(scaleX, 1); // Update scaling
    ctx3.fillStyle = 'purple';
    ctx3.fillRect(0, 0, 50, 50);
    ctx3.restore();

    // **Skew (Transform Matrix)** - Skew the square
    ctx3.save();
    ctx3.setTransform(1, 0, skewX, 1, 0, 0); // Apply skewX
    ctx3.fillStyle = 'red';
    ctx3.fillRect(50, 300, 100, 100);
    ctx3.restore();

    // Update animation variables
    translateX = (translateX + 2) % canvas3.width; // Move horizontally
    translateY = (translateY + 1) % canvas3.height; // Move vertically
    rotateAngle += 0.02; // Rotate gradually
    scaleX = Math.abs(Math.sin(Date.now() / 500)) + 0.5; // Oscillating scale
    skewX = Math.sin(Date.now() / 1000) * 0.5; // Oscillating skew

    // Request the next frame
    requestAnimationFrame(animate);
}

animate();

const draggableText = document.getElementById("draggableText");
        const dropzone = document.getElementById("dropzone");
        const resetButton = document.getElementById("resetButton");

        // Original position of the draggable element
        const originalPosition = {
            top: draggableText.offsetTop,
            left: draggableText.offsetLeft,
        };

        // Add dragstart event
        draggableText.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", null); // Required for Firefox
            draggableText.style.opacity = "0.5"; // Visual feedback
        });

        // Reset opacity when drag ends
        draggableText.addEventListener("dragend", () => {
            draggableText.style.opacity = "1";
        });

        // Prevent default behavior to allow drop
        dropzone.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        // Handle drop event
        dropzone.addEventListener("drop", (event) => {
            event.preventDefault();

            // Get the mouse position
            const dropX = event.clientX - dropzone.offsetLeft;
            const dropY = event.clientY - dropzone.offsetTop;

            // Update position of the draggable text
            draggableText.style.position = "absolute";
            draggableText.style.top = `${dropY + dropzone.offsetTop}px`;
            draggableText.style.left = `${dropX + dropzone.offsetLeft}px`;
        });

        // Reset the draggable element to its original position
        resetButton.addEventListener("click", () => {
            draggableText.style.top = `${originalPosition.top}px`;
            draggableText.style.left = `${originalPosition.left}px`;
        });

        const formID = document.getElementById('formId');
        formID.addEventListener('submit', function(event) {
            // Parandalon që formulari të dërgohet dhe faqja të rifreskohet
            event.preventDefault();
        });

        // Funksioni për të shfaqur modalin
    const showWarningButton = document.getElementById('showWarningButton');
    const warningModal = document.getElementById('warningModal');
    const closeModal = document.getElementById('closeModal');
    const warningMessage = document.getElementById('warningMessage');

    // Funksioni për të hapur modalin dhe shfaqur mesazhin
    showWarningButton.onclick = function() {
        warningMessage.textContent = "Ky është një mesazh vërejtjeje për përdoruesin!";
        warningModal.style.display = "block"; // Shfaq modalin
    }

    // Funksioni për të mbyllur modalin
    closeModal.onclick = function() {
        warningModal.style.display = "none"; // Fshi modalin
    }

    // Mbyll modalin duke klikuar jashtë tij
    window.onclick = function(event) {
        if (event.target === warningModal) {
            warningModal.style.display = "none";
        }
    }

    let fruits = ["apple", "banana", "orange"];
    let numbers = [1, 2, 3, 4, 5];
    let mixedArray = [1, "hello", true, null];
    console.log(fruits[0]);  // "apple"
    console.log(fruits[2]);  // "orange"
    fruits[1] = "grape";  // Ndryshon "banana" me "grape"
    console.log(fruits);  // ["apple", "grape", "orange"]
    fruits.push("orange");  // Shton "orange" në fund
    console.log(fruits);  // ["apple", "banana", "orange"]
    fruits.pop();  // Heq "orange"
    console.log(fruits);  // ["apple", "banana"]
    fruits.shift();  // Heq "apple"
    console.log(fruits);  // ["banana", "orange"]
    fruits.unshift("apple");  // Shton "apple" në fillim
    console.log(fruits);  // ["apple", "banana", "orange"]
    fruits.forEach(function(fruit) {
        console.log(fruit);  // Përsërit "apple", "banana", "orange"
    });

let person = {
    name: "John",
    age: 30,
    isStudent: false,
    greet: function() {
        console.log("Hello, " + this.name);
    }
};

person.greet();

let car = new Object();
car.make = "Toyota";
car.model = "Corolla";
car.year = 2020;

let a = 10;
let b = 5;
let sum = a + b;
let difference = a - b;
let product = a * b;
let quotient = a / b;
let remainder = a % b;
console.log(sum, difference, product, quotient, remainder);

function checkAge(age) {
    if (age < 18) {
        throw new Error("Ju duhet të jeni të paktën 18 vjeç për të përdorur këtë shërbim.");
    } else {
        console.log("Mirësevini!");
    }
}

try {
    checkAge(15);
} catch (error) {
    console.log(error.message);
}

try {
    checkAge(20);
} catch (error) {
    console.log(error.message);
}

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(email)) {
        return true;
    } else {
        return "Email-i nuk është në formatin e saktë.";
    }
}

function validatePassword(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passwordPattern.test(password)) {
        return true;
    } else {
        return "Fjalëkalimi duhet të ketë të paktën 8 karaktere, një shkronjë të madhe, një shkronjë të vogël dhe një numër.";
    }
}

function validatePhoneNumber(phone) {
    const phonePattern = /^\+?\d{1,4}[\s-]?\(?\d{1,3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;
    if (phonePattern.test(phone)) {
        return true;
    } else {
        return "Numri i telefonit nuk është në formatin e saktë.";
    }
}

let email = "user@example.com";
let password = "StrongPass123";
let phone = "+1 234-567-8901";

let emailValid = validateEmail(email);
let passwordValid = validatePassword(password);
let phoneValid = validatePhoneNumber(phone);

if (emailValid === true && passwordValid === true && phoneValid === true) {
    console.log("Të dhënat janë të sakta!");
} else {
    console.log("Gabim në të dhëna:");
    if (emailValid !== true) console.log(emailValid);
    if (passwordValid !== true) console.log(passwordValid);
    if (phoneValid !== true) console.log(phoneValid);
}

function Student(name, age, grade) {
    this.name = name;
    this.age = age;
    this.grade = grade;

    this.getInfo = function() {
        return `${this.name} është ${this.age} vjeç dhe ka notën ${this.grade}.`;
    };
}

let student1 = new Student("Ardit", 20, "A");
let student2 = new Student("Diana", 22, "B");

console.log(student1.getInfo());
console.log(student2.getInfo());

function Cars(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;

    this.getCarInfo = function() {
        return `Ky është një ${this.year} ${this.make} ${this.model}.`;
    };
}

let car1 = new Cars("Toyota", "Corolla", 2020);
let car2 = new Cars("BMW", "X5", 2021);

console.log(car1.getCarInfo());
console.log(car2.getCarInfo());

function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;

    this.getBookInfo = function() {
        return `"${this.title}" është shkruar nga ${this.author} dhe u botua në vitin ${this.year}.`;
    };
}

let book1 = new Book("JavaScript: The Good Parts", "Douglas Crockford", 2008);
let book2 = new Book("Eloquent JavaScript", "Marijn Haverbeke", 2018);

console.log(book1.getBookInfo());
console.log(book2.getBookInfo());

let maxNumber = Number.MAX_VALUE;
console.log(maxNumber);

let invalidNumber = 0 / 0;
console.log(invalidNumber);
console.log(isNaN(invalidNumber));

let number = 123456;
let exponential = number.toExponential(2);
console.log(exponential);

let number1 = 123;
let numberString = number1.toString();
console.log(numberString);

let binaryString = (10).toString(2);
console.log(binaryString);

let text = "JavaScript is fun, JavaScript is powerful!";
let result = text.replace("JavaScript", "Python");
console.log(result);

let text1 = "JavaScript is fun, JavaScript is powerful!";
let result1 = text1.replace(/JavaScript/g, "Python");
console.log(result);

let currentDate = new Date();
console.log(currentDate);

let radius = 5;
let area = Math.PI * radius * radius;
console.log(area);

let number3 = 25;
let squareRoot = Math.sqrt(number3);
console.log(squareRoot);

let base = 2;
let exponent = 3;
let results = Math.pow(base, exponent);
console.log(results);

let randomNumber = Math.random();
console.log(randomNumber);

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
function validateEmail(email) {
    return emailRegex.test(email);
}
  
console.log(validateEmail("test@example.com"));  // true
console.log(validateEmail("invalid-email"));     // false

const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
function validatePhoneNumber(phone) {
    return phoneRegex.test(phone);
}
  
console.log(validatePhoneNumber("(123) 456-7890"));  // true
console.log(validatePhoneNumber("123-456-7890"));    // false
  
const wordRegex = /hello/g;
function countOccurrences(text) {
    return (text.match(wordRegex) || []).length;
}
  
console.log(countOccurrences("hello world, hello again!"));  // 2

const numberRegex = /\d+/i;
function extractNumber(text) {
    const result = numberRegex.exec(text);
    return result ? result[0] : null;
}
  
console.log(extractNumber("My number is 1234."));  // 1234
console.log(extractNumber("No numbers here."));    // null
    