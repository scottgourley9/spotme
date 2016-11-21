angular.module('spotme').controller('theDashboardCtrl', function($scope, $state, messageService){

  $scope.myChartObject = {};

      $scope.myChartObject.type = "BarChart";

      $scope.onions = [
          {v: "Onions"},
          {v: 3},
      ];

      $scope.myChartObject.data = {"cols": [
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

      $scope.myChartObject.options = {
          'title': 'How Much Pizza I Ate Last Night'
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
