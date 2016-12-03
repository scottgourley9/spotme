angular.module('spotme').controller('theDashboardCtrl', function($scope, $state, messageService){

  $scope.myChartLinksSent = {};

      $scope.myChartLinksSent.type = "BarChart";

      $scope.facebook = [
          {v: "Facebook"},
          {v: 8},
      ];

      $scope.myChartLinksSent.data = {"cols": [
          {id: "t", label: "Topping", type: "string"},
          {id: "s", label: "Links", type: "number"}
      ], "rows": [
          {c: [
              {v: "Google"},
              {v: 32}

          ]},
          {c: $scope.facebook},
          {c: [
              {v: "Yelp"},
              {v: 15}
          ]}
      ]};

      $scope.myChartLinksSent.options = {
          'title': 'Links Sent'
      };



      $scope.myChartLinksClicked = {};

          $scope.myChartLinksClicked.type = "BarChart";

          $scope.facebook = [
              {v: "Facebook"},
              {v: 4},
          ];

          $scope.myChartLinksClicked.data = {"cols": [
              {id: "t", label: "Topping", type: "string"},
              {id: "s", label: "Clicks", type: "number"}
          ], "rows": [
              {c: [
                  {v: "Google"},
                  {v: 15},
              ]},
              {c: $scope.facebook},
              {c: [
                  {v: "Yelp"},
                  {v: 10}
              ]}
          ]};

          $scope.myChartLinksClicked.options = {
              'title': 'Links Clicked'
          };


          $scope.myChartPositiveClicks = {};

              $scope.myChartPositiveClicks.type = "ColumnChart";

              $scope.facebook = [
                  {v: "Facebook"},
                  {v: 3},
              ];

              $scope.myChartPositiveClicks.data = {"cols": [
                  {id: "t", label: "Topping", type: "string"},
                  {id: "s", label: "Reviews", type: "number"}
              ], "rows": [
                  {c: [
                      {v: "Google"},
                      {v: 12},
                  ]},
                  {c: $scope.facebook},
                  {c: [
                      {v: "Yelp"},
                      {v: 8}
                  ]}
              ]};

              $scope.myChartPositiveClicks.options = {
                  'title': 'Positive Reviews'
              };


              $scope.myChartNegativeClicks = {};

                  $scope.myChartNegativeClicks.type = "ColumnChart";

                  $scope.facebook = [
                      {v: "Facebook"},
                      {v: 1},
                  ];

                  $scope.myChartNegativeClicks.data = {"cols": [
                      {id: "t", label: "Topping", type: "string"},
                      {id: "s", label: "Reviews", type: "number"}
                  ], "rows": [
                      {c: [
                          {v: "Google"},
                          {v: 3},
                      ]},
                      {c: $scope.facebook},
                      {c: [
                          {v: "Yelp"},
                          {v: 2}
                      ]}
                  ]};

                  $scope.myChartNegativeClicks.options = {
                      'title': 'Negative Reviews'
                  };


      $scope.pieChartObject = {};

    $scope.pieChartObject.type = "PieChart";

    $scope.onions = [
        {v: "Onions"},
        {v: 3},
    ];

    $scope.pieChartObject.data = {"cols": [
        {id: "t", label: "Topping", type: "string"},
        {id: "s", label: "Slices", type: "number"}
    ], "rows": [
        {c: [
            {v: "Mushrooms"},
            {v: 3},
        ]},
        {c: $scope.onions},
        {c: [
            {v: "Olives"},
            {v: 31}
        ]},
        {c: [
            {v: "Zucchini"},
            {v: 1},
        ]},
        {c: [
            {v: "Pepperoni"},
            {v: 2},
        ]}
    ]};

    $scope.pieChartObject.options = {
        'title': 'How Much Pizza I Ate Last Night'
    };

})
