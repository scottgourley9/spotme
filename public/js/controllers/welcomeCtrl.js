angular.module('spotme').controller('welcomeCtrl', function($document, $scope, $state, messageService){
window.scrollTo( 0, 0 );
var a = 0;

$document.on('scroll', function(){
  if($(this).scrollTop() > 75){
    $('.welcomeNav').css({backgroundColor: '#ffffff', opacity: 1}, 'slow');
    $('.nav-items li').css({color: 'black', opacity: 1}, 'slow');
}
if($(this).scrollTop() <= 75){
  $('.welcomeNav').css({backgroundColor: 'none', opacity: 1}, 'slow');
  $('.nav-items li').css({color: 'white', opacity: 1}, 'slow');

}
    if(document.location.hash === "#/") {


  var oTop = $('#counter').offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $('.counter-value').each(function() {
      var $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
          countNum: countTo
        },

        {

          duration: 3000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
          }

        });
    });
    a = 1;
  }
  }

})

$scope.hamMenuShowing = false;
$scope.slideMenu = []
  $scope.hamClick = function(){
    $scope.slideMenu.splice(0)

    if(!$scope.hamMenuShowing){
      // $scope.slideMenu.push('animated bounceInDown')
      $scope.hamMenuShowing = !$scope.hamMenuShowing
    }
    else {
      // $scope.slideMenu.push('animated bounceOutUp')
      setTimeout(function(){
        $scope.hamMenuShowing = !$scope.hamMenuShowing
      }, 500)

      // $scope.slideMenu.splice(0)
    }

  }


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


})
