import { LightningElement, track } from 'lwc';
import parsePdf from '@salesforce/apex/PDFcoController.parsePdfFromBase64';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class DataExtractionFromPdfUsingDocParser extends LightningElement {
    @track isLoading = false;
    @track parsedResult;
    @track parsedFields; // holds array of fields
    @track errorMsg;
    handleFileChange(event) {

        const file = event.target.files[0];


        console.log('File selected:', file.name, 'Size:', file.size, 'Type:', file.type);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                console.log('reading file')
                const base64 = reader.result.split(',')[1];
                console.log('fine') // Get Base64 without prefix
                this.isLoading = true;
                parsePdf({ base64Pdf: base64, fileName: file.name })
                    .then(result => {

                        console.log(result);

                        if (result.includes('HTTP error during parse')) {
                            console.log("String contains a dot.");
                            this.showToast('Error', result, 'error');
                        }
                        else {
                            this.parsedFields = result;
                            const cleanedResult = result.replace(/^\uFEFF/, ''); // Remove BOM
                            const parsed = JSON.parse(cleanedResult);
                            console.log('Parsed:', parsed);

                            if (parsed.objects && Array.isArray(parsed.objects)) {
                                this.parsedFields = parsed.objects;
                                this.errorMsg = null;
                            } else {
                                this.parsedFields = [];
                                this.errorMsg = 'No objects found in parsed result.';
                            }
                            this.errorMsg = null;
                        }

                    })
                    .catch(error => {
                        console.log(error);

                        this.errorMsg = 'Error: ' + (error.body ? error.body.message : error.message);
                        this.showToast('Error', this.errorMsg, 'error');

                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            };
            reader.readAsDataURL(file);
        }
    }
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}
