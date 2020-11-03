({

    initGuideWireScreen: function (component, event, helper) {

        let oppty = component.get('v.oppty');
        let isPersonal = component.get('v.isPersonal');
        let policy = component.get('v.policy');
        console.log('initGuideWireScreen');
        console.log('>> oppty stage: ' + oppty.StageName);
        if (policy == null || oppty == null) {
            helper.redirectToFirstScreen(component);
        } else {
            if (oppty.StageName == 'Closed Won') {
                helper.redirectToLastScreen(component);
            } else {
                if (isPersonal == false) {
                    // debugger
                    if (oppty.StageName == 'Review' || oppty.StageName == 'Underwrite') {
                        helper.redirectToCommercialUnderwritingReviewScreen(component);
                    } else if (oppty.StageName == 'Proposal/Quote' || oppty.StageName == 'Bound') {
                        component.set('v.QuoteProgramPriceCM', policy.PremiumAmount);
                        helper.redirectToCommercialQuoteScreen(component);
                    } else {
                        helper.redirectToFirstScreen(component);
                    }
                } else {
                    helper.redirectToFirstScreen(component);
                }
            }
        }
    },

    initGetOpptyAccountInfoByOpptyId: function (component, event, helper) {
        console.log('getOpptyAccountInfoByOpptyId');
        helper.callServer(
            component,
            "c.getOpptyAccountInfoByOpptyId",
            function (response) {
                //console.log(response);
                component.set("v.oppty", response);
                helper.initPolicyCoverageStartDate(component, event, helper);
                helper.initCheckOpptyRecordType(component, event, helper);
            }, {
                opptyId: component.get("v.recordId")
            }
        );
    },

    initCheckOpptyRecordType: function (component, event, helper) {
        let opptyRecordTypeName = component.get('v.oppty.RecordType.Name');
        // console.log(opptyRecordTypeName);
        if (opptyRecordTypeName.toLowerCase().includes('commercial')) {
            component.set('v.isPersonal', false);
        }
        helper.handleFindLastPolicyOfThisOppty(component, event, helper);
    },


    handleFindLastPolicyOfThisOppty: function (component, event, helper) {
        //console.log('handleFindLastPolicyOfThisOppty');
        let oppty = component.get('v.oppty');
        let isPersonal = component.get('v.isPersonal');
        helper.callServer(
            component,
            "c.getExistingPolicy",
            function (response) {
                if (response != null && response.Id != null && response.Id.length > 0) {
                    console.log('Found v.policyId: ' + response.Id);
                    component.set('v.policy', response);
                    component.set('v.policyId', response.Id);
                    helper.initGuideWireScreen(component, event, helper);
                } else {
                    console.log('Not Found v.policyId');
                    //debugger
                    helper.redirectToFirstScreen(component);
                }

            }, {
                opptyId: oppty.Id
            }
        );
    },
    initPolicyCoverageStartDate: function (component, event, helper) {
        //console.log('initPolicyCoverageStartDate');
        let currentStartDate = component.get("v.oppty.CloseDate");
        if (currentStartDate == null) {
            let today = new Date();
            component.set("v.PolicyCoverageStartDate", today.toDateString());
        } else {
            console.log('Found opportunity close date: ' + currentStartDate);
            component.set("v.PolicyCoverageStartDate", currentStartDate);
        }
    },

    doHandleChangeOpptyStage: function (component, event, helper, changeOpptyStatus) {
        let opptyId = component.get('v.oppty.Id');
        component.set('v.showSpinner', true);
        if (opptyId == null || changeOpptyStatus == null) {
            console.log('Error: master.helper.doHandleChangeOpptyStage error');
            component.set('v.showSpinner', false);
            return;
        }
        helper.callServer(
            component,
            "c.updateOpportunityStage",
            function (response) {
                if (response) {
                    component.set('v.oppty', response);
                    console.log('master.helper. updateOpportunityStage to ' + response.StageName);
                    helper.showToast('Success', 'Your record has been updated to ' + changeOpptyStatus, 'success');
                    if (response.StageName == 'Closed Won') {
                        helper.redirectToLastScreen(component);
                    } else if (response.StageName == 'Review' || response.StageName == 'Underwrite') {
                        helper.redirectToCommercialUnderwritingReviewScreen(component);
                    } else if (response.StageName == 'Proposal/Quote' || response.StageName == 'Bound') {
                        helper.redirectToCommercialQuoteScreen(component);
                    } else if (response.StageName == 'Prospect' || response.StageName == 'Submission') {
                        helper.redirectToFirstScreen(component);
                    }
                } else {
                    console.log('master..doHandleChangeOpptyStage..return null');
                    component.set('v.showSpinner', false);
                }
            }, {
                opptyId: opptyId,
                updateOpptyStatus: changeOpptyStatus
            }
        );
    },

    doPostTextChatter: function (component, event, helper) {
        let chatterFeedText = ' Thank you for choosing Cumulus for your new business submission. We will be reviewing the underwriting issues identified and provide you updates via the portal. In order to help streamline the process, can you please provide some additional documentation: loss runs, financials, property inspections and recent renovations?';
        let boldText = 'FROM: Cumulus Business Operations';
        let opptyId = component.get('v.oppty.Id');
        component.set('v.showSpinner', true);
        //console.log('doPostTextChatter');
        //console.log(opptyId);
        helper.callServer(
            component,
            "c.createTextChatterPost",
            function (response) {
                if (response) {
                    //console.log('master.helper. doPostTextChatter. FeedItemId: ' + response);
                } else {
                    //console.log('master.helper. doPostTextChatter. FeedItemId null');
                }
                component.set('v.showSpinner', false);
            }, {
                opptyId: opptyId,
                chatterFeedText: chatterFeedText,
                boldText: boldText,
                mentionUserExternalId: 'InsBroker.001'
            }
        );
    },

    doPostTextChatterWithSampleQuote: function (component, event, helper) {
        let staticResourceFileName = 'Silva_Commercial_Property_Quote';
        let filename = 'Silva Commercial Property Quote';
        let chatterFeedText = ' Attached is the quote for your recent submission for Silva Industries. Please let me know if you have any questions. Thank you!';
        let opptyId = component.get('v.oppty.Id');
        component.set('v.showSpinner', true);
        helper.callServer(
            component,
            "c.createQuoteAttachementChatterPost",
            function (response) {
                if (response) {
                    // console.log('master.helper. doPostTextChatterWithSampleQuote. FeedItemId: ' + response);
                } else {
                    console.log('master.helper. doPostTextChatterWithSampleQuote. FeedItemId return null');
                }
                component.set('v.showSpinner', false);
            }, {
                opptyId: opptyId,
                filename: filename,
                staticResourceFileName: staticResourceFileName,
                chatterFeedText: chatterFeedText,
                mentionUserExternalId: 'InsBroker.001'
            }
        );

    },

    doHandleChangeInsurancePolicyStatus: function (component, event, helper, changePolicyStatus) {
        let policyId = component.get("v.policyId");
        component.set('v.showSpinner', true);
        if (policyId == null || changePolicyStatus == null) {
            console.log('Error: master.helper.doHandleChangeInsurancePolicyStatus error');
            component.set('v.showSpinner', false);
            return;
        }
        helper.callServer(
            component,
            "c.updatePolicyStatus",
            function (response) {
                if (response) {
                    component.set('v.policy', response);
                    console.log('master.helper. UpdatePolicyStatus to ' + response.Status);
                }
                component.set('v.showSpinner', false);
            }, {
                policyId: policyId,
                updatePolicyStatus: changePolicyStatus
            }
        );
    },

    doHandleChangeInsurancePolicyAmount: function (component, event, helper, amountString) {
        let policyId = component.get("v.policyId");
        if (policyId == null || amountString == null) {
            console.log('Error: master.helper.doHandleChangeInsurancePolicyAmount error');
            return;
        }
        let isPersonal = component.get('v.isPersonal');
        component.set('v.showSpinner', true);
        helper.callServer(
            component,
            "c.updatePolicyAmount",
            function (response) {
                if (response) {
                    component.set('v.policy', response);
                    component.set('v.showSpinner', false);
                    if (isPersonal) {
                        component.set('v.QuoteProgramPrice', amountString);
                    } else {
                        component.set('v.QuoteProgramPriceCM', amountString);
                    }
                    console.log('master.helper.UpdatePolicyAmount to ' + amountString);
                } else {
                    component.set('v.showSpinner', false);
                }
            }, {
                policyId: policyId,
                amountString: amountString
            }
        );
    },


    handleChangeOpptyStageCloseWonByOpptyId: function (component, event, helper) {

        helper.doHandleChangeOpptyStage(component, event, helper, 'Closed Won');
        helper.doHandleChangeInsurancePolicyStatus(component, event, helper, 'In Force');

    },

    handleChangeOpptyStageToSubmission: function (component, event, helper) {
        //console.log('handleChangeOpptyStageToSubmission');
        component.set('v.showSpinner', true);
        helper.callServer(
            component,
            "c.updateOpportunityStage",
            function (response) {
                console.log('handleChangeOpptyStageToSubmission..done');
                component.set('v.showSpinner', false);
                helper.showToast(
                    "Success",
                    "Your record has been updated to Submission",
                    "success"
                );
            }, {
                opptyId: component.get("v.recordId"),
                updateOpptyStatus: 'Submission'
            }
        );
    },


    handleCreatePolicy: function (component, event, helper) {

        component.set('v.showSpinner', true);
        let selectedPlanIdx = document.querySelector(
            "input[name='paymentPlans']:checked"
        ).value;

        let selectedPaymentPlanTotal = document.getElementById(
            "TOTAL" + selectedPlanIdx
        ).innerText;

        let selectedPaymentPlanTermMonths = document.getElementById(
            "TERMMONTHS" + selectedPlanIdx
        ).innerText;
        //console.log("master helper showNext..");
        let isPersonal = component.get('v.isPersonal'),
            currentStepString = component.get("v.currentStepString"),
            maxSteps = 8,
            productId,
            currentStepIdx = parseInt(currentStepString),
            selectedProductsDataFromServer = component.get('v.selectedAutoPolicyComparisonProductsData');
        if (selectedProductsDataFromServer[0].Id != null) {
            productId = selectedProductsDataFromServer[0].Id;
        }

        if (currentStepIdx < maxSteps) {
            currentStepIdx++;
            currentStepString = currentStepIdx.toString();
            component.set("v.currentStepString", currentStepString);
        } else {
            //console.log("currentStep:" + currentStepIdx + " maxSteps: " + maxSteps);
            return;
        }

        let effectiveDateStr = component.get("v.PolicyCoverageStartDate");
        let effectiveDate = new Date(effectiveDateStr);
        effectiveDateStr = effectiveDate.getFullYear() + '-' + (effectiveDate.getMonth() + 1) + '-' + effectiveDate.getDate();

        let planName = document.getElementById("PLANNAME" + selectedPlanIdx).innerText;
        let downPayment = document.getElementById("DOWNPAYMENT" + selectedPlanIdx).innerText;
        let installment = document.getElementById("INSTALLMENT" + selectedPlanIdx).innerText;
        let policyTermMonths = document.getElementById("TERMMONTHS" + selectedPlanIdx).innerText;


        helper.callServer(
            component,
            "c.createInsurancePolicy",
            function (response) {
                if (response != null) {
                    component.set('v.policy', response);
                    let insurancePolicyId = response.Id;
                    console.log(">> New insurance policy created: " + insurancePolicyId);
                    component.set('v.policyId', insurancePolicyId);
                    helper.createCustomerPropertyLinkToThisPolicy(
                        component,
                        event,
                        helper,
                        insurancePolicyId
                    );

                } else {
                    console.log("response = null");
                }
            }, {
                opptyId: component.get("v.recordId"),
                accountId: component.get("v.oppty.AccountId"),
                insurancePolicyRecordTypeName: 'Personal Lines',
                paymentPlanTotalString: selectedPaymentPlanTotal,
                effectiveDateStr: effectiveDateStr,
                planType: 'Auto',
                opptyName: component.get("v.oppty.Name"),
                productId: productId,
                status: 'In Force',
                producerId: component.get('v.producerId')
            }
        );

    },

    handleCreateCommercialPolicy: function (component, event, helper) {
        //debugger
        component.set('v.showSpinner', true);
        let productId = component.get('v.productCM.Id'),
            effectiveDate = new Date(),
            effectiveDateStr = effectiveDate.getFullYear() + '-' + (effectiveDate.getMonth() + 1) + '-' + effectiveDate.getDate();
        let hasUnderwritingIssue = component.get('v.commercialInsurancePolicyUnderwritingIssue');
        let policyStatus = (hasUnderwritingIssue == true ? 'Draft' : 'In Force');
        let paymentPlanTotalString = component.get('v.QuoteProgramPriceCM');

        helper.handleUpsertOpportunityLineItem(component, event, helper, null);
        helper.callServer(
            component,
            "c.createInsurancePolicy",
            function (response) {
                if (response != null) {
                    component.set('v.policy', response);
                    let insurancePolicyId = response.Id;
                    console.log(">> New insurance policy created: " + insurancePolicyId);
                    component.set('v.policyId', insurancePolicyId);
                    helper.createCustomerPropertyLinkToThisPolicy(
                        component,
                        event,
                        helper,
                        insurancePolicyId
                    );

                    if (hasUnderwritingIssue) {
                        helper.redirectToCommercialUnderwritingScreen(component);
                    } else {
                        helper.doHandleChangeOpptyStage(component, event, helper, 'Proposal/Quote')
                        //helper.redirectToCommercialQuoteScreen(component, event, helper);
                    }

                } else {
                    console.log("handleCreateCommercialPolicy response = null");
                    component.set('v.showSpinner', false);
                }
            }, {
                opptyId: component.get("v.recordId"),
                accountId: component.get("v.oppty.Account.Id"),
                insurancePolicyRecordTypeName: 'Commercial Lines',
                paymentPlanTotalString: paymentPlanTotalString,
                effectiveDateStr: effectiveDateStr,
                planType: 'Commercial Property',
                opptyName: component.get("v.oppty.Name"),
                productId: productId,
                policyId: component.get('v.policyId'),
                status: policyStatus,
                producerId: component.get('v.producerId')
            }
        );
    },

    handleUpsertOpportunityLineItem: function (component, event, helper, priceInputString) {
        console.log('upsertOpportunityLineItem');

        component.set('v.showSpinner', true);
        let isPersonal = component.get('v.isPersonal');
        let opptyId = component.get('v.oppty.Id');
        let qty = 1;
        let programPrice;
        let productId = (isPersonal == true ? '' : component.get('v.policy.ProductId'));
        //console.log(productId);
        if (priceInputString != null && priceInputString.length > 0) {
            programPrice = priceInputString;
        } else {
            programPrice = (isPersonal == true ? component.get('v.QuoteProgramPrice') : component.get('v.QuoteProgramPriceCM'));
        }
        console.log('productId:' + productId);
        console.log('programPrice:' + programPrice);
        helper.callServer(
            component,
            "c.upsertOpportunityLineItem",
            function (response) {
                if (response != null) {
                    //console.log(" >> handleUpsertOpportunityLineItem: " + JSON.stringify(response));
                    component.set('v.showSpinner', false);
                } else {
                    console.log("handleUpsertOpportunityLineItem response = null");
                    component.set('v.showSpinner', false);
                }
            }, {
                opptyId: opptyId,
                productId: productId,
                qty: qty,
                price: parseFloat(programPrice)
            }
        );
    },

    createInsuranceCoverageLinkToThisPolicy: function (component, event, helper, policyId) {
        // console.log('createInsuranceCoverageLinkToThisPolicy');
        let selectedProductsDataFromServer = component.get('v.selectedAutoPolicyComparisonProductsData'),
            productId,
            productCoverageList,
            insuranceCoverageList = [],
            insuranceCoverageJSONString,
            pIdx = 0,
            iIdx = 0,
            today = new Date(),
            effectiveDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
            expirationDate = (today.getFullYear() + 1) + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        if (selectedProductsDataFromServer != null && selectedProductsDataFromServer.length > 0) {
            productId = selectedProductsDataFromServer[0].Id;
            productCoverageList = selectedProductsDataFromServer[0].Insurance_Coverages__r;
            for (pIdx = 0; pIdx < productCoverageList.length; pIdx++) {
                if (productCoverageList[pIdx].Covered__c == true) {
                    insuranceCoverageList.push({
                        Category: 'Coverage',
                        EffectiveDate: effectiveDate,
                        ExpirationDate: expirationDate,
                        CategoryGroup: 'Home',
                        CategoryGroupType: 'Comprehensive',
                        InsurancePolicyId: policyId,
                        CoverageName: productCoverageList[pIdx].Product_Coverage__r.Name
                    })
                } else {
                    continue;
                }
            }
            insuranceCoverageJSONString = JSON.stringify(insuranceCoverageList);

            helper.callServer(
                component,
                "c.createInsurancePolicyCoverage",
                function (response) {
                    if (response != null) {
                        console.log(" >> createInsurancePolicyCoverage: " + JSON.stringify(response));
                        component.set('v.showSpinner', false);
                        helper.showToast(
                            "Success",
                            "Your record has been updated",
                            "success"
                        );
                        helper.handleChangeOpptyStageCloseWonByOpptyId(component, event, helper);
                    } else {
                        console.log("response = none");
                        component.set('v.showSpinner', false);
                    }
                }, {
                    insurancePolicyCoverageJSONString: insuranceCoverageJSONString,
                    opptyId: component.get('v.oppty.Id'),
                    accountId: component.get('v.oppty.AccountId'),
                    insurancePolicyId: policyId,
                    insuranceAssetsJSONString: JSON.stringify(component.get('v.insuranceAssetsList'))
                }
            );
            //console.log(insuranceCoverageList);
        }

    },


    createCustomerPropertyLinkToThisPolicy: function (
        component,
        event,
        helper,
        policyId
    ) {
        let returnedVehiclesList = component.get("v.propertyListVehicle[0].propertyRecordList");
        let returnedSelectedCommercialPropertiesList = component.get("v.selectedCPcommercialPropertyList");
        let insertCustomerPropertyType = component.get("v.propertyListVehicle[0].propertyRecordTypeName");
        let insertCustomerPropertyList = [];
        let isPeronsal = component.get('v.isPersonal');
        if (isPeronsal) {
            for (let i = 0; i < returnedVehiclesList.length; i++) {
                insertCustomerPropertyList.push({
                    Make: returnedVehiclesList[i].make,
                    ModelName: returnedVehiclesList[i].model,
                    VIN: returnedVehiclesList[i].VIN,
                    MakeYear: returnedVehiclesList[i].year,
                    PrimaryOwnerId: component.get('v.oppty.AccountId'),
                    PrimaryUse: returnedVehiclesList[i].primaryUse,
                    PurchasePrice: returnedVehiclesList[i].costNew,
                    Description: returnedVehiclesList[i].make + ' - ' + returnedVehiclesList[i].model + ' - ' + returnedVehiclesList[i].year,
                    RegistrationNumber: returnedVehiclesList[i].licensePlate

                });
            }
        } else {
            insertCustomerPropertyType = 'Commercial Property';
            insertCustomerPropertyList = returnedSelectedCommercialPropertiesList;
        }
        console.log(JSON.stringify(insertCustomerPropertyList));

        //   console.log("== call server: createInsuranceCustomerProperty == ");
        helper.callServer(
            component,
            "c.createInsuranceCustomerPropertyAndAssets",
            function (response) {
                if (response != null) {
                    // console.log(" >> insuranceAssetsList: " + JSON.stringify(response));
                    component.set('v.insuranceAssetsList', response);
                    helper.createInsuranceCoverageLinkToThisPolicy(component, event, helper, policyId);
                } else {
                    console.log("response = none");
                }
            }, {
                propertyListString: JSON.stringify(insertCustomerPropertyList),
                propertyRecordTypeName: insertCustomerPropertyType,
                opptyId: component.get('v.oppty.Id'),
                accountId: component.get('v.oppty.AccountId'),
                insPolicyId: policyId,
                isPersonal: isPeronsal,
                productName: component.get('v.productCM.Name')
            }
        );
    },

    handleUpdateOpptyDetailsAfterINSToolkitEvent: function (component, event, helper) {

        component.set('v.showSpinner', true);
        let customerPropertyList = component.get('v.selectedCPcommercialPropertyList');
        let customerPropertyId;
        if (customerPropertyList[0] != null) {
            customerPropertyId = customerPropertyList[0].Id;
        }
        let productCode = component.get('v.productCM.Name');
        helper.callServer(
            component,
            "c.updateOpportunityAfterHandlingINSToolkitEvent",
            function (response) {
                // console.log(response);
                helper.doPostTextChatterWithSampleQuote(component, event, helper);
                helper.doDeleteFinServAlert(component, event, helper);
                helper.doCloseTasks(component, event, helper);
                helper.doHandleChangeOpptyStage(component, event, helper, 'Proposal/Quote');
            }, {
                opptyId: component.get('v.oppty.Id')
            }
        );
    },



    redirectToLastScreen: function (component) {
        component.set("v.currentStepString", '8');
        component.set('v.showSpinner', false);
    },

    redirectToCommercialUnderwritingScreen: function (component) {
        component.set("v.currentStepString", "3");
        component.set('v.showSpinner', false);
    },


    redirectToCommercialUnderwritingReviewScreen: function (component) {
        component.set("v.currentStepString", "4");
        component.set('v.showSpinner', false);
    },
    redirectToCommercialQuoteScreen: function (component) {
        component.set("v.currentStepString", "5");
        component.set('v.showSpinner', false);
    },

    redirectToCommercialAccountPolicyInformationScreen: function (component) {
        component.set("v.currentStepString", "6");
        component.set('v.showSpinner', false);
    },

    redirectToCommercialAccountPaymentScreen: function (component) {
        component.set("v.currentStepString", "7");
        component.set('v.showSpinner', false);
    },

    redirectToFirstScreen: function (component) {
        component.set("v.currentStepString", "1");
        component.set('v.showSpinner', false);
    },

    doDeleteSelectedPolicy: function (component, event, helper) {
        let policyId = component.get('v.policyId');
        let opptyId = component.get('v.recordId');
        let isPersonal = component.get('v.isPersonal');
        if (opptyId != null && opptyId.length > 0) {
            component.set('v.showSpinner', true);
            helper.callServer(
                component,
                "c.deletePolicyById",
                function (response) {
                    // console.log(response);
                    //debugger
                    if (isPersonal == false) {
                        helper.doHandleChangeOpptyStage(component, event, helper, 'Prospect');
                        location.reload();
                        //helper.redirectToFirstScreen(component);
                    } else {
                        helper.redirectToFirstScreen(component);
                    }
                }, {
                    policyId: policyId,
                    opptyId: opptyId
                }
            );
        }
    },



    showPrevious: function (component, event, helper) {
        let minSteps = 1;
        let currentStepString = component.get("v.currentStepString");
        let currentStepIdx = parseInt(currentStepString);
        if (currentStepIdx == 5) {
            component.set("v.currentStepString", '2');
            return;
        }
        if (currentStepIdx > minSteps) {
            currentStepIdx--;
            currentStepString = currentStepIdx.toString();
            component.set("v.currentStepString", currentStepString);
        } else {
            return;
        }
    },

    showNext: function (component, event, helper) {
        let isPersonal = component.get('v.isPersonal'),
            maxSteps = 8,
            currentStepString = component.get("v.currentStepString"),
            currentStepIdx = parseInt(currentStepString);
        //debugger
        if (currentStepString == '1') {
            if (isPersonal == false) {
                helper.getReturnedSelectedInsuranceProduct(component, event, helper);
                helper.getReturnedSelectedProdcuer(component, event, helper);
                helper.handleChangeOpptyStageToSubmission(component, event, helper);
                component.set("v.currentStepString", '2');
                //debugger 
            } else {
                currentStepIdx++;
                currentStepString = currentStepIdx.toString();
                component.set("v.currentStepString", currentStepString);
            }

        } else if (!isPersonal && currentStepString == '5') {
            helper.updatePaymentPlans(component, event, helper);
            helper.redirectToCommercialAccountPolicyInformationScreen(component);
        } else {
            if (currentStepIdx < maxSteps) {
                currentStepIdx++;
                currentStepString = currentStepIdx.toString();
                component.set("v.currentStepString", currentStepString);
            } else {
                return;
            }
        }

    },

    getReturnedSelectedInsuranceProduct: function (component, event, helper) {
        let PersonalCorporateInfoScreenCmp = component.find('PersonalCorporateInfoScreen');
        let commercialInsuranceProduct = PersonalCorporateInfoScreenCmp.GetSelectedProduct(component);
        let isPersonal = component.get('v.isPersonal');
        //debugger
        if (isPersonal == false) {
            component.set('v.QuoteProgramPriceCM', commercialInsuranceProduct.Premium__c);
        }
        //debugger
        component.set('v.productCM', commercialInsuranceProduct);
        console.log('Product Id: ', commercialInsuranceProduct.Id);
        //alert('productCM: ' + productCM);
    },

    getReturnedSelectedProdcuer: function (component, event, helper) {
        let PersonalCorporateInfoScreenCmp = component.find('PersonalCorporateInfoScreen');
        let producerId = PersonalCorporateInfoScreenCmp.get('v.selectedProducer.Id');
        console.log('Producer Id: ', producerId);
        component.set('v.producerId', producerId);
        //alert('productCM: ' + productCM);
    },

    updatePaymentPlans: function (component, event, helper) {
        // console.log(">>> master helper updatePaymentPlansList..");
        let isPersonal = component.get('v.isPersonal');
        let programPrice = (isPersonal == true ? component.get('v.QuoteProgramPrice') : component.get('v.QuoteProgramPriceCM'));
        let monthlyPayment = parseFloat(programPrice / 12).toFixed(2),
            configList = [],
            paymentPlansList = [];
        if (isPersonal == true) {
            component.set("v.selectedQuoteProgramMonthlyPriceOnCard", monthlyPayment + '');
            configList = component.get("v.paymentConfigList");
        } else {
            component.set("v.QuoteProgramCMMonthly", monthlyPayment + '');
            configList = component.get("v.paymentConfigListCommercial");
        }
        // console.log('programPrice: ' + programPrice);
        // console.log('montlyPayment: ' + monthlyPayment);

        for (var i = 0; i < configList.length; i++) {
            var thisPolicyTermMonths = parseFloat(configList[i].policyTermMonths);
            var thisTotal =
                monthlyPayment *
                thisPolicyTermMonths *
                parseFloat(configList[i].totalPercentage);

            var thisDownPayment =
                thisTotal * parseFloat(configList[i].downPaymentPercentage);
            var thisNumOfInstallments = parseFloat(configList[i].numOfInstallments);
            var thisInstallment = 0;
            if (thisNumOfInstallments != 0.0) {
                thisInstallment = (thisTotal - thisDownPayment) / thisNumOfInstallments;
            }
            paymentPlansList.push({
                name: configList[i].name,
                downPayment: (Math.round(thisDownPayment * 10) / 10).toFixed(2),
                installment: (Math.round(thisInstallment * 10) / 10).toFixed(2),
                total: (Math.round(thisTotal * 10) / 10).toFixed(2),
                policyTermMonths: thisPolicyTermMonths
            });
        }
        component.set("v.paymentPlansList", paymentPlansList);
        // console.log(paymentPlansList);
    },

    doCreateFinServAlert: function (component, event, helper, message) {
        //debugger
        console.log('doCreateFinServAlert');
        component.set('v.showSpinner', true);
        helper.callServer(
            component,
            "c.createFinServAlert",
            function (response) {
                console.log('doCreateFinServAlert..');
                console.log(response);
                component.set('v.showSpinner', false);
                $A.get("e.force:refreshView").fire();
            }, {
                opptyId: component.get('v.oppty.Id'),
                policyId: component.get('v.policyId'),
                message: message
            }
        );
    },

    doDeleteFinServAlert: function (component, event, helper) {
        helper.callServer(
            component,
            "c.deleteFinServAlert",
            function (response) {
                $A.get("e.force:refreshView").fire();
            }, {
                opptyId: component.get('v.oppty.Id'),
            }
        );
    },

    doCreateTask: function (component, event, helper, subject, description, taskOwner) {
        component.set('v.showSpinner', true);
        helper.callServer(
            component,
            "c.createTask",
            function (response) {
                // console.log('doCreateTask..');
                // console.log(response);
                component.set('v.showSpinner', false);
            }, {
                opptyId: component.get('v.oppty.Id'),
                description: description,
                subject: subject,
                taskOwner: taskOwner
            }
        );
    },


    doCloseTasks: function (component, event, helper) {
        helper.callServer(
            component,
            "c.closeTask",
            function (response) {}, {
                opptyId: component.get('v.oppty.Id'),
            }
        );
    },

    showToast: function (title, message, type) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: title,
            message: message,
            type: type,
            mode: "dismissible"
        });
        toastEvent.fire();
        $A.get("e.force:refreshView").fire();
    },

    callServer: function (component, method, callback, params) {
        // console.log("master call server..");
        let action = component.get(method);
        //  debugger;
        if (params) {
            action.setParams(params);
        }

        action.setCallback(this, function (response) {
            // debugger;
            let state = response.getState();
            if (state === "SUCCESS") {
                // pass returned value to callback function
                callback.call(this, response.getReturnValue());
            } else if (state === "ERROR") {
                // generic error handler
                let errors = response.getError();
                if (errors) {
                    console.log("Errors", errors);
                    if (errors[0] && errors[0].message) {
                        throw new Error("Error" + errors[0].message);
                    }
                } else {
                    throw new Error("Unknown Error");
                }
            }
        });

        $A.enqueueAction(action);
    },

    navigateToSObject: function (component, event, helper, recordId) {
        let navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": recordId
        });
        navEvt.fire();
    }

});