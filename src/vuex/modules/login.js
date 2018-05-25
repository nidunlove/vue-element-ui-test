import Vue from 'vue'

const state = {
	 userInfo: { //保存用户登录信息
      userCode: null,
      password: null,
      userType: null,
      token:null,
      
      otherData: null
    }
}

const mutations = {

	//更新用户登录信息
    UPDATE_USERINFO(state, newUserInfo) {
      sessionStorage.setItem('userCode', newUserInfo.userCode);
      sessionStorage.setItem('password', newUserInfo.password);
      sessionStorage.setItem('userType', newUserInfo.userType);
      sessionStorage.setItem('token', newUserInfo.token);
     
      sessionStorage.setItem('otherData', newUserInfo.otherData);
      state.userInfo = newUserInfo;
    },
    //删除用户登录信息
    USER_SIGNOUT(state) {
        sessionStorage.removeItem('userCode');
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('userType');
        sessionStorage.removeItem('token');
        
        sessionStorage.removeItem('otherData');

        Object.keys(state).forEach(k => Vue.delete(state, k))
    }
}

const getters = {
	getUserInfo(state){
		state.userInfo = {
			"userCode":sessionStorage.getItem('userCode'),
			"password":sessionStorage.getItem('password'),
			"userType":sessionStorage.getItem('userType'),
			"token":sessionStorage.getItem('token'),
			
			"otherData":sessionStorage.getItem('otherData'),
		};
		return state.userInfo;
	}
}

const actions = {
	
	UPDATE_USERINFO:({commit}, user) =>{
		commit('UPDATE_USERINFO', user);
	},
	USER_SIGNOUT:({commit}) =>{
		commit('USER_SIGNOUT');
	},

}

export default {
	state,
	mutations,
	getters,
	actions
}