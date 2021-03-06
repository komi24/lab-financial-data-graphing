let start = "2016-09-12"
let end = "2018-09-12"

document.getElementById('start').onchange = function(e) {
	console.log(e);
	start = e.target.value;

}
document.getElementById('end').onchange = function(e) {
	console.log(e);
	end = e.target.value;
}

console.log("hello client side")
axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
.then(response	 => {
	console.log(Object.keys(response.data.bpi));
	var config = {
		type: 'line',
		data: {
			labels: Object.keys(response.data.bpi),
			datasets: [{
				label: 'My First dataset',
				backgroundColor: "#F00",
				borderColor: "#F00",
				data: Object.values(response.data.bpi),
				fill: false,
			}]
		},
		options: {
			responsive: true,
			title: {
				display: true,
				text: 'Chart.js Line Chart'
			},
			tooltips: {
				mode: 'index',
				intersect: false,
			},
			hover: {
				mode: 'nearest',
				intersect: true
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Month'
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Value'
					}
				}]
			}
		}
	};
	var ctx = document.getElementById('canvas').getContext('2d');
	window.myLine = new Chart(ctx, config);

})
