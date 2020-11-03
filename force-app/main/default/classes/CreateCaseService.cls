@RestResource(urlMapping='/Cases/*')
global with sharing class CreateCaseService 
{
    @HttpPost
    global static ID createCase(String accId, String Descr)
    {
        
        String description = 'The following fields are missing from the related account:\n' + Descr;

        Case c = new Case(Subject= 'Account Missing Fields',
                          Description= description,
                          AccountId= accId,
                          Status= 'New');

        insert c;
        return c.Id;

    }
}