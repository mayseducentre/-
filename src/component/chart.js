
import { Bar, Line, Pie } from "react-chartjs-2";
import 'chart.js/auto'

export default function ChartComponent(){
    const data={
        labels:['January','February','March','April','May','June','July','August','September','October','November','December'],

        datasets:[
            {
                label:'{process.env.REACT_APP_BRAND_SHORT} Dataset',
                fill: false,
                backgroundColor: 'teal',
                color:'orange',
                borderColor: 'rgba(75, 192,192,1)',
                data:[65, 59,80, 81, 56, 55, 40, 90, 77],
                tension: 0.1,
                height: 100,
                borderCapstyle:'butt',
                borderDash:[],
                borderDashOffset: 0.0,
                borderJoinStyle:'miter',
                pointBorderColor:'rgba(75,192,192,1)',
                pointBackgroundColor:'#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,102,1)',
                pointHoverBorderColor:'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
            },
        ],
    }
        const options = {
            responsive:true,
            plugins:{
                legend:{
                    position:'top'
                },
                title:{
                    display: true,
                    text: 'Chart.js Line Chart'
                },
            },
    }
    return(
<div>
<h2>Assessment Chart</h2>
<Bar data={data} options={options}/>
</div>
    )
}