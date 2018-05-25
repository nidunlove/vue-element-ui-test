<template>
 
   

    <!-- 添加任务弹窗 -->
    <el-dialog
     v-loading="addDialog.loading"
     
    :title="0===addDialog.type?'添加任务':'编辑任务'"
    :visible.sync="addDialog.dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    width="60%"
    top="10%"
    >
    <!-- <el-main styly="height: 100px;"> -->
      <!-- <span>这是一段信息</span> -->
      <el-form ref="dialogForm" :model="dialogForm" label-width="80px">
        <el-form-item label="任务号">
          <el-input :readonly="1===addDialog.type" v-model="dialogForm.taskCode"></el-input>
        </el-form-item>
       
        <el-form-item label="管理员">

          <el-input v-model="dialogForm.persons" style="width: 200px;"  placeholder="请输入工号" maxlength="10"></el-input>
          <el-button  type="primary" @click="addPerson(dialogForm.persons)">添加</el-button>
          <!-- <el-card style=""> -->
            <ul style="height: 55px; padding: 5px 0;overflow:auto; border: 1px solid #eee;">
              <li v-for="(item,index) in dialogForm.userCodes" style="display:inline-block; margin: 0 10px;">
                <span v-text="item"></span>
                <!-- <el-button type="danger" icon="el-icon-delete" round>删除</el-button> -->
                <el-button type="danger" round @click="delPerson(index,item)" style="">删除</el-button>
                <!-- <el-button type="danger" icon="el-icon-delete" circle @click="delPerson(index,item)"></el-button> -->
              </li>
            </ul>
          <!-- </el-card> -->
        </el-form-item>
        
         

        <el-form-item>
          <el-button type="primary" @click="saveAddTaskModal">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    <!-- </el-main> -->
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" plain @click="closeAddTaskModal()">关 闭</el-button>
      <el-button type="primary" @click="saveAddTaskModal()">确 定<!-- 保存并执行 --></el-button>
    </span>
  </el-dialog>
  

</template>

<script>
// import taskRunDialog from './taskRunDialog.vue'
  export default {
    name: "taskDialog",
    // components: {taskRunDialog},
    data() {
      return {
        // tableHeight: this.$parent.$parent.contenHeight-300,
        userInfo:{
          
        },
        addDialog:{
          dialogVisible: false,
          type:0,
          loading:false
        },

        initModalFormData:{},
        deptData:null,
        dialogForm:{
          taskCode:"",
         
          userCodes:[""],
          
          status:"",
          
        },
        currentRow: null,
 
      }
    },
    created() {
      // console.log(this.tableHeight);
      // console.log(this);
      // console.log(this.$parent.$parent.contenHeight);
      this.userInfo = this.$store.getters.getUserInfo;
      console.log("created console.log(this.userInfo);");
      console.log(this.userInfo);
      
      this.dialogForm.userCodes = [this.userInfo.userCode+""];
      this.initModalFormData = this.dialogForm;
      console.log(this.dialogForm);
      this.init();
    },
    methods: {
      init(){
        // this.getListData();
        // this.getDeptData();
      },


      //更新任务列表数据
      upDateTaskData(){
        console.log("更新任务列表数据");

        let that = this;
        // let userinfo = this.userInfo;
        // let otherData = JSON.parse(userinfo.otherData);
        this.addDialog.loading = true;
        let postData = {

            taskCode:this.dialogForm.taskCode,//任务号
         
            userCode:this.userInfo.userCode,//
            
          };
        console.log(postData);
        // return;
        this.axios.get(eleAllUrl.upDateTaskUrl,postData)
          .then(response => {
            that.addDialog.loading = false;
            console.log("更新任务列表数据返回");
              console.log(response);
              
              let data = response.data;
              console.log(data.data);
              if('OK'==data.data.msg){
           
                  that.$message({
                    message: '更新任务成功！',
                    type: 'success'
                  });

                  // that.openTaskRunModal();
                  

                  that.$parent.$refs.taskRunDialog.openTaskRunModal(this.dialogForm.taskCode,this.userInfo.userCode);
                  // that.getInventoryData(loadTaskNo,loadType);
                  // that.$parent.$refs.taskRunDialog.getInventoryData(loadTaskNo,loadType);
                
              } else {
                
                that.$message.error("更新任务数据有误");
              }
              

          })
          .catch(function (error) {
            console.log(error);
            that.addDialog.loading = false;
            // that.ruleForm.loading = false;
            that.$message.error('更新任务失败！');
            
          });
      },

      openFormModal(type,formData){
        this.addDialog.type = type;
        if(!formData){
          formData = {};
        }

        this.dialogForm.taskCode=formData.taskCode==null?"":formData.taskCode;//任务号

        console.log(this.dialogForm);

        this.addDialog.dialogVisible = true;
      },
      openAddTaskModal(){
        this.openFormModal(0,this.initModalFormData);
      },
      addPerson(item){
        console.log(this.dialogForm);
        if(!item.trim()){
          this.$alert('请输入员工工号！', '提示', {
              type: 'warning',
              confirmButtonText: '确定'
          });
          return;
        }
  
       
              // 插入元素到头部
              // this.dialogForm.userCodes.splice(0,0,item);
              this.dialogForm.userCodes.unshift(item);
              this.dialogForm.persons = "";
            
        
        
      },
      delPerson(index,item){
        this.dialogForm.userCodes.splice(index,1);
      },

      closeAddTaskModal(){
        this.dialogForm = this.initModalFormData;
        this.addDialog.dialogVisible = false;
        this.$parent.init();
      },
      saveAddTaskModal(){
        
        console.log("saveAddTaskModal");
        this.upDateTaskData();
        // this.$parent.$refs.taskRunDialog.openTaskRunModal();
        // this.$parent.$refs.taskRunDialog.getInventoryData("loadTaskNo","loadType");


      },

      // handleClose(done) {
      //   this.$confirm('确认不保存关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
      // },

    },
    
  }
</script>
