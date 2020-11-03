global class GetAccountActions extends DataSource.Connection {    
    
    //These are common attributes to each external object
    private final String EXTERNAL_SRC_BASEURL = 'https://anypoint.mulesoft.com';
    private final String COL_XID = 'XID';
    private final String COL_EXTID = 'EXTID';
    private final String COL_STATUS = 'Status';
    private final String COL_DESCRIPTION = 'Description';
    private final String COL_FLAG = 'Flag';
    private final String COL_HEADER_DISPLAYURL = 'DisplayUrl';
    private final String COL_HEADER_EXTERNAL_ID = 'ExternalId'; 
    private final String COL_EXT_HEADER_EXTERNAL_ID = 'ExternalId'; 
    
    //These are specific to each ancillary external object
    //Account Actions
    private String EXTERNAL_ACCOUNT_ACTIONS = 'https://anypoint.mulesoft.com/mocking/api/v1/links/0d10c329-762d-470a-ba3c-6bd7ab516e79/accountactions';
	private final String COL_DETAILS = 'Details';
    private final String COL_INFLOW = 'Inflow';
    private final String COL_POTENTIALFRAUD = 'PotentialFraud';
    private final String COL_BACKENDID = 'BackendID';
    
    private DataSource.ConnectionParams conParam ;
    
    //Constructor
    global GetAccountActions(DataSource.ConnectionParams connectionParams){    
        conParam = connectionParams; 
    }    
    
    /**
* Abstract Methos sync() must be implemented as part of DataSource.Connection class
* This methos would define Schema of External Object
* 
* NOTE : ExternalId and DisplayURL are manadatory column
* */
    override global List<DataSource.Table> sync() {  
        List<DataSource.Table> tables = new List<DataSource.Table>();
        
        //For Account Actions
        List<DataSource.Column> columnsAccountActions = new List<DataSource.Column>();
        columnsAccountActions.add(DataSource.Column.text(COL_XID, 6));
        columnsAccountActions.add(DataSource.Column.text(COL_EXTID, 10));
        columnsAccountActions.add(DataSource.Column.text(COL_STATUS, 50));
        columnsAccountActions.add(DataSource.Column.text(COL_DESCRIPTION, 50));
        columnsAccountActions.add(DataSource.Column.text(COL_FLAG, 50));
        columnsAccountActions.add(DataSource.Column.text(COL_DETAILS, 50));
        columnsAccountActions.add(DataSource.Column.text(COL_INFLOW, 50));
        columnsAccountActions.add(DataSource.Column.text(COL_POTENTIALFRAUD, 50));
        columnsAccountActions.add(DataSource.Column.text(COL_BACKENDID, 50));
        columnsAccountActions.add(DataSource.Column.text(COL_EXT_HEADER_EXTERNAL_ID, 6));        
        
        columnsAccountActions.add(DataSource.Column.url(COL_HEADER_DISPLAYURL));
        
        tables.add(DataSource.Table.get('Account Actions', COL_EXT_HEADER_EXTERNAL_ID, columnsAccountActions)); 
       
        //Return tables
        return tables;
    }
    
        /**
        * This method is called everytime when SOQL is issued against external Object
        * or while using list view or viewing detail page.
        * 
        * Note : Ideally searching should be done at server side however for sake of 
        * simplicity, we would be using "DataSource.QueryUtils" class provided by
        * Salesforce. In this case, filtering and sorting would be done in Salesforce
        * once response returned by external REST API
        * */
    override global DataSource.TableResult query( DataSource.QueryContext context) {
        if (context.tableSelection.columnsSelected.size() == 1 && context.tableSelection.columnsSelected.get(0).aggregation == DataSource.QueryAggregation.COUNT) {
            List<Map<String,Object>> rows = getRows( );
            List<Map<String,Object>> response = DataSource.QueryUtils.filter(context, getRows( ));
            List<Map<String, Object>> countResponse = new List<Map<String, Object>>();
            Map<String, Object> countRow = new Map<String, Object>();
            countRow.put( context.tableSelection.columnsSelected.get(0).columnName, response.size());
            countResponse.add(countRow);
            return DataSource.TableResult.get(context, countResponse);
        } else {
            List<Map<String,Object>> filteredRows =  DataSource.QueryUtils.filter(context, getRows( ));
            List<Map<String,Object>> sortedRows = DataSource.QueryUtils.sort(context, filteredRows);
            List<Map<String,Object>> limitedRows = DataSource.QueryUtils.applyLimitAndOffset(context, sortedRows);
            return DataSource.TableResult.get(context, limitedRows);
        }
    }
    
	/**
    * Make REST callout to external system and parse the result in required format
    * */
    private List<Map<String,Object>> getRows( ){
        
        List<Map<String, Object>> lstReturnDataset =  new List<Map<String, Object>>();       
        
        //--------------------------------------- Account Actions ---------------------------------------
       
        HttpResponse resAccountActions = CalloutResponder.makeCall(EXTERNAL_ACCOUNT_ACTIONS);
        Map<String, Object> json_respAccountActions = ( Map<String, Object>)JSON.deserializeUntyped(resAccountActions.getBody());
        List<Object> extAccountActions = (List<Object>)json_respAccountActions.get('info');
        
        for(Object myExtAccountAction : extAccountActions){
            Map<String, Object> myExtAccountActionMap = (Map<String, Object>) myExtAccountAction;
            Map<String, Object> curRowAccountAction = new Map<String, Object>();
            curRowAccountAction.put(COL_XID, myExtAccountActionMap.get(COL_XID));
            curRowAccountAction.put(COL_EXTID, myExtAccountActionMap.get(COL_EXTID));
            curRowAccountAction.put(COL_STATUS, myExtAccountActionMap.get(COL_STATUS));
            curRowAccountAction.put(COL_DESCRIPTION, myExtAccountActionMap.get(COL_DESCRIPTION));
            curRowAccountAction.put(COL_FLAG, myExtAccountActionMap.get(COL_FLAG));
            curRowAccountAction.put(COL_DETAILS, myExtAccountActionMap.get(COL_DETAILS));
            curRowAccountAction.put(COL_INFLOW, myExtAccountActionMap.get(COL_INFLOW));
            curRowAccountAction.put(COL_POTENTIALFRAUD, myExtAccountActionMap.get(COL_POTENTIALFRAUD));
            curRowAccountAction.put(COL_BACKENDID, myExtAccountActionMap.get(COL_BACKENDID));
            curRowAccountAction.put(COL_HEADER_DISPLAYURL, myExtAccountActionMap.get(COL_HEADER_DISPLAYURL)); 
            curRowAccountAction.put(COL_HEADER_EXTERNAL_ID, myExtAccountActionMap.get(COL_HEADER_EXTERNAL_ID)); 
            
            lstReturnDataset.add(curRowAccountAction);
        }
        
        return lstReturnDataset;
    } 
    
}