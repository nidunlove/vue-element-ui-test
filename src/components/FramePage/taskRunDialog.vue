<template>
  

  <!-- 任务执行弹窗 -->
    <el-dialog
     v-loading="taskRunDialog.loading"
     element-loading-text="正在加载..."
    title="执行任务"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="taskRunDialog.dialogVisible"
    :show-close="false"
    width="98%"
    top="0%"
    >
    <el-tabs type="border-card">
      
      <el-tab-pane 
        
        label="正在扫描">
        <div 
          v-loading="submitTask.loading"
          element-loading-text="正在提交..."
          :style="{height:divHeight+'px'}" >
          <!-- 配置管理 -->
          <el-form>
            <el-button 
              v-loading="finshTask.loading"
              element-loading-text="正在提交..."
              type="success" 
              @click="finshTaskRunModal()" 
              style="display: inline-block;margin-right: 5%;">
              完成
            </el-button>
            <div style="display: inline-block; width: 20%;" >
              
              <el-tag type="warning" 
                v-if="taskRunDialog.isCancel">正在进行撤销扫描...</el-tag>

              <audio  id="audio_success" :src='$store.state.staticBaseUrl+"/static/video/success.wav"' preload="auto" style="display:none;"></audio>
              <audio  id="audio_fail" :src='$store.state.staticBaseUrl+"/static/video/fail.wav"' preload="auto"  style="display:none;"></audio >

            </div>

            <el-form-item label="正在读取的件号" style="display: inline-block; width: 40%;">
              
              <textarea name="name"  id="loadPackNum" class="loadPackNum" ref="loadPackNum" v-model="loadPackNum" maxlength="100" style="height: 30px;">
              </textarea>
            </el-form-item>
            

            

            <el-form-item label="扫描加载提示" style="display: inline-block; width: 20%;">
              <el-switch v-model="isShowloadPackNum"></el-switch>
            </el-form-item>
            
            

          </el-form>

          <!-- <input  id="loadPackNum"  ref="loadPackNum" v-model="loadPackNum" readonly />
          <el-form-item label="即时配送">
            <el-switch v-model="isShowloadPackNum"></el-switch>
          </el-form-item> -->
          <el-row :gutter="20" style="height:100%">
            <el-col :span="12" style="height:100%">
              <div style="height: 100%;">

                <el-card class="box-card" style="height:100%;overflow:auto;">
                  <div slot="header" class="clearfix">
                    <span>中不存在的件号</span>
                    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                  </div>
                  <div>
                    <el-alert
                      v-if="runScanList.data.length<=0"
                      title="暂无不存在的件号"
                      :closable="false"
                      type="success">
                    </el-alert>
                    <el-tag type="warning" 
                      style="margin: 10px;"
                      v-for="(item,index) in runScanList.data"
                      :key = "index">
                      {{item}}
                    </el-tag>
                  </div>
                </el-card>
              </div>
            </el-col>
            <el-col :span="12" style="height:100%;">
              <!-- <div style="height: 100%;overflow:auto;"> -->
                <el-card class="box-card" style="height:100%;overflow:auto;">
                  
                  <div>
                    <el-row :gutter="5">
                      <el-col :span="12">扫描次数：</el-col>
                      <el-col :span="12">{{ScanCount}}</el-col>
                    </el-row>
                    <el-row :gutter="5">
                      <el-col :span="12">有效扫描次数：</el-col>
                      <el-col :span="12">{{goodScanCount}}</el-col>
                    </el-row>
                    <el-row :gutter="5">
                      <el-col :span="12">成功上传扫描件数：</el-col>
                      <el-col :span="12">{{successScanCount}}</el-col>
                    </el-row>
                  </div>
                </el-card>


                  

                  
                
              <!-- </div> -->
            </el-col>
          </el-row>
        </div>

        
        
        
      </el-tab-pane>
      <el-tab-pane label="已扫描的明细">
        <el-table
        v-loading="scanInventoryList.loading"
        ref="singleTableTRD"
        :data="scanInventoryList.data"
        border
        style="width: 100%; margin-top: 10px;"
        :max-height='tableHeight'>
          <el-table-column
            fixed
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
           fixed
            prop="cargoNo"
            label="件号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="isScan"
            label="是否撤销"
            :formatter="formatIsScan"
            width="150">
          </el-table-column>
          <el-table-column
            prop="isSweep"
            label="是否强扫"
            :formatter="formatIsSweep"
            width="150">
          </el-table-column>
          <el-table-column
           
            prop="loadTaskNo"
            label="任务号"
            width="150">
          </el-table-column>
          

        </el-table>
        <el-pagination
          style="margin-top: 20px"
          background

          @size-change="pageCurrentChange"
          
          
          :page-sizes="[100, 200, 300, 400]"
          :page-size="200"
          layout="total, sizes, prev, pager, next, jumper"

          current-change="pageCurrentChange(this)"
          prev-click="pageCurrentChange(this)"
          next-click="pageCurrentChange(this)"
          :total="1000">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="明细">
        <el-table
        v-loading="inventoryList.loading"
        ref="singleTableTRD"
        :data="inventoryList.data"
        border
        style="width: 100%; margin-top: 10px;"
        :max-height='tableHeight'>
          <el-table-column
            fixed
            type="index"
            width="50">
          </el-table-column>

          
          <el-table-column
           fixed
            prop="cargoNo"
            label="件号"
            width="250">
          </el-table-column>
          <el-table-column
            prop="cargoName"
            label="件类型"
            width="200">
          </el-table-column>
          <el-table-column
            prop="cargoQty"
            label="件数"
            width="200">
          </el-table-column>
          

        </el-table>
        <el-pagination
          style="margin-top: 20px"
          background

          @size-change="pageCurrentChange"
          
          
          :page-sizes="[100, 200, 300, 400]"
          :page-size="200"
          layout="total, sizes, prev, pager, next, jumper"

          current-change="pageCurrentChange(this)"
          prev-click="pageCurrentChange(this)"
          next-click="pageCurrentChange(this)"
          :total="1000">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
    <!-- <el-main styly="height: 100px;"> -->
      
    <!-- </el-main> -->
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" plain @click="closeTaskRunModal()">关闭</el-button>
      <el-button type="info" plain :disabled="inventoryList.loading" @click="refushTaskRunModal()">刷新</el-button>

      <el-button type="warning" :disabled="inventoryList.loading" @click="cancelTaskRunModal()">
        <span v-if="taskRunDialog.isCancel">关闭撤销</span>
        <span v-if="!taskRunDialog.isCancel">撤销</span>
      </el-button>

      <el-button type="primary" :disabled="!taskRunDialog.isFinshed" @click="submitTaskRunModal()">提交任务</el-button>
    </span>
  </el-dialog>

