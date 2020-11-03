/*
==========================================
    Title: amortizationForm
    Type: Lightning Web Component
    Purpose: Form LWC that contains all
        of the fields for the user to
        enter to build the amortization
        table.
    Author: Clay Phillips
    Date: 05/07/2020 
==========================================
*/

import {LightningElement, api, track} from 'lwc';

export default class AmortizationForm extends LightningElement{
    @api monthlyPayment = 0;

    @api
    get numberOfMonths(){
        return this._numberOfMonths;
    }
    set numberOfMonths(value){
        this._numberOfMonths = value;
        if(this.template.querySelector(".monthlyPaymentInput")){
            this.template.querySelector(".monthlyPaymentInput").value = this.monthlyPayment;
        }
    }

    @api purchasePrice = 0;
    @track downPayment = 0;
    @track interestRate = 0;
    @track firstPaymentDate;
    @track firstPaymentDateString;
    @track additionalPayment = 0;
    @track additionalPaymentMonthNumber = 0;
    @track showError = false;

    _numberOfMonths = 0;
    
    connectedCallback(){
        this.setToToday();
    }

    calculateAmortization(){
        if(this.monthlyPayment > 0 && this.numberOfMonths > 0){
            this.showError = true;
        }
        else{
            this.showError = false;
            let detail = {};
            detail.purchasePrice = this.purchasePrice;
            detail.downPayment = this.downPayment;
            detail.monthlyPayment = this.monthlyPayment;
            detail.numberOfMonths = this.numberOfMonths;
            detail.interestRate = this.interestRate / 100;
            detail.firstPaymentDate = this.firstPaymentDate;
            detail.additionalPayment = this.additionalPayment;
            detail.additionalPaymentMonthNumber = this.additionalPaymentMonthNumber;
            const amortizationCalculationEvent = new CustomEvent('amortizationcalculationevent', {
                detail: detail,
                bubbles: false,
                composed: false
            });
            this.dispatchEvent(amortizationCalculationEvent);
        }
    }

    resetForm(){
        this.purchasePrice = 0;
        this.downPayment = 0;
        this.monthlyPayment = 0;
        this.numberOfMonths = 0;
        this.interestRate = 0;
        this.setToToday();
        this.additionalPayment = 0;
        this.additionalPaymentMonthNumber = 0; 
        let detail = {}; 
        const amortizationResetEvent = new CustomEvent('amortizationresetevent', {
            detail: detail,
            bubbles: false,
            composed: false
        });
        this.dispatchEvent(amortizationResetEvent);
    }

    setToToday(){
        let today = new Date();
        let yyyy = today.getFullYear();
        let mm = (today.getMonth() + 1).toString().padStart(2, '0'); 
        let dd = today.getDate().toString().padStart(2, '0');
        this.firstPaymentDateString = yyyy + '-' + mm + '-' + dd;
        //console.log('firstPaymentDateString: ' + this.firstPaymentDateString);

        let year = Number(this.firstPaymentDateString.substring(0, 4));
        let month = Number(this.firstPaymentDateString.substring(5, 7));
        let day = Number(this.firstPaymentDateString.substring(8, 10));
        this.firstPaymentDate = new Date(year, month, day);
    }

    updatePurchasePrice(){
        let purchasePriceInput = this.template.querySelector(".purchasePriceInput");
        this.purchasePrice = purchasePriceInput.value;
        //console.log('Purchase Price: ' + this.purchasePrice);
    }

    updateDownPayment(){
        let downPaymentInput = this.template.querySelector(".downPaymentInput");
        this.downPayment = downPaymentInput.value;
        //console.log('Down Payment: ' + this.downPayment);
    }

    updateNumMonths(){
        let numMonthsInput = this.template.querySelector(".numMonthsInput");
        if(numMonthsInput.value){
            this.numberOfMonths = numMonthsInput.value;
        }
        else{
            this.numberOfMonths = null;
        }
        //console.log('# of Months: ' + this.numberOfMonths);
    }

    updateInterestRate(){
        let interestRateInput = this.template.querySelector(".interestRateInput");
        this.interestRate = interestRateInput.value;
        //console.log('Interest Rate: ' + this.interestRate / 100);
    }

    updateMonthlyPayment(){
        let monthlyPaymentInput = this.template.querySelector(".monthlyPaymentInput");
        if(monthlyPaymentInput.value){
            this.monthlyPayment = monthlyPaymentInput.value;
        }
        else{
            this.monthlyPayment = null;
        }
        
        //console.log('Monthly Payment: ' + this.monthlyPayment);
    }

    updateFirstPaymentDate(){
        let firstPaymentDateInput = this.template.querySelector(".firstPaymentDateInput");
        this.firstPaymentDateString = firstPaymentDateInput.value;
        //console.log('First Payment Date String: ' + this.firstPaymentDateString);
        let year = Number(this.firstPaymentDateString.substring(0, 4));
        let month = Number(this.firstPaymentDateString.substring(5, 7));
        let day = Number(this.firstPaymentDateString.substring(8, 10));
        this.firstPaymentDate = new Date(year, month, day);
        //console.log('First Payment Date: ' + this.firstPaymentDate);
    }

    updateAdditionalPayment(){
        let additionalPaymentInput = this.template.querySelector(".additionalPaymentInput");
        this.additionalPayment = additionalPaymentInput.value;
        //console.log('Additional Payment: ' + this.additionalPayment);
    }

    updateAdditionalPaymentMonthNumber(){
        let additionalPaymentMonthNumberInput = this.template.querySelector(".additionalPaymentMonthNumberInput");
        this.additionalPaymentMonthNumber = additionalPaymentMonthNumberInput.value;
        //console.log('Additional Payment Month Number: ' + this.additionalPaymentMonthNumber);
    }
}