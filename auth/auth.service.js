(function(){
	'use-strict';
	angular.module('myApp.authService',[])
	.factory('AuthServ',['$resource', 'AppConstant', 'StorageService','UtilsServ',function($resource, AppConstant, StorageService,UtilsServ){
		var userInfo = {};
		var lang=null;
		var UserDetails = function(){
			userInfo =StorageService.getUserDetails('userInfo');
			return userInfo;
		};
		var authorize = function(){
			userInfo =StorageService.getUserDetails('userInfo');
			return (!UtilsServ.isUndefinedOrNull(userInfo) && UtilsServ.isSessionExpire(userInfo.sessionExpiryTime))
		}
		var SaveUserDetails = function(user){
			StorageService.setUserDetails('userInfo', user);
			userInfo = user;
		};
		var SaveLanguage = function(language){
			StorageService.setLanguage('lang', language);
			lang = language;
		};
		var getLanguage = function(lang){
			return StorageService.getLanguage('lang');
		};
		var Login = function(){
			return $resource(AppConstant.APP_URL+'/user/login/');
		};
		var Logout = function(){
			return $resource(AppConstant.APP_URL+'/user/logout');
		};
		var UserType = function(){
			return userInfo.userType;
		};

		return {
			'userDetails': UserDetails,
			'setUserDetails' : SaveUserDetails,
			'login': Login,
			'logout': Logout,
			'isAuthenticated' : authorize,
			'getUserType' : UserType,
			'setLanguage' : SaveLanguage,
			'getLanguage' : getLanguage,
		};
	}]);
})();