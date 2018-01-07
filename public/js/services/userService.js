angular.module('spotme').service('userService', function($http) {
    this.addCustomer = function(user) {
        return $http({method: 'POST', url: '/api/customers', data: user})
    }
    this.getCustomers = function(userid) {
        return $http({
            method: 'GET',
            url: '/api/customers/' + userid
        })
    }
    this.getCustomer = function(userid, phone) {
        return $http({
            method: 'GET',
            url: '/api/customer/' + userid + '/' + phone
        })
    }

    this.getUser = function(userid) {
        return $http({
            method: 'GET',
            url: '/api/user/' + userid
        })
    }
    this.updateUser = function(obj) {
        return $http({
            method: 'PUT',
            url: '/api/user/' + this.user.id,
            data: obj
        })
    }

    this.deleteCustomer = function(customerId) {
        return $http({
            method: 'DELETE',
            url: '/api/customers/' + customerId
        })
    }
    this.updateCustomer = function(customer) {
        return $http({
            method: 'PUT',
            url: '/api/customers/' + customer.id,
            data: customer
        })
    }

    this.user;
    this.customer;

    this.checkPass = function(input) {
        return $http({
            method: "POST",
            url: '/api/password/' + this.user.id,
            data: {
                input: input
            }
        })
    }
    this.changePassword = function(input2) {
        return $http({
            method: "PUT",
            url: '/api/password/' + this.user.id,
            data: {
                input2: input2
            }
        })
    }
    this.signUp = user => {
        return $http({method: 'POST', url: '/auth/signup', data: user})
    }

    this.login = user => {
        return $http({method: 'POST', url: '/auth/login', data: user})
    }

    this.forgotPassword = () => {
        swal({
            title: 'Enter your account email to reset password',
            input: 'email',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: (email) => {
                return new Promise((resolve, reject) => {
                    $http({
                        method: 'POST',
                        url: '/api/resetpassword',
                        data: {
                            email: email
                        }
                    }).then((r) => {
                        swal({
                            title: `Verifying it\'s you`,
                            text: `For your security, we need to verify your identity. We\'ve sent a code to the email ${r.data.email}. Please enter it below.`,
                            input: 'text',
                            showCancelButton: true,
                            confirmButtonText: 'Submit',
                            showLoaderOnConfirm: true,
                            preConfirm: (code) => {
                                return new Promise((resolve, reject) => {
                                    $http({
                                        method: 'POST',
                                        url: '/api/checkformatchingcode',
                                        data: {
                                            code: code,
                                            email: r.data.email
                                        }
                                    }).then((r) => {
                                        swal({
                                            title: `Enter new password`,
                                            input: 'password',
                                            showCancelButton: true,
                                            confirmButtonText: 'Submit',
                                            showLoaderOnConfirm: true,
                                            preConfirm: (password) => {
                                                return new Promise((resolve, reject) => {
                                                    $http({
                                                        method: 'POST',
                                                        url: '/api/changepasswordfromreset',
                                                        data: {
                                                            password: password,
                                                            email: r.data.email
                                                        }
                                                    }).then((r) => {
                                                        swal({type: 'success', title: 'Password reset!', html: 'Please log in'})
                                                    }).catch((e) => {
                                                        swal({type: 'error', title: 'Error', html: 'We\'re sorry. Looks like there was an error while resetting your password. Please try again.'})
                                                    })
                                                })
                                            },
                                            allowOutsideClick: false
                                        })
                                    }).catch((e) => {
                                        swal({type: 'error', title: 'Error', html: 'The code entered does not match the one that we sent you. Please try again.'})
                                    })
                                })
                            },
                            allowOutsideClick: false
                        })
                    }).catch((e) => {
                        swal({type: 'error', title: 'Error', html: 'The email entered is not in our database. Please verify your email and try again.'})
                    })
                })
            },
            allowOutsideClick: false
        })
    }
})
