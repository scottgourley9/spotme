angular.module('spotme').controller('theDashboardCtrl', function($scope, $state, messageService, userService) {

    messageService.getMessages(userService.user.id).then(function(res) {
        $scope.graphObj = {}
        $scope.totalLinksSent = res.data.length;
        res.data.forEach(function(val, i, arr) {
            if (!$scope.graphObj.hasOwnProperty(val.linktype)) {
                $scope.graphObj[val.linktype] = [val]
            } else {
                $scope.graphObj[val.linktype].push(val)
            }
        })
        $scope.doughnutData = []
        for (let prop in $scope.graphObj) {
            $scope.doughnutData.push(Math.floor((($scope.graphObj[prop].length / $scope.totalLinksSent) * 100).toFixed(2)))
        }

        Chart.defaults.global.defaultFontSize = 12;
        Chart.defaults.global.defaultFontFamily = 'Roboto';
        Chart.defaults.global.defaultFontColor = 'black';
        Chart.defaults.global.defaultFontWeight = 'normal';

        $scope.labels = []
        for (let prop in $scope.graphObj) {
            if (prop.length > 15) {
                $scope.labels.push(prop.slice(0, 12) + '...')
            } else {
                $scope.labels.push(prop)
            }
        }
        $scope.colors = [
            {
                backgroundColor: "rgba(60,186,84, .75)",
                pointBackgroundColor: "rgba(60,186,84, 1)",
                pointHoverBackgroundColor: "rgba(159,204,0, 0.8)",
                borderColor: "rgba(159,204,0, 1)",
                pointBorderColor: '#fff',
                pointHoverBorderColor: "rgba(159,204,0, 1)"
            }, {
                backgroundColor: "rgba(59,89,152, .75)",
                pointBackgroundColor: "rgba(59,89,152, 1)",
                pointHoverBackgroundColor: "rgba(159,204,0, 0.8)",
                borderColor: "rgba(159,204,0, 1)",
                pointBorderColor: '#fff',
                pointHoverBorderColor: "rgba(159,204,0, 1)"
            }, {
                backgroundColor: "rgba(219,50,54, .75)",
                pointBackgroundColor: "rgba(219,50,54, 1)",
                pointHoverBackgroundColor: "rgba(159,204,0, 0.8)",
                borderColor: "rgba(159,204,0, 1)",
                pointBorderColor: '#fff',
                pointHoverBorderColor: "rgba(159,204,0, 1)"
            }
        ]
        $scope.data = [];
        for (let prop in $scope.graphObj) {
            $scope.data.push($scope.graphObj[prop].length)
        }
        $scope.options = {
            responsive: true,
            responsiveAnimationDuration: 3000,
            maintainAspectRatio: true,
            title: {
                display: false,
                text: 'Links Sent',
                fontSize: 12,
                position: 'top'
            },
            labels: {
                fontSize: 10
            },
            tooltips: {
                titlefontSize: 10,
                bodyfontSize: 10
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            beginAtZero: true

                        },
                        gridLines: {
                            display: false
                        }
                    }
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }

        $scope.clickedData = [];
        for (let prop in $scope.graphObj) {
            var clicked = $scope.graphObj[prop].filter(function(val) {
                return val.clicked
            })
            $scope.clickedData.push(clicked.length)
        }
        $scope.totalLinksClicked = $scope.clickedData.reduce(function(p, c) {
            return p + c
        });
        $scope.doughnutData2 = []
        var counter = 0;
        for (let prop in $scope.graphObj) {
            $scope.doughnutData2.push(Math.floor((($scope.clickedData[counter] / $scope.graphObj[prop].length) * 100).toFixed(2)))
            counter++
        }

        $scope.clickedOptions = {
            responsive: true,
            responsiveAnimationDuration: 3000,
            maintainAspectRatio: true,
            title: {
                display: false,
                text: 'Links Clicked',
                fontSize: 12,
                position: 'top'
            },
            labels: {
                fontSize: 10
            },
            tooltips: {
                titlefontSize: 10,
                bodyfontSize: 10
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            beginAtZero: true

                        },
                        gridLines: {
                            display: false
                        }
                    }
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }

        $scope.positiveData = [];
        for (let prop in $scope.graphObj) {
            var positive = $scope.graphObj[prop].filter(function(val) {
                return val.positive
            })
            $scope.positiveData.push(positive.length)
        }

        $scope.positiveOptions = {
            responsive: true,
            responsiveAnimationDuration: 3000,
            maintainAspectRatio: true,
            title: {
                display: false,
                text: 'Positive Feedback',
                fontSize: 12,
                position: 'top'
            },
            labels: {
                fontSize: 10
            },
            tooltips: {
                titlefontSize: 100,
                bodyfontSize: 100
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true

                        },
                        gridLines: {
                            display: false
                        }
                    }
                ],
                xAxes: [
                    {
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            beginAtZero: true

                        }
                    }
                ]
            }
        }
        $scope.pieOptions = {
            responsive: true,
            responsiveAnimationDuration: 3000,
            maintainAspectRatio: true,
            title: {
                display: false,
                text: 'Percent of Links Sent',
                fontSize: 16,
                position: 'top'
            },
            labels: {
                fontSize: 10
            },
            tooltips: {
                titlefontSize: 10,
                bodyfontSize: 10
            }
        }
        $scope.pieOptions2 = {
            responsive: true,
            responsiveAnimationDuration: 3000,
            maintainAspectRatio: true,
            title: {
                display: false,
                text: 'Percent of Links Clicked',
                fontSize: 16,
                position: 'top'
            },
            labels: {
                fontSize: 10
            },
            tooltips: {
                titlefontSize: 10,
                bodyfontSize: 10
            }
        }

        $scope.negativeData = [];
        for (let prop in $scope.graphObj) {
            var negative = $scope.graphObj[prop].filter(function(val) {
                return val.negative
            })
            $scope.negativeData.push(negative.length)
        }

        $scope.negativeOptions = {
            responsive: true,
            responsiveAnimationDuration: 3000,
            maintainAspectRatio: true,
            title: {
                display: false,
                text: 'Negative Feedback',
                fontSize: 12,
                position: 'top'
            },
            labels: {
                fontSize: 10
            },
            tooltips: {
                titlefontSize: 10,
                bodyfontSize: 10
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: false
                        }
                    }
                ],
                xAxes: [
                    {
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            beginAtZero: true

                        }
                    }
                ]
            }
        }

    })

})
