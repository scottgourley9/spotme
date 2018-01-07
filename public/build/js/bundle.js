'use strict';

angular.module('spotme').controller('aboutCtrl', function ($scope, $state, linksService, messageService, userService, locationsService, campaignsService) {
    window.scrollTo(0, 0);

    $('nav ul li').css({ color: '#000000' });
    $('.menu-items-nav').css({ backgroundColor: '#ffffff' });
});
'use strict';

angular.module('spotme').controller('adminCreateUserCtrl', function ($scope, $state, linksService, messageService, userService, locationsService, campaignsService, adminService) {});
'use strict';

angular.module('spotme').controller('adminCtrl', function ($scope, $state, linksService, messageService, userService, locationsService, campaignsService, adminService) {
    $('nav ul li').css({ color: '#000000' });
    $('.menu-items-nav').css({ backgroundColor: '#ffffff' });
});
'use strict';

angular.module('spotme').controller('adminDeleteUserCtrl', function ($scope, $state, linksService, messageService, userService, locationsService, campaignsService, adminService) {});
'use strict';

angular.module('spotme').controller('adminEditUserCtrl', function ($scope, $state, $filter, linksService, messageService, userService, locationsService, campaignsService, adminService) {
    $scope.showTopEdit = true;
    $scope.showEditInputs = false;
    $scope.submitEditId = function (id) {
        $scope.showTopEdit = false;
        $scope.showEditInputs = true;
        adminService.getUserById(id).then(function (res) {
            res.data.freetrialstart = new Date(res.data.freetrialstart);
            $scope.user = res.data;
        });
    };
    $scope.submitChanges = function () {
        adminService.updateUser($scope.user).then(function (res) {
            if (res.status === 200) {
                $scope.showTopEdit = true;
                $scope.showEditInputs = false;
                $scope.user = {};
                swal("Success", "User successfully updated", "success");
            } else {
                swal("Error", "Something went wrong", "error");
            }
        });
    };
});
'use strict';

angular.module('spotme').controller('adminGetUsersCtrl', function ($scope, $state, linksService, messageService, userService, locationsService, campaignsService, adminService) {
    adminService.getAllUsers().then(function (res) {
        $scope.users = res.data;
        $scope.originalUsers = res.data;
    });
    $scope.searchList = function () {
        var users = $scope.users.slice();
        var r = new RegExp($scope.searchItem, 'gi');
        var newUsers = users.filter(function (v) {
            var searchStr = v.id + ' ' + v.businessname + ' ' + v.firstname + ' ' + v.lastname + ' ' + v.phonenumber + ' ' + v.email + ' ' + v.paid;
            if (r.test(searchStr)) {
                return v;
            }
        });
        $scope.users = newUsers;
    };
    $scope.handleSearchInput = function (e) {
        if (e.keyCode === 8 && !$scope.searchItem) {
            $scope.users = $scope.originalUsers;
        } else {
            $scope.searchList();
        }
    };
});
'use strict';

angular.module('spotme').controller('campaignsCtrl', function ($scope, $state, messageService, userService, locationsService, campaignsService) {

    $scope.addCampaignSection = false;
    $scope.updateInputs = true;
    $scope.fakeButton = false;
    $scope.overlayShowing = false;
    $scope.isAnEdit = false;
    $scope.cancel = function () {
        $scope.selected = -1;
        $scope.flag = false;
        $scope.updateInputs = true;
        $scope.fakeButton = false;
    };

    $scope.fakeUpdate = function () {
        $scope.updateInputs = false;
        $scope.fakeButton = true;
    };

    $scope.showAddSection = function (name, message, image, id, status) {
        $scope.campaign = {
            name: name,
            message: message,
            image: image,
            id: id,
            status: status
        };
        if (name) {
            $scope.isAnEdit = true;
        }
        $scope.overlayShowing = true;
    };
    $scope.hideAddSection = function () {
        $scope.overlayShowing = false;
        $scope.isAnEdit = false;
    };
    $scope.submit = function (campaign) {
        if ($scope.isAnEdit) {
            $scope.updateCampaign($scope.campaign);
            $scope.isAnEdit = false;
        } else {
            $scope.isAnEdit = false;
            $scope.overlayShowing = false;
            $scope.updateInputs = true;
            $scope.fakeButton = false;
            $scope.selected = -1;
            $scope.flag = false;
            $scope.addCampaignSection = false;
            campaign.userid = userService.user.id;
            campaignsService.addCampaign(campaign).then(function (response) {
                if (response.status === 200) {
                    campaignsService.updateCampaignStatus(response.data[0].id).then(function (resp) {
                        campaignsService.getCampaigns(userService.user.id).then(function (res) {
                            $scope.campaigns = res.data.reverse();
                        });
                    });
                }
            });
        }
    };
    var getCampaigns = function getCampaigns() {
        campaignsService.getCampaigns(userService.user.id).then(function (res) {
            var campaigns = res.data.reverse();
            $scope.campaigns = campaigns.sort(function (a, b) {
                return a.status > b.status;
            });
        });
    };
    getCampaigns();

    $scope.deleteCampaign = function (campaign) {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this information!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!"
        }).then(function (res) {
            if (res.value) {
                swal("Deleted!", "Successfully deleted.", "success");

                $scope.updateInputs = true;
                $scope.fakeButton = false;
                $scope.selected = -1;
                $scope.flag = false;
                campaignsService.deleteCampaign(campaign.id).then(function (res) {
                    if (res.status === 200) {
                        getCampaigns();
                    }
                });
            }
        }).catch(function () {});
    };
    $scope.flag = false;
    $scope.showUpdate = function (campaign, i) {
        $scope.updateInputs = true;
        $scope.fakeButton = false;
        if (!$scope.flag) {
            $scope.selected = i;
            $scope.name = campaign.name;
            $scope.image = campaign.image;
            $scope.message = campaign.message;
            $scope.status = campaign.status;
            $scope.flag = true;
        } else {
            $scope.selected = -1;
            $scope.flag = false;
        }
    };

    $scope.selected = -1;

    $scope.updateCampaign = function (campaign) {
        $scope.updateInputs = true;
        $scope.fakeButton = false;
        $scope.selected = -1;
        $scope.flag = false;
        campaignsService.updateCampaign(campaign).then(function (res) {
            if (res.status === 200) {
                getCampaigns();
                $scope.overlayShowing = false;
            }
        });
    };

    $scope.updateCampaignStatus = function (campaign) {
        $scope.updateInputs = true;
        $scope.fakeButton = false;
        $scope.selected = -1;
        $scope.flag = false;
        campaignsService.updateCampaignStatus(campaign.id).then(function (res) {
            if (res.status === 200) {
                getCampaigns();
            }
        });
    };
});
'use strict';

