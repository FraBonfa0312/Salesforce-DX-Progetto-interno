<aura:application>
    <aura:attribute name="state" type="String" default="inactive" />
    <aura:attribute name="iconUrl" type="String" default="" />
    <aura:attribute name="icon" type="String" default="Guidewire" />

    <aura:handler name="init" value="{!this}" action="{!c.doInit}" />


    <lightning:layout horizontalAlign="spread" class="slds-p-top_x-large">

        <div class="slds-p-top_x-large">
            <img src="{!v.iconUrl}" class="mule logo" />
        </div>


        <div class="{!v.state == 'inactive' ? 'slds-show' : 'slds-hide' }">
            <img src="https://general-demo-content-gif-storage.s3.amazonaws.com/ezgif.com-crop+(1).gif"
                class="gifClass" />
        </div>

        <div class="slds-p-top_large">
            <a><img src="/resource/SalesforceLogo" class="logo" onclick="{!c.handleCloseCurrentTab}" /></a>
        </div>


    </lightning:layout>

</aura:application>