public class cQuoteModel {
	public SBQQ__Quote__c record;
	public cQuoteLineModel[] lineItems;
	public cQuoteLineGroupModel[] lineItemGroups;
	public Integer nextKey;
	public Boolean applyAdditionalDiscountLast;
	public Boolean applyPartnerDiscountFirst;
	public Boolean channelDiscountsOffList;
	public Decimal customerTotal;
	public Decimal netTotal;
	public Decimal netNonSegmentTotal;
}