angular.module('spotme').controller('contactUsCtrl', function ($scope, $state, linksService, messageService, userService, locationsService, campaignsService) {
    $('nav ul li').css({ color: '#000000' });
    $('.menu-items-nav').css({ backgroundColor: '#ffffff' });
});
'use strict';

angular.module('spotme').controller('customersCtrl', function ($scope, $state, linksService, messageService, userService, locationsService, campaignsService) {
    $scope.overlayShowing = false;
    $scope.isAnEdit = false;
    var checkingAll = false;

    $scope.selectAll = function (reset) {
        if (reset === 'reset') {
            checkingAll = false;
        } else {
            checkingAll = !checkingAll;
        }
        var checkboxes = document.getElementsByClassName("inputCheckBox");
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkingAll) {
                checkboxes[i].checked = true;
            } else {
                checkboxes[i].checked = false;
            }
        }
        if (checkboxes[0].checked) {
            $scope.massTextArray = $scope.customers;
        } else {
            $scope.massTextArray = [];
        }
    };

    locationsService.getLocations(userService.user.id).then(function (res) {
        $scope.locations = res.data;
    });
    $scope.getLinks = function (id) {

        linksService.getLinks(id).then(function (res) {
            $scope.links = res.data;
            $scope.linkTypesShowing = true;
        });
    };
    $scope.theSelected = -1;
    $scope.chooseLinkType = function (link, i) {
        $scope.theLink = JSON.parse(link);
        $scope.theSelected = i;
    };
    $scope.theX = function () {
        $scope.popup = !$scope.popup;
    };
    $scope.popup = false;
    $scope.addCustomerSection = false;
    $scope.updateInputs = true;
    $scope.fakeButton = false;

    $scope.sendMassLinks = function () {
        if (!$scope.massTextArray.length) {
            swal("Error", "Must select at least one customer", 'error');
            return;
        }
        $scope.popup = !$scope.popup;
    };
    $scope.massTextArray = [];
    $scope.checkIt = function (customer, i) {
        if (document.getElementsByClassName('inputCheckBox')[i].checked) {
            for (var i = 0; i < $scope.massTextArray.length; i++) {
                if ($scope.massTextArray[i].id == customer.id) {
                    return;
                }
            }
            $scope.massTextArray.push(customer);
        } else {
            for (var i = 0; i < $scope.massTextArray.length; i++) {
                if ($scope.massTextArray[i].id == customer.id) {
                    $scope.massTextArray.splice(i, 1);
                }
            }
        }
    };

    $scope.submitMassLink = function () {
        $scope.massTextArray.forEach(function (user) {
            user.userid = userService.user.id;
            user.time = new Date();
            user.phone = user.phonenumber;
            campaignsService.getActiveCampaign().then(function (res) {
                userService.getCustomer(userService.user.id, user.phone).then(function (custResp) {
                    if (!res.data[0]) {
                        swal("Error", "No campaign message selected!", "error");
                        return;
                    }
                    user.message = res.data[0].message;
                    user.image = res.data[0].image;
                    messageService.addMessage({
                        senttime: user.time,
                        message: user.message,
                        linkid: $scope.theLink.id,
                        userid: userService.user.id,
                        customerid: custResp.data[0].id,
                        linktype: $scope.theLink.name
                    }).then(function (messageRes) {

                        user.link = 'https://www.yes-or-no.info/?one=' + userService.user.id + '&one=' + $scope.theLink.id + '&one=' + custResp.data[0].id + '&one=' + messageRes.data.id;

                        messageService.sendMessage(user).then(function (resp) {
                            if (resp.status === 200) {
                                swal("Sent!", "Message sent successfully", "success");
                            }
                        });
                    });
                });
            });
        });
    };

    $scope.cancel = function () {
        $scope.selected = -1;
        $scope.flag = false;
        $scope.updateInputs = true;
        $scope.fakeButton = false;
    };

    $scope.fakeUpdate = function () {
        $scope.updateInputs = false;
        $scope.fakeButton = true;
    };

    $scope.showAddSection = function (id, first, last, phone, email) {
        $scope.customer = {
            id: id,
            firstname: first,
            lastname: last,
            phonenumber: phone,
            email: email
        };
        if (phone) {
            $scope.isAnEdit = true;
        }
        $scope.overlayShowing = true;
    };
    $scope.hideAddSection = function () {
        $scope.overlayShowing = false;
    };
    $scope.submit = function (user) {
        if ($scope.isAnEdit) {
            $scope.updateCustomer($scope.customer);
            $scope.isAnEdit = false;
        } else {
            $scope.isAnEdit = false;
            if (!user || !user.firstname || !user.lastname || !user.phonenumber) {
                swal("Invalid Input", "Must enter name and phone number", 'error');
                return;
            }
            for (var i = 0; i < $scope.customers.length; i++) {
                if ($scope.customers[i].phonenumber === user.phonenumber) {
                    swal("Error", "Existing phone number", 'error');
                    return;
                }
            }
            if (messageService.phonenumber(user.phonenumber)) {

                $scope.updateInputs = true;
                $scope.fakeButton = false;
                $scope.selected = -1;
                $scope.flag = false;
                $scope.addCustomerSection = false;
                user.userid = userService.user.id;
                userService.addCustomer(user).then(function (response) {
                    if (response.status === 200) {
                        userService.getCustomers(userService.user.id).then(function (res) {
                            $scope.overlayShowing = false;
                            $scope.customers = res.data.reverse();
                        });
                    }
                });
            }
        }
    };
    var getCustomers = function getCustomers() {
        userService.getCustomers(userService.user.id).then(function (res) {
            $scope.customers = res.data.reverse();
        });
    };
    getCustomers();

    $scope.deleteCustomer = function (customer) {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this information!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!"
        }).then(function (res) {
            if (res.value) {
                swal("Deleted!", "Successfully deleted.", "success");
                $scope.selected = -1;
                $scope.flag = false;
                $scope.updateInputs = true;
                $scope.fakeButton = false;
                userService.deleteCustomer(customer.id).then(function (res) {
                    if (res.status === 200) {
                        getCustomers();
                    }
                });
            }
        }).catch(function () {});
    };
    $scope.flag = false;
    $scope.showUpdate = function (customer, i) {
        $scope.updateInputs = true;
        $scope.fakeButton = false;
        if (!$scope.flag) {
            $scope.selected = i;
            $scope.first = customer.firstname;
            $scope.last = customer.lastname;
            $scope.phone = customer.phonenumber;
            $scope.email = customer.email;
            $scope.flag = true;
        } else {
            $scope.selected = -1;
            $scope.flag = false;
        }
    };

    $scope.selected = -1;

    $scope.updateCustomer = function (customer) {
        if (messageService.phonenumber(customer.phonenumber)) {

            $scope.updateInputs = true;
            $scope.fakeButton = false;
            $scope.selected = -1;
            $scope.flag = false;
            userService.updateCustomer(customer).then(function (res) {
                if (res.status === 200) {
                    $scope.overlayShowing = false;
                    $scope.selectAll('reset');
                    getCustomers();
                }
            });
        }
    };

    $scope.sendLink = function (customer) {
        userService.customer = customer;
        $state.go('dashboard.sendLink');
    };
});
'use strict';

