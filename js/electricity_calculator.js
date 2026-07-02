/*==========================================================
    ELECTRICITY BILL CALCULATOR
==========================================================*/

"use strict";

/*==========================================================
    DOM ELEMENTS
==========================================================*/

const form = document.getElementById("billForm");

const customerName = document.getElementById("customerName");
const previousReading = document.getElementById("previousReading");
const currentReading = document.getElementById("currentReading");
const ratePerUnit = document.getElementById("ratePerUnit");
const fixedCharge = document.getElementById("fixedCharge");
const duty = document.getElementById("duty");
const gst = document.getElementById("gst");

const resetBtn = document.getElementById("resetBtn");

const resultCard = document.getElementById("resultCard");
const emptyState = document.getElementById("emptyState");
const billResult = document.getElementById("billResult");


/*==========================================================
    RESULT ELEMENTS
==========================================================*/

const customerResult = document.getElementById("customerResult");
const unitsResult = document.getElementById("unitsResult");
const rateResult = document.getElementById("rateResult");
const energyResult = document.getElementById("energyResult");
const fixedResult = document.getElementById("fixedResult");
const dutyResult = document.getElementById("dutyResult");
const gstResult = document.getElementById("gstResult");
const totalResult = document.getElementById("totalResult");


/*==========================================================
    HELPER FUNCTIONS
==========================================================*/

const getNumber = (element) => {

    const value = parseFloat(element.value);

    return isNaN(value) ? 0 : value;

};


const formatCurrency = (amount) => {

    return new Intl.NumberFormat("en-IN", {

        style: "currency",

        currency: "INR",

        minimumFractionDigits: 2

    }).format(amount);

};


const showError = (input, message) => {

    const group = input.parentElement;

    const error = group.querySelector(".error");

    group.classList.add("error");
    group.classList.remove("success");

    error.textContent = message;

};


const showSuccess = (input) => {

    const group = input.parentElement;

    const error = group.querySelector(".error");

    group.classList.remove("error");
    group.classList.add("success");

    error.textContent = "";

};


const clearValidation = (input) => {

    const group = input.parentElement;

    group.classList.remove("error");
    group.classList.remove("success");

    const error = group.querySelector(".error");

    if(error){

        error.textContent = "";

    }

};


/*==========================================================
    VALIDATION
==========================================================*/

function validateRequired(input, message){

    if(input.value.trim()===""){

        showError(input,message);

        return false;

    }

    return true;

}


function validatePositive(input){

    const value = getNumber(input);

    if(value < 0){

        showError(input,"Only positive numbers are allowed.");

        return false;

    }

    return true;

}


function validateMeterReading(){

    const previous = getNumber(previousReading);

    const current = getNumber(currentReading);

    if(current < previous){

        showError(

            currentReading,

            "Current reading cannot be smaller than previous reading."

        );

        return false;

    }

    return true;

}


/*==========================================================
    COMPLETE FORM VALIDATION
==========================================================*/

function validateForm(){

    let valid = true;

    clearValidation(previousReading);
    clearValidation(currentReading);
    clearValidation(ratePerUnit);
    clearValidation(fixedCharge);

    if(

        !validateRequired(

            previousReading,

            "Previous meter reading is required."

        )

    ){

        valid = false;

    }

    if(

        !validateRequired(

            currentReading,

            "Current meter reading is required."

        )

    ){

        valid = false;

    }

    if(

        !validateRequired(

            ratePerUnit,

            "Rate per unit is required."

        )

    ){

        valid = false;

    }

    if(

        !validateRequired(

            fixedCharge,

            "Fixed charge is required."

        )

    ){

        valid = false;

    }

    if(valid && !validatePositive(previousReading)) valid = false;

    if(valid && !validatePositive(currentReading)) valid = false;

    if(valid && !validatePositive(ratePerUnit)) valid = false;

    if(valid && !validatePositive(fixedCharge)) valid = false;

    if(valid && !validateMeterReading()) valid = false;

    if(valid){

        showSuccess(previousReading);
        showSuccess(currentReading);
        showSuccess(ratePerUnit);
        showSuccess(fixedCharge);

    }

    return valid;

}


