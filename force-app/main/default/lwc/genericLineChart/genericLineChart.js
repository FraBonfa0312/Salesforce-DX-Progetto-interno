/*
==========================================
    Title: genericLineChart
    Type: Lightning Web Component
    Purpose: LWC that displays a line
        chart using chart.js. 
    Author: Clay Phillips
    Date: 05/07/2020 
==========================================
*/

import {LightningElement, api, track} from 'lwc';
import {loadScript} from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/chartJS_CP';

export default class GenericLineChart extends LightningElement{
    @api 
    get xAxisObj(){
        return this._xAxisObj;
    }
    set xAxisObj(value){
        this._xAxisObj = value;
    }
    
    @api 
    get yAxisObj(){
        return this._yAxisObj;
    }
    set yAxisObj(value){
        this._yAxisObj = value;
        if(!this.scriptLoaded){
            this.setupChart();
        }
        else{
            this.updateYAxis();
        }
    }
    
    @track scriptLoaded = false;
    @track lineChart;

    _xAxisObj = {
        xValues : ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        xAxisLabel : "Day"
    };

    _yAxisObj = {
        yValues : [110, 290, 150, 250, 500, 420, 100],
        yAxisLabel : "Value"
    };
    
    setupChart(){
        if(!this.scriptLoaded){
            //console.log('chartjs loading');
            this.scriptLoaded = true;
            Promise.all([
                loadScript(this, chartjs)
            ])
            .then(() => {
                this.initializeChartJS();
            })
            .catch(error => {
                console.log('Error: ' + error.message);
            });
        }
    }

    updateYAxis(){
        this.lineChart.data.datasets[0].data = this.yAxisObj.yValues;
        this.lineChart.options.scales.yAxes[0].scaleLabel.labelString = this.yAxisObj.yAxisLabel;
        this.lineChart.update();
    }

    initializeChartJS(){
        //console.log("loaded");
        //Get the context of the canvas element we want to select
        const canvas = document.createElement('canvas');
        this.template.querySelector('div.line').appendChild(canvas);        
        const ctx = canvas.getContext('2d');
        this.lineChart = new window.Chart(ctx ,{
            type: 'line',
            data: {
                labels: this.xAxisObj.xValues,
                datasets: [
                    {
                        label: this.xAxisObj.xAxisLabel,
                        data: this.yAxisObj.yValues,
                        borderColor:'rgba(62, 159, 222, 1)',
                        fill: false,
                        pointBackgroundColor: "#FFFFFF",
                        pointBorderWidth: 4,
                        pointHoverRadius: 5,
                        pointRadius: 3,
                        bezierCurve: true,
                        pointHitRadius: 10
                    }
                ]
            },
            options: {  
                legend: {
                    position: 'bottom',
                    padding: 10,
                },
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: this.yAxisObj.yAxisLabel
                        },
                        ticks: {
                            beginAtZero: true,
                            callback: function(value, index, values) {
                                return '$' + value;
                            }
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            return '$' + (Math.round(data['datasets'][0]['data'][tooltipItem['index']] * 100) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        }
                    }
                }
            }
        });
    }

    updateBurndownValueType(){
        let burndownValueTypeSelect = this.template.querySelector(".burndownValueTypeSelect");
        let detail = {};
        detail.value = burndownValueTypeSelect.value;
        const burndownTypeEvent = new CustomEvent('burndowntypeevent', {
            detail: detail,
            bubbles: false,
            composed: false
        });
        this.dispatchEvent(burndownTypeEvent);
    }
}