angular.module('spotme').controller('dashboardCtrl', function ($auth, $scope, $state, messageService, userService, campaignsService) {

  $scope.menuHidden = false;
  $scope.dashMenu = [];

  var payload = function payload() {
    var payloadData = $auth.getPayload();
    if (payloadData) {
      userService.user = payloadData.sub;
      campaignsService.user = payloadData.sub;
    } else {
      $state.go('welcome');
    }
  };
  payload();

  $scope.currentUser = userService.user;

  $scope.hamClick = function () {
    $scope.dashMenu.splice(0);
    if ($scope.menuHidden) {
      $scope.dashMenu.push('animated slideInDown');
      $scope.menuHidden = !$scope.menuHidden;
    } else {
      $scope.dashMenu.push('animated slideOutUp');
      setTimeout(function () {
        $scope.menuHidden = !$scope.menuHidden;
      }, 500);
    }
  };

  $scope.logout = function () {
    $auth.logout();
    $state.go('welcome');
  };
});
'use strict';

angular.module('spotme').controller('locationsCtrl', function ($scope, $state, linksService, messageService, userService, locationsService) {

    $scope.addLocationSection = false;
    $scope.updateInputs = true;
    $scope.fakeButton = false;
    $scope.overlayShowing = false;
    $scope.isAnEdit = false;

    $scope.fakeUpdate = function () {
        $scope.updateInputs = false;
        $scope.fakeButton = true;
    };

    $scope.cancel = function () {
        $scope.selected = -1;
        $scope.flag = false;
        $scope.updateInputs = true;
        $scope.fakeButton = false;
    };

    $scope.showAddSection = function (name, address, phonenumber, id) {
        $scope.location = {
            name: name,
            address: address,
            phonenumber: phonenumber,
            id: id
        };
        if (id) {
            $scope.isAnEdit = true;
        }
        $scope.overlayShowing = true;
    };
    $scope.hideAddSection = function () {
        $scope.overlayShowing = false;
        $scope.isAnEdit = false;
    };

    $scope.submit = function (location) {
        if ($scope.isAnEdit) {
            $scope.updateLocation(location);
            $scope.isAnEdit = false;
        } else {
            $scope.isAnEdit = false;

            if (messageService.phonenumber(location.phonenumber)) {

                $scope.updateInputs = true;
                $scope.fakeButton = false;
                $scope.selected = -1;
                $scope.flag = false;
                $scope.addLocationSection = false;
                location.userid = userService.user.id;

                locationsService.addLocation(location).then(function (response) {
                    if (response.status === 200) {
                        // locationsService.getLocations(userService.user.id).then(function(res){
                        //   $scope.locations = res.data.reverse()
                        // })
                        $scope.overlayShowing = false;
                        getLocations();
                    }
                });
            }
        }
    };

    var getLocations = function getLocations() {
        locationsService.getLocations(userService.user.id).then(function (res) {
            var locations = res.data.reverse();
            locations.forEach(function (val) {
                val.theMap = 'https://maps.googleapis.com/maps/api/staticmap?center=' + val.lat + ',' + val.lng + '&zoom=18&size=400x400&maptype=satellite&markers=color:red%7C' + val.lat + ',' + val.lng + '&key=AIzaSyDBKFYcusAlV3Ujwcm35vgoxZ6KRXr96Z0';
            });
            $scope.locations = locations;
        });
    };
    getLocations();

    $scope.deleteLocation = function (location) {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this information!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!"
        }).then(function (res) {
            if (res.value) {
                swal("Deleted!", "Successfully deleted.", "success");
                $scope.updateInputs = true;
                $scope.fakeButton = false;
                $scope.selected = -1;
                $scope.flag = false;
                locationsService.deleteLocation(location.id).then(function (res) {
                    if (res.status === 200) {
                        getLocations();
                    }
                });
            }
        }).catch(function () {});
    };
    $scope.flag = false;
    $scope.showUpdate = function (location, i) {
        $scope.updateInputs = true;
        $scope.fakeButton = false;
        if (!$scope.flag) {
            $scope.selected = i;
            $scope.name = location.name;
            $scope.address = location.address;
            $scope.phonenumber = location.phonenumber;
            $scope.link = location.link;
            $scope.flag = true;
        } else {
            $scope.selected = -1;
            $scope.flag = false;
        }
    };

    $scope.selected = -1;

    $scope.updateLocation = function (location) {
        if (messageService.phonenumber(location.phonenumber)) {
            $scope.updateInputs = true;
            $scope.fakeButton = false;
            $scope.selected = -1;
            $scope.flag = false;
            locationsService.updateLocation(location).then(function (res) {
                if (res.status === 200) {
                    $scope.overlayShowing = false;
                    getLocations();
                }
            });
        }
    };
});
'use strict';

angular.module('spotme').controller('loginCtrl', function ($scope, $state, userService, $auth) {
  $('nav ul li').css({ color: '#000000' });
  $('.menu-items-nav').css({ backgroundColor: '#ffffff' });

  $scope.submit = function () {
    userService.login($scope.user).then(function (response) {
      if (response.data.message !== 'Invalid email and/or password') {
        $auth.setToken(response);
        $state.go('dashboard.theDashboard');
      } else {
        swal("Nope", "Invalid email and/or password", 'error');
        // alert('Either the password or email is incorrect')
      }
    });
  };
  $scope.cancel = function () {
    $state.go('welcome');
  };

  $scope.enter = function (e) {
    if (e.keyCode === 13) {
      $scope.submit();
    }
  };

  $scope.forgotPassword = function () {
    userService.forgotPassword();
  };
});
'use strict';

