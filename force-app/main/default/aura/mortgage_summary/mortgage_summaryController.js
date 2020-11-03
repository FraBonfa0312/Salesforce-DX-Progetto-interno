({
    handleChange: function(cmp, evt, helper) {
        let figure = cmp.get('v.totalLoan'),
            p1 = cmp.get('v.payement1'),
            p2 = cmp.get('v.payement2'),
            p3 = cmp.get('v.payement3'),
            equationNum = cmp.get('v.equationNum');
        
        let diff = figure - equationNum;
        p1 = 7600 + Math.floor(p1+diff/5);
        p2 = 9000 + Math.floor(p2+diff/7);
        p3 = 3600 + Math.floor(p3+diff/10);
        
        cmp.set('v.payement1',p1);
        cmp.set('v.payement2',p2);
        cmp.set('v.payement3',p3);
        
        
        
        if(figure >= equationNum){
            let cmpDiv1 = cmp.find('pig');
            let cmpDiv2 = cmp.find('house');
            $A.util.removeClass(cmpDiv1, 'pgreen');
            $A.util.removeClass(cmpDiv2, 'hgrey');
            $A.util.addClass(cmpDiv1, 'pgrey');
            $A.util.addClass(cmpDiv2, 'hgreen');
            
        }else{
            let cmpDiv1 = cmp.find('pig');
            let cmpDiv2 = cmp.find('house');
            $A.util.removeClass(cmpDiv1, 'pgrey');
            $A.util.removeClass(cmpDiv2, 'hgreen');
            $A.util.addClass(cmpDiv1, 'pgreen');
            $A.util.addClass(cmpDiv2, 'hgrey');
        }
        
    },
})