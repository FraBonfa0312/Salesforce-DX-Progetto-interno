@isTest (SeeAllData=true)
global class FileControllerTest{
    
    static testMethod void test_saveTheFile_UseCase1(){
        List<ContentVersion> contentversion_Obj  =  [SELECT Id,ContentDocumentId,Title,SharingOption,Origin,ContentLocation,IsMajorVersion,IsAssetEnabled from ContentVersion];
        System.assertEquals(true,contentversion_Obj.size()>0);
        FileController obj01 = new FileController();
        FileController.appendToFile('00P1I000001JL1FUAW', 'test data','test data');
        FileController.saveTheFile('a0n1I000001Lw2EQAS','test data','test data','test data');
        FileController.attachFile('0061I000005JiD8QAK','test data','test data');
        FileController.saveTheChunk('01p90000006uk2w','test data','test data','test data','test data');
        ViewingConditionsController.getAllViewingConditions('0061I000005JiD8QAK');
        ViewingConditionsController.getAllReviewingFees('0061I000005JiD8QAK');
    }
}