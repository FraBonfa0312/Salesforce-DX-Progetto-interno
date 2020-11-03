({
	afterScriptsLoaded : function(component, event, helper) {
        utility.onPageLoad( function() {
            window[ "lightning-attachment" + component.getGlobalId() ] = new LightningAttachmentUploader();
            var lightning_attachment = window[ "lightning-attachment" + component.getGlobalId() ];
            lightning_attachment.init( {
                id: component.getGlobalId(),
                component: component,
                recordId: component.get( "v.recordId" ) || '',
                dataIconCheck: "",
                dataIconClose: "",
                dataIconLoad: "",
                event: event,
                helper: helper
            });
            lightning_attachment.execute();
        });
	},
    save: function( component, event ){
        if( false ) {
            var lightning_attachment = window[ "lightning-attachment" + component.getGlobalId() ];
            var  MAX_FILE_SIZE = 750000;
            var file_list_el = utility.getElement( ".file-list", "SELECT" );
            event.dataTransfer.dropEffect = 'copy';
            var files = event.dataTransfer.files;
            utility.forEvery( files, function( file ) {
                lightning_attachment.appendDroppedFile( file_list_el, file );
                    
                var reader = new FileReader();
                reader.onloadend = function() {
                    var fileContents = reader.result;
                    var base64Mark = 'base64,';
                    var dataStart = fileContents.indexOf(base64Mark) + base64Mark.length;
                    fileContents = fileContents.substring(dataStart);
                        
                    var parameter = {
                        parentId: component.get( "v.recordId" ),
                        fileName: file.name,
                        base64Data: encodeURIComponent( fileContents ), 
                        contentType: file.type
                    };
                        
                    console.log( "UPLOADING...", file.size, MAX_FILE_SIZE )
                    if (file.size > MAX_FILE_SIZE) {
                        lightning_attachment.uploadFailed( file );
                        utility.log( 'File size cannot exceed ' + MAX_FILE_SIZE + ' bytes.\n Selected file size: ' + file.size, "ERROR" );
                    } else {
                        var action = component.get( "c.saveContent" );
                        action.setParams( parameter );
                        action.setCallback( this, function( response ) {
                            var state = response.getState();
                            if (component.isValid() && state === "SUCCESS") {
                                if(response.getReturnValue() !== null) {
                                    console.log( "Original: " + response.getReturnValue() );
                                    lightning_attachment.uploadSucceeded( file );
                                } else {
                                    console.log( command + " command returned 0 results" );
                                    lightning_attachment.uploadFailed( file );
                                }
                            } else {
                                console.log( command + " exception occured", "error" );
                                console.log( response.getError() );
                                lightning_attachment.uploadFailed( file );
                            }
                        });
                        $A.enqueueAction(action);
                    }
                };
                reader.readAsDataURL(file);
             });
        }
    }
})