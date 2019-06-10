<template>
    <div>
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <span>案件编号</span>
                    <el-input v-model="code" disabled="disabled" style="width:150px;" placeholder="请输入内容"></el-input>
                </div> 
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-light">
                    <span>筛查开始时间</span>
                    <el-date-picker
                    v-model="startdate"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="date"
                    style="width:140px;"
                    :disabled="disabled"
                    placeholder="选择日期">
                    </el-date-picker>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <span>筛查截止时间</span>
                    <el-date-picker
                    v-model="enddate"
                    type="date"
                     :disabled="disabled"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width:140px;"
                    placeholder="选择日期">
                    </el-date-picker>
                </div>
            </el-col>
        </el-row>

         <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                  <span class="red">*</span>
                    <span>监控对象</span>
                    <el-select v-model="monitor"  :disabled="disabled" placeholder="请选择" style="width:120px;">
                    <el-option
                    v-for="item in monitorOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
            </el-select>
                </div> 
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-light">
                    <span class="red">*</span>
                    <span>定点单位编号</span>
                    <el-input v-model="fixedCode" :disabled="disabled" style="width:140px;" placeholder="请输入内容"></el-input>
                    <i class="el-icon-circle-plus plus" @click="organSelect" v-show="this.issueFlag==1"></i>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <span>定点单位名称</span>
                    <el-input v-model="fixedHopital" :disabled="disabled" style="width:140px;" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
        </el-row>

        <el-row>

            <el-col :span="8">
                <div class="grid-content bg-purple-light">
                    <span>定点单位等级</span>
                    <el-input v-model="fixedGrade" :disabled="disabled" style="width:140px;" placeholder="请输入内容"></el-input>
                   
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <span>定点单位类别</span>
                    <el-input v-model="fixedType" :disabled="disabled" style="width:140px;" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <span class="red">*</span>
                    <span>登记类型</span>
                    <el-select v-model="register" :disabled="disabled" placeholder="请选择">
                            <el-option
                            v-for="item in registerOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                    </el-select>
                    <i class="el-icon-circle-plus plus" @click="regisClick" v-show="this.issueFlag == 1"></i>
                </div> 
            </el-col>
            
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
                <span>疑点</span>
                <el-table
                    :data="queryData"
                    style="width: 100%;">
                   <!--  <el-table-column
                    fixed
                    prop="index"
                    width="50px"
                    label="序号">
                    </el-table-column> -->
                    <el-table-column
                    prop="acceptMode"
                    width="100px"
                    label="登记类型">
                    </el-table-column>
                    <el-table-column
                    prop="ruleName"
                      width="100px"
                    label="监控规则">
                    </el-table-column>
                    
                    <el-table-column
                    prop="ruleDescription"
                    label="疑点筛查说明">
                    </el-table-column>
                    <el-table-column
                    v-if="this.issueFlag==4||this.issueFlag==5"
                    prop="description"
                    width="100px"
                    label="结论">
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    v-if="this.issueFlag==1"
                    width="180px">
                    <template slot-scope="scope">
                        <el-button
                        @click.native.prevent="deleteRow(scope.$index,queryData, scope.row)"
                        type="text"
                        size="small">
                        删除
                        </el-button>
                    </template>
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    v-if="this.issueFlag==2"
                    width="180px">
                    <template slot-scope="scope">
                        <el-button
                        @click.native.prevent="deleteRow(scope.$index,queryData, scope.row)"
                        type="text"
                        size="small">
                        删除
                        </el-button>
                        <el-button @click="checkClick(scope.row)" v-show="scope.row.acceptMode=='系统检出'" type="text" size="small">查看</el-button>
                    </template>
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    v-if="this.issueFlag==4"
                    width="180px">
                    <template slot-scope="scope">
                        <el-button
                        @click="handleClick(scope.row)"
                        type="text"
                        size="small">
                        结论录入
                        </el-button>
                        <el-button @click="checkClick(scope.row)" v-show="scope.row.acceptMode=='系统检出'" type="text" size="small">查看</el-button>
                    </template>
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    v-if="this.issueFlag==3||this.issueFlag==5"
                    width="180px">
                    <template slot-scope="scope">
                        <el-button @click="checkClick(scope.row)" v-show="scope.row.acceptMode=='系统检出'" type="text" size="small">查看</el-button>
                    </template>
                    </el-table-column>
                </el-table>

            </div>
          </el-col>
        </el-row>
         <transition name="el-zoom-in-center">
             <div v-show="gularList" class="gular">
               
                  <span>结论：</span>
                  <el-input  type="textarea" :rows="6" v-model="remarkDes" style="width:76%;" placeholder="请输入内容"></el-input>
                  <p style="text-align:center;">
                        <el-button type="success" icon="el-icon-check" @click="remarkSave">确认</el-button>
                        <el-button type="danger" icon="el-icon-close" @click="smallClose">关闭</el-button>
                  </p>
             </div>
        </transition>

          <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <span class="red">*</span>
                    <span>案件说明</span>
                    <el-input  type="textarea" v-model="accessDes" :disabled="fourDisabled" style="width:76%;" placeholder="请输入内容"></el-input>
                </div>          
            </el-col>
        </el-row>
        <br>
        <div>
            <span>附件上传</span>
            
            <p style="text-align:center;" v-show="fileShow">
              暂无附件
            </p>
            <div v-show="!fileShow">
                <div v-for="(it,index) in this.fileInfoArray" :key="index">
                    <p style="margin-left:10%;">{{it.fileName}}</p>
                </div>

                 <div v-for="(it,index) in fileList" :key="index">
                            <p style="margin-left:10%;">{{it.fileName}}
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <!--   <span>附件描述：</span>
                                <span>{{it.fileDescription}}</span> -->
                            </p>
                          
                           <!--  <div class="filebtn" >
                                  <el-button style="margin-left:26%;" type="danger" size="mini" @click="fileDelete(it)">删除</el-button>
                                  <a :href="it.downloadUrl">
                                        <el-button type="primary" size="mini">下载</el-button>
                                  </a>
                            </div> -->
                        </div>
            </div>

            
      
            <!-- <el-button type="primary" icon="el-icon-upload" @click="fileUpload">附件上传</el-button> -->
        </div>
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <span>监控人员</span>
                    <el-input v-model="peopleMonitor" :disabled="fourDisabled" style="width:140px;" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <span>监控人员上级</span>
                    <el-input v-model="topMonitor" :disabled="fourDisabled" style="width:140px;" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" v-show="this.issueFlag==4||this.issueFlag==5">
                <div class="grid-content bg-purple-dark">
                    <span>处理结果描述</span>
                    <el-input  type="textarea" v-model="resultDes" style="width:76%;" placeholder="请输入内容"></el-input>
                </div>          
            </el-col>
        </el-row>
            <p style="text-align:center;">
                <el-button type="primary" icon="el-icon-upload" @click="fileUpload" v-show="this.issueFlag!=3&&this.issueFlag!=5">附件上传</el-button>
                <el-button type="primary" icon="fa fa-floppy-o" @click="issueSave" v-show="this.issueFlag!=3&&this.issueFlag == 1">保存</el-button>
                <el-button type="success" icon="fa fa-floppy-o" @click="issueEditSave" v-show="this.issueFlag == 2">保存</el-button>
                <el-button type="success" icon="fa fa-floppy-o" @click="resultEditSave" v-show="this.issueFlag == 4">保存</el-button>
                <el-button type="danger" icon="fa fa-minus-circle" @click="mainClear">取消</el-button>
            </p>
        <el-dialog :title="btnTitle" v-if='btnVisible' :visible.sync="btnVisible" width="70%" top="10px" :append-to-body='true'>
            <btnSelect :btnNumber="btnNumber" :startdate="startdate" :enddate="enddate" :register="register" :fixedCode="fixedCode" :checkData="checkData"  v-on:otherhidden="hiddenand" v-on:serchList="serchList" v-on:oneList="oneList" v-on:issueList="issueList" v-on:activeList="activeList" v-on:systemList="systemList"></btnSelect>
        </el-dialog>
    </div>
