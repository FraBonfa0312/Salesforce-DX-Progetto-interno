import { LightningElement, api, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
 
export default class Ins_TileAnythingCmp extends NavigationMixin(LightningElement) {
    @api record;

    connectedCallback() {
        
    }

    navToRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.record.AccountId,
                actionName: 'view',
            },
        }).then(url => {
            this.recordPageUrl = url;
        });
    }
}