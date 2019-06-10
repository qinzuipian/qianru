<template>
    <div>
        <div v-show="btnNumber==0">
           <div class="queryTop">
                <span>机构名称</span>
                <el-input v-model="organName" style="width:120px;" placeholder="请输入内容"></el-input>
               <!--  <span>机构类型</span>
                <el-select v-model="organType" style="width:120px;" placeholder="请选择">
                    <el-option
                    v-for="item in organTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <span>机构类别</span>
                <el-select v-model="category" style="width:120px;" placeholder="请选择">
                    <el-option
                    v-for="item in categoryOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select> -->
                <span>机构等级</span>
                <el-select v-model="grade" style="width:120px;" placeholder="请选择">
                    <el-option
                    v-for="item in gradeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>        
                <el-button type="primary" icon="el-icon-search" @click="hospitalClick">查询</el-button>
             </div>
             <el-table
                :data="hospitalData"
                highlight-current-row
                border
                @row-click="hospitalSelect"
                style="width: 100%">
                <el-table-column
                prop="hospitalCode"
                label="机构编码">
                </el-table-column>
                <el-table-column
                prop="hospitalName"
                label="机构名称">
                </el-table-column>
                <el-table-column
                prop="type"
                width="100px"
                label="机构类型">
                </el-table-column>
                <el-table-column
                prop="grade"
                label="机构等级">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>
            </el-table>
             <div class="block" id="fenye">
                  <el-pagination background layout="prev, pager, next" :total =hostotal @current-change="handlehospital">
                  </el-pagination>
              </div>
            <div class="botTop">
                <el-button type="success" icon="el-icon-check" @click="hospitalSave">确认</el-button>
                <el-button type="danger" icon="el-icon-close" @click="otherClear">关闭</el-button>
            </div>
        </div>
        <div v-show="btnNumber==1">
            <div class="queryTop">
                <span>姓名</span>
                <el-input v-model="name" style="width:120px;" placeholder="请输入内容"></el-input>    
                <el-button type="primary" icon="el-icon-search" @click="doctorClick">查询</el-button>
             </div>
             <el-table
                :data="doctorData"
                highlight-current-row
                border
                @row-click="docSelect"
                style="width: 100%">
                <el-table-column
                prop="doctorName"
                label="姓名">
                </el-table-column>
                <el-table-column
                prop="professional"
                label="职务">
                </el-table-column>
                <el-table-column
                prop="idNo"
                label="身份证号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="description"
                label="医生介绍"
                width="180">
                </el-table-column>
                <el-table-column
                prop="tel"
                label="联系电话">
                </el-table-column>
                <el-table-column
                prop="firstAddress"
                label="执业地点">
                </el-table-column>
            </el-table>
            <div class="block" id="fenye">
                  <el-pagination background layout="prev, pager, next" :total =doctotal @current-change="handledoctor">
                  </el-pagination>
            </div>
            <div class="botTop">
                <el-button type="success" icon="el-icon-check" @click="doctorSure">确认</el-button>
                <el-button type="danger" icon="el-icon-close" @click="otherClear">关闭</el-button>
            </div>
        </div>
        <div v-show="btnNumber==2">
             <div class="queryTop">
                <span>身份证号</span>
                <el-input v-model="insureName" style="width:120px;" placeholder="请输入内容"></el-input>
               <!--  <span>人员类别</span>
                <el-select v-model="peopleType" style="width:120px;" placeholder="请选择">
                    <el-option
                    v-for="item in peopleTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select> -->
                <el-button type="primary" icon="el-icon-search" @click="peopleSearch">查询</el-button>
             </div>
             <el-table
                :data="peopleData"
                highlight-current-row
                border
                style="width: 100%"
                @row-click="isCheck">
                <el-table-column
                prop="id"
                label="ID"
                width="100px">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="80px">
                </el-table-column>
                <el-table-column
                prop="genderCd"
                label="性别"
                width="50px">
                </el-table-column>
                <el-table-column
                prop="birthDate"
                label="出生日期">
                </el-table-column>
                <el-table-column
                prop="ortherIdNo"
                label="医保卡号">
                </el-table-column>
                <el-table-column
                prop="idNo"
                label="身份证号">
                </el-table-column>
             </el-table>
             <div class="block" id="fenye">
                  <el-pagination background layout="prev, pager, next" :total =total @current-change="handlepeople">
                  </el-pagination>
              </div>
            <div class="botTop">
                <el-button type="success" icon="el-icon-check" @click="peopleSure">确认</el-button>
                <el-button type="danger" icon="el-icon-close" @click="otherClear">关闭</el-button>
            </div>
        </div>
        <div v-show="btnNumber==3">
            <!-- <span>监控规则</span>
            <el-input v-model="monitor" style="width:220px;" placeholder="请输入内容"></el-input> -->
            <p>
                <span>说明</span>
                <el-input type="textarea" style="width:80%;" v-model="filtrate" placeholder="请输入内容"></el-input>
            </p> 
            <el-upload
            class="upload-demo"
            action="http://172.16.178.13:8089/zuul/inspectionintegrity/Inspection_integrity/bizautquestion/uploadfile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-progress="progressFunc"
            :on-success="successFunc"
            :before-remove="beforeRemove"
            :data="uploaddata"
            multiple>
            <el-button size="small" type="primary">选取文件</el-button>
            </el-upload>           
            <!-- <el-button type="primary" style="margin-left:10%;" icon="el-icon-upload">文件上传</el-button> -->
            <p style="text-align:center;">
                <el-button type="success" icon="el-icon-check" @click="thirdSave">确认</el-button>
                <el-button type="danger" icon="el-icon-close" @click="otherClear">关闭</el-button>
            </p>
        </div>
        <div v-show="btnNumber==4">
            <span>监控规则</span>
            <el-input v-model="foregular" style="width:120px;" placeholder="请输入内容"></el-input>
            <i class="el-icon-circle-plus plus" @click="ruleClick"></i>
           <!--  <span>规则预值设置</span>
            <el-input-number v-model="rule" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number> -->
            <span>监控日期</span>
            <el-date-picker
            v-model="monitorSdate"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="选择日期">
            </el-date-picker>
            <span>至</span>
            <el-date-picker
            v-model="monitorEdate"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="选择日期">
            </el-date-picker>
            <el-button type="primary" icon="el-icon-search" @click="rulePeople">查询</el-button>
           <!--  <p>
                <span>已选：</span>
                <span>0</span>
                <span>违规条数：</span>
                <span>0</span>
                <span>涉及金额：</span>
                <span>0.00</span>
            </p> -->
            <el-table
                :data="rulePepleData"
                @selection-change="ruleThisItem"
                border
                style="width: 100%">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                prop="NAME"
                width="80px"
                label="姓名">
                </el-table-column>
                <el-table-column
                prop="EXAMOUNT"
                label="涉及金额">
                </el-table-column>
                <el-table-column
                prop="TYPE"
                label="审核规则">
                </el-table-column>
                <el-table-column
                prop="MESSAGE"
                label="规则描述">
                </el-table-column>
            </el-table>
           <!--  <p>
                <span>监控规则</span>
               <el-input v-model="fourregular" style="width:70%;" placeholder="请输入内容"></el-input>
            </p> -->
            <p>
                 <span>疑点筛查说明</span>
                 <el-input type="textarea" style="width:70%;" v-model="fourdoubtState" placeholder="请输入内容"></el-input>
            </p>
            <p style="text-align:center;">
               <el-button type="success" icon="el-icon-check" @click="systemSave">确认</el-button>
               <el-button type="danger" icon="el-icon-close" @click="otherClear">关闭</el-button>
            </p>
        </div>
        <!-- 规则列表的显示 -->
        <transition name="el-zoom-in-center">
             <div v-show="gularList" class="gular">
              <!--   <span>规则分类</span>
                <el-select v-model="gularType" style="width:120px;" placeholder="请选择">
                    <el-option
                    v-for="item in gularTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <span>规则代码/名称</span>
                <el-input v-model="rularName" style="width:140px;" placeholder="请输入内容"></el-input>
                <el-button type="primary" icon="el-icon-search">查询</el-button> -->
               <el-table
                    :data="ruleData"
                    @row-click="Isrule"
                    highlight-current-row
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="rule"
                    label="审核规则">
                    </el-table-column>
                </el-table>
                  <!-- <ul class="rule">
                    <li v-for="(item,index) in ruleData" :key="index">{{item}}</li>
                  </ul> -->
                  <p style="text-align:center;">
                        <el-button type="success" icon="el-icon-check" @click="IsruleSave">确认</el-button>
                        <el-button type="danger" icon="el-icon-close" @click="smallClose">关闭</el-button>
                  </p>
             </div>
        </transition>
        <div v-show="btnNumber==5">
            <!-- <el-button type="primary" icon="el-icon-search">查询</el-button> -->
           <el-table
                :data="descData"
                highlight-current-row
                border
                @row-click="descSelect"
                style="width: 100%">
                <el-table-column
                prop="sourceStatus"
                label="问题状态"
                width="100px">
                </el-table-column>
                <el-table-column
                prop="description"
                label="问题描述"
                width="100px">
                </el-table-column>
               <!--  <el-table-column
                prop="objectName"
                label="医院名称"> 
                </el-table-column>-->
                <el-table-column
                prop="acceptMode"
                label="受理方式"
                width="100px">
                </el-table-column>
                <el-table-column
                prop="sourceDept"
                label="信息来源方类型">
                </el-table-column>
                <el-table-column
                prop="sourceCode"
                label="信息来源方式">
                </el-table-column>
                <el-table-column
                prop="sourceName"
                label="信息来源方名称">
                </el-table-column>
                <el-table-column
                prop="acceptDate"
                label="受理日期">
                </el-table-column>
        </el-table>
        <div class="block" id="fenye">
            <el-pagination background layout="prev, pager, next" :total =destotal @current-change="handleissue">
            </el-pagination>
        </div>
            <p>
                <span>监控规则</span>
               <el-input v-model="regular" style="width:70%;" placeholder="请输入内容"></el-input>
            </p>
            <p>
                 <span>疑点筛查说明</span>
                 <el-input type="textarea" style="width:70%;" v-model="doubtState" placeholder="请输入内容"></el-input>
            </p>
            <p style="text-align:center;">
               <el-button type="success" icon="el-icon-check" @click="issueSure">确认</el-button>
               <el-button type="danger" icon="el-icon-close" @click="otherClear">关闭</el-button>
            </p>
        </div>

        <!-- 指标名称选择列表 -->
        <div v-show="btnNumber==6">
                <div class="queryTop">        
                <span>指标来源</span>
                <el-select v-model="tarCome" style="width:120px;" placeholder="请选择">
                    <el-option
                    v-for="item in tarComeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <span>评分算法</span>
                <el-select v-model="score" style="width:120px;" placeholder="请选择">
                    <el-option
                    v-for="item in scoreOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <span>指标名称</span>
                <el-input v-model="tarName" style="width:120px;" placeholder="请输入内容"></el-input>
                <el-button type="primary" icon="el-icon-search">查询</el-button>
             </div>
             <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="date"
                label="日期"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>
            </el-table>
            <div class="botTop">
                <el-button type="success" icon="el-icon-check">确认</el-button>
                <el-button type="danger" icon="el-icon-close" @click="otherClear">关闭</el-button>
            </div>
        </div>

        <div v-show="btnNumber==7">
            <span>监控规则</span>
            <el-input v-model="monitor" style="width:220px;" placeholder="请输入内容"></el-input>
            <p>
                <span>筛选说明</span>
                <el-input type="textarea" style="width:80%;" v-model="Filtrate" placeholder="请输入内容"></el-input>
            </p> 
            <el-upload
            class="upload-demo"
            action="http://172.16.178.13:8089/zuul/inspectionintegrity/Inspection_integrity/bizautquestion/uploadfile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-progress="progressFunc"
            :on-success="successFunc"
            :before-remove="beforeRemove"
            :data="uploaddata"
            :file-list="fileList"
            multiple>
            <el-button size="small" type="primary">选取文件</el-button>
            </el-upload>           
            <!-- <el-button type="primary" style="margin-left:10%;" icon="el-icon-upload">文件上传</el-button> -->
            <p style="text-align:center;">
                <el-button type="success" icon="el-icon-check" @click="activeSave">确认</el-button>
                <el-button type="danger" icon="el-icon-close" @click="otherClear">关闭</el-button>
            </p>
        </div>


        <!-- 违规人员详情 -->

        <div v-show="btnNumber==8">
            <el-table
               :data="checkData"
                border
                style="width: 100%">
                <el-table-column
                prop="NAME"
                width="80px"
                label="姓名">
                </el-table-column>
                <el-table-column
                prop="EXAMOUNT"
                label="涉及金额">
                </el-table-column>
                <el-table-column
                prop="TYPE"
                label="审核规则">
                </el-table-column>
                <el-table-column
                prop="MESSAGE"
                label="规则描述">
                </el-table-column>
            </el-table>
            <div class="botTop">
              <el-button type="danger" icon="el-icon-close" @click="otherClear">关闭</el-button>
            </div>
        </div>

        <!-- 科室信息查询 -->

          <div v-show="btnNumber==9">
              <div class="queryTop">
              <!--  <span>机构信息</span>
                <el-input v-model="orangName" style="width:120px;" placeholder="请输入内容"></el-input>     -->
                <span>科室信息</span>
                <el-input v-model="officeName" style="width:120px;" placeholder="请输入内容"></el-input>    
                <el-button type="primary" @click="search(1)">查询</el-button>
            </div>
          <el-table
                :data="officeData"
                border
                height="450px"
                style="width: 100%"
                highlight-current-row
                @row-click="officeisCheck">
                <el-table-column
                  type="index"
                  width="50">
                  <template slot-scope="scope"><span>{{scope.$index+(exrn - 1) * 10 + 1}} </span></template>
                </el-table-column>
              
                
            
                <el-table-column
                prop="unionCode"
                label="中心科室编码">
                </el-table-column>
                <el-table-column
                prop="unionName"
                label="中心科室名称">
                </el-table-column>
                <el-table-column
                prop="typeCode"
                label="中心科室类别">
                </el-table-column>
            </el-table>
            <div class="block" id="fenye">
                <el-pagination background layout="prev, pager, next" :total =total @current-change="handleCurrentChange">
                </el-pagination>
            </div>
            <div class="botTop">
              <el-button type="success" icon="el-icon-check" @click="officeSave">确认</el-button>
              <el-button type="danger" icon="el-icon-close" @click="otherClear">关闭</el-button>
            </div>
        </div>
    </div>
    