</template>
<style type="text/css">
.loadPackNum{
  padding: 5px;
  /*line-height: 30px;*/
  font-size: 14px;
  border-radius: 5px;
    background-color: #ccc;
    border: 1px solid #ccc;
    outline:none;
    resize:none;
    font-family:'Avenir', Helvetica, Arial, sans-serif;
  }
  .loadPackNum:focus{
    background-color: #faaf19;
    border: 1px solid #faaf19;
  }
</style>
<script>export default {
  name: "taskRunDialog",
  data() {
    return {

      // props: "msg",
      divHeight: this.$store.state.contenHeight-380,
      tableHeight: this.$store.state.contenHeight-300,
      userInfo: {}
      ,

      taskRunDialog: {
        dialogVisible: false,
        isFinshed: false, //是否完成
        isCancel: false, //是否撤销
        loading:false
      }
      ,
      finshTask: {
        //完成任务接口
        loading: false
      }
      ,
      submitTask: {
        //提交任务接口
        loading: false
      }
      ,
      loadPackNum:"",
      isShowloadPackNum: true, //是否开启扫描加载提示
      ScanCount: 0, //扫描次数合计
      goodScanCount: 0, //有效扫描次数合计
      successScanCount: 0, //成功扫描上传合计
      // initModalFormData:{},
      // deptData:null,
      inventoryList: {
        //显示的数据
        loading: false,
        data:[],
      }
      ,
      scanInventoryList: {
        //已扫描的明细数据
        loading: false,
        data:[],
      }
      ,
      inventoryAllList: {
        //所有数据
        loadTaskNo: "",
        loadType:"",
        data:[]
      }
      , // inventoryAllCargoNoStr:"",//所有件号字符串
      inventoryAllCargoNoMap: {}
      , //所有件号map
      runScanList: {
        //扫描中不存在的数据
        loading: false,
        data:[],
      }
      ,
      upScanList: {
        //上传扫描结果数据
        loading: false,
        postCount: 0, //上传的批次，无论失败与否
        isUpSuccess: 0, //是否上传成功。0正在上传，1上传成功，2上传失败,3返回结果有误
        data:[],
      }
      ,
    }
  }
  ,
  created() {

    this.userInfo=this.$store.getters.getUserInfo;
  }
  ,
  watch: {
    loadPackNum(val, oldVal) {
      //普通的watch监听
      console.log("loadPackNum: "+val, oldVal); // this.loadPackNum = "";
      if(val!=null && ''!=val) {
        this.loadPackNumAction(val);
      }
    }
  }
  ,
  mounted() {
    this.init(); // this.$refs['input'].value = ''
  }
  ,
  methods: {
    formatIsScan(row, column) {
      let val=row.isScan;
      return val?'否': '是';
    }
    ,
    formatIsSweep(row, column) {
      let val=row.isSweep;
      return val?'是': '否';
    }
    ,

    init() {

      this.taskRunDialog.isFinshed=false; //是否完成
      this.taskRunDialog.isCancel=false; //是否撤销
      this.loadPackNum="";
      this.isShowloadPackNum=true; //是否开启扫描加载提示
      this.ScanCount=0; //扫描合计
      this.goodScanCount=0;
      this.successScanCount=0;

      this.scanInventoryList.data=[];

      this.inventoryAllCargoNoMap= {}
      ;

      this.runScanList.data=[];
    }
    , // handleCurrentChange(val) {
    //   this.currentRow = val;
    // },
    pageCurrentChange(parm) {
      console.log(parm);
    }
    , //件号封装成 map 对象
    filterCargoNoMapObj(arr) {
      let reMap= {}
      ;
      for (let i=arr.length - 1;
      i >=0;
      i--) {
        // let keyCargoNo = arr[i].cargoNo;
        reMap[arr[i].cargoNo]=arr[i];
      }
      return reMap;
    }
    , //下拉接口
    getInventoryData(loadTaskNo, loadType) {
      //模拟扫描
      this.autoScanData();

      console.log("下拉接口");
      this.inventoryAllList.loadTaskNo=loadTaskNo;
      this.inventoryAllList.loadType=loadType; // this.$refs.loadPackNum.value = 'red';  
      // console.log(this.$refs.loadPackNum);
      let that=this; // let userinfo = this.userInfo;
      // let otherData = JSON.parse(userinfo.otherData);
      this.inventoryList.loading=true;

      this.axios.get(eleAllUrl.loadInventoryUrlStatic) .then(response=> {
        that.inventoryList.loading=false;

        console.log(response);
        let resultData="";

        that.inventoryAllList.data=response.data.data; ////将件号封装map 对象，方便比对查询，快速去搜索
        that.inventoryAllCargoNoMap=that.filterCargoNoMapObj(that.inventoryAllList.data) ;
        that.$message( {
          message: '成功！',
          type: 'success'
        }
        );


        that.inventoryList.data=response.data.data;

        console.log(that.inventoryList.data);
      }
      ) .catch(function (error) {
        console.log(error);
        that.inventoryList.loading=false;
        that.$message.error('请求下拉信息，请求失败！');
      }
      );
    }
    , //扫描结果上传
    scanUpLoadData(val) {
      let that=this;
      that.successScanCount++; //数据存在则传输
      if(val && val.length>0) {
        
        that.scanInventoryList.data.unshift({
          cargoNo: val,
        });
        if(that.scanInventoryList.data.length>5){
          that.scanInventoryList.data.pop();
        }
      } // console.log(errorResult);
      // that.upScanList.data=errorResultList; // that.upScanList.loading = true;
      that.upScanList.isUpSuccess=0;
      that.upScanList.postCount++;
    }
    , //完成任务
    FinshTaskData() {
      let that=this;
      that.finshTask.loading=true;
      
    }
    , //提交任务
    submitTaskData() {
      let that=this;
      that.submitTask.loading=true;
      that.submitTask.loading=false;
      this.$message( {
        type: 'success',
        message: '提交任务成功!'
      }
      );
    }
    , //播放成功声音
    loadSuccessAudio() {
      var SuccessAudio=document.getElementById("audio_success"); // SuccessAudio.load();
      // SuccessAudio.play();
      SuccessAudio.load();
      SuccessAudio.play();
    }
    , //播放失败声音
    loadFailAudio() {
      var FailAudio=document.getElementById("audio_fail"); // console.log(this.audioDom.AudioFail);
      FailAudio.load();
      FailAudio.play();
    }
    , //模拟值变化
    autoScanData() {
      if(!this.taskRunDialog.isFinshed && this.taskRunDialog.dialogVisible) {
        //模拟值变化阈值
        if(this.ScanCount<=2000) {

          let that=this;
          new Promise((resolve)=> {
            resolve();
          }
          ).then(function() {

            that.loadPackNum=(Math.random()*10).toFixed(0).toString();

            setTimeout(function() {
              that.autoScanData();
              console.log(that.ScanCount);
            }
            , 1000);
          }
          );
        }
      }
    }
    , //值改变触发
    loadPackNumAction(val) {
      // if(val!=null && ''!=val && '\n'===val.substring(val.length-1,val.length)){
      // alert(val.indexOf("\n")>0);
      // alert(val.indexOf("\r")>0);
      return new Promise((resolve)=> {
        console.log("val", val); // console.log("执行并清空");
        // this.loadPackNum = "";
        // console.log(this.loadPackNum);
        // let valArr = [];
        let valArr=val.split("\n");
        console.log("valArr", valArr);
        for (var i=valArr.length - 1;
        i >=0;
        i--) {
          if(valArr[i]) {
            this.loadPackNumChange(valArr[i]);
          }
        }

        resolve();
      }
      );
    }
    , //值改变触发
    loadPackNumChange(val) {
      let that=this;
      this.ScanCount++;

      return new Promise((resolve)=> {

        if(!that.taskRunDialog.isFinshed && that.taskRunDialog.dialogVisible) {
          that.verScanData(val, that.inventoryAllCargoNoMap).then(function(verData) {
            console.log(verData);

            if(verData.isTrue) {
              //不存在的件
              // that.runScanList.data.splice(0,0,val);
              // 插入元素到头部
              that.runScanList.data.unshift(val);
            }
            if(that.isShowloadPackNum) {
              //扫描提示是否开启
              if(!verData.isTrue) {
                //件是否存在
                that.$notify.success( {
                  title: '消息',
                  duration: 1000, // position: 'top',
                  message: val + ' 扫描成功'
                }
                );
                that.loadSuccessAudio();
              }
              else {
                that.$notify.warning( {
                  title: '消息',
                  duration: 5000, // position: 'top',
                  message: val + ' 不存在'
                }
                );
                that.loadFailAudio();
              }
            }
            that.scanUpLoadData(val) //有效扫描
            that.goodScanCount++;
            resolve();
          }
          );
        }
      }
      );
    }
    , //验证扫描错误信息
    verScanData(val, arr) {
      return new Promise((resolve)=> {
        console.log(this.inventoryAllCargoNoMap);
        console.log(val);
        if(this.inventoryAllCargoNoMap[val]) {
          // if(this.inventoryAllCargoNoMap[val]){
          // val 存在于 arr
          resolve( {
            isTrue: false,
            data: this.inventoryAllCargoNoMap[val]
          }
          );
        }
        else {
          //val 不存在于 arr
          resolve( {
            isTrue: true,
            data: {}
          }
          );
        }
      }
      );
    }
    , //打开任务运行弹窗
    openTaskRunModal(loadTaskNo, loadType) {
      console.log("打开");
      this.init();
      this.taskRunDialog.dialogVisible=true;
      this.taskRunDialog.isFinshed=false;
      this.runScanList.data=[];
      this.getInventoryData(loadTaskNo, loadType);
    }
    , //点击完成按钮
    finshTaskRunModal() {
      console.log("完成");
      if(1!==this.upScanList.isUpSuccess || this.upScanList.data.length>0) {
        this.$alert("扫描结果尚未上传完，请稍候..", '提示', {
          type: 'warning',
          confirmButtonText: '确定'
        }
        );
        console.log("扫描结果尚未上传成功，请稍候");

        return;
      }
      else {

      }

      let confirmStr='本次共扫描 '+this.ScanCount+' 次，'+'本次有效扫描 '+this.goodScanCount+' 次，'+'成功上传扫描件数 '+this.successScanCount+' 件，'+'完成后不可继续扫描，是否确认完成?';
       this.$confirm(confirmStr, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
      ).then(()=> {
        this.FinshTaskData();
      }
      ).catch(()=> {}
      );
    }
    , //关闭任务运行弹窗
    closeTaskRunModal() {
      console.log("关闭");
      this.$confirm("正在进行关闭操作，是否确认？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
      ).then(()=> {
        this.taskRunDialog.isFinshed=false;
        this.taskRunDialog.isCancel=false;
        this.taskRunDialog.dialogVisible=false;
      }
      ).catch(()=> {}
      );
    }
    , //刷新重置任务运行
    refushTaskRunModal() {
      console.log("刷新");
      this.$confirm("刷新会将该任务所有数据重置，是否确认？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
      ).then(()=> {
        this.init();
        this.getInventoryData(this.inventoryAllList.loadTaskNo, this.inventoryAllList.loadType);
      }
      ).catch(()=> {}
      );
    }
    , //撤销扫描
    cancelTaskRunModal() {
      console.log("撤销"); // this.taskRunDialog.isFinshed = false;
      if(!this.taskRunDialog.isCancel) {
        this.$confirm('请确认是否进行撤销扫描?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
        ).then(()=> {
          this.taskRunDialog.isCancel=true;
        }
        ).catch(()=> {}
        );
      }
      else {
        this.$confirm('请确认是否取消撤销扫描，进行正常扫描?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
        ).then(()=> {
          this.taskRunDialog.isCancel=false;
        }
        ).catch(()=> {}
        );
      }
    }
    , //提交任务
    submitTaskRunModal() {
      console.log("提交");
      this.$confirm('请确认是否提交本次任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
      ).then(()=> {

        this.submitTaskData();
      }
      ).catch(()=> {}
      );
    }
    ,
  }
  ,
}

</script>
