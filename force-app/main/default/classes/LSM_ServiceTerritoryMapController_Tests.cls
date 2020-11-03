@isTest
public class LSM_ServiceTerritoryMapController_Tests {

    @istest static void testTerritories() {
        
        OperatingHours oh = new OperatingHours();
        oh.Name = 'Test Hours';
        insert(oh);
        
        ServiceTerritory st = new ServiceTerritory();
        st.Name = 'Test Territory';
        st.OperatingHoursId = oh.Id;
        st.Street = '100 Test Test';
        st.City = 'Testerville';
        st.PostalCode = '1111';
        st.Country = 'AU';
        st.IsActive = TRUE;
        insert(st);
        
        WorkTypeGroup wtg = new WorkTypeGroup();
        wtg.Name = 'Test WorkTypeGroup';
        insert(wtg);
        
        WorkType wt = new WorkType();
        wt.Name = 'Test WorkType';
        wt.EstimatedDuration = 30;
        insert(wt);
        
        WorkTypeGroupMember wtgm = new WorkTypeGroupMember();
        wtgm.WorkTypeId = wt.Id;
        wtgm.WorkTypeGroupId = wtg.Id;
        insert(wtgm);
        
        ServiceTerritoryWorkType stwt = new ServiceTerritoryWorkType();
        stwt.ServiceTerritoryId = st.Id;
        stwt.WorkTypeId = wt.Id;
        insert(stwt);
        
        LSM_Settings__c settings = new LSM_Settings__c();
        settings.Name = 'LSM Test Settings';
        settings.Maps_API_Key__c = 'test123';
        settings.Places_API_Key__c = 'test321';
        insert(settings);

        LSM_GooglePlaces_TestMock mock = new LSM_GooglePlaces_TestMock();
        Test.setMock(HttpCalloutMock.class, mock);
        
        
        test.startTest();
        
        LSM_ServiceTerritoryMapController controller = new LSM_ServiceTerritoryMapController();
        System.assertEquals('test123', controller.mapsKey);
        
        String suggestions = LSM_ServiceTerritoryMapController.getSuggestions('test','apikey','options');
        System.assertEquals('{"test":"ok"}',suggestions);

        String details = LSM_ServiceTerritoryMapController.getPlaceDetails('test','apikey');
        System.assertEquals('{"test":"ok"}',details);

        List<ServiceTerritory> sts1 = LSM_ServiceTerritoryMapController.getAllTerritories(wtg.Id, wt.Id, null, null);
        System.assertEquals(1, sts1.size());
        System.assertEquals(st.Id, sts1[0].Id);

        List<ServiceTerritory> sts2 = LSM_ServiceTerritoryMapController.getAllTerritories(wtg.Id, null, null, null);
        System.assertEquals(1, sts2.size());
        System.assertEquals(st.Id, sts2[0].Id);
        
        List<ServiceTerritory> sts3 = LSM_ServiceTerritoryMapController.getSortedTerritories(wtg.Id, wt.Id, 0, 'km', 0, 0);
        System.assertEquals(0, sts3.size());

        List<ServiceTerritory> sts4 = LSM_ServiceTerritoryMapController.getSortedTerritories(wtg.Id, null, 0, 'km', 0, 0);
        System.assertEquals(0, sts4.size());
        

        test.stopTest();

    }
  
}