angular.module('spotme').controller('noFormCtrl', function ($scope, $state, messageService) {
  console.log($state.params);
});
'use strict';

angular.module('spotme').controller('paymentCtrl', function ($scope, paymentService, userService) {
  $scope.stripeCallback = function (code, result) {
    if (result.error) {
      swal("Sorry", "There was an error", "error");
    } else {
      paymentService.sendPayment({ amount: document.getElementById('amount').value, token: result.id, customerId: userService.user.id, receipt_email: userService.user.email }).then(function (res) {
        if (res.data === 'success') {
          swal("Success", "Payment successful!", "success");
        } else {
          swal("Sorry", "There was an error", "error");
        }
      });
    }
  };
});
'use strict';

angular.module('spotme').controller('reviewsCtrl', function ($scope, $state, messageService, reviewsService) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 14
  });

  var request = {
    placeId: 'ChIJo5IOsmKIUocRS15MTIPv464' // example: ChIJN1t_tDeuEmsRUsoyG83frY4
  };

  var service = new google.maps.places.PlacesService(map); // map is your map object
  service.getDetails(request, function (place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      $scope.test = place.reviews;
      console.log($scope.test);
    }
  });
  setTimeout(function () {
    $scope.reviews = $scope.test;
    console.log($scope.reviews);
  }, 1000);
});
'use strict';

angular.module('spotme').controller('sendLinkCtrl', function ($rootScope, $scope, $state, linksService, messageService, userService, locationsService, campaignsService) {

  $scope.linkTypesShowing = false;

  if (userService.customer) {
    $scope.first = userService.customer.first;
    $scope.last = userService.customer.last;
    $scope.phone = userService.customer.phone;
    $scope.email = userService.customer.email;
  }
  $rootScope.$on('$stateChangeSuccess', function () {
    if ($state.current.name !== 'dashboard.sendLink') {
      userService.customer = '';
    }
  });

  locationsService.getLocations(userService.user.id).then(function (res) {
    $scope.locations = res.data;
  });
  $scope.getLinks = function (id) {

    linksService.getLinks(id).then(function (res) {
      $scope.links = res.data;
      $scope.linkTypesShowing = true;
    });
  };

  // $scope.sendMessage = function(message){
  //   campaignsService.getActiveCampaign().then(function(res){
  //     message.message = res.data[0].message
  //     message.image = res.data[0].image
  //     message.link = 'http://159.203.246.179/#/yesOrNo/' + userService.user.id + '/' + $scope.linkId
  //     messageService.sendMessage(message).then(function(res){
  //       if(res.status === 200){
  //         swal("Sent!", "Message sent successfully", "success")
  //       }
  //     })
  //   })
  //
  // }
  $scope.typeClass = [];
  $scope.selected = -1;
  $scope.chooseLinkType = function (link, i) {
    $scope.theLink = JSON.parse(link);
    $scope.selected = i;
  };

  $scope.submit = function (user) {
    if (!user.phone || !user.first || !user.last || !$scope.locationId || !$scope.theLink) {
      swal("Invalid Input", "You must enter a name, phone number, location, and link", "error");
      return;
    }
    if (messageService.phonenumber(user.phone)) {

      $scope.addCustomerSection = false;
      user.userid = userService.user.id;
      user.time = new Date();
      userService.addCustomer(user).then(function (response) {
        if (response.data !== 'customer already exists') {
          campaignsService.getActiveCampaign().then(function (res) {
            user.message = res.data[0].message;
            user.image = res.data[0].image;
            messageService.addMessage({ senttime: user.time, message: user.message, linkid: $scope.theLink.id, userid: userService.user.id, customerid: response.data.id, linktype: $scope.theLink.name }).then(function (messageRes) {

              user.link = 'https://www.yes-or-no.info/?one=' + userService.user.id + '&one=' + $scope.theLink.id + '&one=' + response.data.id + '&one=' + messageRes.data.id;

              messageService.sendMessage(user).then(function (resp) {
                if (resp.status === 200) {
                  swal("Sent!", "Message sent successfully", "success");
                }
              });
            });
          });
        } else {
          campaignsService.getActiveCampaign().then(function (res) {
            userService.getCustomer(userService.user.id, user.phone).then(function (custResp) {
              console.log(res.data[0]);
              if (!res.data[0]) {
                swal("Error", "No campaign message selected!", "error");
                return;
              }
              user.message = res.data[0].message;
              user.image = res.data[0].image;
              messageService.addMessage({ senttime: user.time, message: user.message, linkid: $scope.theLink.id, userid: userService.user.id, customerid: custResp.data[0].id, linktype: $scope.theLink.name }).then(function (messageRes) {

                user.link = 'https://www.yes-or-no.info/?one=' + userService.user.id + '&one=' + $scope.theLink.id + '&one=' + custResp.data[0].id + '&one=' + messageRes.data.id;

                messageService.sendMessage(user).then(function (resp) {
                  if (resp.status === 200) {
                    swal("Sent!", "Message sent successfully", "success");
                  }
                });
              });
            });
          });
        }
      });
    }
  };
});
'use strict';

angular.module('spotme').controller('settingsCtrl', function ($scope, $state, messageService, userService) {

  $scope.changePassword = function () {
    swal({
      title: "Enter current password",
      input: "password",
      showCancelButton: true,
      animation: "slide-from-top",
      inputPlaceholder: "Password"
    }).then(function (inputValue) {
      if (inputValue.value) {

        if (inputValue.value === "") {
          swal.showInputError("Type your current password");
          return false;
        }
        userService.checkPass(inputValue.value).then(function (res) {
          if (res.data) {

            swal({
              title: "Enter NEW password",
              input: "password",
              showCancelButton: true,
              animation: "slide-from-top",
              inputPlaceholder: "New Password"
            }).then(function (inputValue2) {
              if (inputValue2.value) {
                if (inputValue2.value === "") {
                  swal.showInputError("Write your NEW password");
                  return false;
                }
                userService.changePassword(inputValue2.value).then(function (resp) {
                  if (resp.status === 200) {
                    swal("Success", "Your password has been changed!", "success");
                  } else {
                    swal("Sorry", "There was an error", "error");
                  }
                });
              }
            }).catch(function () {});
          } else {
            swal("Error", "Incorrect password", "error");
          }
        });
      }
    }).catch(function () {});
  };
});
'use strict';

