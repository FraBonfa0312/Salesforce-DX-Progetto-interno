({
    doInit: function (component, event, helper) {
        var icon = component.get("v.icon");
        if (icon == "Mulesoft") {
            component.set("v.iconUrl", "https://sfdc-demo-images-jake.s3.amazonaws.com/MuleSoft_logo_299C.png");
        } else if (icon == "Guidewire") {
            component.set("v.iconUrl", "https://sfdc-demo-images-jake.s3.amazonaws.com/guidewire_logo_new_2color_h_screen.jpg");
        }
    },

    handleCloseCurrentTab: function (component, event, helper) {
        window.close();
    }
})