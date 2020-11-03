import { LightningElement, api } from 'lwc';
import { RecordFieldDataType } from 'lightning/uiRecordApi';

export default class OclLoanDetails extends LightningElement {
    @api recordid;
}