angular.module('spotme').controller('signupCtrl', function (messageService, $auth, $scope, $state, userService) {
  $('nav ul li').css({ color: '#000000' });
  $('.menu-items-nav').css({ backgroundColor: '#ffffff' });

  $scope.theCode = false;
  $scope.showCode = function () {
    $scope.theCode = !$scope.theCode;
  };
  $scope.submit = function () {
    if (!$scope.user) {
      swal("No Input", "All fields are required", 'error');
      return;
    }
    if (Object.keys($scope.user).length < 6) {
      swal("Missing Field", "All fields are required", 'error');
      return;
    }
    if (messageService.ValidateEmail($scope.user.email)) {
      if (messageService.phonenumber($scope.user.phone)) {
        userService.signUp($scope.user).then(function (response) {
          if (response.data.message !== 'already taken') {
            // $scope.errorMessage = ''
            $auth.setToken(response);
            $state.go('dashboard.theDashboard');
          } else {
            swal("Sorry", "Email and/or phone number is taken", 'error');
          }
        });
      }
    }
  };
  $scope.cancel = function () {
    $state.go('welcome');
  };

  $scope.enter = function (e) {
    if (e.keyCode === 13) {
      $scope.submit();
    }
  };
});
'use strict';

angular.module('spotme').controller('theDashboardCtrl', function ($scope, $state, messageService, userService) {

    messageService.getMessages(userService.user.id).then(function (res) {
        $scope.graphObj = {};
        $scope.totalLinksSent = res.data.length;
        res.data.forEach(function (val, i, arr) {
            if (!$scope.graphObj.hasOwnProperty(val.linktype)) {
                $scope.graphObj[val.linktype] = [val];
            } else {
                $scope.graphObj[val.linktype].push(val);
            }
        });
        $scope.doughnutData = [];
        for (var prop in $scope.graphObj) {
            $scope.doughnutData.push(Math.floor(($scope.graphObj[prop].length / $scope.totalLinksSent * 100).toFixed(2)));
        }

        Chart.defaults.global.defaultFontSize = 12;
        Chart.defaults.global.defaultFontFamily = 'Roboto';
        Chart.defaults.global.defaultFontColor = 'black';
        Chart.defaults.global.defaultFontWeight = 'normal';

        $scope.labels = [];
        for (var _prop in $scope.graphObj) {
            if (_prop.length > 15) {
                $scope.labels.push(_prop.slice(0, 12) + '...');
            } else {
                $scope.labels.push(_prop);
            }
        }
        $scope.colors = [{
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
        }];
        $scope.data = [];
        for (var _prop2 in $scope.graphObj) {
            $scope.data.push($scope.graphObj[_prop2].length);
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
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        };

        $scope.clickedData = [];
        for (var _prop3 in $scope.graphObj) {
            var clicked = $scope.graphObj[_prop3].filter(function (val) {
                return val.clicked;
            });
            $scope.clickedData.push(clicked.length);
        }
        $scope.totalLinksClicked = $scope.clickedData.reduce(function (p, c) {
            return p + c;
        });
        $scope.doughnutData2 = [];
        var counter = 0;
        for (var _prop4 in $scope.graphObj) {
            $scope.doughnutData2.push(Math.floor(($scope.clickedData[counter] / $scope.graphObj[_prop4].length * 100).toFixed(2)));
            counter++;
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
                xAxes: [{
                    ticks: {
                        beginAtZero: true

                    },
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        };

        $scope.positiveData = [];
        for (var _prop5 in $scope.graphObj) {
            var positive = $scope.graphObj[_prop5].filter(function (val) {
                return val.positive;
            });
            $scope.positiveData.push(positive.length);
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
                yAxes: [{
                    ticks: {
                        beginAtZero: true

                    },
                    gridLines: {
                        display: false
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true

                    }
                }]
            }
        };
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
        };
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
        };

        $scope.negativeData = [];
        for (var _prop6 in $scope.graphObj) {
            var negative = $scope.graphObj[_prop6].filter(function (val) {
                return val.negative;
            });
            $scope.negativeData.push(negative.length);
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
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        display: false
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true

                    }
                }]
            }
        };
    });
    messageService.getMessages(userService.user.id).then(function (res) {
        $scope.graphObj = {};
        $scope.totalLinksSent = res.data.length;
        res.data.forEach(function (val, i, arr) {
            if (!$scope.graphObj.hasOwnProperty(val.linktype)) {
                $scope.graphObj[val.linktype] = [val];
            } else {
                $scope.graphObj[val.linktype].push(val);
            }
        });
        $scope.doughnutData = [];
        for (var prop in $scope.graphObj) {
            $scope.doughnutData.push(Math.floor(($scope.graphObj[prop].length / $scope.totalLinksSent * 100).toFixed(2)));
        }

        Chart.defaults.global.defaultFontSize = 12;
        Chart.defaults.global.defaultFontFamily = 'Roboto';
        Chart.defaults.global.defaultFontColor = 'black';
        Chart.defaults.global.defaultFontWeight = 'normal';

        $scope.labels = [];
        for (var _prop7 in $scope.graphObj) {
            if (_prop7.length > 15) {
                $scope.labels.push(_prop7.slice(0, 12) + '...');
            } else {
                $scope.labels.push(_prop7);
            }
        }
        $scope.colors = [{
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
        }];
        $scope.data = [];
        for (var _prop8 in $scope.graphObj) {
            $scope.data.push($scope.graphObj[_prop8].length);
        }
        $scope.optionsMobile = {
            responsive: false,
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
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        };

        $scope.clickedData = [];
        for (var _prop9 in $scope.graphObj) {
            var clicked = $scope.graphObj[_prop9].filter(function (val) {
                return val.clicked;
            });
            $scope.clickedData.push(clicked.length);
        }
        $scope.totalLinksClicked = $scope.clickedData.reduce(function (p, c) {
            return p + c;
        });
        $scope.doughnutData2 = [];
        var counter = 0;
        for (var _prop10 in $scope.graphObj) {
            $scope.doughnutData2.push(Math.floor(($scope.clickedData[counter] / $scope.graphObj[_prop10].length * 100).toFixed(2)));
            counter++;
        }

        $scope.clickedOptionsMobile = {
            responsive: false,
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
                xAxes: [{
                    ticks: {
                        beginAtZero: true

                    },
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        };

        $scope.positiveData = [];
        for (var _prop11 in $scope.graphObj) {
            var positive = $scope.graphObj[_prop11].filter(function (val) {
                return val.positive;
            });
            $scope.positiveData.push(positive.length);
        }

        $scope.positiveOptionsMobile = {
            responsive: false,
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
                yAxes: [{
                    ticks: {
                        beginAtZero: true

                    },
                    gridLines: {
                        display: false
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true

                    }
                }]
            }
        };
        $scope.pieOptionsMobile = {
            responsive: false,
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
        };
        $scope.pieOptions2Mobile = {
            responsive: false,
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
        };

        $scope.negativeData = [];
        for (var _prop12 in $scope.graphObj) {
            var negative = $scope.graphObj[_prop12].filter(function (val) {
                return val.negative;
            });
            $scope.negativeData.push(negative.length);
        }

        $scope.negativeOptionsMobile = {
            responsive: false,
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
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        display: false
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true

                    }
                }]
            }
        };
    });
});
'use strict';

