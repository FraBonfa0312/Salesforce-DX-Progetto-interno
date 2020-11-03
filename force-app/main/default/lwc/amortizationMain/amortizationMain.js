/*
==========================================
    Title: amortizationMain
    Type: Lightning Web Component
    Purpose: Main LWC for the amortization
        calculator.
    Author: Clay Phillips
    Date: 05/07/2020 
==========================================
*/

import {LightningElement, api, track} from 'lwc';

export default class AmortizationMain extends LightningElement{
    //Public Variables for a use in a flow, with another component, etc.
    @api purchasePrice = 0;
    @api downPayment = 0;
    @api loanAPR = 0;
    @api monthlyPayment = 0;
    @api monthlyPaymentTimes100 = 0; //needed for flows
    @api xAxisLabel = 'Month';
    
    @api yAxisLabel = 'Remaining Balance';

    @track amortizationRecords = [];
    @track amortizationResult = {};
    @track showTable = false;
    
    @track numberOfMonths = 0;
    @track showBurndown = false;
    @track xAxisObj = {
        xValues : [],
        xAxisLabel : 'Month'
    };
    
    @track yAxisObj = {
        yValues : [],
        yAxisLabel : 'Remaining Balance'
    };

    connectedCallback(){
        this.xAxisObj.xAxisLabel = this.xAxisLabel;
        this.yAxisObj.yAxisLabel = this.yAxisLabel;
    }
    
    amortizationCalculationEventHandler(event){
        this.buildAmortizationTable(event.detail);
        this.purchasePrice = event.detail.purchasePrice;
        this.downPayment = event.detail.downPayment;
        this.loanAPR = this.roundTo(event.detail.interestRate, 4) * 10000;
    }

