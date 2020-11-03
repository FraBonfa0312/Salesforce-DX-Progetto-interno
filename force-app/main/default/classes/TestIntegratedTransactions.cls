@isTest
public class TestIntegratedTransactions {
    
    @isTest static void testSample(){               
        
        Id sampleId = 'a4l0b000000UPeQAAW';
        List<Transaction__b> myList = GetIntegratedTransactions.getBigTransactions(sampleId);
        System.assertEquals(myList.size(), 0);
        GetIntegratedTransactions.deleteCurrent(sampleId);
        
        Datetime myDate = GetIntegratedTransactions.getLatestTimeStamp(sampleId);
        System.assertEquals(myDate, null);
        
        Datetime myExampleTime = DateTime.newInstance(2018, 12, 7, 7, 57, 6);
        List<Transaction__b> myListNext = GetIntegratedTransactions.getBigNext(sampleId, myExampleTime);
        System.assertEquals(myListNext.size(), 0);        
        
        Datetime myListNextTimestamp = GetIntegratedTransactions.getNextLatestTimestamp(sampleId, myExampleTime);
        System.assertEquals(myListNextTimestamp, null);   
        
        Datetime myExampleTime1 = DateTime.newInstance(2018, 12, 7, 7, 57, 8);
        Datetime myExampleTime2 = DateTime.newInstance(2018, 12, 7, 7, 57, 9);
        List<Datetime> myDateList = new List<Datetime>();
        myDateList.add(myExampleTime);
        myDateList.add(myExampleTime1);
        
        List<Datetime> myNewDateList = GetIntegratedTransactions.addToDateTimeList(myExampleTime2, myDateList);
        System.assertEquals(myNewDateList.size(), 3); 
        
        List<Transaction__b> myListPrior = GetIntegratedTransactions.getBigPrior(sampleId, myExampleTime);
        System.assertEquals(myListPrior.size(), 0);
        
        List<String> myStrings = new List<String>();
        myStrings.add('a');

        GetIntegratedTransactions.populate(sampleId);
		System.assertEquals(myList.size(), 0);
        
        List<Account_Actions__x> myAccActionsOther = GetIntegratedTransactions.myExtAccountActionsOther();
        System.assertEquals(myAccActionsOther.size(), 0);
        
        List<Account_Actions__x> myAccActionsOtherInfo = GetIntegratedTransactions.myExtAccountActionsOtherInfo();
        System.assertEquals(myAccActionsOtherInfo.size(), 0);
        
        List<Account_Actions__x> myAccActionsOtherInfo1 = GetIntegratedTransactions.myExtAccountActionsOtherInfo1();
        System.assertEquals(myAccActionsOtherInfo.size(), 0);
        
        List<Account_Actions__x> myAccActionsOtherInfo2 = GetIntegratedTransactions.myExtAccountActionsOtherInfo2();
        System.assertEquals(myAccActionsOtherInfo.size(), 0);
        
        List<Account_Actions__x> myAccActionsOtherInfo3 = GetIntegratedTransactions.myExtAccountActionsOtherInfo3();
        System.assertEquals(myAccActionsOtherInfo.size(), 0);
        
        List<Account_Actions__x> myAccActionsOtherInfo4 = GetIntegratedTransactions.myExtAccountActionsOtherInfo4();
        System.assertEquals(myAccActionsOtherInfo.size(), 0);
        
        List<Account_Actions__x> myAccActionsOtherInfo5 = GetIntegratedTransactions.myExtAccountActionsOtherInfo5();
        System.assertEquals(myAccActionsOtherInfo.size(), 0);
        
        List<Account_Actions__x> myAccActionsOtherInfo6 = GetIntegratedTransactions.myExtAccountActionsOtherInfo6();
        System.assertEquals(myAccActionsOtherInfo.size(), 0);
        
        List<Account_Actions__x> myAccActionsOtherInfo7 = GetIntegratedTransactions.myExtAccountActionsOtherInfo7();
        System.assertEquals(myAccActionsOtherInfo.size(), 0);
        
        List<Account_Actions__x> myAccActionsOtherInfo8 = GetIntegratedTransactions.myExtAccountActionsOtherInfo8();
        System.assertEquals(myAccActionsOtherInfo.size(), 0);
        
        List<Account_Actions__x> myAccActions = GetIntegratedTransactions.myExtAccountActions();
        System.assertEquals(myAccActions.size(), 0);
        
        List<Transactions__x> myTransactions = GetIntegratedTransactions.myExtTransactions();
        System.assertEquals(myTransactions.size(), 0);
        
        List<Claims_ext__x> myClaims = GetIntegratedTransactions.myExtClaims();
        System.assertEquals(myClaims.size(), 0);
        
        //Boolean discoveryResult = GetIntegratedTransactions.isOutOfBand('Pending');
        //System.assertEquals(discoveryResult, TRUE);
        //GetIntegratedTransactions.isOutOfBand('Pending');

        //This is fine - can always provide more test coverage with mocks/etc if desired
    }
    
}