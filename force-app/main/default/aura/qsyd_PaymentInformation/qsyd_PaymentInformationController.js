({
    doInit : function(component, event, helper) {
        component.set('v.paymentProcessed', false);
        
        // Figure out which buttons to display
        const availableActions = component.get('v.availableActions');
        
        
        for (var i = 0; i < availableActions.length; i++) {
            if (availableActions[i] == "PAUSE") {
                component.set("v.canPause", true);
            } else if (availableActions[i] == "BACK") {
                component.set("v.canBack", true);
            } else if (availableActions[i] == "NEXT") {
                component.set("v.canNext", true);
            } else if (availableActions[i] == "FINISH") {
                component.set("v.canFinish", true);
            }
        }
        
    }, 
    onButtonPressed: function(component, event, helper) {
        // Figure out which action was called
        const actionClicked = event.getSource().getLocalId();
        // Fire that action
        if (actionClicked === 'FINISH' || actionClicked === 'NEXT') {
            helper.toggleSpinner(component);
            
            setTimeout(function(){
                helper.toggleSpinner(component);
                
                const cvv = parseInt(component.get('v.cvv'));
                //if (cvv && cvv % 2 === 0) {
                //    component.set('v.disabled', true);
                //    component.set('v.paymentProcessed', false);
                //    helper.showToast('Error', 'Unabled to process payment. Credit card denied.', 'error');
                //} else {
                component.set('v.paymentProcessed', true);
                var navigate = component.get('v.navigateFlow');
                navigate(actionClicked);
                //}
            }, 1000);
        } else {
            var navigate = component.get('v.navigateFlow');
            navigate(actionClicked);
        }
    },
    onNumberChange : function(component, event, helper) {
        component.set('v.disabled', false);
        
        const cardNumberInput = component.get('v.cardNumber');
        const cardNumber = document.getElementById('svgnumber');
        
        const card = helper.cardnumber_mask.match(cardNumberInput);
        const formattedCardNumber = helper.format(cardNumberInput, card.mask);
        cardNumber.innerHTML = formattedCardNumber;
        
        //const ccicon = document.getElementById('ccicon');
        const ccsingle = document.getElementById('ccsingle');
        
        switch (card.cardtype) {
            case 'american express':
                //ccicon.innerHTML = amex;
                ccsingle.innerHTML = helper.amex_single;
                helper.swapColor('green');
                break;
            case 'visa':
                //ccicon.innerHTML = visa;
                ccsingle.innerHTML = helper.visa_single;
                helper.swapColor('lime');
                break;
            case 'diners':
                //ccicon.innerHTML = diners;
                ccsingle.innerHTML = helper.diners_single;
                helper.swapColor('orange');
                break;
            case 'discover':
                //ccicon.innerHTML = discover;
                ccsingle.innerHTML = discover_single;
                helper.swapColor('purple');
                break;
            case ('jcb' || 'jcb15'):
                //ccicon.innerHTML = jcb;
                ccsingle.innerHTML = helper.jcb_single;
                helper.swapColor('red');
                break;
            case 'maestro':
                //ccicon.innerHTML = maestro;
                ccsingle.innerHTML = helper.maestro_single;
                helper.swapColor('yellow');
                break;
            case 'mastercard':
                //ccicon.innerHTML = mastercard;
                ccsingle.innerHTML = helper.mastercard_single;
                helper.swapColor('lightblue');
                
                break;
            case 'cumulus':
                //ccicon.innerHTML = cumulus;
                ccsingle.innerHTML = helper.cumulus_single;
                helper.swapColor('salesforce');
                
                break; 
                
                
            case 'unionpay':
                //ccicon.innerHTML = unionpay;
                ccsingle.innerHTML = helper.unionpay_single;
                helper.swapColor('lightblue');
                break;
            default:
                //ccicon.innerHTML = '';
                ccsingle.innerHTML = '';
                helper.swapColor('grey');
                break;
        }
    },
    onCVVChange : function(component, event, helper) {
        component.set('v.disabled', false);
        
        const creditcard = component.find('creditcard');
        $A.util.addClass(creditcard, 'flipped');
        
        let cvv = document.getElementById('svgsecurity');
        cvv.innerHTML = component.get('v.cvv');
    },
    onNameChange : function(component, event, helper) {
        helper.handleNameChange(component);
    },
    onDateChange : function(component, event, helper) {
        component.set('v.disabled', false);
        
        const validUntil = component.get('v.validUntil');
        component.set('v.validUntil', helper.formatDate(validUntil, '00/00'));
    },
    flipToBack : function(component, event, helper) {
        const creditcard = component.find('creditcard');
        $A.util.addClass(creditcard, 'flipped');
    },
    flipToFront : function(component, event, helper) {
        const creditcard = component.find('creditcard');
        $A.util.removeClass(creditcard, 'flipped');
    },
    toggleCard : function(component, event, helper) {
        const creditcard = component.find('creditcard');
        $A.util.toggleClass(creditcard, 'flipped');
    }
})