    buildAmortizationTable(detail){
        let monthlyRate = 0;
        let principal = detail.purchasePrice - detail.downPayment;
        monthlyRate = detail.interestRate / 12;
        
        if(detail.monthlyPayment === null || detail.monthlyPayment === 0){
            let monthlyPaymentCalculated = principal * ((monthlyRate * Math.pow(1 + monthlyRate, detail.numberOfMonths)) / (Math.pow(1 + monthlyRate, detail.numberOfMonths) -1));
            detail.monthlyPayment = monthlyPaymentCalculated;
        }
        else if(detail.numberOfMonths === null || detail.numberOfMonths === 0){
            let numberOfMonthsCalculated = Math.log(Math.pow(1 - ((principal * monthlyRate) / detail.monthlyPayment), -1)) / Math.log(1 + monthlyRate);
            detail.numberOfMonths = Math.ceil(numberOfMonthsCalculated);
        }

        let remainingBalance = principal;
        let currentPaymentDate = detail.firstPaymentDate;

        let amortizationRecords = [];
        let lineXValues = [];
        let interestPaidValues = [];
        let principalPaidValues = [];
        let remainingBalanceValues = [];
        
        for(let a = 0; a < detail.numberOfMonths && remainingBalance > 0; a++){
            let amortizationRecord = {};
            amortizationRecord.currentMonth = a + 1;
            lineXValues.push(amortizationRecord.currentMonth.toString());
            let currentMonthNumber = currentPaymentDate.getMonth() - 1;
            let currentMonthString = '';
            if(currentMonthNumber === 0){
               currentMonthString = 'Jan';
            }
            else if(currentMonthNumber === 1){
               currentMonthString = 'Feb';
            }
            else if(currentMonthNumber === 2){
               currentMonthString = 'Mar';
            }
            else if(currentMonthNumber === 3){
               currentMonthString = 'Apr';
            }
            else if(currentMonthNumber === 4){
               currentMonthString = 'May';
            }
            else if(currentMonthNumber === 5){
               currentMonthString = 'Jun';
            }
            else if(currentMonthNumber === 6){
               currentMonthString = 'Jul';
            }
            else if(currentMonthNumber === 7){
               currentMonthString = 'Aug';
            }
            else if(currentMonthNumber === 8){
               currentMonthString = 'Sep';
            }
            else if(currentMonthNumber === 9){
               currentMonthString = 'Oct';
            }
            else if(currentMonthNumber === 10){
               currentMonthString = 'Nov';
            }
            else{
               currentMonthString = 'Dec';
            }
            amortizationRecord.currentMonthString = currentMonthString;
            currentPaymentDate = new Date(currentPaymentDate.setMonth(currentPaymentDate.getMonth() + 1));
            amortizationRecord.interestPaid = monthlyRate * remainingBalance;
            interestPaidValues.push(amortizationRecord.interestPaid);
            if((amortizationRecord.interestPaid + remainingBalance) > detail.monthlyPayment){
               amortizationRecord.payment = detail.monthlyPayment;
            }
            else{
                amortizationRecord.payment = remainingBalance + amortizationRecord.interestPaid;
            }
           
            amortizationRecord.principalPaid = amortizationRecord.payment - amortizationRecord.interestPaid;
            principalPaidValues.push(amortizationRecord.principalPaid);
            remainingBalance = remainingBalance - amortizationRecord.principalPaid;
            amortizationRecord.remainingBalance = remainingBalance;
            remainingBalanceValues.push(amortizationRecord.remainingBalance);
            amortizationRecords.push(amortizationRecord);

           //handle additional payment
            if(detail.additionalPayment !== null && detail.additionalPayment > 0 && detail.additionalPaymentMonthNumber == amortizationRecord.currentMonth){
                let additionalPaymentRecord = {};
                additionalPaymentRecord.currentMonth = a + 1;
                lineXValues.push(additionalPaymentRecord.currentMonth.toString());
                additionalPaymentRecord.currentMonthString = 'Extra Payment';
                additionalPaymentRecord.payment = detail.additionalPayment;
                additionalPaymentRecord.interestPaid = 0;
                interestPaidValues.push(additionalPaymentRecord.interestPaid);
                additionalPaymentRecord.principalPaid = detail.additionalPayment;
                principalPaidValues.push(additionalPaymentRecord.principalPaid);
                remainingBalance = remainingBalance - additionalPaymentRecord.principalPaid;
                additionalPaymentRecord.remainingBalance = remainingBalance;
                remainingBalanceValues.push(additionalPaymentRecord.remainingBalance);
                amortizationRecords.push(additionalPaymentRecord);
            }
        }

        let amortizationRecordsSummary = {};
        amortizationRecordsSummary.amortizationRecords = amortizationRecords;
        amortizationRecordsSummary.lineXValues = lineXValues;
        amortizationRecordsSummary.remainingBalanceValues = remainingBalanceValues;
        amortizationRecordsSummary.principalPaidValues = principalPaidValues;
        amortizationRecordsSummary.interestPaidValues = interestPaidValues;

        this.amortizationResult = amortizationRecordsSummary;
        this.amortizationRecords = amortizationRecords;    
        this.monthlyPayment = 0;
        this.monthlyPayment = this.amortizationRecords[0].payment;
        this.monthlyPaymentTimes100 = this.roundTo(this.monthlyPayment, 2) * 100;
        this.numberOfMonths = this.amortizationRecords[this.amortizationRecords.length - 1].currentMonth;
        this.showTable = true;
        this.xAxisObj.xValues = lineXValues;
        let lineYValues = [];
        if(this.yAxisObj.yAxisLabel === 'Remaining Balance'){
            lineYValues = remainingBalanceValues;
        }
        else if(this.yAxisObj.yAxisLabel === 'Principal Paid'){
            lineYValues = principalPaidValues;
        }
        else{
            lineYValues = interestPaidValues;
        }
        this.yAxisObj.yValues = lineYValues;
        this.showBurndown = true;
    }

    amortizationResetEventHandler(){
        this.showTable = false;
        this.showBurndown = false;
        this.amortizationResult = {};
        this.amortizationRecords = [];
    }

    burndownTypeEventHandler(event){
        let lineYValues = [];
        let yAxisLabel = '';
        if(event.detail.value === 'Remaining Balance'){
            lineYValues = this.amortizationResult.remainingBalanceValues;
            yAxisLabel = 'Remaining Balance';
        }
        else if(event.detail.value === 'Principal Paid'){
            lineYValues = this.amortizationResult.principalPaidValues;
            yAxisLabel = 'Principal Paid'
        }
        else{
            lineYValues = this.amortizationResult.interestPaidValues;
            yAxisLabel = 'Interest Paid'
        }
        let yAxisObjNew = {
            yValues : lineYValues,
            yAxisLabel : yAxisLabel
        };
        this.yAxisObj = yAxisObjNew;
    }

    roundTo(number, digits){
        if(digits === undefined) {
            digits = 0;
        }
   
        let multiplicator = Math.pow(10, digits);
        number = parseFloat((number * multiplicator).toFixed(11));
        let test = (Math.round(number) / multiplicator);
        return + (test.toFixed(digits));
    }
}