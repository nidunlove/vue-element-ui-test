<template>
  <div style="width: inherit; height:inherit;">
    <el-container>
      <el-header class="contentHeader" style="">
        <h3>任务列表</h3>
      </el-header>
      <el-main 
        v-loading="taskList.loading"
        element-loading-text="正在加载..."
      >
        

        <el-row :gutter="24">
          <el-col :span="4">
            <el-button type="primary" plain @click="openAddTaskModal()">新建任务</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="danger" plain @click="openRunModal()">执行</el-button>
          </el-col>
          <el-col :span="16">
            <el-alert
              v-if="null!=currentRow"
              title=""
              :closable="false"
              type="success">
              <slot>任务号：{{currentRow.taskCode}}</slot>
            </el-alert>
          </el-col>
        </el-row>

        
        
        

        <!-- <input type="text" /> -->
        
      <el-table
        ref="singleTableF1"
        :data="taskList.data"
        border
        style="width: 100%; margin-top: 10px;"
        :max-height="tableHeight"
        
        highlight-current-row
        @current-change="handleCurrentChange">

        <!-- <el-table-column
          type="selection"
          width="55">
        </el-table-column> -->
        <el-table-column
          fixed
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          fixed
          prop="taskCode"
          label="任务号"
          width="250">
        </el-table-column>
        <el-table-column
          
          prop="status"
          label="状态1"
          width="200">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态2"
          :formatter="formatStatus"
          width="200">
        </el-table-column>
        
        <el-table-column
          fixed="right"
          label="操作"
          width="240">
          <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px"
        background
        layout="prev, pager, next"
        current-change="pageCurrentChange(this)"
        prev-click="pageCurrentChange(this)"
        next-click="pageCurrentChange(this)"
        :total="1000">
      </el-pagination>
      
    </el-main>

    </el-container>

    <!-- 添加任务弹窗 -->
  <task-det-dialog ref="taskDialog"></task-det-dialog>

  <!-- 任务执行弹窗 -->
  <task-run-dialog ref="taskRunDialog"></task-run-dialog>

</div>
</template>

<script>
import taskDialog from './taskDialog.vue'
import taskRunDialog from './taskRunDialog.vue'

  export default {
    components: {taskRunDialog,'task-det-dialog':taskDialog},
    data() {
      return {
        tableHeight: this.$store.state.contenHeight-260,
        userInfo:{
          "deptCode":"",
          "deptName":""
        },
        loadPackNum:"",
        currentRow: null,
        
        taskList: {
          loading: false,
          data:[],
        },

      }
    },
    created() {
      // console.log(this.tableHeight);
      // console.log(this);
      // console.log(this.$parent.$parent.contenHeight);
      this.userInfo = this.$store.getters.getUserInfo;
      // console.log("created console.log(this.userInfo);");
      // console.log(this.userInfo);
      // this.dialogForm.deptCode = this.userInfo.deptCode;
      // this.dialogForm.deptName = this.userInfo.deptName;
      // this.dialogForm.userCodes = [this.userInfo.userCode+""];
      // this.initModalFormData = this.dialogForm;
      // console.log(this.dialogForm);
      this.init();
    },
    methods: {
      init(){
        this.getListData();
        // this.getDeptData();
      },

      formatStatus(row, column){
        let status = row.status;
        switch(row.status){
          case 'LOADING': status="进行中";break;
          case 'UNSTART': status="未开始";break;
          case 'FINISHED': status="已完成";break;
          default: break;
        }
        return status;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      // //获取任务列表数据
      getListData(){
        console.log("请求列表数据");
        let that = this;
        // let userinfo = this.userInfo;

        // let otherData = JSON.parse(userinfo.otherData);
        this.taskList.loading = true;
        this.axios.get(eleAllUrl.taskListUrl)
          .then(response => {
            that.taskList.loading = false;
            console.log("列表数据");
            console.log(response);
            
            that.taskList.data = response.data.data;
            console.log(that.taskList.data);
            // that.ruleForm.loading = false;

          })
          .catch(function (error) {
            console.log(error);
            that.taskList.loading = false;
            // that.ruleForm.loading = false;
            that.$message.error('请求任务列表失败！');
            
          });
      },

      handleCurrentChange(val) {
        this.currentRow = val;
        console.log(val);
        if(val && val.taskCode){
          this.$message.success('选择任务号 '+ val.taskCode +' 成功');
        } else {
          this.$message.warning('请选择任务');
        }
        
      },

      openAddTaskModal(){
        // this.openFormModal(0,this.initModalFormData);
        this.$refs.taskDialog.openFormModal(0,null);
      },

      openRunModal(){
        console.log(this.currentRow);
        if(!this.currentRow){
          this.$message.error('请先选择需执行的任务');
          return;
        }
        this.$refs.taskDialog.openFormModal(1,this.currentRow);
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

<style type="text/css">

</style>
