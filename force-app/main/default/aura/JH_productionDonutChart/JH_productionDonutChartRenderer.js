({
  render: function(component, helper) {
    //grab attributes from the component markup
    var percentage = component.get("v.percentage");
    var circlePercentage = (percentage > 100) ? 100 : percentage;  
    var size = component.get("v.size");
    var color = component.get("v.color");

    //return an svg element w/ the attributes
  
    var svgns = "http://www.w3.org/2000/svg";
    var chart = document.createElementNS(svgns, "svg:svg");
    chart.setAttribute("width", size);
    chart.setAttribute("height", size);
    chart.setAttribute("viewBox", "0 0 " + size + " " + size);
    // Background circle
    var back = document.createElementNS(svgns, "circle");
    back.setAttributeNS(null, "cx", size / 2);
    back.setAttributeNS(null, "cy", size / 2);
    back.setAttributeNS(null, "r",  size / 2);
    var colorback = "#d0d0d0";
    if (size > 50) { 
        colorback = "#ebebeb";
    }
    back.setAttributeNS(null, "fill", colorback);
    chart.appendChild(back);
    // primary wedge
    var path = document.createElementNS(svgns, "path");
    var unit = (Math.PI *2) / 100;    
    var startangle = 0;
    var endangle = circlePercentage * unit - 0.001;
    var x1 = (size / 2) + (size / 2) * Math.sin(startangle);
    var y1 = (size / 2) - (size / 2) * Math.cos(startangle);
    var x2 = (size / 2) + (size / 2) * Math.sin(endangle);
    var y2 = (size / 2) - (size / 2) * Math.cos(endangle);
    var big = 0;
    if (endangle - startangle > Math.PI) {
        big = 1;
    }
    var d = "M " + (size / 2) + "," + (size / 2) +  // Start at circle center
        " L " + x1 + "," + y1 +     // Draw line to (x1,y1)
        " A " + (size / 2) + "," + (size / 2) +       // Draw an arc of radius r
        " 0 " + big + " 1 " +       // Arc details...
        x2 + "," + y2 +             // Arc goes to to (x2,y2)
        " Z";                       // Close path back to (cx,cy)
    path.setAttribute("d", d); // Set this path 
    path.setAttribute("fill", color);
    chart.appendChild(path); // Add wedge to chart
    // foreground circle
    var front = document.createElementNS(svgns, "circle");
    front.setAttributeNS(null, "cx", (size / 2));
    front.setAttributeNS(null, "cy", (size / 2));
    front.setAttributeNS(null, "r",  (size * 0.3)); //about 34% as big as back circle 
    front.setAttributeNS(null, "fill", "#fff");
    chart.appendChild(front);
    var text = document.createElementNS(svgns, "text");
    text.setAttribute("x", (size / 2));
    text.setAttribute("y", (size / 2)+5);
    text.setAttribute("fill", "black");
    text.setAttribute("text-anchor", "middle");
    text.innerHTML = percentage.toString()+'%';
    chart.appendChild(text);  
    return chart;
      
  }
})