/*==========================================================
    LIVE VALIDATION
==========================================================*/

const inputs = [

    previousReading,

    currentReading,

    ratePerUnit,

    fixedCharge,

    duty,

    gst

];

inputs.forEach(input=>{

    input.addEventListener("input",()=>{

        clearValidation(input);

    });

});

/*==========================================================
    BILL CALCULATION
==========================================================*/

function calculateBill() {

    const previous = getNumber(previousReading);
    const current = getNumber(currentReading);
    const rate = getNumber(ratePerUnit);
    const fixed = getNumber(fixedCharge);
    const dutyPercent = getNumber(duty);
    const gstPercent = getNumber(gst);

    /* Units */

    const units = current - previous;

    /* Energy Charge */

    const energyCharge = units * rate;

    /* Sub Total */

    const subtotal = energyCharge + fixed;

    /* Electricity Duty */

    const dutyAmount = (subtotal * dutyPercent) / 100;

    /* GST */

    const gstAmount = ((subtotal + dutyAmount) * gstPercent) / 100;

    /* Grand Total */

    const grandTotal = subtotal + dutyAmount + gstAmount;

    return {

        customer:
            customerName.value.trim() || "N/A",

        units,

        rate,

        energyCharge,

        fixed,

        dutyAmount,

        gstAmount,

        grandTotal

    };

}


/*==========================================================
    DISPLAY RESULT
==========================================================*/

function displayResult(data){

    emptyState.style.display = "none";

    billResult.style.display = "flex";

    resultCard.classList.add("success");

    customerResult.textContent = data.customer;

    unitsResult.textContent =
        `${data.units.toFixed(2)} Units`;

    rateResult.textContent =
        formatCurrency(data.rate);

    energyResult.textContent =
        formatCurrency(data.energyCharge);

    fixedResult.textContent =
        formatCurrency(data.fixed);

    dutyResult.textContent =
        formatCurrency(data.dutyAmount);

    gstResult.textContent =
        formatCurrency(data.gstAmount);

    animateTotal(data.grandTotal);

    animateValues();

}


/*==========================================================
    NUMBER POP ANIMATION
==========================================================*/

function animateValues(){

    const values = document.querySelectorAll(
        ".bill-result strong"
    );

    values.forEach(value=>{

        value.classList.remove("pop");

        void value.offsetWidth;

        value.classList.add("pop");

    });

}


/*==========================================================
    FORM SUBMIT
==========================================================*/

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    if(!validateForm()){

        return;

    }

    const bill = calculateBill();

    displayResult(bill);

});


/*==========================================================
    LIVE RECALCULATION
==========================================================*/

const autoFields = [

    previousReading,

    currentReading,

    ratePerUnit,

    fixedCharge,

    duty,

    gst

];

autoFields.forEach(field=>{

    field.addEventListener("input",()=>{

        if(billResult.style.display === "flex"){

            if(validateForm()){

                displayResult(calculateBill());

            }

        }

    });

});


/*==========================================================
    ENTER KEY SUPPORT
==========================================================*/

document.querySelectorAll("input").forEach(input=>{

    input.addEventListener("keydown",(e)=>{

        if(e.key==="Enter"){

            e.preventDefault();

            form.requestSubmit();

        }

    });

});


/*==========================================================
    AUTO DEFAULT VALUES
==========================================================*/

if(duty.value===""){

    duty.value = 0;

}

if(gst.value===""){

    gst.value = 0;

}

/*==========================================================
    RESET FORM
==========================================================*/

resetBtn.addEventListener("click", () => {

    setTimeout(() => {

        form.reset();

        document.querySelectorAll(".form-group").forEach(group => {

            group.classList.remove("error");
            group.classList.remove("success");

            const error = group.querySelector(".error");

            if (error) {

                error.textContent = "";

            }

        });

        emptyState.style.display = "flex";
        billResult.style.display = "none";

        resultCard.classList.remove("success");

        customerResult.textContent = "-";
        unitsResult.textContent = "0 Units";
        rateResult.textContent = formatCurrency(0);
        energyResult.textContent = formatCurrency(0);
        fixedResult.textContent = formatCurrency(0);
        dutyResult.textContent = formatCurrency(0);
        gstResult.textContent = formatCurrency(0);
        totalResult.textContent = formatCurrency(0);

    }, 100);

});