angular.module('spotme').controller('updateLinksCtrl', function ($scope, $state, linksService, messageService, userService, locationsService) {
    $scope.forAddress = $state.params.address;

    $scope.addLocationSection = false;
    $scope.updateInputs = true;
    $scope.fakeButton = false;
    $scope.overlayShowing = false;
    $scope.isAnEdit = false;

    $scope.fakeUpdate = function () {
        $scope.updateInputs = false;
        $scope.fakeButton = true;
    };

    $scope.cancel = function () {
        $scope.selected = -1;
        $scope.flag = false;
        $scope.updateInputs = true;
        $scope.fakeButton = false;
    };

    $scope.showAddSection = function (name, reviewlink, id) {
        $scope.link = {
            name: name,
            reviewlink: reviewlink,
            id: id
        };
        if (reviewlink) {
            $scope.isAnEdit = true;
        }
        $scope.overlayShowing = true;
    };
    $scope.hideAddSection = function () {
        $scope.overlayShowing = false;
        $scope.isAnEdit = false;
    };
    $scope.submit = function (link) {
        if ($scope.isAnEdit) {
            $scope.updateLink($scope.link);
            $scope.isAnEdit = false;
        } else {
            $scope.isAnEdit = false;
            $scope.updateInputs = true;
            $scope.fakeButton = false;
            $scope.selected = -1;
            $scope.flag = false;
            $scope.addLocationSection = false;
            link.locationId = $state.params.id;
            linksService.addLink(link).then(function (res) {
                if (res.status === 200) {
                    $scope.overlayShowing = false;
                    getLinks();
                }
            });
        }
    };
    var getLinks = function getLinks() {
        linksService.getLinks($state.params.id).then(function (res) {
            $scope.links = res.data.reverse();
        });
    };
    getLinks();

    $scope.deleteLink = function (link) {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this information!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!"
        }).then(function (res) {
            if (res.value) {
                swal("Deleted!", "Successfully deleted.", "success");
                $scope.updateInputs = true;
                $scope.fakeButton = false;
                $scope.selected = -1;
                $scope.flag = false;
                linksService.deleteLink(link.id).then(function (res) {
                    if (res.status === 200) {
                        getLinks();
                    }
                });
            }
        }).catch(function () {});
    };
    $scope.flag = false;
    $scope.showUpdate = function (link, i) {
        $scope.updateInputs = true;
        $scope.fakeButton = false;
        if (!$scope.flag) {
            $scope.selected = i;
            $scope.name = link.name;
            $scope.myLink = link.reviewlink;
            $scope.flag = true;
        } else {
            $scope.selected = -1;
            $scope.flag = false;
        }
    };

    $scope.selected = -1;

    $scope.updateLink = function (link) {
        $scope.updateInputs = true;
        $scope.fakeButton = false;
        $scope.selected = -1;
        $scope.flag = false;
        linksService.updateLink(link).then(function (res) {
            if (res.status === 200) {
                $scope.overlayShowing = false;
                getLinks();
            }
        });
    };
});
'use strict';

angular.module('spotme').controller('userInfoCtrl', function ($scope, $auth, $state, messageService, userService) {
  var getUser = function getUser() {
    userService.getUser(userService.user.id).then(function (res) {
      userService.user = res.data[0];
      $scope.userInfo = userService.user;
      $scope.businessname = userService.user.businessname;
      $scope.firstname = userService.user.firstname;
      $scope.lastname = userService.user.lastname;
      $scope.phonenumber = userService.user.phonenumber;
      $scope.email = userService.user.email;
      $scope.password = userService.user.password;
    });
  };
  getUser();

  $scope.original = true;
  $scope.showInput = false;
  $scope.showEdit = function () {
    $scope.original = !$scope.original;
    $scope.showInput = !$scope.showInput;
  };
  $scope.update = function () {

    var newData = {
      businessname: document.getElementById('businessname').value,
      firstname: document.getElementById('firstname').value,
      lastname: document.getElementById('lastname').value,
      phonenumber: document.getElementById('phonenumber').value,
      email: document.getElementById('email').value
    };
    swal({
      title: "Are you sure?",
      text: "This will permanently change your information.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, submit changes",
      cancelButtonText: "No, cancel changes",
      closeOnCancel: false
    }).then(function (isConfirm) {
      if (isConfirm.value) {

        swal("Submited", "Changes saved, you will now be logged out for changes to take effect", "success");

        userService.updateUser(newData).then(function (res) {
          if (res.status === 200) {
            $auth.logout();
            $state.go('welcome');
          }
        });
      } else {

        swal("Cancelled", "No changes made", "error");
      }
    }).catch(function () {});
  };
});
'use strict';

