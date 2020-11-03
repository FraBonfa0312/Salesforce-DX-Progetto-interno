global with sharing class ckzPOCLogicCartAddTo extends ccrz.ccLogicCartAddTo {

    global override Map<String, Object> concludeAddTo(Map<String, Object> inputData) {

        ccrz.ccLog.log(System.LoggingLevel.INFO, 'ckzPOCLogicCartAddTo', 'begin concludeAddTo');
        System.debug('begin concludeAddTo');

        ccrz.ccLog.log(System.LoggingLevel.INFO, 'ckzPOCLogicCartAddTo', 'inputData: ');
        System.debug('inputData: ');

        ccrz.ccLog.log(System.LoggingLevel.INFO, 'ckzPOCLogicCartAddTo', inputData);
        System.debug(inputData);

        Map<String, String> requestParams = ccrz.cc_CallContext.currPageParameters;

        ccrz__E_CartItem__c currItem = null;

        try {
            if (inputData.containsKey('currItem')) {

                ccrz.ccLog.log(System.LoggingLevel.INFO, 'ckzPOCLogicCartAddTo', 'currItem found');
                currItem = (ccrz__E_CartItem__c) inputData.get('currItem');

                ccrz.ccLog.log(System.LoggingLevel.INFO, 'ckzPOCLogicCartAddTo', 'currItem :' + currItem);

                ccrz.ccLog.log(System.LoggingLevel.INFO, 'ckzPOCLogicCartAddTo', 'currItem :' + JSON.serialize(currItem));

                System.debug('currItem :' + currItem);


            } else {
                ccrz.ccLog.log(System.LoggingLevel.INFO, 'ckzPOCLogicCartAddTo', 'currItem not found');
            }

            String cartItemSfid = (String) currItem.get('Id');

            String cartId = (String) currItem.get('ccrz__Cart__c');

            String storefront = (String) currItem.get('ccrz__StoreID__c');

            String userId = UserInfo.getUserId();

            ccrz.ccLog.log(System.LoggingLevel.INFO, 'ckzPOCLogicCartAddTo', 'Cart Item object Id: ' + cartItemSfid);

            if (currItem != null) {

                // Call API to add item to cart item group
                updateCartItemGroup(userId, storefront);

                ccrz.ccLog.log(System.LoggingLevel.INFO, 'ckzPOCLogicCartAddTo', 'cart item object updated');
            } else {
                ccrz.ccLog.log(System.LoggingLevel.INFO, 'ckzPOCLogicCartAddTo', 'cart item object not found');
            }


        }
        catch (Exception e) {
            ccrz.ccLog.log(System.LoggingLevel.INFO, 'ckzPOCLogicCartAddTo', e.getMessage());
            ccrz.ccLog.log(System.LoggingLevel.INFO, 'ckzPOCLogicCartAddTo', 'Line: ' + e.getLineNumber());
            //throw e;
        }

        ccrz.ccLog.log(System.LoggingLevel.INFO, 'ckzPOCLogicCartAddTo', 'calling super method');

        return super.concludeAddTo(inputData);
    }

    public void updateCartItemGroup(String userId, String storefront) {

        //String storefront = 'DefaultStore';  // Get from Cart obj
        //String userId = '0053i000001u7bAAAQ';  // Get from Cart obj
        String userLocale = 'en_US';
        String currencyCode = 'USD';

        initContext(userId, storefront, userLocale, currencyCode);

        Map<String, Object> cartMap = fetchActiveCart();

        String cartId = (String)cartMap.get('sfid');

        String cartEncryptedId = (String)cartMap.get('encryptedId');

        // Move the new cart item to either the cart item group that already exists, or create a new cart item group and move all items to it.
        initCartItemGroup(cartEncryptedId);

    }

    public void initContext(String userId, String storefront, String userLocale, String currencyCode) {
        ccrz.cc_RemoteActionContext ctx = new ccrz.cc_RemoteActionContext();
        ctx.storefront = storefront;
        ctx.userLocale = userLocale;
        ctx.userIsoCode = currencyCode;
        ctx.portalUserId = userId;

        ccrz.cc_RemoteActionResult result = ccrz.cc_CallContext.init(ctx);
    }

    private Map<String, Object> fetchActiveCart() {

        String sfid = null;

        Map<String, Object> outputFetchData = new Map<String, Object>();

        Map<String, Object> fetchInputData = new Map<String, Object>{
                ccrz.ccAPICart.ACTIVECART => true
                ,ccrz.ccAPI.API_VERSION => ccrz.ccAPI.CURRENT_VERSION
                ,ccrz.ccApi.SIZING => new Map<String, Object>{
                        ccrz.ccAPICart.ENTITYNAME => new Map<String, Object>{
                                ccrz.ccAPI.SZ_DATA => ccrz.ccAPI.SZ_S
                        }
                }
        };

        outputFetchData = ccrz.ccAPICart.getActive(fetchInputData);

        List<Map<String, Object>> cartList = new List<Map<String, Object>>();

        if(outputFetchData.containsKey(ccrz.ccAPICart.CART_OBJLIST)) {
            cartList = (List<Map<String, Object>>)outputFetchData.get(ccrz.ccAPICart.CART_OBJLIST);
        }

        Map<String, Object> cartMap = null;
        if(cartList.size() > 0) {
            cartMap = cartList.get(0);
        }

        return cartMap;

    }

    /*
        Initialize a Cart Item Group.
        All items in the cart will be added to the group.
        The default shipping address is automatically assigned to the group.  This only works if a context is established prior to this call.
        2018-12-03  seems to result in a copy of the default CC Contact Address ship to being created and associated with the cart item group.
     */
    private void initCartItemGroup(String cartEncryptedId) {

        System.debug('---- begin initCartItemGroup');

        Map<String,Object> inputData = new Map<String, Object>{
                ccrz.ccApiCart.CART_ENCID => cartEncryptedId
                ,ccrz.ccApi.API_VERSION => ccrz.ccApi.CURRENT_VERSION
                ,ccrz.ccApi.SIZING => new Map<String, Object>{
                        ccrz.ccApiCart.ENTITYNAME => new Map<String, Object>{
                                ccrz.ccApi.SZ_DATA=>ccrz.ccApi.SZ_L  // Use Large to get cartItemGroup shipTo
                                ,ccrz.ccApi.SZ_REFETCH => true
                        }
                }

        };

        Map<String, Object> outputData = ccrz.ccApiCart.initItemGroups(inputData);

        Boolean isSuccess = (Boolean) outputData.get(ccrz.ccApi.SUCCESS);

        if(isSuccess) {
            System.debug('Cart Item Group created');

            // Get the new cart item group id and put it into the responseMap
            List<Map<String, Object>> cartList = (List<Map<String, Object>>)outputData.get('cartList');

            Map<String, Object> cartMap = cartList.get(0);

            List<Map<String, Object>> cartItemGroupList = (List<Map<String, Object>>)cartMap.get('ECartItemGroupsS');

            Map<String, Object> cartItemGroupMap = cartItemGroupList.get(0);

            String sfid = (String)cartItemGroupMap.get('sfid');
            System.debug('sfid = ' + sfid);

            // 2018-12-03  msobczak: added
            String shipToId = (String)cartItemGroupMap.get('shipTo');

        }
        else {
            throw new CustomException('Cart Item Group not created');
        }

        System.debug('---- end initCartItemGroup');

    }

    public class CustomException extends Exception {}

}