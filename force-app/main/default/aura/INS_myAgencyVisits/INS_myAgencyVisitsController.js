({
    doInit: function (component, event, helper) {
        var today = new Date();
        var monthDigit = today.getMonth() + 1;
        if (monthDigit <= 9) {
            monthDigit = '0' + monthDigit;
        }
        var dayDigit = today.getDate();
        if (dayDigit <= 9) {
            dayDigit = '0' + dayDigit;
        }
        component.set('v.today', today.getFullYear() + "-" + monthDigit + "-" + dayDigit);
        var visits = component.get("v.agencyVisits");
        visits.push(
            {
                Title: 'A1 Insurance',
                healthScore: '71',
                badgeText: 'Annual Planning',
                badgeClass: 'eh',
                image: '',
                trend: 'up',
                Id: '0012X000023dCSnAAE'
            },
            {
                Title: 'Cook and Kocher',
                healthScore: '68',
                badgeText: 'Bus. Review',
                badgeClass: 'bad',
                image: '',
                trend: 'down',
                Id: '0012X000023dCSoAAU'
            },
            {
                Title: 'Global Risk Services',
                healthScore: '82',
                badgeText: 'BoB Analysis',
                badgeClass: 'good',
                image: '',
                trend: 'down',
                Id: '0012X000023dCSpAAE'
            },
            {
                Title: 'Brehmer Agency',
                healthScore: '77',
                badgeText: 'New Location',
                badgeClass: 'eh',
                image: '',
                trend: 'neutral',
                Id: '0012X000023dCSqAAU'
            },
            {
                Title: 'Lang Associates',
                healthScore: '94',
                badgeText: 'Product Enablement',
                badgeClass: 'good',
                image: '',
                trend: 'up',
                Id: '0012X000023dCSmAAA'
            }
        );
        component.set("v.agencyVisits", visits);
    },

    modify: function (component, event, helper) {
        var section = component.find('v.section');
        var state1 = component.get("v.state1");
        // if state1 is open:
        // remove open class from section
        // else
        // add the open class to section
    },

    toggleSection: function (component, event, helper) {
        console.log('toggle');
        var iconName = component.get("v.filterIconName");

        if (iconName == 'utility:chevronright') {
            component.set("v.toggleClass", "slds-is-open")
            component.set("v.filterIconName", "utility:switch");
        }
        else {
            component.set("v.toggleClass", "slds-is-close")
            component.set("v.filterIconName", "utility:chevronright");
        }
    },

    doMapAlert: function (component, event, helper) {
        var mapLink = component.get("v.mapLink");
        var mapHome = component.get("v.mapHome");
        console.log(mapLink);
        if (!mapLink) {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type": "error",
                "title": "Whoops!",
                "message": "You haven't set a route for the day just yet. We'll take you there now."
            });
            toastEvent.fire();
            window.open(mapHome);
        } else {
            window.open(mapLink);
        }
    }

})