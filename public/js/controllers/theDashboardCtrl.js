angular.module('spotme').controller('theDashboardCtrl', function($scope, $state, messageService, userService){




  messageService.getMessages(userService.user.id).then(function(res){
    var google = []
    var facebook = []
    var yelp = []
    $scope.totalLinksSent = res.data.length;
    res.data.forEach(function(val, i, arr){
      switch(val.linktype.toLowerCase()){
        case 'google':
        google.push(val)
        break;
        case 'facebook':
        facebook.push(val)
        break;
        case 'yelp':
        yelp.push(val)
        break;
      }
    })




    $scope.googleLinks = google.length
    $scope.facebookLinks = facebook.length
    $scope.yelpLinks = yelp.length

    $scope.googlePercent = Math.floor((($scope.googleLinks / $scope.totalLinksSent) * 100).toFixed(2))
    $scope.facebookPercent = Math.floor((($scope.facebookLinks / $scope.totalLinksSent) * 100).toFixed(2))
    $scope.yelpPercent = Math.floor((($scope.yelpLinks / $scope.totalLinksSent) * 100).toFixed(2))


    Chart.defaults.global.defaultFontSize = 10;
    Chart.defaults.global.defaultFontFamily = 'Roboto';
    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.defaultFontWeight = 'normal';



              $scope.labels = ["Google", "Facebook", "Yelp"];
              $scope.colors = [
                {
                  backgroundColor: "rgba(60,186,84, .75)",
                  pointBackgroundColor: "rgba(60,186,84, 1)",
                  pointHoverBackgroundColor: "rgba(159,204,0, 0.8)",
                  borderColor: "rgba(159,204,0, 1)",
                  pointBorderColor: '#fff',
                  pointHoverBorderColor: "rgba(159,204,0, 1)"
                },
                {
                  backgroundColor: "rgba(59,89,152, .75)",
                  pointBackgroundColor: "rgba(59,89,152, 1)",
                  pointHoverBackgroundColor: "rgba(159,204,0, 0.8)",
                  borderColor: "rgba(159,204,0, 1)",
                  pointBorderColor: '#fff',
                  pointHoverBorderColor: "rgba(159,204,0, 1)"
                },
                {
                  backgroundColor: "rgba(219,50,54, .75)",
                  pointBackgroundColor: "rgba(219,50,54, 1)",
                  pointHoverBackgroundColor: "rgba(159,204,0, 0.8)",
                  borderColor: "rgba(159,204,0, 1)",
                  pointBorderColor: '#fff',
                  pointHoverBorderColor: "rgba(159,204,0, 1)"
                }
              ]
              $scope.doughnutData = [$scope.googlePercent, $scope.facebookPercent, $scope.yelpPercent]
              $scope.data = [google.length, facebook.length, yelp.length];
        $scope.options = {
          responsive: false,
          responsiveAnimationDuration: 3000,
          maintainAspectRatio: true,
          title: {
                display: false,
                text: 'Links Sent',
                fontSize: 20,
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
                xAxes: [{
                  ticks: {
                    beginAtZero:true
                  },
                  gridLines: {
                      display: false
                  }
                }],
                yAxes: [{
                      gridLines: {
                          display: false
                      }
                    }]
                  }
                }


      var googleClicked = google.filter(function(val){
        return val.clicked
      })
      var facebookClicked = facebook.filter(function(val){
        return val.clicked
      })
      var yelpClicked = yelp.filter(function(val){
        return val.clicked
      })
      $scope.totalLinksClicked = googleClicked.length + facebookClicked.length + yelpClicked.length
      $scope.clickedData = [googleClicked.length, facebookClicked.length, yelpClicked.length];
      $scope.googleClicked = googleClicked.length;
      $scope.facebookClicked = facebookClicked.length;
      $scope.yelpClicked = yelpClicked.length;

      $scope.googlePercentClicked = Math.floor((($scope.googleClicked/ $scope.googleLinks) * 100).toFixed(2))
      $scope.facebookPercentClicked = Math.floor((($scope.facebookClicked / $scope.facebookLinks) * 100).toFixed(2))
      $scope.yelpPercentClicked = Math.floor((($scope.yelpClicked / $scope.yelpLinks) * 100).toFixed(2))


$scope.clickedOptions = {
  responsive: false,
  responsiveAnimationDuration: 3000,
  maintainAspectRatio: true,
  title: {
        display: false,
        text: 'Links Clicked',
        // fontSize: 40,
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
        xAxes: [{
          ticks: {
            beginAtZero:true
          },
          gridLines: {
              display: false
          }
        }],
        yAxes: [{
              gridLines: {
                  display: false
              }
            }]
          }
}



          var googlePositive = googleClicked.filter(function(val){
            return val.positive
          })
          var facebookPositive = facebookClicked.filter(function(val){
            return val.positive
          })
          var yelpPositive = yelpClicked.filter(function(val){
            return val.positive
          })
          $scope.googlePositive = googlePositive.length;
          $scope.facebookPositive = facebookPositive.length;
          $scope.yelpPositive = yelpPositive.length;
          $scope.positiveData = [googlePositive.length, facebookPositive.length, yelpPositive.length];
    $scope.positiveOptions = {
      responsive: false,
      responsiveAnimationDuration: 3000,
      maintainAspectRatio: true,
      title: {
            display: false,
            text: 'Positive Feedback',
            // fontSize: 50,
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
            yAxes: [{
              ticks: {
                beginAtZero:true
              },
              gridLines: {
                  display: false
              }
            }],
            xAxes: [{
                  gridLines: {
                      display: false
                  }
                }]
              }
    }
    $scope.pieOptions = {
      responsive: false,
      responsiveAnimationDuration: 3000,
      maintainAspectRatio: true,
      title: {
            display: false,
            text: 'Positive Feedback',
            // fontSize: 50,
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



              var googleNegative = googleClicked.filter(function(val){
                return val.negative
              })
              var facebookNegative = facebookClicked.filter(function(val){
                return val.negative
              })
              var yelpNegative = yelpClicked.filter(function(val){
                return val.negative
              })
              $scope.googleNegative = googleNegative.length
              $scope.facebookNegative = facebookNegative.length
              $scope.yelpNegative = yelpNegative.length
              $scope.negativeData = [googleNegative.length, facebookNegative.length, yelpNegative.length];
        $scope.negativeOptions = {
          responsive: false,
          responsiveAnimationDuration: 3000,
          maintainAspectRatio: true,
          title: {
                display: false,
                text: 'Negative Feedback',
                // fontSize: 50,
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
                yAxes: [{
                  ticks: {
                    beginAtZero:true
                  },
                  gridLines: {
                      display: false
                  }
                }],
                xAxes: [{
                      gridLines: {
                          display: false
                      }
                    }]
                  }
        }



  })






//   messageService.getMessages(userService.user.id).then(function(res){
//     var google = []
//     var facebook = []
//     var yelp = []
//     res.data.forEach(function(val, i, arr){
//       switch(val.linktype.toLowerCase()){
//         case 'google':
//         google.push(val)
//         break;
//         case 'facebook':
//         facebook.push(val)
//         break;
//         case 'yelp':
//         yelp.push(val)
//         break;
//       }
//     })
//
//
//   $scope.myChartLinksSent = {};
//
//       $scope.myChartLinksSent.type = "BarChart";
//
//       $scope.facebook = [
//           {v: "Facebook"},
//           {v: facebook.length},
//       ];
//
//       $scope.myChartLinksSent.data = {"cols": [
//           {id: "t", label: "Topping", type: "string"},
//           {id: "s", label: "Links", type: "number"}
//       ], "rows": [
//           {c: [
//               {v: "Google"},
//               {v: google.length}
//
//           ]},
//           {c: $scope.facebook},
//           {c: [
//               {v: "Yelp"},
//               {v: yelp.length}
//           ]}
//       ]};
//
//       $scope.myChartLinksSent.options = {
//           'title': 'Links Sent'
//       };
//
//       var googleClicked = google.filter(function(val){
//         return val.clicked
//       })
//       var facebookClicked = facebook.filter(function(val){
//         return val.clicked
//       })
//       var yelpClicked = yelp.filter(function(val){
//         return val.clicked
//       })
//
//       $scope.myChartLinksClicked = {};
//
//           $scope.myChartLinksClicked.type = "BarChart";
//
//           $scope.facebook = [
//               {v: "Facebook"},
//               {v: facebookClicked.length},
//           ];
//
//           $scope.myChartLinksClicked.data = {"cols": [
//               {id: "t", label: "Topping", type: "string"},
//               {id: "s", label: "Clicks", type: "number"}
//           ], "rows": [
//               {c: [
//                   {v: "Google"},
//                   {v: googleClicked.length},
//               ]},
//               {c: $scope.facebook},
//               {c: [
//                   {v: "Yelp"},
//                   {v: yelpClicked.length}
//               ]}
//           ]};
//
//           $scope.myChartLinksClicked.options = {
//               'title': 'Links Clicked'
//           };
//
//           var googlePositive = googleClicked.filter(function(val){
//             return val.positive
//           })
//           var facebookPositive = facebookClicked.filter(function(val){
//             return val.positive
//           })
//           var yelpPositive = yelpClicked.filter(function(val){
//             return val.positive
//           })
//
//           $scope.myChartPositiveClicks = {};
//
//               $scope.myChartPositiveClicks.type = "ColumnChart";
//
//               $scope.facebook = [
//                   {v: "Facebook"},
//                   {v: facebookPositive.length},
//               ];
//
//               $scope.myChartPositiveClicks.data = {"cols": [
//                   {id: "t", label: "Topping", type: "string"},
//                   {id: "s", label: "Reviews", type: "number"}
//               ], "rows": [
//                   {c: [
//                       {v: "Google"},
//                       {v: googlePositive.length},
//                   ]},
//                   {c: $scope.facebook},
//                   {c: [
//                       {v: "Yelp"},
//                       {v: yelpPositive.length}
//                   ]}
//               ]};
//
//               $scope.myChartPositiveClicks.options = {
//                   'title': 'Positive Reviews'
//               };
//
//               var googleNegative = googleClicked.filter(function(val){
//                 return val.negative
//               })
//               var facebookNegative = facebookClicked.filter(function(val){
//                 return val.negative
//               })
//               var yelpNegative = yelpClicked.filter(function(val){
//                 return val.negative
//               })
//
//
//               $scope.myChartNegativeClicks = {};
//
//                   $scope.myChartNegativeClicks.type = "ColumnChart";
//
//                   $scope.facebook = [
//                       {v: "Facebook"},
//                       {v: facebookNegative.length},
//                   ];
//
//                   $scope.myChartNegativeClicks.data = {"cols": [
//                       {id: "t", label: "Topping", type: "string"},
//                       {id: "s", label: "Reviews", type: "number"}
//                   ], "rows": [
//                       {c: [
//                           {v: "Google"},
//                           {v: googleNegative.length},
//                       ]},
//                       {c: $scope.facebook},
//                       {c: [
//                           {v: "Yelp"},
//                           {v: yelpNegative.length}
//                       ]}
//                   ]};
//
//                   $scope.myChartNegativeClicks.options = {
//                       'title': 'Negative Reviews'
//                   };
// })
//
//       $scope.pieChartObject = {};
//
//     $scope.pieChartObject.type = "PieChart";
//
//     $scope.onions = [
//         {v: "Onions"},
//         {v: 3},
//     ];
//
//     $scope.pieChartObject.data = {"cols": [
//         {id: "t", label: "Topping", type: "string"},
//         {id: "s", label: "Slices", type: "number"}
//     ], "rows": [
//         {c: [
//             {v: "Mushrooms"},
//             {v: 3},
//         ]},
//         {c: $scope.onions},
//         {c: [
//             {v: "Olives"},
//             {v: 31}
//         ]},
//         {c: [
//             {v: "Zucchini"},
//             {v: 1},
//         ]},
//         {c: [
//             {v: "Pepperoni"},
//             {v: 2},
//         ]}
//     ]};
//
//     $scope.pieChartObject.options = {
//         'title': 'How Much Pizza I Ate Last Night'
//     };

})