angular.module('spotme').controller('welcomeCtrl', function ($auth, $document, $scope, $state, messageService, userService, campaignsService) {
  window.scrollTo(0, 0);
  var payload = function payload() {
    var payloadData = $auth.getPayload();
    if (payloadData) {
      userService.user = payloadData.sub;
      campaignsService.user = payloadData.sub;
      $state.go('dashboard.theDashboard');
    }
  };
  payload();
  var a = 0;

  $document.on('scroll', function () {
    if ($(this).scrollTop() > 75) {
      $('.welcomeNav').css({ backgroundColor: '#ffffff', opacity: 1 }, 'slow');
      $('.nav-items li').css({ color: 'black', opacity: 1 }, 'slow');
    }
    if ($(this).scrollTop() <= 75) {
      $('.welcomeNav').css({ backgroundColor: 'none', opacity: 1 }, 'slow');
      $('.nav-items li').css({ color: 'white', opacity: 1 }, 'slow');
    }
    if (document.location.hash === "#/") {

      var oTop = $('#counter').offset().top - window.innerHeight;
      if (a == 0 && $(window).scrollTop() > oTop) {
        $('.counter-value').each(function () {
          var $this = $(this),
              countTo = $this.attr('data-count');
          $({
            countNum: $this.text()
          }).animate({
            countNum: countTo
          }, {

            duration: 2000,
            easing: 'swing',
            step: function step() {
              $this.text(Math.floor(this.countNum));
            },
            complete: function complete() {
              $this.text(this.countNum);
            }

          });
        });
        a = 1;
      }
    }
  });

  $scope.hamMenuShowing = false;
  $scope.slideMenu = [];
  $scope.hamClick = function () {
    $scope.slideMenu.splice(0);

    if (!$scope.hamMenuShowing) {
      // $scope.slideMenu.push('animated bounceInDown')
      $scope.hamMenuShowing = !$scope.hamMenuShowing;
    } else {
      // $scope.slideMenu.push('animated bounceOutUp')
      setTimeout(function () {
        $scope.hamMenuShowing = !$scope.hamMenuShowing;
      }, 500);

      // $scope.slideMenu.splice(0)
    }
  };

  // var TxtType = function(el, toRotate, period) {
  //         this.toRotate = toRotate;
  //         this.el = el;
  //         this.loopNum = 0;
  //         this.period = parseInt(period, 10) || 2000;
  //         this.txt = '';
  //         this.tick();
  //         this.isDeleting = false;
  //     };
  //
  //     TxtType.prototype.tick = function() {
  //         var i = this.loopNum % this.toRotate.length;
  //         var fullTxt = this.toRotate[i];
  //
  //         if (this.isDeleting) {
  //         this.txt = fullTxt.substring(0, this.txt.length - 1);
  //         } else {
  //         this.txt = fullTxt.substring(0, this.txt.length + 1);
  //         }
  //
  //         this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  //
  //         var that = this;
  //         var delta = 200 - Math.random() * 100;
  //
  //         if (this.isDeleting) { delta /= 2; }
  //
  //         if (!this.isDeleting && this.txt === fullTxt) {
  //         delta = this.period;
  //         this.isDeleting = true;
  //         } else if (this.isDeleting && this.txt === '') {
  //         this.isDeleting = false;
  //         this.loopNum++;
  //         delta = 500;
  //         }
  //
  //         setTimeout(function() {
  //         that.tick();
  //         }, delta);
  //     };
  //
  //     var typeIt = function() {
  //         var elements = document.getElementsByClassName('typewrite');
  //         for (var i=0; i<elements.length; i++) {
  //             var toRotate = elements[i].getAttribute('data-type');
  //             var period = elements[i].getAttribute('data-period');
  //             if (toRotate) {
  //               new TxtType(elements[i], JSON.parse(toRotate), period);
  //             }
  //         }
  //         // INJECT CSS
  //         var css = document.createElement("style");
  //         css.type = "text/css";
  //         css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  //         document.body.appendChild(css);
  //     };
  //     typeIt()

});
'use strict';

angular.module('spotme').controller('yesOrNoCtrl', function ($scope, $state, linksService, messageService, userService, locationsService) {

  $scope.yesOrNoSectionShowing = true;
  $scope.noFromSectionShowing = false;
  $scope.thankYouSection = false;

  userService.getUser($state.params.id).then(function (res) {
    $scope.user = res.data[0];
    linksService.getLink($state.params.linkId).then(function (res) {
      $scope.reviewLink = res.data[0].reviewlink;
    });
  });
  $scope.clickedYes = function () {
    messageService.positive($state.params.messageId);
  };
  $scope.clickedNo = function () {
    $scope.yesOrNoSectionShowing = false;
    $scope.noFromSectionShowing = true;
    $scope.thankYouSection = true;
    messageService.negative($state.params.messageId);
  };

  $scope.submit = function (complaint) {
    $scope.yesOrNoSectionShowing = false;
    $scope.noFromSectionShowing = false;
    $scope.thankYouSection = true;
    messageService.complaint($state.params.messageId, complaint);
  };

  //  = 'https://www.google.com/search?q=spencer+sprinklers&rlz=1C5CHFA_enUS691US691&oq=spencer+sprinklers&aqs=chrome..69i57.4617j0j1&sourceid=chrome&ie=UTF-8#lrd=0x8752f70050b56229:0x951b6313f154c0bd,3'
});
'use strict';

angular.module('spotme').service('adminService', function ($http) {
  this.getAllUsers = function () {
    return $http({
      method: 'GET',
      url: '/admin/getusers',
      headers: { 'Authorization': localStorage.getItem('satellizer_token') }
    });
  };
  this.getUserById = function (id) {
    return $http({
      method: 'GET',
      url: '/admin/getuser/' + id,
      headers: { 'Authorization': localStorage.getItem('satellizer_token') }
    });
  };
  this.updateUser = function (newUser) {
    return $http({
      method: 'PUT',
      url: '/admin/updateuser',
      headers: { 'Authorization': localStorage.getItem('satellizer_token') },
      data: newUser
    });
  };
});
'use strict';

angular.module('spotme').service('campaignsService', function ($http) {

  this.user;

  this.addCampaign = function (campaign) {
    return $http({
      method: 'POST',
      url: '/api/campaigns',
      data: campaign
    });
  };
  this.getCampaigns = function (userId) {
    return $http({
      method: 'GET',
      url: '/api/campaigns/' + userId
    });
  };
  this.deleteCampaign = function (campaignId) {
    return $http({
      method: 'DELETE',
      url: '/api/campaigns/' + campaignId
    });
  };
  this.updateCampaign = function (campaign) {
    return $http({
      method: 'PUT',
      url: '/api/campaigns/' + campaign.id,
      data: campaign
    });
  };

  this.updateCampaignStatus = function (campaignId) {
    return $http({
      method: 'PUT',
      url: '/api/updatecampaignstatus/' + campaignId,
      data: { userid: this.user.id }
    });
  };

  this.getActiveCampaign = function () {
    return $http({
      method: 'GET',
      url: '/api/getactivecampaign/' + this.user.id
    });
  };
});
'use strict';

