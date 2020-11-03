@isTest
public class TestGrabBigFin {
    
    @isTest static void testSample(){
        Id sampleId = 'a4l0b000000UPeQAAW';
        List<Financial_Account_Transaction__b> myList = GrabBigFinTransactions.getBigTransactions(sampleId);
        System.assertEquals(myList.size(), 0);
        
        Datetime myDate = GrabBigFinTransactions.getLatestTimeStamp(sampleId);
        System.assertEquals(myDate, null);
        
        Datetime myExampleTime = DateTime.newInstance(2018, 12, 7, 7, 57, 6);
        List<Financial_Account_Transaction__b> myListNext = GrabBigFinTransactions.getBigNext(sampleId, myExampleTime);
        System.assertEquals(myListNext.size(), 0);        
        
        Datetime myListNextTimestamp = GrabBigFinTransactions.getNextLatestTimestamp(sampleId, myExampleTime);
        System.assertEquals(myListNextTimestamp, null);   
        
        Datetime myExampleTime1 = DateTime.newInstance(2018, 12, 7, 7, 57, 8);
        Datetime myExampleTime2 = DateTime.newInstance(2018, 12, 7, 7, 57, 9);
        List<Datetime> myDateList = new List<Datetime>();
        myDateList.add(myExampleTime);
        myDateList.add(myExampleTime1);
        
        List<Datetime> myNewDateList = GrabBigFinTransactions.addToDateTimeList(myExampleTime2, myDateList);
        System.assertEquals(myNewDateList.size(), 3); 
        
        List<Financial_Account_Transaction__b> myListPrior = GrabBigFinTransactions.getBigPrior(sampleId, myExampleTime);
        System.assertEquals(myListPrior.size(), 0);
        
        List<String> myStrings = new List<String>();
        myStrings.add('a');
        
        PopulateMe.getSetup(sampleId, 5.54, myStrings);
        System.assertEquals(myStrings.size(), 1);
        
        //These are initial tests that cover code coverage (>75%) for example purposes
        //More tests are encouraged depending on the implementation of it
        
    }
    
}