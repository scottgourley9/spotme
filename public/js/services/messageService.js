angular.module('spotme').service('messageService', function($http){
  this.sendMessage = function(obj){
    return $http({
      method: 'POST',
      url: '/api/sendmessage',
      data: obj
    })
  }
  this.sendEmail = function(obj){
    return $http({
      method: 'POST',
      url: '/api/sendemails',
      data: obj
    })
  }

  this.getMessages = function(userId){
    return $http({
      method: 'GET',
      url: '/api/messages/' + userId
    })
  }

  this.addMessage = function(obj){
    return $http({
      method: 'POST',
      url: '/api/messages',
      data: obj
    })
  }

  this.positive = function(id){
    return $http({
      method: 'PUT',
      url: '/api/positivemessage/' + id
    })
  }

  this.negative = function(id){
    return $http({
      method: 'PUT',
      url: '/api/negativemessage/' + id
    })
  }

  this.complaint = function(id, complaint){
    return $http({
      method: 'PUT',
      url: '/api/complaint/' + id,
      data: {complaint: complaint}
    })
  }

  this.ValidateEmail = function (email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return (true)
  }
    swal("Error", "Invalid email address", 'error')
    return (false)
  }

  this.phonenumber = function (inputtxt) {
  var phoneno = /^\d{10}$/;
  if(inputtxt.match(phoneno)) {
      return true;
      }
      else
      {
        swal("Error", "Invalid phone number, must be numbers with no spaces or symbols and a length of 10 characters", 'error')
        return false;
      }
  }




})