angular.module('spotme').service('linksService', function ($http) {

  this.getLinks = function (id) {
    return $http({
      method: 'GET',
      url: '/api/links/' + id
    });
  };

  this.getLink = function (linkId) {
    return $http({
      method: 'GET',
      url: '/api/link/' + linkId
    });
  };

  this.addLink = function (link) {
    return $http({
      method: 'POST',
      url: '/api/links',
      data: link
    });
  };

  this.updateLink = function (link) {
    return $http({
      method: 'PUT',
      url: '/api/links',
      data: link
    });
  };

  this.deleteLink = function (id) {
    return $http({
      method: 'DELETE',
      url: '/api/links/' + id
    });
  };
});
'use strict';

angular.module('spotme').service('locationsService', function ($http) {

  this.addLocation = function (location) {
    return $http({
      method: 'POST',
      url: '/api/locations',
      data: location
    });
  };
  this.getLocations = function (userId) {
    return $http({
      method: 'GET',
      url: '/api/locations/' + userId
    });
  };
  this.deleteLocation = function (locationId) {
    return $http({
      method: 'DELETE',
      url: '/api/locations/' + locationId
    });
  };
  this.updateLocation = function (location) {
    return $http({
      method: 'PUT',
      url: '/api/locations/' + location.id,
      data: location
    });
  };
});
'use strict';

angular.module('spotme').service('messageService', function ($http) {
  this.sendMessage = function (obj) {
    return $http({
      method: 'POST',
      url: '/api/sendmessage',
      data: obj
    });
  };

  this.getMessages = function (userId) {
    return $http({
      method: 'GET',
      url: '/api/messages/' + userId
    });
  };

  this.addMessage = function (obj) {
    return $http({
      method: 'POST',
      url: '/api/messages',
      data: obj
    });
  };

  this.positive = function (id) {
    return $http({
      method: 'PUT',
      url: '/api/positivemessage/' + id
    });
  };

  this.negative = function (id) {
    return $http({
      method: 'PUT',
      url: '/api/negativemessage/' + id
    });
  };

  this.complaint = function (id, complaint) {
    return $http({
      method: 'PUT',
      url: '/api/complaint/' + id,
      data: { complaint: complaint }
    });
  };

  this.ValidateEmail = function (email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    swal("Error", "Invalid email address", 'error');
    return false;
  };

  this.phonenumber = function (inputtxt) {
    var phoneno = /^\d{10}$/;
    if (inputtxt.match(phoneno)) {
      return true;
    } else {
      swal("Error", "Invalid phone number, must be numbers with no spaces or symbols and a length of 10 characters", 'error');
      return false;
    }
  };
});
'use strict';

angular.module('spotme').service('paymentService', function ($http) {

  this.sendPayment = function (paymentInfo) {
    return $http({
      method: 'POST',
      url: '/api/payment',
      data: paymentInfo
    });
  };
});
'use strict';

angular.module('spotme').service('reviewsService', function ($http) {});
'use strict';

angular.module('spotme').service('userService', function ($http) {
    this.addCustomer = function (user) {
        return $http({ method: 'POST', url: '/api/customers', data: user });
    };
    this.getCustomers = function (userid) {
        return $http({
            method: 'GET',
            url: '/api/customers/' + userid
        });
    };
    this.getCustomer = function (userid, phone) {
        return $http({
            method: 'GET',
            url: '/api/customer/' + userid + '/' + phone
        });
    };

    this.getUser = function (userid) {
        return $http({
            method: 'GET',
            url: '/api/user/' + userid
        });
    };
    this.updateUser = function (obj) {
        return $http({
            method: 'PUT',
            url: '/api/user/' + this.user.id,
            data: obj
        });
    };

    this.deleteCustomer = function (customerId) {
        return $http({
            method: 'DELETE',
            url: '/api/customers/' + customerId
        });
    };
    this.updateCustomer = function (customer) {
        return $http({
            method: 'PUT',
            url: '/api/customers/' + customer.id,
            data: customer
        });
    };

    this.user;
    this.customer;

    this.checkPass = function (input) {
        return $http({
            method: "POST",
            url: '/api/password/' + this.user.id,
            data: {
                input: input
            }
        });
    };
    this.changePassword = function (input2) {
        return $http({
            method: "PUT",
            url: '/api/password/' + this.user.id,
            data: {
                input2: input2
            }
        });
    };
    this.signUp = function (user) {
        return $http({ method: 'POST', url: '/auth/signup', data: user });
    };

    this.login = function (user) {
        return $http({ method: 'POST', url: '/auth/login', data: user });
    };

    this.forgotPassword = function () {
        swal({
            title: 'Enter your account email to reset password',
            input: 'email',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: function preConfirm(email) {
                return new Promise(function (resolve, reject) {
                    $http({
                        method: 'POST',
                        url: '/api/resetpassword',
                        data: {
                            email: email
                        }
                    }).then(function (r) {
                        swal({
                            title: 'Verifying it\'s you',
                            text: 'For your security, we need to verify your identity. We\'ve sent a code to the email ' + r.data.email + '. Please enter it below.',
                            input: 'text',
                            showCancelButton: true,
                            confirmButtonText: 'Submit',
                            showLoaderOnConfirm: true,
                            preConfirm: function preConfirm(code) {
                                return new Promise(function (resolve, reject) {
                                    $http({
                                        method: 'POST',
                                        url: '/api/checkformatchingcode',
                                        data: {
                                            code: code,
                                            email: r.data.email
                                        }
                                    }).then(function (r) {
                                        swal({
                                            title: 'Enter new password',
                                            input: 'password',
                                            showCancelButton: true,
                                            confirmButtonText: 'Submit',
                                            showLoaderOnConfirm: true,
                                            preConfirm: function preConfirm(password) {
                                                return new Promise(function (resolve, reject) {
                                                    $http({
                                                        method: 'POST',
                                                        url: '/api/changepasswordfromreset',
                                                        data: {
                                                            password: password,
                                                            email: r.data.email
                                                        }
                                                    }).then(function (r) {
                                                        swal({ type: 'success', title: 'Password reset!', html: 'Please log in' });
                                                    }).catch(function (e) {
                                                        swal({ type: 'error', title: 'Error', html: 'We\'re sorry. Looks like there was an error while resetting your password. Please try again.' });
                                                    });
                                                });
                                            },
                                            allowOutsideClick: false
                                        });
                                    }).catch(function (e) {
                                        swal({ type: 'error', title: 'Error', html: 'The code entered does not match the one that we sent you. Please try again.' });
                                    });
                                });
                            },
                            allowOutsideClick: false
                        });
                    }).catch(function (e) {
                        swal({ type: 'error', title: 'Error', html: 'The email entered is not in our database. Please verify your email and try again.' });
                    });
                });
            },
            allowOutsideClick: false
        });
    };
});