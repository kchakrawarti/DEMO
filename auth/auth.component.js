(function(){
    'use-strict',

    angular.module('myApp.authCtrl',[])

    .controller('authController',['$scope', '$rootScope', 'AuthServ', '$state', 'UtilsServ', 'growl', 'LoggerServ', '$translatePartialLoader', '$translate', 'AppConstant','$window','$timeout' ,function($scope, $rootScope, AuthServ, $state, UtilsServ, growl, LoggerServ, $translatePartialLoader, $translate, AppConstant, $window,$timeout){
       
    	
        $rootScope.preferredLanguage = function(lang){           
             AuthServ.setLanguage(lang);
             var lan=AuthServ.getLanguage('lang');
            $translate.use(lan+"-IN");
        }; 

        $translatePartialLoader.addPart('login');
        $translate.refresh();

        $rootScope.changetheme=function(themeColor){
            $rootScope.themeColor=themeColor;
        };
        
        var runClock = function(){
 	 		$rootScope.clock = "loading clock..."; // initialise the time variable
		    var tick = function() {
		        $rootScope.clock = Date.now() // get the current time
		        $timeout(tick, 1000); // reset the timer
		    }
		    // Start the timer
		    tick();
 	 	};

       

        $scope.login = function(){
            $scope.user.apiKey = AppConstant.API_KEY;
            AuthServ.login().save({"loginRequest":$scope.user},function(response){
                if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                    LoggerServ.log(response);
                    growl.success("User Login Successfully!!!");
                    $rootScope.isLogin = true;
                    $rootScope.userInfo = response.userDetails;
                    AuthServ.setUserDetails(response.userDetails);
                   // $window.location.href = '/';
					// $window.location.href = '/TraderPortal/#/dashboard';
                    runClock();
                    $state.go('dashboard');
                  
                }else{
                    LoggerServ.log(response);
                    growl.error(response.responseHeader.errMsg);
                }               
            });
        };

        $scope.logout = function(){
            AuthServ.logout().save({},function(response){
                if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                    LoggerServ.log(response);
                    growl.success("User logout Successfully!!!");
                    $rootScope.isLogin = false;
                    $rootScope.userInfo = null;
                    AuthServ.setUserDetails(null);
                    $state.go('login');
                }else{
                    LoggerServ.log(response);
                    growl.error(response.responseHeader.errMsg);
                } 
            });
        }
    }]);
})();