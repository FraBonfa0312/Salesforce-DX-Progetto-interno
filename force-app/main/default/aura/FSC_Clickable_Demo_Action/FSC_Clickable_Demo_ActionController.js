({
    PS_init : function(component, event, helper) {
        var recordId = component.get("v.recordId");
        var delay=3000; //4 seconds
		setTimeout(function() {
			var innerModals = document.getElementsByClassName("fsc_inner_modal");
            for(var i = 0; i < innerModals.length; i++) {
                innerModals[i].style.display = "none";
            }
            document.getElementById("demo" + recordId).style.display = "block";
		}, delay);
    },

	clickAdd: function(component, event, helper) {
        var recordId = component.get("v.recordId");
		var delay=3000; //4 seconds
		setTimeout(function() {
            console.log('/one/one.app#/n/New_Bank_Account?oppId=' + recordId);
			window.location.href = '/one/one.app#/n/New_Bank_Account?oppId=' + recordId;
		}, delay);
	},

	tagLine: function(component, event, helper) {

		var random = function (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};
		var qu = random(1, 7);
		var slogan;

		switch (qu) {
			case 1:
				slogan = "&quot;Do what you love.&quot;";
				break;
			case 2:
				slogan = "&quot;Enjoy the little things.&quot;";
				break;
			case 3:
				slogan = "&quot;The secret of getting ahead is getting started.&quot;";
				break;
			case 4:
				slogan = "&quot;It's a beautiful day to plant a seed.&quot;";
				break;
            case 5:
                slogan = "&quot;Make someone's day.&quot;";
                break;
            case 6:
                slogan = "&quot;Big things have small beginnings.&quot;";
                break;
            case 7:
                slogan = "&quot;Today is your day.&quot;";
                break;
			default:
				slogan = "&quot;Hustle in comfort!&quot;";
		}
		document.getElementById("tagline").innerHTML = slogan;
	}

})