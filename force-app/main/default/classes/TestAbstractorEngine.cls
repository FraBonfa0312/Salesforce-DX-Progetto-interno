@isTest
public class TestAbstractorEngine {

    @isTest static void testSample(){
        
        AbstractorEngine.templateGetter('testrandom9343432');
        Object o = AbstractorEngine.getExternalLabelsCont('testrandom9343432');
        String s = 's';
        Boolean b = true;
        AbstractorEngine.LabelWrapperCont myWrapperCont = new AbstractorEngine.LabelWrapperCont(b);
        AbstractorEngine.LabelWrapper myWrapper = new AbstractorEngine.LabelWrapper(s,s,s,s,s,
                                                                                    s,s,s,s,s,
                                                                                    s,s,s,s,s,
                                                                                    s,s,s,s,s,
                                                                                    s,s,b,b,b,
                                                                                    b,b,b,b,b,
                                                                                    b,b);
        Object o1 = AbstractorEngine.getExternalLabels('testrandom9343432');
        Id sampleID = '001f4000002u3VNAAY';
        List<Temp_Memory_Object__c> myList = AbstractorEngine.getExternalData(sampleID, s, 'testrandom9343432', s, s, s, s, s, s);
        System.assertEquals(myList.size(), 0);
        Map<Integer,String> mapExample1 = AbstractorEngine.getTemplateColumns('testrandom9343432');

    }
    
}