angular.module('spotme').controller('customersCtrl', function($scope, $state, linksService, messageService, userService, locationsService, campaignsService) {
    $scope.overlayShowing = false
    $scope.isAnEdit = false
    var checkingAll = false

    $scope.selectAll = function(reset) {
        if (reset === 'reset') {
            checkingAll = false
        } else {
            checkingAll = !checkingAll
        }
        var checkboxes = document.getElementsByClassName("inputCheckBox");
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkingAll) {
                checkboxes[i].checked = true
            } else {
                checkboxes[i].checked = false
            }

        }
        if (checkboxes[0].checked) {
            $scope.massTextArray = $scope.customers
        } else {
            $scope.massTextArray = []
        }

    }

    locationsService.getLocations(userService.user.id).then(function(res) {
        $scope.locations = res.data
    })
    $scope.getLinks = function(id) {

        linksService.getLinks(id).then(function(res) {
            $scope.links = res.data
            $scope.linkTypesShowing = true;

        })
    }
    $scope.theSelected = -1;
    $scope.chooseLinkType = function(link, i) {
        $scope.theLink = JSON.parse(link)
        $scope.theSelected = i

    }
    $scope.theX = function() {
        $scope.popup = !$scope.popup
    }
    $scope.popup = false
    $scope.addCustomerSection = false
    $scope.updateInputs = true
    $scope.fakeButton = false

    $scope.sendMassLinks = function() {
        if (!$scope.massTextArray.length) {
            swal("Error", "Must select at least one customer", 'error')
            return;
        }
        $scope.popup = !$scope.popup

    }
    $scope.massTextArray = []
    $scope.checkIt = function(customer, i) {
        if (document.getElementsByClassName('inputCheckBox')[i].checked) {
            for (var i = 0; i < $scope.massTextArray.length; i++) {
                if ($scope.massTextArray[i].id == customer.id) {
                    return
                }
            }
            $scope.massTextArray.push(customer)
        } else {
            for (var i = 0; i < $scope.massTextArray.length; i++) {
                if ($scope.massTextArray[i].id == customer.id) {
                    $scope.massTextArray.splice(i, 1)
                }
            }
        }
    }

    $scope.submitMassLink = function() {
        $scope.massTextArray.forEach(function(user) {
            user.userid = userService.user.id
            user.time = new Date()
            user.phone = user.phonenumber
            campaignsService.getActiveCampaign().then(function(res) {
                userService.getCustomer(userService.user.id, user.phone).then(function(custResp) {
                    if (!res.data[0]) {
                        swal("Error", "No campaign message selected!", "error")
                        return
                    }
                    user.message = res.data[0].message
                    user.image = res.data[0].image
                    messageService.addMessage({
                        senttime: user.time,
                        message: user.message,
                        linkid: $scope.theLink.id,
                        userid: userService.user.id,
                        customerid: custResp.data[0].id,
                        linktype: $scope.theLink.name
                    }).then(function(messageRes) {

                        user.link = 'https://www.yes-or-no.info/?one=' + userService.user.id + '&one=' + $scope.theLink.id + '&one=' + custResp.data[0].id + '&one=' + messageRes.data.id

                        messageService.sendMessage(user).then(function(resp) {
                            if (resp.status === 200) {
                                swal("Sent!", "Message sent successfully", "success")
                            }
                        })
                    })

                })
            })
        })
    }

    $scope.cancel = function() {
        $scope.selected = -1
        $scope.flag = false
        $scope.updateInputs = true
        $scope.fakeButton = false
    }

    $scope.fakeUpdate = function() {
        $scope.updateInputs = false
        $scope.fakeButton = true
    }

    $scope.showAddSection = function(id, first, last, phone, email) {
        $scope.customer = {
            id: id,
            firstname: first,
            lastname: last,
            phonenumber: phone,
            email: email
        }
        if (phone) {
            $scope.isAnEdit = true
        }
        $scope.overlayShowing = true
    }
    $scope.hideAddSection = function() {
        $scope.overlayShowing = false
    }
    $scope.submit = function(user) {
        if ($scope.isAnEdit) {
            $scope.updateCustomer($scope.customer)
            $scope.isAnEdit = false
        } else {
            $scope.isAnEdit = false
            if (!user || !user.firstname || !user.lastname || !user.phonenumber) {
                swal("Invalid Input", "Must enter name and phone number", 'error')
                return;
            }
            for (var i = 0; i < $scope.customers.length; i++) {
                if ($scope.customers[i].phonenumber === user.phonenumber) {
                    swal("Error", "Existing phone number", 'error')
                    return;
                }

            }
            if (messageService.phonenumber(user.phonenumber)) {

                $scope.updateInputs = true
                $scope.fakeButton = false
                $scope.selected = -1;
                $scope.flag = false;
                $scope.addCustomerSection = false
                user.userid = userService.user.id
                userService.addCustomer(user).then(function(response) {
                    if (response.status === 200) {
                        userService.getCustomers(userService.user.id).then(function(res) {
                            $scope.overlayShowing = false
                            $scope.customers = res.data.reverse()
                        })
                    }
                })
            }
        }

    }
    var getCustomers = function() {
        userService.getCustomers(userService.user.id).then(function(res) {
            $scope.customers = res.data.reverse()

        })
    }
    getCustomers()

    $scope.deleteCustomer = function(customer) {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this information!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!"
        }).then(function(res) {
            if (res.value) {
                swal("Deleted!", "Successfully deleted.", "success");
                $scope.selected = -1;
                $scope.flag = false;
                $scope.updateInputs = true
                $scope.fakeButton = false
                userService.deleteCustomer(customer.id).then(function(res) {
                    if (res.status === 200) {
                        getCustomers()
                    }
                })
            }

        }).catch(function() {})
    }
    $scope.flag = false
    $scope.showUpdate = function(customer, i) {
        $scope.updateInputs = true
        $scope.fakeButton = false
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

    }

    $scope.selected = -1

    $scope.updateCustomer = function(customer) {
        if (messageService.phonenumber(customer.phonenumber)) {

            $scope.updateInputs = true
            $scope.fakeButton = false
            $scope.selected = -1
            $scope.flag = false
            userService.updateCustomer(customer).then(function(res) {
                if (res.status === 200) {
                    $scope.overlayShowing = false
                    $scope.selectAll('reset');
                    getCustomers()
                }
            })
        }
    }

    $scope.sendLink = function(customer) {
        userService.customer = customer
        $state.go('dashboard.sendLink')
    }

})