</template>



<script>
import axios from "axios";
export default {
  props: [
    "btnNumber",
    "startdate",
    "enddate",
    "fixedCode",
    "register",
    "checkData"
  ],
  data() {
    return {
      organName: "",
      organTypeOptions: [],
      organType: "",
      categoryOptions: [],
      category: "",
      gradeOptions: [
        {
          value: "11",
          label: "一级医院"
        },
        {
          value: "21",
          label: "二级医院"
        },
        {
          value: "31",
          label: "三级医院"
        }
      ],
      grade: "",
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      name: "",
      insureName: "",
      /*   peopleTypeOptions: [],
      peopleType: "", */
      //医院机构
      hospitalData: [],
      hostotal: 0,
      // hospitalName: "",
      hospital: {},
      //责任医师
      doctorData: [],
      // doctorName: "",
      doctor: {},
      doctotal: 0,
      //参保人员信息
      peopleData: [],
      people: {},
      total: 0,
      peopleName: "",
      //问题登记
      descData: [],
      destotal: 0,
      issueId: "",
      Code: "",
      // descList: [],
      secondData: {},
      monitor: "",
      Filtrate: "",
      filtrate: "",
      middleFiltre: "",
      regular: "",
      foregular: "",
      fourregular: "",
      fourdoubtState: "",
      rule: "",
      rulePepleData: [],
      piliangIdList: [],
      //监控日期
      monitorSdate: "",
      monitorEdate: "",
      ruleData: [],
      doubtState: "",
      rularName: "",
      //规则列表的显示
      gularList: false,
      gularTypeOptions: [],
      gularType: "",
      //指标选择
      tarCome: "",
      tarComeOptions: [],
      scoreOptions: [],
      score: "",
      tarName: "",
      //文件上传
      fileList: [],
      //文件上传时附带的额外参数
      uploaddata: {},
      thirdData: {
        list: []
      },
      pathCompare: "",
      isSearch: false,

      //科室信息
      officeData: [],
      exrn: 1,
      officeName: "",
      office: {}
    };
  },
  watch: {
    /*  filtrate: {
      immediate: true,
      handler: function(val) {
        console.log(val);
      }
    } */
  },

  methods: {
    otherClear() {
      this.$emit("otherhidden");
    },
    handleChange(value) {
      console.log(value);
    },

    //系统检出查询规则列表
    ruleClick() {
      this.ruleData = [];
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/inspectionintegrity/Inspection_integrity/bizaudorder/queryHosViolationList",
        params: {
          // hospitalCode: "PDY00004461073011C2101"
          hospitalCode: this.fixedCode
        } /* ,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      })
        .then(res => {
          if (res.data.code == 0) {
            // this.ruleData = res.data.list;
            let rulelist = res.data.list;
            console.log(rulelist);
            for (let i = 0; i < rulelist.length; i++) {
              let obj = {};
              obj.rule = rulelist[i];
              console.log(obj);

              this.ruleData.push(obj);
            }
            console.log(this.ruleData);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.$message.error("请检查网络");
        });
      this.gularList = !this.gularList;
    },
    //规则列表的隐藏
    smallClose() {
      this.gularList = false;
    },
    //点击规则列表行
    Isrule(row) {
      console.log(row);
      this.foregular = row.rule;
    },
    //确认规则信息
    IsruleSave() {
      this.gularList = false;
      this.rulePeople();
    },
    //系统检出查询违规人员列表(模糊)
    rulePeople() {
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/inspectionintegrity/Inspection_integrity/bizaudorder/queryHosViolationUserInfo",
        data: {
          // hospitalCode: "PDY00004461073011C2101",
          type: this.foregular,
          startBalDate: this.monitorSdate,
          endBalDate: this.monitorEdate,
          hospitalCode: this.fixedCode
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            console.log(res);
            this.rulePepleData = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.$message.error("请检查网络");
        });
    },

    //系统检出的保存
    systemSave() {
      let obj = {};
      obj.register = this.register;
      obj.ruleName = this.foregular;
      obj.ruleDescription = this.fourdoubtState;
      obj.issueId = this.issueId;
      obj.Code = this.Code;

      obj.shuzu = this.piliangIdList;
      // this.descList.push(obj);
      this.$emit("systemList", obj);
      // this.$emit("issueList", this.descList);
      // this.$emit("issueList", this.issueId);
      this.$emit("otherhidden");
    },
    //系统检出批量选择框
    ruleThisItem(val) {
      // console.log(val);
      this.piliangIdList = [];
      for (let i = 0; i < val.length; i++) {
        let obj = {};
        obj.orderId = val[i].ORDERID;
        this.piliangIdList.push(obj);
      }
      console.log(this.piliangIdList);
    },
    //医院机构查询列表
    hospitalList(val) {
      let rn;
      if (val != undefined) {
        rn = val;
      } else {
        rn = 1;
      }
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/bashospital/list",
        params: {
          page: rn,
          pageSize: 10
        }
        /*   headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      })
        .then(res => {
          if (res.data.code == 0) {
            this.hospitalData = res.data.page.list;
            this.hostotal = res.data.page.totalPage * 10;
            for (var i = 0; i < this.hospitalData.length; i++) {
              switch (this.hospitalData[i].grade) {
                case "11":
                  this.hospitalData[i].grade = "一级医院";
                  break;
                case "21":
                  this.hospitalData[i].grade = "二级医院";
                  break;
                case "31":
                  this.hospitalData[i].grade = "三级医院";
                  break;
              }
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.$message.error("请检查网络");
        });
    },
    //医院机构条件查询
    hospitalClick(val) {
      this.isSearch = true;
      console.log("hospital");
      let rn;
      if (val != undefined) {
        rn = val;
      } else {
        rn = 1;
      }
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/bashospital/list",
        params: {
          page: 1,
          pageSize: 10,
          hospitalName: this.organName,
          grade: this.grade
        } /* ,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      })
        .then(res => {
          if (res.data.code == 0) {
            this.hospitalData = res.data.page.list;
            this.hostotal = res.data.page.totalPage * 10;
            for (var i = 0; i < this.hospitalData.length; i++) {
              switch (this.hospitalData[i].grade) {
                case "11":
                  this.hospitalData[i].grade = "一级医院";
                  break;
                case "21":
                  this.hospitalData[i].grade = "二级医院";
                  break;
                case "31":
                  this.hospitalData[i].grade = "三级医院";
                  break;
              }
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.$message.error("请检查网络");
        });
    },
    // 根据医院编码查询医院
    hospitalCode() {
      axios({
        method: "post",
        url:
          axios.PARK_API + "/jkda/jkda/bashospital/queryHosInfoByHospitalCode",
        params: {
          page: 1,
          pageSize: 10,
          hospitalCode: this.fixedCode
        } /* ,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      })
        .then(res => {
          if (res.data.code == 0) {
            this.hospitalData.push(res.data.data);
            console.log(this.hospitalData);
            // this.hostotal = res.data.page.totalPage * 10;
            for (var i = 0; i < this.hospitalData.length; i++) {
              switch (this.hospitalData[i].grade) {
                case "11":
                  this.hospitalData[i].grade = "一级医院";
                  break;
                case "21":
                  this.hospitalData[i].grade = "二级医院";
                  break;
                case "31":
                  this.hospitalData[i].grade = "三级医院";
                  break;
              }
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.$message.error("请检查网络");
        });
    },
    hospitalSelect(row, event, column) {
      this.hospital.hospitalName = row.hospitalName;
      this.hospital.hospitalCode = row.hospitalCode;
      this.hospital.hospitalType = "1";
      this.hospital.hospitalGrade = row.grade;
      // this.hospitalName = row.hospitalName;
    },
    hospitalSave() {
      this.$emit("oneList", this.hospital);
      // this.$emit("oneList", this.hospitalName);
      this.$emit("otherhidden");
    },
    //责任医师查询列表
    doctorList(val) {
      let rn;
      if (val != undefined) {
        rn = val;
      } else {
        rn = 1;
      }
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/basdoctor/list",
        params: {
          page: rn,
          pageSize: 10
        }
        /*   headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      })
        .then(res => {
          if (res.data.code == 0) {
            this.doctorData = res.data.page.list;
            this.doctotal = res.data.page.totalPage * 10;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.$message.error("请检查网络");
        });
    },
    //责任医师的条件查询
    doctorClick() {
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/basdoctor/list",
        params: {
          page: 1,
          pageSize: 10,
          doctorName: this.name
        } /* ,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      })
        .then(res => {
          if (res.data.code == 0) {
            this.doctorData = res.data.page.list;
            this.doctotal = res.data.page.totalPage * 10;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.$message.error("请检查网络");
        });
    },
    docSelect(row, event, column) {
      this.doctor.doctorName = row.doctorName;
      this.doctor.doctorCode = row.idNo;
      this.doctor.doctorType = "2";
      // this.doctorName = row.doctorName;
    },
    doctorSure() {
      this.$emit("secondList", this.doctor);
      // this.$emit("secondList", this.doctorName);
      this.$emit("otherhidden");
    },
    //参保人员信息列表查询
    peopleList(val) {
      let rn;
      if (val != undefined) {
        rn = val;
      } else {
        rn = 1;
      }
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/ehrpir/list",
        params: {
          page: rn,
          pageSize: 10
        }
        /*    headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      })
        .then(res => {
          if (res.data.code == 0) {
            this.peopleData = res.data.page.list;
            this.total = res.data.page.totalPage * 10;
            for (let i = 0; i < this.peopleData.length; i++) {
              //性别
              switch (this.peopleData[i].genderCd) {
                case "1":
                  this.peopleData[i].genderCd = "男";
                  break;
                case "2":
                  this.peopleData[i].genderCd = "女";
                  break;
              }
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.$message.error("请检查网络");
        });
    },
    //  模糊查询
    peopleSearch() {
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/ehrpir/list",
        params: {
          page: 1,
          pageSize: 10,
          idNo: this.insureName
        } /* ,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      })
        .then(res => {
          if (res.data.code == 0) {
            this.peopleData = res.data.page.list;
            this.total = res.data.page.totalPage * 10;
            for (let i = 0; i < this.peopleData.length; i++) {
              //性别
              switch (this.peopleData[i].genderCd) {
                case "1":
                  this.peopleData[i].genderCd = "男";
                  break;
                case "2":
                  this.peopleData[i].genderCd = "女";
                  break;
              }
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.$message.error("请检查网络");
        });
    },
    //勾选数据
    isCheck(row, event, column) {
      console.log(row);
      this.people.peopleName = row.name;
      this.people.peopleCode = row.idNo;
      this.people.peopleType = "3";
      // this.peopleName = row.name;
    },
    //确认参保人员信息
    peopleSure() {
      this.$emit("thirdList", this.people);
      // this.$emit("thirdList", this.peopleName);
      this.$emit("otherhidden");
    },
    //问题登记
    //页面初始化
    descrInit(val) {
      let rn;
      if (val != undefined) {
        rn = val;
      } else {
        rn = 1;
      }
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/inspectionintegrity/Inspection_integrity/bizautquestion/list",
        data: {
          page: rn,
          pageSize: 10,
          objectType: "1",
          sourceStatus: "1",
          startDate: this.startdate,
          endDate: this.enddate,
          objectCode: this.fixedCode
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.descData = res.data.page.list;
            this.destotal = res.data.page.totalPage * 10;

            for (let i = 0; i < this.descData.length; i++) {
              //问题状态
              switch (this.descData[i].sourceStatus) {
                case "1":
                  this.descData[i].sourceStatus = "待稽核立案";
                  break;
                case "2":
                  this.descData[i].sourceStatus = "已稽核立案";
                  break;
                case "3":
                  this.descData[i].sourceStatus = "问题关闭";
                  break;
              }
              //受理方式
              switch (this.descData[i].acceptMode) {
                case "1":
                  this.descData[i].acceptMode = "主动稽核";
                  break;
                case "2":
                  this.descData[i].acceptMode = "系统监控";
                  break;
                case "3":
                  this.descData[i].acceptMode = "投诉";
                  break;
                default:
                  this.descData[i].acceptMode = "";
              }

              //来源方类型
              switch (this.descData[i].sourceDept) {
                case "1":
                  this.descData[i].sourceDept = "稽核部门";
                  break;
                case "2":
                  this.descData[i].sourceDept = "外部单位";
                  break;
                case "3":
                  this.descData[i].sourceDept = "其它自然人";
                  break;
                case "9":
                  this.descData[i].sourceDept = "其它";
                  break;
                default:
                  this.descData[i].sourceDept = "";
              }
              //来源方式
              switch (this.descData[i].sourceCode) {
                case "1":
                  this.descData[i].sourceCode = "主动稽核";
                  break;
                case "2":
                  this.descData[i].sourceCode = "来信来电";
                  break;
                case "9":
                  this.descData[i].sourceCode = "其它";
                  break;
                default:
                  this.descData[i].sourceCode = "";
              }
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          this.$message.error("请检查网络");
        });
    },
    //选择某行数据
    descSelect(row, event, column) {
      console.log(row);
      // this.issueId = row.objectCode;
      this.issueId = row.id;
      this.Code = row.objectCode;
    },
    //问题登记保存
    issueSure() {
      let obj = {};
      obj.register = this.register;
      obj.ruleName = this.regular;
      obj.ruleDescription = this.doubtState;
      obj.issueId = this.issueId;
      obj.Code = this.Code;
      // this.descList.push(obj);
      this.$emit("issueList", obj);
      // this.$emit("issueList", this.descList);
      // this.$emit("issueList", this.issueId);
      this.$emit("otherhidden");
    },
    //医院分页
    handlehospital(val) {
      //医疗机构查询
      if (this.isSearch == true) {
        this.hospitalClick(val);
      } else {
        this.hospitalList(val);
      }
    },
    //医生分页
    handledoctor(val) {
      this.doctorList(val);
    },
    //人员分页
    handlepeople(val) {
      this.peopleList(val);
    },
    //问题分页
    handleissue(val) {
      //问题登记信息列表
      this.descrInit(val);
    },

   /*  handleCurrentChange(val) {
      if (this.btnNumber == 0) {
        //医疗机构查询
        if (this.isSearch == true) {
          this.hospitalClick(val);
        } else {
          this.hospitalList(val);
        }
      } else if (this.btnNumber == 1) {
        //责任医师查询列表
        this.doctorList(val);
      } else if (this.btnNumber == 2) {
        //参保人员基本信息列表
        this.peopleList(val);
      } else if (this.btnNumber == 5) {
        //问题登记信息列表
        this.descrInit(val);
      }
    }, */
    //主动稽核页面传数据
    activeSave() {
      let acctiveObj = {};
      acctiveObj.ruleName = this.monitor;
      acctiveObj.ruleDescription = this.Filtrate;
      acctiveObj.register = this.register;
      this.$emit("activeList", acctiveObj);
      this.$emit("serchList", this.thirdData);
      this.$emit("otherhidden");
    },

    //初始化页面
    uploadInit() {},
    //文件上传

    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.pathCompare = file.response.filePath;
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/inspectionintegrity/Inspection_integrity/bizautquestion/deletefile",
        data: {
          fileName: file.response.fileName,
          filePath: file.response.filePath
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message.success("删除成功");
          this.successFunc(res, file, fileList);
        } else {
        }
      });
    },
    progressFunc(event, file, fileList) {
      this.uploaddata.aa = this.monitor;
      this.uploaddata.xxx = this.filtrate;
      console.log(event, file, fileList);
    },
    successFunc(res, file, fileList, val) {
      console.log(res, file, fileList);
      /*  this.thirdData.fileName = res.fileName;
      this.thirdData.filePath = res.filePath; */
      /*  this.thirdData.fileName.push(res.fileName);
      this.thirdData.filePath.push(res.filePath);
      this.thirdData.thirdNum = 0;
      console.log(this.thirdData); */
      let obj = {};
      // let list = [];
      obj.fileName = res.fileName;
      obj.filePath = res.filePath;
      obj.fileDescription = this.filtrate;
      // obj.fileDescription = this.filtrate;
      console.log(obj);
      this.thirdData.list.push(obj);

      // this.filtrate = "";

      for (var i = 0; i < this.thirdData.list.length; i++) {
        if (this.pathCompare == this.thirdData.list[i].filePath) {
          console.log(this.thirdData.list[i].filePath);
          this.thirdData.list.splice(i, 2);
        }
      }
      // console.log(this.thirdData)
      // this.thirdData.fileDescription = this.filtrate;
      // this.thirdData.thirdNum = 0;
      // console.log(this.thirdData.list)

      /* console.log(res.fileName);
      console.log(res.filePath); */
      /*  this.file.fileName.push(file.response.msg.listFileName[0]);
      this.file.filePath.push(file.response.msg.listFilePath[0]); */
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    // 点击确认按钮
    thirdSave() {
      console.log(this.thirdData);
      for (let i = 0; i < this.thirdData.list.length; i++) {
        this.thirdData.list[i].fileDescription = this.filtrate;
        // console.log( this.thirdData.list[i].fileDescription);
        // console.log( this.filtrate);
      }
      this.$emit("serchList", this.thirdData);
      this.$emit("otherhidden");
    },

    //科室信息查询
    //页面初始化
    officeInit(val) {
      // this.isSearch = false;
      let rn;
      if (val != undefined) {
        rn = val;
      } else {
        rn = 1;
      }
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/basdept/list",
        data: {
          page: rn,
          pageSize: 10
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.officeData = res.data.page.list;
            this.total = res.data.page.totalPage * 10;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //   this.$message.error("请检查网络");
        });
    },

    //分页请求数据
    handleCurrentChange(val) {
      this.exrn = val;
      if (this.isSearch == true) {
        this.search(val);
      } else {
        this.officeInit(val);
      }
    },

    //模糊查询
    search(val) {
      this.isSearch = true;
      let rn;
      if (val != 1) {
        rn = val;
      } else {
        rn = 1;
      }
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/basdept/list",
        params: {
          page: rn,
          pageSize: 10
          // doctorName: this.name
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.officeData = res.data.page.list;
            this.total = res.data.page.totalPage * 10;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //   this.$message.error("请检查网络");
        });
    },

    officeSave() {
      this.$emit("officeList", this.office);
      this.$emit("otherhidden");
    },

    //勾选数据
    officeisCheck(row, event, column) {
      console.log(row);
      this.office.unionCode = row.unionCode;
      this.office.unionName = row.unionName;
      this.office.typeCode = row.typeCode;
    }
  },
  created() {
    // this.uploadInit();
    if (this.btnNumber == 0) {
      console.log(this.fixedCode);
      if (this.fixedCode != "" && this.fixedCode != undefined) {
        this.hospitalCode();
      } else {
        //医疗机构查询
        this.hospitalList(1);
      }
    } else if (this.btnNumber == 1) {
      //责任医师查询列表
      this.doctorList(1);
    } else if (this.btnNumber == 2) {
      //参保人员基本信息列表
      this.peopleList(1);
    } else if (this.btnNumber == 5) {
      this.descrInit(1);
    } else if (this.btnNumber == 9) {
      this.officeInit(1);
    }
  }
};
</script>

<style scoped>
.queryTop {
  border-top: 1px solid #409eff;
  border-bottom: 1px solid #409eff;
  padding: 4px;
}
.botTop {
  text-align: center;
  padding: 8px;
}
.plus {
  font-size: 18px;
  color: #00f;
}
.plus:hover {
  cursor: pointer;
}
.gular {
  position: absolute;
  width: 100%;
  height: 90%;
  top: 8%;
  left: 0;
  background-color: #fff;
  z-index: 999;
}
#fenye {
  background: #c1c1c1;
}
/* .rule {
  text-align:center;
  border:1px solid #00f;
  margin-top:10px;
}
.rule li:hover{
  cursor:pointer;
  height:50px;
  background-color:#00f;
} */
</style>

