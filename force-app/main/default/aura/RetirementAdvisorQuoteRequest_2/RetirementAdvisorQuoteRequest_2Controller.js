({
    handleClick: function(cmp, evt) {
        console.log('here');
        
        if(document.getElementById('div2').style.display == 'block'){
            document.getElementById('div2').style.display = 'none';  

        } else {
            document.getElementById('div2').style.display = 'block';            

        }
        
    },
    
    handleClick2: function(cmp, evt) {
        console.log('here');
        
        if(document.getElementById('div3').style.display == 'block'){
            document.getElementById('div3').style.display = 'none';  

        } else {
            document.getElementById('div3').style.display = 'block';  
            
            
        }
        
    }
})