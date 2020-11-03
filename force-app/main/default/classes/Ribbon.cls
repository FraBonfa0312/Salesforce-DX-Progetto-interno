public class Ribbon {
    	@AuraEnabled
    	public static Map<String,String> getTipos(string sObjectName, string field1, string field2, string field3, string field4, string field5, string field6, string field7)
        {
         	Map<String,String> res = new Map<String,String>();
            List<String> fields = new List<String> {field1, field2,field3,field4,field5,field6,field7};
            
        	Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        	Schema.SObjectType leadSchema = schemaMap.get(sObjectName);
        	Map<String, Schema.SObjectField> fieldMap = leadSchema.getDescribe().fields.getMap();
            
            for (String field : fields) {
                 if ((field != null)&&(field !='')) {
                     Try { 
                       res.put(field,getType(fieldMap.get(field).getDescribe().getType()));
                       res.put(field.toLowerCase(),getType(fieldMap.get(field).getDescribe().getType()));
                     }
                     Catch (Exception e) {
                         System.debug('Error in field '+field+': '+e);
                         res.put(field,'error');
                         res.put(field.toLowerCase(),'error');
                     }

                 }
            }
 			return(res);      
        }
 		@AuraEnabled
    	public static Map<String,Object> getValores(string recordId, Map<String,String> tipos, string sObjectName, 
                                                     string field1, string field2, string field3, string field4, string field5, string field6, string field7)
        {
            system.debug('Sacando datos del objeto: '+sObjectName);
            
			List<String> ori_fields = new List<String> {field1, field2,field3,field4,field5,field6,field7};
 			List<String> fields = Clean (ori_fields);
   
            
           
        	string soql = 'select ';
            for (String field : fields ){
                if (tipos.get(field)!='error') {
		            soql += queryField(field);
                }
            }        
            soql +=' ID from ' + SobjectName + ' where id = \'' + recordId + '\'';
            

                Map<String,Object> resultado = new Map<String,Object> ();
                system.debug(soql);
            try {
            	list<sobject> records = Database.query(soql);
            
            for (String field : ori_fields ){
                if (tipos.get(field)!='error'&&field!=''&&field!=null) {
                	System.debug('Valor de '+field+' es: '+records[0].get(field.toLowerCase()));
                	resultado.put(field,records[0].get(field.toLowerCase()));
                }
            }
            
                }
            catch (Exception e) {
                system.debug('Error runing SOQL: '+e);
                return null;
            }

                return resultado;
            }
            
    public static String getType(Schema.DisplayType type) {
             if ((type==Schema.DisplayType.ID)||(type==Schema.DisplayType.String)||(type==Schema.DisplayType.Picklist)||(type==Schema.DisplayType.Email)||(type==Schema.DisplayType.Phone)) {
                return 'String';
            } else if ((type==Schema.DisplayType.Double)||(type==Schema.DisplayType.Percent)||(type==Schema.DisplayType.Integer)) {
                return 'Decimal';
            } else if ((type==Schema.DisplayType.Date)||(type==Schema.DisplayType.DateTime)) {
                return 'Date';
            } else if (type==Schema.DisplayType.Currency) {
                return 'Currency';
            } else {
                return null;
            } 
        
    }
    public static String queryField(string field) {
		string resultado = '';
		 if ((field != null)&&(field!='')&&field.toUpperCase()!='ID') {
                resultado = field+', ';
            }        
        return resultado;
    }
    public static List<String> Clean (List<String> l) {
        Set<string> s = new Set<String>();
        List<String> r = new List<String>();
        for (String st : l){
            if (st!=''&& st!=null) {
                s.add(st.toLowerCase());
            }
        }
        r.addAll(s);
        return r;
    }
}