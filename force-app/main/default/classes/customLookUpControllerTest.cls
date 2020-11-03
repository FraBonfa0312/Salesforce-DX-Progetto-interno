@isTest(SeeAllData=true)
public class customLookUpControllerTest {

	public static testMethod void doTest() {
		customLookUpController.fetchLookUpValues('Lauren', 'Contact', 'Name');
		customLookUpController.getMySingleObject('Contact', 'Name', '00358000002pMjc');
	}

}