</template>

<script>
import btnSelect from "./btnSelect.vue";
import axios from "axios";
export default {
  props: [
    "rowId",
    "issueFlag",
    "issueEdit",
    "fileList",
    "questionList",
    "hoslist",
    "transCode"
  ],
  data() {
    return {
      code: "",
      startdate: "",
      enddate: "",
      monitor: "",
      monitorOptions: [
        {
          value: "1",
          label: "医院/药店"
        },
        {
          value: "2",
          label: "医师"
        },
        {
          value: "3",
          label: "参合人员"
        }
      ],
      registerOptions: [
        {
          value: "1",
          label: "系统检出"
        },
        {
          value: "2",
          label: "主动稽核"
        },
        {
          value: "3",
          label: "问题登记"
        }
      ],
      register: "",
      fixedCode: "",
      issueCode: "",
      fixedHopital: "",
      fixedGrade: "",
      fixedType: "",
      fixedType: "",
      queryData: [],
      accessDes: "",
      //处理结果描述
      resultDes: "",
      peopleMonitor: "",
      topMonitor: "",
      btnVisible: false,
      btnNumber: 0,
      btnTitle: "",
      fileInfoArray: [],
      //文件显示
      fileShow: true,
      disabled: false,
      fourDisabled: false,
      gularList: false,
      remarkDes: "",
      resultId: "",
      acceptMode: "",
      //违规人员详情
      checkData: []
    };
  },
  watch: {
    transCode: {
      immediate: true,
      handler: function(val) {
        // console.log(val);
        let _this = this;
        setTimeout(function() {
          _this.code = val;
        }, 100);

        // console.log(_this.code);
      }
    },
    issueFlag: {
      immediate: true,
      handler: function(val) {
        console.log(val);
        if (val == 2) {
          this.disabled = true;
        } else if (val == 4) {
          this.fourDisabled = true;
          this.disabled = true;
        } else {
          this.fourDisabled = false;
          this.disabled = false;
        }
        /*  if (val != 2 && val != 4) {
          this.disabled = false;
        } else {
          this.disabled = true;
        } */
      }
    },

    //文件展示
    fileList(val) {
      console.log(val);
      // this.editfileList = val;
      if (val != "") {
        this.fileShow = false;
      } else {
        this.fileShow = true;
      }
    },
    //监听数据
    issueEdit(val) {
      this.editforAdd(val);
    },
    hoslist(val) {
      console.log(val);
      this.hosAdd(val);
    },
    fileInfoArray(val) {
      if (val != "") {
        this.fileShow = false;
      } else {
        this.fileShow = true;
      }
    },
    questionList(val) {
      console.log(val);
      this.queryData = val;

      for (let i = 0; i < this.queryData.length; i++) {
        if (this.queryData[i].acceptMode == "2") {
          this.queryData[i].acceptMode = "系统检出";
        } else if (this.queryData[i].acceptMode == "1") {
          this.queryData[i].acceptMode = "主动稽核";
        } else if (this.queryData[i].acceptMode == "4") {
          this.queryData[i].acceptMode = "问题登记";
        }
      }
    }
  },

  methods: {
    //新增，编辑，查看的显示
    //时间戳的显示
    timeDate() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      var millsecond = date.getMilliseconds();
      var time =
        year +
        "" +
        month +
        "" +
        day +
        "" +
        hour +
        "" +
        minute +
        "" +
        second +
        "" +
        millsecond;
      // console.log(day);
      this.code = time;
      console.log(time);
    },
    deleteRow(index, rows, row) {
      // rows.splice(index, 1);
      console.log(index, row);
      this.$confirm("确认删除此条数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            method: "post",
            url:
              axios.PARK_API +
              "/inspectionintegrity/Inspection_integrity/bizauddetail/delete",
            params: {
              id: row.id
            }
          })
            .then(res => {
              if (res.data.code == 0) {
                this.$message.success("删除成功");
                rows.splice(index, 1);
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(error => {
              // this.$message.error("请检查网络");
            });
        })
        .catch(() => {});
    },
    //定点单位后的加号
    organSelect() {
      this.btnNumber = 0;
      this.btnTitle = "选择机构";
      this.btnVisible = true;
    },
    //登记类型后面的加号
    regisClick() {
      if (this.register != "") {
        if (this.register == "1") {
          this.btnNumber = 4;
          this.btnTitle = "系统检出";
        } else if (this.register == "2") {
          this.btnNumber = 7;
          this.btnTitle = "主动稽核";
        } else if (this.register == "3") {
          this.btnNumber = 5;
          this.btnTitle = "问题登记";
        }
        this.btnVisible = true;
      } else {
        this.$message.warning("请先选择对应的项目");
      }
    },
    //附件上传
    fileUpload() {
      this.btnNumber = 3;
      this.btnVisible = true;
      this.btnTitle = "主动稽核";
    },
    hiddenand() {
      this.btnVisible = false;
    },
    mainClear() {
      this.$emit("mainhidden");
    },
    //获取定点医疗机构信息
    oneList(val) {
      console.log(val);
      this.fixedCode = val.hospitalCode;
      this.fixedHopital = val.hospitalName;
      this.fixedGrade = val.hospitalGrade;
      this.fixedType = "医院";
    },
    //获取问题列表中的医院ID
    issueList(val) {
      console.log(val);
      this.issueCode = val.issueId;
      this.fixedCode = val.Code;
      this.acceptMode = "4";
      let queryObj = {};
      queryObj.acceptMode = "4";
      queryObj.ruleDescription = val.ruleDescription;
      queryObj.ruleName = val.ruleName;
      this.queryData.push(queryObj);
      for (let i = 0; i < this.queryData.length; i++) {
        if (this.queryData[i].acceptMode == "2") {
          this.queryData[i].acceptMode = "系统检出";
        } else if (this.queryData[i].acceptMode == "1") {
          this.queryData[i].acceptMode = "主动稽核";
        } else if (this.queryData[i].acceptMode == "4") {
          this.queryData[i].acceptMode = "问题登记";
        }
      }
    },
    //主动稽核子传父数据
    activeList(val) {
      console.log(val);
      this.acceptMode = "1";
      let queryObj = {};
      queryObj.acceptMode = "1";
      queryObj.ruleDescription = val.ruleDescription;
      queryObj.ruleName = val.ruleName;
      this.queryData.push(queryObj);
      for (let i = 0; i < this.queryData.length; i++) {
        if (this.queryData[i].acceptMode == "2") {
          this.queryData[i].acceptMode = "系统检出";
        } else if (this.queryData[i].acceptMode == "1") {
          this.queryData[i].acceptMode = "主动稽核";
        } else if (this.queryData[i].acceptMode == "4") {
          this.queryData[i].acceptMode = "问题登记";
        }
      }
    },

    //系统检出子传父数据
    systemList(val) {
      console.log(val);
      let queryObj = {};
      this.acceptMode = "2";
      queryObj.acceptMode = "2";
      queryObj.ruleDescription = val.ruleDescription;
      queryObj.ruleName = val.ruleName;

      queryObj.orderIdArray = val.shuzu;
      this.queryData.push(queryObj);
      for (let i = 0; i < this.queryData.length; i++) {
        if (this.queryData[i].acceptMode == "2") {
          this.queryData[i].acceptMode = "系统检出";
        } else if (this.queryData[i].acceptMode == "1") {
          this.queryData[i].acceptMode = "主动稽核";
        } else if (this.queryData[i].acceptMode == "4") {
          this.queryData[i].acceptMode = "问题登记";
        }
      }
    },
    //添加数据成功
    issueSave() {
      if (
        this.monitor != "" &&
        this.fixedCode != "" &&
        this.accessDes != "" &&
        this.register != ""
      ) {
        for (let i = 0; i < this.queryData.length; i++) {
          if (this.queryData[i].acceptMode == "系统检出") {
            this.queryData[i].acceptMode = "2";
          } else if (this.queryData[i].acceptMode == "主动稽核") {
            this.queryData[i].acceptMode = "1";
          } else if (this.queryData[i].acceptMode == "问题登记") {
            this.queryData[i].acceptMode = "4";
          }
        }
        var data = {};
        if (this.issueCode != "") {
          data.caseCode = this.code;
          data.startDate = this.startdate;
          data.endDate = this.enddate;
          data.objectType = this.monitor;
          data.objectCode = this.fixedCode;
          data.objectName = this.fixedHopital;
          data.fileInfoArray = this.fileInfoArray;
          data.detailArray = this.queryData;
          data.id = this.issueCode;
          data.startDate = this.startdate;
          data.endDate = this.enddate;
          data.caseStatus = "1";
          data.sourceStatus = "2";
          data.caseDescription = this.accessDes;
          data.caseBy = this.peopleMonitor;
          data.auditBy = this.topMonitor;
          data.acceptMode = this.acceptMode;
          // data.grade =  this.fixedGrade;
        } else {
          data.caseCode = this.code;
          data.startDate = this.startdate;
          data.endDate = this.enddate;
          data.objectType = this.monitor;
          data.objectCode = this.fixedCode;
          data.objectName = this.fixedHopital;
          data.fileInfoArray = this.fileInfoArray;
          data.detailArray = this.queryData;
          data.startDate = this.startdate;
          data.endDate = this.enddate;
          data.caseStatus = "1";
          data.sourceStatus = "2";
          data.caseDescription = this.accessDes;
          data.caseBy = this.peopleMonitor;
          data.auditBy = this.topMonitor;
          data.acceptMode = this.acceptMode;
        }
        axios({
          method: "post",
          url:
            axios.PARK_API +
            "/inspectionintegrity/Inspection_integrity/bizauddetail/saveAndUpdateQuestion",
          data: data /*JSON.stringify({
           caseCode: this.code,
          startDate: this.startdate,
          endDate: this.enddate,
          objectType: this.monitor,
          objectCode: this.fixedCode,
          objectName: this.fixedHopital,
          fileInfoArray: this.fileInfoArray,
          detailArray: this.queryData,
          // id:this.issueCode,
          startDate:this.startdate,
          endDate:this.enddate,
          caseStatus:"1",
          sourceStatus:"2", 

        })*/,
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
          .then(res => {
            if (res.data.code == 0) {
              this.$message.success("添加成功");
              this.fileInfoArray = [];
              this.queryData = [];
              this.$emit("mainhidden");
              this.$emit("doubtInit");
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(error => {
            // this.$message.error("请检查网络");
          });
      } else {
        this.$message.warning("带*的为必填项，以及后面的㈩为必选项");
      }
    },

    //修改问题之前先添加数据
    editforAdd(val) {
      // console.log(val)
      this.code = val.caseCode;
      this.monitor = val.objectType;
      this.fixedCode = val.objectCode;
      this.fixedHopital = val.objectName;
      this.accessDes = val.caseDescription;
      this.peopleMonitor = val.caseBy;
      this.topMonitor = val.auditBy;
      this.startdate = val.startDate;
      this.enddate = val.endDate;
      this.resultDes = val.resultDescription;
    },
    hosAdd(val) {
      // console.log(val)
      this.fixedGrade = val.grade;
      this.fixedType = val.hostype;
    },
    //修改数据成功
    issueEditSave() {
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/inspectionintegrity/Inspection_integrity/bizauddetail/update",
        data: {
          caseDescription: this.accessDes,
          detailArray: [],
          fileInfoArray: this.fileInfoArray,
          id: this.rowId
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.$message.success("修改成功");
            this.fileInfoArray = [];
            this.queryData = [];
            this.hoslist = [];
            this.$emit("mainhidden");
            this.$emit("doubtInit");
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          // this.$message.error("请检查网络");
        });
    },
    //文件上传
    serchList(thirdData) {
      console.log(thirdData);
      this.fileInfoArray = thirdData.list;
      // this.pShow = thirdData.pShow;

      // this.fileDescription = thirdData.fileDescription;
      /*   this.fileName = thirdData.fileName;
      this.filePath = thirdData.filePath; */
      // this.thirdNum = thirdData.thirdNum;
    },
    //疑点列表系统检出的查看
    checkClick(row) {
      console.log(row);
      this.btnNumber = 8;
      this.btnTitle = "违规人员详情";
      this.btnVisible = true;
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/inspectionintegrity/Inspection_integrity/bizaudorder/queryHosViolationRuleUserInfo",
        params: {
          id: row.id
        } /* ,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      })
        .then(res => {
          if (res.data.code == 0) {
            this.checkData = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          // this.$message.error("请检查网络");
        });
    },
    //结论录入
    handleClick(row) {
      console.log(row);
      this.resultId = row.id;
      this.gularList = !this.gularList;
    },
    //结论录入成功
    remarkSave() {
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/inspectionintegrity/Inspection_integrity/bizauddetail/updateDetailResult",
        data: {
          id: this.resultId,
          description: this.remarkDes
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.$message.success("添加成功");
            this.gularList = false;

            axios({
              method: "post",
              url:
                axios.PARK_API +
                "/inspectionintegrity/Inspection_integrity/bizauddetail/info",
              params: { id: this.rowId }
            }).then(res => {
              if (res.data.code == 0) {
                this.queryData = res.data.bizAudDetailEntity;
              } else {
              }
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          // this.$message.error("请检查网络");
        });
    },
    //提交处理结果成功
    resultEditSave() {
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/inspectionintegrity/Inspection_integrity/bizauddetail/updateQuestionCase",
        data: {
          id: this.rowId,
          resultDescription: this.resultDes
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.$message.success("提交成功");
            this.$emit("mainhidden");
            this.$emit("doubtInit");
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          // this.$message.error("请检查网络");
        });
    },
    smallClose() {
      this.gularList = false;
    }
  },
  created() {
    //  this.timeDate();
    /*  let _this = this;
    setInterval(function() {
      _this.timeDate();
    }, 1000); */
  },
  components: {
    btnSelect
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 6px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  /* background-color: #f9fafc; */
}
.plus {
  font-size: 18px;
  color: #00f;
}
.plus:hover {
  cursor: pointer;
}
.gular {
  width: 100%;
  height: 100%;
  border: 1px solid #86dab7;
  border-radius: 4px;
  background-color: #86dab7;
}
.red {
  color: #f00;
}
.el-select {
  width: 170px;
}
</style>


