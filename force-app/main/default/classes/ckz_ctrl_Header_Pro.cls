/**
 * Created by brandon.rogers on 4/14/20.
 */

global with sharing class ckz_ctrl_Header_Pro {
    global String userInfoJSON { get; set; }

    global ckz_ctrl_Header_Pro() {
        getUserInfo();
    }

    global void getUserInfo() {
        ccrz.ccLog.log('ckz_ctrl_Header_Pro:getUserInfo');

        User u = ccrz.cc_CallContext.currUser;
        ccrz.ccLog.log('ckz_ctrl_Header_Pro:getUserInfo:User: ' + u);

        List<User> userInfo = [
                SELECT Id,
                        FullPhotoUrl
                FROM User
                WHERE Id = :u.Id
        ];

        userInfoJSON = JSON.serialize(userInfo);
        ccrz.ccLog.log('ckz_ctrl_Header_Pro:getUserInfo:userInfoJSON: ' + userInfoJSON);
    }
}