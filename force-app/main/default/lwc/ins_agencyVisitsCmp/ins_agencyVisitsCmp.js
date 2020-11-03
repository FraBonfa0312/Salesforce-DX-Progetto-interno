import { LightningElement, track } from 'lwc';
import getAgencyVisits from '@salesforce/apex/INS_AgencyVisitsController.getAgencyVisits';
 
export default class Ins_agencyVisitsCmp extends LightningElement {
    @track visitsData = [];
    @track visitsCompletedValue;
    @track visitsRemainingValue;
    @track visitsToday = [];
    @track visitsTomorrow = [];

    @track showVisitsToday = false;
    @track showVisitsTomorrow = false;

    connectedCallback() {
        this.retrieveAgencyVisits();
    }

    toggleSection(event) {
        let currentTarget = event.currentTarget;
        let sectionName = currentTarget.dataset.section;

        this.template.querySelector("." + sectionName).classList.toggle("slds-is-open");
    }

    retrieveAgencyVisits() {
        getAgencyVisits({
            daysAgo: 90
        })
        .then(result => {
            let JSONresult = JSON.parse(result);
            console.log(JSONresult);

            this.visitsData = JSONresult;
            this.firstName = JSONresult.firstName;
            this.visitsCompletedValue = JSONresult.totalVisits > 0 ? (JSONresult.completedVisits / JSONresult.totalVisits) * 100 : 0;
            this.visitsRemainingValue = JSONresult.totalVisits > 0 ? (JSONresult.remaningVisits / JSONresult.totalVisits) * 100 : 0;
            this.visitsToday = JSONresult.visitsToday;
            this.visitsTomorrow = JSONresult.visitsTomorrow;

            if(this.visitsToday.length > 0) {
                this.showVisitsToday = true;
            }
            if(this.visitsTomorrow.length > 0) {
                this.showVisitsTomorrow = true;
            }
        })
        .catch(error => {
            console.log("Retrieve Visits Error: ", error);
        });
    }
}