import {LightningElement, track} from 'lwc';
import cardImage from '@salesforce/resourceUrl/cardImage';

export default class InsideViewCard extends LightningElement{
    @track cardImageURL = cardImage;


    navigateToApp(){
        let detail = {};
        const navigateToAppEvent = new CustomEvent('navigatetoappevent', {
            detail: detail,
            bubbles: false,
            composed: false
        });
        this.dispatchEvent(navigateToAppEvent);
    }
}