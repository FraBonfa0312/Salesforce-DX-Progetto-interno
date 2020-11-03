import { NavigationMixin } from 'lightning/navigation';
import BaseChatMessage from 'lightningsnapin/baseChatMessage';
import { LightningElement, track, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const CHAT_CONTENT_CLASS = 'chat-content';
const AGENT_USER_TYPE = 'agent';
const CHASITOR_USER_TYPE = 'chasitor';
const SUPPORTED_USER_TYPES = [AGENT_USER_TYPE, CHASITOR_USER_TYPE];

const FIELDS = [
    'Contact.Name',
    'Contact.Title',
    'Contact.Phone',
    'Contact.Email',
];

/**
 * Displays a chat message using the inherited api messageContent and is styled based on the inherited api userType and messageContent api objects passed in from BaseChatMessage.
 */
//export default class CustomChatMessage extends BaseChatMessage {
export default class CustomChatMessage extends NavigationMixin(BaseChatMessage) {
    @wire(getRecord, { recordId: '0032X00002QUZMHQAU', fields: FIELDS }) contact;

    @track text = '';
    @track SuccessMsg='';
    @track messageStyle='';
    @track disabled = false;
    @track fileUploaded = false;

    @track recordPageUrl;

    @track lwcFound = false;
    @track lwcValue ='';
    @track lwcUpload = false;
    @track lwcImageUrl = false;
    @track lwcMap = false;

    @track mapMarkers = [];

    get acceptedFormats() {
        return ['.pdf', '.jpg','.mov','.mp4','.png','.jpeg','.pptx','.docx','.mp3','.wav','.gif'];
    }

    isSupportedUserType(userType) {
        return SUPPORTED_USER_TYPES.some((supportedUserType) => supportedUserType === userType);
    }

    connectedCallback() {
        // console.log(this.contact.data.fields.Name.value);

        if (this.isSupportedUserType(this.userType)) {
            let message = this.messageContent.value;
            // console.log("MessageContent", message);
            // console.log("MessageContentType", this.messageContent.type);
            this.messageStyle = CHAT_CONTENT_CLASS + ' ' + this.userType;

            let res = message;

            if(res.toLowerCase().startsWith('lwc-')) {
                this.lwcFound = true; // Flag that lwc detected to not display the standard message
                res = message.slice(4); // Remove the beginning 'lwc-' string

                if(res.toLowerCase().startsWith('upload')) {
                    this.lwcValue = res.substring(res.indexOf(':')+1);
                    this.lwcUpload = true;
                    
                }
                else if(res.toLowerCase().startsWith('imageurl')) {
                    this.lwcValue = res.substring(res.indexOf(':')+1).replace(/<\/?a[^>]*>/g, "");
                    
                    this.lwcImageUrl = true;
                }
                else if(res.toLowerCase().startsWith('map')) {
                    let mapStringComponents = res.substring(res.indexOf(':')+1);
                    // Map Components => Street|City|State|PostalCode|Country
                    let mapComponents = mapStringComponents.split("|");

                    this.mapMarkers = [
                        {
                            location: {
                                Street      : mapComponents[0],
                                City        : mapComponents[1],
                                State       : mapComponents[2],
                                PostalCode  : mapComponents[3],
                                Country     : mapComponents[4]
                            },
                            title: 'Home Address',
                            // description:
                            //     'Landmark, historic home & office of the United States president, with tours for visitors.',
                        },
                    ];
                    this.lwcMap = true;
                }
                else if (res.toLowerCase().startsWith('redirecttoid')) {
                    let recordId = res.substring(res.indexOf(':')+1);

                    this[NavigationMixin.Navigate]({
                        type: 'standard__recordPage',
                        attributes: {
                            recordId: recordId,
                            actionName: 'view',
                        },
                    });
                }
                else {
                    console.log("lwc- found\nNo matching function\nMessage: " + res);
                }
            }
            else {
                this.text = '<div style="line-height: 1.3">' + message + '</div>';
            }


           /* this.text = element.innerText.replace(
                /([/|.|\w|\s|-])*\.(?:jpg|gif|png|bmp|recId)/g,
                function() {
                    //let values=recordData.split(":");
                    //let recordId=values[1];
                    // Returning a blank string here removes the link.
                    // Here's an example of swapping with a linkified "Image Link":
                   
                    this.condition=true;
                     return "Image Upload";
                    //return "";
            });*/

        } else {
            throw new Error(`Unsupported user type passed in: ${this.userType}`);
        }
    }
    handleUploadFinished(event) {
        // Get the list of uploaded files
        //const uploadedFiles = event.detail.files;
        this.SuccessMsg="Successfully uploaded file";
        // this.disabled = true;
        this.fileUploaded = true;
    }
}