import { LightningElement, api, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import USER_ID from '@salesforce/user/Id';
import FNAME_FIELD from '@salesforce/schema/User.FirstName';

export default class INS_LWCIndependentDistributionHomeHeader extends LightningElement {
    @api title;
    @api message;
    @api link_text;
    @api modal_icon;
    @api modal_title;
    @api modal_subtitle;

    @track name;
    @track showModal = false;

    @wire(getRecord, { recordId: USER_ID, fields: [FNAME_FIELD] })
    wireuser({
        error,
        data
    }) { 
        if(error) {
            console.log(error);
        }
        else if(data) {
            this.name = data.fields.FirstName.value;
        }
    }
    
    connectedCallback() {
        
    }

    get date_today() {
        let today = new Date();
        return today;
    }

    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }
}