/*==========================================================
    INPUT SANITIZATION
==========================================================*/

document.querySelectorAll('input[type="number"]').forEach(input => {

    input.addEventListener("input", function () {

        if (this.value < 0) {

            this.value = "";

        }

    });

});


/*==========================================================
    TOTAL BILL COUNT ANIMATION
==========================================================*/

function animateTotal(targetAmount){

    const duration = 800;

    const start = 0;

    const startTime = performance.now();

    function update(currentTime){

        const progress = Math.min((currentTime - startTime) / duration, 1);

        const value = start + (targetAmount - start) * progress;

        totalResult.textContent = formatCurrency(value);

        if(progress < 1){

            requestAnimationFrame(update);

        }

    }

    requestAnimationFrame(update);

}


/*==========================================================
    OVERRIDE DISPLAY RESULT
==========================================================*/

// const oldDisplayResult = displayResult;

// displayResult = function(data){

//     oldDisplayResult(data);

//     animateTotal(data.grandTotal);

// };


/*==========================================================
    COPY BILL SUMMARY
==========================================================*/

function copyBill(){

    const text =

`Electricity Bill Summary

Customer : ${customerResult.textContent}

Units : ${unitsResult.textContent}

Rate : ${rateResult.textContent}

Energy Charge : ${energyResult.textContent}

Fixed Charge : ${fixedResult.textContent}

Duty : ${dutyResult.textContent}

GST : ${gstResult.textContent}

Total : ${totalResult.textContent}`;

    navigator.clipboard.writeText(text);

}


/*==========================================================
    KEYBOARD SHORTCUTS
==========================================================*/

document.addEventListener("keydown", (e) => {

    if(e.ctrlKey && e.key === "r"){

        e.preventDefault();

        resetBtn.click();

    }

    if(e.ctrlKey && e.key === "c"){

        if(billResult.style.display === "flex"){

            e.preventDefault();

            copyBill();

        }

    }

});


/*==========================================================
    PRINT SUPPORT
==========================================================*/

function printBill(){

    window.print();

}


/*==========================================================
    AUTO FOCUS
==========================================================*/

window.addEventListener("load", () => {

    previousReading.focus();

});


/*==========================================================
    DECIMAL LIMIT
==========================================================*/

document.querySelectorAll('input[type="number"]').forEach(input=>{

    input.addEventListener("blur",function(){

        if(this.value !== ""){

            this.value = Number(this.value).toFixed(2);

        }

    });

});


/*==========================================================
    PREVENT DOUBLE SUBMIT
==========================================================*/

let calculating = false;

form.addEventListener("submit",(e)=>{

    if(calculating){

        e.preventDefault();

        return;

    }

    calculating = true;

    setTimeout(()=>{

        calculating = false;

    },500);

});


/*==========================================================
    READY
==========================================================*/

console.log("⚡ Electricity Bill Calculator Ready");



// Download the bill summary as a PDF
/*==========================================================
    DOWNLOAD PDF
==========================================================*/

const downloadPdf = document.getElementById("downloadPdf");

downloadPdf.addEventListener("click", () => {

    const element = document.getElementById("resultCard");

    const customer =
        customerResult.textContent === "-"
        ? "Electricity-Bill"
        : customerResult.textContent.replace(/\s+/g,"-");

    const options = {

        margin:0.4,

        filename:`${customer}-Electricity-Bill.pdf`,

        image:{
            type:"jpeg",
            quality:1
        },

        html2canvas:{
            scale:2,
            useCORS:true
        },

        jsPDF:{
            unit:"in",
            format:"a4",
            orientation:"portrait"
        }

    };

    html2pdf().set(options).from(element).save();

});