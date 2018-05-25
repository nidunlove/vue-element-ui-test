<template>
	<div>
		<el-header class="myheader">
		      <el-row>
		        <el-col :span="8">
		          <div class="grid-content">
		            <div class="logoCon" style="">
		              <img src="../../assets/images/logo.png" width="60" height="60" />
		              <span>element-ui 练习</span>
		            </div>
		          </div>
		        </el-col>
		        <el-col :span="12">
		          <div class="grid-content">
		          	&nbsp;
		          </div>
		        </el-col>
		        <el-col :span="4">
		          <div class="grid-content">
		            <span>&nbsp;</span>
		          </div>
		      </el-col>
		      </el-row>
		</el-header>
	<div class="loginAll">
		
		<el-card shadow="always" 
			v-loading="ruleForm.loading"
			element-loading-text="正在登录，请稍候..."
		    element-loading-spinner=""
		    element-loading-background=""
		>
	      <!-- <el-container> -->
				<!-- <el-main> -->
				<h2>登录</h2>
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="loginForm">
					  <el-form-item label="用户名" prop="userCode">
					    <el-input v-model="ruleForm.userCode" placeholder="请输入用户名"></el-input>
					  </el-form-item>
					  <el-form-item label="密码" prop="password">
					    <el-input type="password" v-model="ruleForm.password"  placeholder="请输入密码"></el-input>
					  </el-form-item>
					  <el-form-item label="登录类型" prop="userType">
					    <el-select v-model="ruleForm.userType" placeholder="请选择登录类型">
					      <el-option label="超级管理员" value="admin"></el-option>
					      <el-option label="管理员" value="admin2"></el-option>
					    </el-select>
					  </el-form-item>

					  <el-form-item>
					    <el-button type="primary" style="width: 100%;" @click="submitForm('ruleForm')">登 录</el-button>
					    <!-- <el-button @click="resetForm('ruleForm')">清空</el-button> -->
					  </el-form-item>
					  <div class="loginTipMsg">温馨提示：未注册，请先注册。</div>
					</el-form>
				<!-- </el-main> -->
			<!-- </el-container> -->
	    </el-card>
		
	</div>
</div>
</template>

<script>
  export default {
    data(){
		return{
			loadPackNum:"",
			ruleForm: {
			  loading: false,
	          userCode: '',
	          userType: '',
	          password: '',
	          
	        },
			
			 rules: {
	          userCode: [
	            { required: true, message: '请输入用户名', trigger: 'blur' },
	            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
	          ],
	          
	          password: [
	            { required: true, message: '请输入密码', trigger: 'blur' },
	            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
	          ],
	          userType: [
	            { required: true, message: '请选择登录类型', trigger: 'change' }
	          ]
	        }
		}
	},

	mounted() {
	    console.log("mounted");
	    this.init();
	},
	methods:{

		submitForm(formName) {
			// this.$router.replace({name:'FramePage1'});
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            console.log(this.$store.state);
		         // 开发还是线上环境，是否需要token密码
				 if(this.$store.state.isTestDev){// 开发还环境，不需要token密码
				 	this.loginSuccess({
					 	userCode: this.ruleForm.userCode,
					    password: this.ruleForm.password,
					    deptCode: "",
					    // userType: this.ruleForm.userType,
					    token: "test",
					    otherData: ""
					 });
				 } else {// 线上环境，需要token密码
				 	this.loginAction();
				 }
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
	    resetForm(formName) {
	       this.$refs[formName].resetFields();
	    },

		loginAction(){
	        console.log(this);
	        let that = this;
	        
	        this.ruleForm.loading = true;
	        // console.log(this.axios);
	        // console.log(this.axios.Axios);
	        // console.log(eleAllUrl.loginUrl);
	        this.axios.post(eleAllUrl.loginUrl,{
	          userCode: that.ruleForm.userCode,                                                                                                     
	          password: that.ruleForm.password,
	          userType: "admin",   

	        })
	        .then(response => {
	        	console.log(response);
	        	that.ruleForm.loading = false;
	        	if(200===response.status 
	        		&& 'OK'===response.statusText
	        		&& response.data
	        		&& response.data.token
	        		&& response.data.token.length
	        		&& response.data.token.length<50){
	        		// let token = response.data.msg;
	        		
	        		let resultData = {
	        			retValue:{
	        				empName:"",
	        				
	        				currTime:""
	        			}
	        		}
	        		let otherData = null;
	        		try {
	        			resultData = JSON.parse(response.data.result);
	        			otherData = {
					      	empName: resultData.retValue[0].retValue.empName,
		        			
		        			currTime: resultData.retValue[0].retValue.currTime
					    };
	        		} catch(err){
	        			console.log(err);

	        		}
	        		
	        		that.loginSuccess({
	        		  userCode: that.ruleForm.userCode,
				      password: that.ruleForm.password,
				      token: response.data.token,
				     
				      otherData: JSON.stringify(otherData),
				      userType: that.ruleForm.userType,
				      
	        		});
	        	} else {
			        that.$message.error('登录失败！');
	        	}
	        	
	        })
	        .catch(function (error) {
	          console.log(error);
	          that.ruleForm.loading = false;
	          that.$message.error('登录请求失败！');
	          
	        });
	    },
	    loginSuccess(userinfo){
	    	
	    	this.$message({
	          message: '登录成功！',
	          type: 'success'
	        });
	    	console.log(this.$store.state.login.userInfo);
	    	this.$store.dispatch('UPDATE_USERINFO',userinfo);
	    	this.$router.replace({name:'FramePage1'});

	    },
	    init(){
	    	// console.log(this.$store);
	    	let userinfo = this.$store.state.login.userInfo;
	    	// console.log(userinfo);
	    	if(userinfo){
	    		this.ruleForm.userCode = userinfo.userCode;
	    		this.ruleForm.userType = userinfo.userType;
				this.ruleForm.password = userinfo.password;
	    	}
	    	
	    }
	},
  }
</script>
