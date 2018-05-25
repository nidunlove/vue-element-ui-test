<template>
<div>
<el-header class="myheader" style="">
      <el-row>
        <el-col :span="8">
          <div class="grid-content">
            <div class="logoCon" style="">
              <!-- <i class="logoTest"></i> -->
              <img src="../assets/images/logo.png" width="60" height="60" />
              <span>element-ui 练习</span>

            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            &nbsp;
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content" style=" height: 60px;overflow: hidden;">
            
            <!-- <i class="el-icon-info"></i> -->
            
            <span v-text="userName"></span>
            &nbsp;&nbsp;
            <span v-text="userCode"></span>
            
            <el-button type="text" style="margin-left: 10px; padding:0 10px;" @click="loginOut()">
              <i class="el-icon-setting" style="display:inline-block;padding-right:10px;"></i>退出
            </el-button>
          </div>
      </el-col>
      </el-row>
</el-header>

<el-container class="frameCon" :style="{height:contenHeight-120+'px'}">
  <el-aside class="frameAside" width="200px" style="">
    <el-menu :default-openeds="['1', '2']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>菜单1</template>
        <el-menu-item-group>
          <template slot="title">菜单1-1 tit</template>
          <el-menu-item index="1-1" @click="toPage('FramePage1')">菜单1-1</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">ES6 练习</template>
          <el-menu-item index="1-3" @click="toPage('FramePage2')">ES6 练习1</el-menu-item>
          <el-menu-item index="1-4">菜单1-4</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>菜单2</template>
        <el-menu-item-group>
          <template slot="title">菜单2 tit</template>
          <el-menu-item index="2-1">菜单2-1</el-menu-item>
          <el-menu-item index="2-2">菜单2-2</el-menu-item>
        </el-menu-item-group>
  
      </el-submenu>

    </el-menu>
  </el-aside>
  <router-view/>
  
</el-container>
<el-footer class="frameFooter">&copy;</el-footer>
</div>
</template>

<script>
  export default {
    name: 'Frame',
    data() {
      return {
        contenWidth: this.$store.state.contenWidth,
        contenHeight: this.$store.state.contenHeight,
        userCode: this.$store.state.login.userInfo.userCode,
        userName: ""
       
      }
    },
    mounted() {
      this.init();
    },
    methods:{
      init(){
        try {
          this.userCode = this.$store.getters.getUserInfo.userCode;
          let otherData = JSON.parse(this.$store.getters.getUserInfo.otherData);
          this.userName = otherData.userName;

        } catch(err){
          console.log(err);
        }
        
      },
      loginOut(){
        this.$confirm('请确认是否退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          this.$store.dispatch('USER_SIGNOUT');
          this.$router.replace({name:"Login"});  
        }).catch(() => {
                
        });
      // this.axios.post(AIallUrl.outUrl).then(response=>{
        // console.log(response.data);
              
      // })
      },
      toPage(pageName){
        this.$router.push({name:pageName}); 
      }
    }
  };
</script>