<template>
    <div class="content">
        <div class="top">
          <span>住院号：</span>
		      <el-input v-model="hospitalNum" style="width:160px;"  placeholder="请输入内容"></el-input>     
          <el-button type="primary" @click="getSettle">查询</el-button>
            <el-button  type="success" icon="el-icon-download" style="margin-left: 10px;" @click="settleClick">下载</el-button>
        </div> 

          <div class="botMain">
						<p> <span class="el-icon-school"></span><span class="fzstyle">住院信息</span></p>
								<el-row>
									<el-col :span="8">
										<div class="grid-content">
											  <span>就医流水号:</span>
												<el-input v-model="hosdata.AKC190"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											  <span>所属经办机构:</span>
												<el-input v-model="hosdata.AAB034"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>险种:</span>
											<el-input v-model="hosdata.AAE140"  placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="8">
										<div class="grid-content">
											  <span>就医类别:</span>
												<el-input v-model="hosdata.AKA130" placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>通过病人基本信息获得:</span>
											<el-input v-model="hosdata.AAC001"  placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>结算开始日期:</span>
											 <el-date-picker
												v-model="hosdata.STARTOUTDT"
												type="date"
												value-format="yyyy-MM-dd"
												placeholder="选择日期">
											</el-date-picker>
											<!-- <el-input v-model="hosdata.AKC192"  placeholder="请输入内容"></el-input> -->
										</div>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="8">
										<div class="grid-content">
											 <span>结算结束日期:</span>
											 <el-date-picker
												v-model="hosdata.ENDOUTDT"
												type="date"
												value-format="yyyy-MM-dd"
												placeholder="选择日期">
											</el-date-picker>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>身份证号:</span>
											<el-input v-model="hosdata.AAC002"  placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>姓名:</span>
											<el-input v-model="hosdata.AAC003"  placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
								</el-row>
								
								<el-row>									
									<el-col :span="8">
										<div class="grid-content">
											<div class="grid-content">
											<span>经办人:</span>
											<el-input v-model="hosdata.AAE011" placeholder="请输入内容"></el-input>
										</div>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											  <span>科室:</span>
												<el-input v-model="hosdata.BKC051"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>医院的住院号:</span>
											<el-input v-model="hosdata.BKC023" placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
								</el-row>
								<el-row>
									
									<el-col :span="8">
										<div class="grid-content">
											<span>入院类型:</span>
											<el-input v-model="hosdata.ACK222"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>统计大病:</span>
											<el-input v-model="hosdata.AKC207" placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>就医病种:</span>
											<el-input v-model="hosdata.AKA120" placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
								</el-row>
							 	<el-row>
									
									<el-col :span="8">
										<div class="grid-content">
											<span>审核意见:</span>
											<el-input v-model="hosdata.BKC083"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											  <span>统筹支付范围:</span>
												<el-input v-model="hosdata.AKC206" placeholder="请输入内容"></el-input>
										</div>
									</el-col>
								
								</el-row>
							  
						 <p> <span class="el-icon-tickets"></span><span class="fzstyle">结算费用信息</span></p> 
                <span>姓名：</span>
                <el-input v-model="AAC003" style="width:120px;"  placeholder="请输入内容"></el-input>
                <span>住院号：</span>
                <el-input v-model="BKC023" style="width:160px;"  placeholder="请输入内容"></el-input>
                  <el-button type="primary" @click="Settlesearch(1)">查询</el-button>    
                  <el-table
                  :data="settleData"
                  style="width: 100%;"
                  height="450"
                  border>
                  <el-table-column
                  prop="AKC190"
                  label="就医编号"
                  width="140px">
                  </el-table-column>
                  <el-table-column
                  prop="BKC023"
                  label="住院号"
                  width="140px">
                  </el-table-column>
                  <el-table-column
                  prop="AAC001"
                  label="个人编码"
                  width="120px">
                  </el-table-column>
                  <el-table-column
                  prop="AAC003"
                  label="姓名">
                  </el-table-column>
                <!--  <el-table-column
                  prop="AAC002"
                  label="身份证号"
                  width="140px">
                  </el-table-column> -->
                  <el-table-column
                  prop="AKC401"
                  label="人员标志">
                  </el-table-column>
                  
                  <el-table-column
                  prop="AKA130"
                  label="医疗类别">
                  </el-table-column>
                  <el-table-column
                  prop="AAB001"
                  label="单位编号"
                  width="120px">
                  </el-table-column>
                  <el-table-column
                  prop="AAB004"
                  label="单位名称"
                  width="260px">
                  </el-table-column>
                  <el-table-column
                  prop="AKC021"
                  label="医疗人员类别"
                  width="120px">
                  </el-table-column>
                <!--  <el-table-column
                  prop="AAE040"
                  label="上传时间"
                  width="160px">
                  </el-table-column> -->
                  <el-table-column
                  prop="AKC264"
                  label="医疗费总额"
                  width="110px">
                  </el-table-column>
                  <el-table-column
                  prop="AKC253"
                  label="个人自费金额"
                  width="110px">
                  </el-table-column>
                
                  <el-table-column
                  prop="BKC257"
                  label="个人现金支付"
                  width="100px">
                  </el-table-column>
                
                  <el-table-column
                  prop="AKC255"
                  label="个人帐户支付金额"
                  width="130px">
                  </el-table-column>
                  <el-table-column
                  prop="AAE140"
                  label="险种"
                  width="50px">
                  </el-table-column>
                  
                  <el-table-column
                  prop="AAE011"
                  label="经办人">
                  </el-table-column>
                  <el-table-column
                  prop="AAE036"
                  label="经办日期"
                  width="160px">
                  </el-table-column>
                
                
              </el-table>	
              <div class="block" id="fenye">
                    <el-pagination
                    background
                    layout="prev, pager, next,total"
                    @current-change="handleCurrentChange"
                    :page-size="pageSize"
                    :current-page="currentPage"
                    :total=endtotal>
                    </el-pagination>
            </div>	
				</div>   
		  
    </div>
</template>

<script>
import axios from "axios";
let moment = require("moment");
export default {
  name: "examine",
  data() {
    return {
      hosdata: {
        STARTOUTDT: "",
        ENDOUTDT: "",
        AKC190: "",
        AKA130: "",
        AAB034: "",
        AAE140: "",
        AAC001: "",
        AAC002: "",
        AAC003: "",
        BKC051: "",
        BKC023: "",
        ACK222: "",
        AKA120: "",
        BKC083: "",
        AAE011: "",
        AKC207: "",
        AKC206: ""
      },
      AAC003: "",
      BKC023: "",

      settleData: [],
      hospitalNum: "",

      endtotal: 0,
      currentPage: 1,
      pageSize: 10,
      flag: 1
    };
  },

  watch: {
    /* hospitalNum(num) {
      console.log((num / Math.pow(10, 10)).toFixed(10).substr(2));
    } */
  },
  filters: {},
  methods: {
    getSettle() {
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/medical_reimbursement/hospitalizationregister/queryHosInfo",
        params: {
          bkc023: this.hospitalNum
        }
        /*  headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      })
        .then(res => {
          if (res.data.code == 0) {
            var hosdata = res.data.data;
            hosdata.STARTOUTDT == undefined
              ? (this.hosdata.STARTOUTDT = this.hosdata.STARTOUTDT)
              : (this.hosdata.STARTOUTDT = hosdata.STARTOUTDT);
            hosdata.ENDOUTDT == undefined
              ? (this.hosdata.ENDOUTDT = this.hosdata.ENDOUTDT)
              : (this.hosdata.ENDOUTDT = hosdata.ENDOUTDT);
            hosdata.AAC002 == undefined
              ? (this.hosdata.AAC002 = this.hosdata.AAC002)
              : (this.hosdata.AAC002 = hosdata.AAC002);
            hosdata.AKC207 == undefined
              ? (this.hosdata.AKC207 = this.hosdata.AKC207)
              : (this.hosdata.AKC207 = hosdata.AKC207);
            hosdata.BKC083 == undefined
              ? (this.hosdata.BKC083 = this.hosdata.BKC083)
              : (this.hosdata.BKC083 = hosdata.BKC083);
            hosdata.AKC206 == undefined
              ? (this.hosdata.AKC206 = this.hosdata.AKC206)
              : (this.hosdata.AKC206 = hosdata.AKC206);
            hosdata.AKC190 == undefined
              ? (this.hosdata.AKC190 = this.hosdata.AKC190)
              : (this.hosdata.AKC190 = hosdata.AKC190);
            hosdata.AKA130 == undefined
              ? (this.hosdata.AKA130 = this.hosdata.AKA130)
              : (this.hosdata.AKA130 = hosdata.AKA130);
            hosdata.AAB034 == undefined
              ? (this.hosdata.AAB034 = this.hosdata.AAB034)
              : (this.hosdata.AAB034 = hosdata.AAB034);
            hosdata.AAE140 == undefined
              ? (this.hosdata.AAE140 = this.hosdata.AAE140)
              : (this.hosdata.AAE140 = hosdata.AAE140);
            hosdata.AAC001 == undefined
              ? (this.hosdata.AAC001 = this.hosdata.AAC001)
              : (this.hosdata.AAC001 = hosdata.AAC001);
            hosdata.AAC003 == undefined
              ? (this.hosdata.AAC003 = this.hosdata.AAC003)
              : (this.hosdata.AAC003 = hosdata.AAC003);
            hosdata.BKC051 == undefined
              ? (this.hosdata.BKC051 = this.hosdata.BKC051)
              : (this.hosdata.BKC051 = hosdata.BKC051);
            hosdata.BKC023 == undefined
              ? (this.hosdata.BKC023 = this.hosdata.BKC023)
              : (this.hosdata.BKC023 = hosdata.BKC023);
            hosdata.ACK222 == undefined
              ? (this.hosdata.ACK222 = this.hosdata.ACK222)
              : (this.hosdata.ACK222 = hosdata.ACK222);
            hosdata.AAE011 == undefined
              ? (this.hosdata.AAE011 = this.hosdata.AAE011)
              : (this.hosdata.AAE011 = hosdata.AAE011);
            hosdata.AKA120 == undefined
              ? (this.hosdata.AKA120 = this.hosdata.AKA120)
              : (this.hosdata.AKA120 = hosdata.AKA120);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },
    // 页码改变时去请求数据
    handleCurrentChange(val) {
      if (this.flag == 1) {
        this.SettleInit(val);
      } else {
        this.Settlesearch(val);
      }
    },
    // 初始化页面请求数据
    SettleInit(val) {
      this.flag = 1;
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/downloadkc38/list",
        data: {
          page: val,
          limit: 10
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.settleData = res.data.page.list;
            this.endtotal = res.data.page.totalCount;
            for (var i = 0; i < this.settleData.length; i++) {
              switch (this.settleData[i].AKA130) {
                case "11":
                  this.settleData[i].AKA130 = "普通门诊";
                  break;
                case "21":
                  this.settleData[i].AKA130 = "住院结算";
                  break;
              }
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },
    // 模糊查询页面数据
    Settlesearch(val) {
      this.flag = 2;
      /*  console.log(this.startTime)
      console.log(this.endTime+" "+"23"+":"+"59"+":"+"59") */
      /* if (this.endTime != "") {
        var endTime = this.endTime + " " + "23" + ":" + "59" + ":" + "59";
      } */
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/downloadkc38/list",
        data: {
          page: val,
          limit: 10,
          BKC023: this.BKC023,
          AAC003: this.AAC003
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.settleData = res.data.page.list;
            this.endtotal = res.data.page.totalCount;
            for (var i = 0; i < this.settleData.length; i++) {
              switch (this.settleData[i].AKA130) {
                case "11":
                  this.settleData[i].AKA130 = "普通门诊";
                  break;
                case "21":
                  this.settleData[i].AKA130 = "住院结算";
                  break;
              }
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },

    settleClick() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          AKC190: this.hosdata.AKC190,
          AAB034: this.hosdata.AAB034,
          AAE140: this.hosdata.AAE140,
          AKA130: this.hosdata.AKA130,
          AAC001: this.hosdata.AAC001,
          AAC002: this.hosdata.AAC002,
          AAC003: this.hosdata.AAC003,
          BKC051: this.hosdata.BKC051,
          BKC023: this.hosdata.BKC023,
          ACK222: this.hosdata.ACK222,
          AKA120: this.hosdata.AKA120,
          BKC083: this.hosdata.BKC083,
          AAE011: this.hosdata.AAE011,
          AKC206: this.hosdata.AKC206,
          AKC207: this.hosdata.AKC207,
          STARTOUTDT: this.hosdata.STARTOUTDT,
          ENDOUTDT: this.hosdata.ENDOUTDT,

          requestId: "704",
          akb020: localStorage.getItem("akb020"),
          bkb026: localStorage.getItem("bkb026"),
          aab034: localStorage.getItem("aab034"),
          uscode: localStorage.getItem("uscode"),
          usname: localStorage.getItem("usname")
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            // console.log(res.data.data);
            // console.log(1)
            this.hospitalDown(res.data.data);
            // console.log(2)
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },
    // 调取医保接口
    hospitalDown(param) {
      console.log(param);
      var state = WSCall.biz(param);
      console.log(state);
      if (state == 1) {
        var res = WSCall.retbiz;
        /*  var state = 1;
      if(state == 1) {
        var res = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"no\"?><transferinfo>"+
        "  <headinfo>"+
        "    <REQUESTID>704</REQUESTID>"+
        "    <AKB020>SLYY0001</AKB020>"+
        "    <AAB034>61100001</AAB034>"+
        "    <BKB026>888888</BKB026>"+
        "    <USCODE>管理员</USCODE>"+
        "    <USNAME>管理员</USNAME>"+
        "    <DATACOUNT>1</DATACOUNT>"+
        "    <ROWCOUNT1>1</ROWCOUNT1>"+
        "    <ROWCOUNT2>0</ROWCOUNT2>"+
        "    <ROWCOUNT3>0</ROWCOUNT3>"+
        "    <ROWCOUNT4>0</ROWCOUNT4>"+
        "    <ERRCODE>1</ERRCODE>"+
        "    <ERRMSG></ERRMSG>"+
        "  </headinfo>"+
        "  <datas>"+
        "    <data1>"+
        "      <row>"+
        "        <AKC190>000000009516019</AKC190>"+
        "        <AKB020>SLYY0001</AKB020>"+
        "        <AKB021>商洛市中心医院</AKB021>"+
        "        <AKA101>02</AKA101>"+
        "        <AAB001>11000004170</AAB001>"+
        "        <AAB004>山阳县政策破产企业退休人员__酒厂</AAB004>"+
        "        <AAC001>100000363505</AAC001>"+
        "        <AAC003>詹凯朝ceshi</AAC003>"+
        "        <AAB019>99</AAB019>"+
        "        <BKC260>67</BKC260>"+
        "        <AKC021>21</AKC021>"+
        "        <AAE140>3</AAE140>"+
        "        <AKC401>1</AKC401>"+
        "        <BAC515>1</BAC515>"+
        "        <AAC008>2</AAC008>"+
        "        <AKA130>21</AKA130>"+
        "        <ACK222>1</ACK222>"+
        "        <BKC023>1234567</BKC023>"+
        "        <AKA120>00001</AKA120>"+
        "        <AKC250>0.0</AKC250>"+
        "        <AKC251>0.0</AKC251>"+
        "        <AKC252>722.21</AKC252>"+
        "        <BKC113>0</BKC113>"+
        "        <BKC242>0.0</BKC242>"+
        "        <BKC243>0.0</BKC243>"+
        "        <AKC264>0.01</AKC264>"+
        "        <AKC253>0.0</AKC253>"+
        "        <AKC254>0.0</AKC254>"+
        "        <AKC255>0.01</AKC255>"+
        "        <BKC245>0.0</BKC245>"+
        "        <BKC254>0.0</BKC254>"+
        "        <BKC256>0</BKC256>"+
        "        <BKC257>0.0</BKC257>"+
        "        <AKC261>0.01</AKC261>"+
        "        <AKC256>0.0</AKC256>"+
        "        <AKC257>0.0</AKC257>"+
        "        <BKC234>0.0</BKC234>"+
        "        <AKC260>0.0</AKC260>"+
        "        <AKC263>0.0</AKC263>"+
        "        <BKC235>0.0</BKC235>"+
        "        <BKC236>0.0</BKC236>"+
        "        <BKC251>0.0</BKC251>"+
        "        <BKC258>0.0</BKC258>"+
        "        <BKC255>1</BKC255>"+
        "        <AKC258>0.0</AKC258>"+
        "        <BKC282>0.0</BKC282>"+
        "        <BKC114>0.0</BKC114>"+
        "        <BKC111>0.0</BKC111>"+
        "        <BKC246>0.0</BKC246>"+
        "        <BKC302>0.0</BKC302>"+
        "        <BKC304>0.0</BKC304>"+
        "        <BKB116>0.0</BKB116>"+
        "        <BKC092>0.0</BKC092>"+
        "        <BKC093>0.0</BKC093>"+
        "        <BKC241>0.0</BKC241>"+
        "        <BKC237>0.0</BKC237>"+
        "        <BKC238>0.0</BKC238>"+
        "        <BKC239>0.0</BKC239>"+
        "        <BKC116>0.0</BKC116>"+
        "        <BKC117>0.0</BKC117>"+
        "        <BKC120>0.0</BKC120>"+
        "        <BKC121>0.0</BKC121>"+
        "        <BKC122>0.0</BKC122>"+
        "        <BKC123>0.0</BKC123>"+
        "        <AAE011>管理员</AAE011>"+
        "        <AAE036>2019-06-09</AAE036>"+
        "        <BAA001>61100024</BAA001>"+
        "        <AAE040>2019-06-09 17:44:32</AAE040>"+
        "        <BKC026>0.0</BKC026>"+
        "        <BKA005>01</BKA005>"+
        "        <BKA006>01</BKA006>"+
        "        <BAA006>1</BAA006>"+
        "        <BAA007> </BAA007>"+
        "        <BKC038> </BKC038>"+
        "        <BKC039></BKC039>"+
        "        <AKC259>0.0</AKC259>"+
        "        <AKC262>0.0</AKC262>"+
        "        <BKC240>0.0</BKC240>"+
        "        <BKC252>0.0</BKC252>"+
        "        <BKC259>0.0</BKC259>"+
        "        <BKC266>0.0</BKC266>"+
        "        <BKC267>0.0</BKC267>"+
        "        <AKC265>0.0</AKC265>"+
        "        <BKC271>0.0</BKC271>"+
        "        <AKC197>0</AKC197>"+
        "        <BKC035> </BKC035>"+
        "        <BKC036>1</BKC036>"+
        "        <AAE074></AAE074>"+
        "        <AAE117>0</AAE117>"+
        "        <AAE076></AAE076>"+
        "        <BKC281></BKC281>"+
        "        <AKC266></AKC266>"+
        "        <AKC267>0</AKC267>"+
        "        <AKA215>1</AKA215>"+
        "        <BKA264>00001</BKA264>"+
        "        <BKC081></BKC081>"+
        "        <AAE145> </AAE145>"+
        "        <BAE826></BAE826>"+
        "        <BKC283></BKC283>"+
        "        <BKC288>0.0</BKC288>"+
        "        <BKC299>0.0</BKC299>"+
        "        <BKC300>0.0</BKC300>"+
        "        <AKC268>0.0</AKC268>"+
        "        <AKC269>0.0</AKC269>"+
        "        <AKC270>0.0</AKC270>"+
        "        <BKC107></BKC107>"+
        "        <BKC108></BKC108>"+
        "        <BKC109></BKC109>"+
        "        <BKC320>0.0</BKC320>"+
        "      </row>"+
        "    </data1>"+
        "  </datas>"+
        "</transferinfo>" */

        var wordsContent = encodeURIComponent(res);
        // 将下载下来的数据保存到数据库
        axios({
          method: "post",
          url:
            axios.PARK_API +
            "/medical_reimbursement/downloadkc38/saveDownloadKc38",
          data: {
            xml: wordsContent
          },
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }).then(res => {
          if (res.data.code == 0) {
            this.$message.success("下载成功");
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else {
        this.$message.warning("下载失败");
      }
    }
  },
  created() {
    this.SettleInit(1);
  },
  computed: {},
  components: {}
};
</script>

<style scoped>
.top {
  padding: 10px;
}
.top .el-input {
  width: 20%;
}
.botMain p {
  width: 100%;
  height: 36px;
  line-height: 36px;
  background-color: #eeeeee;
  /* margin-left: 10px; */
}
.botMain .el-icon-school,
.botMain .el-icon-tickets {
  font-size: 20px;
  font-weight: 700;
  color: #409eff;
  margin-left: 10px;
}
.botMain .fzstyle {
  margin-left: 10px;
  font-size: 14px;
  color: #409eff;
}

.el-row {
  margin: 0 0 10px 0;
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
  text-align: center;
}
.grid-content .el-input {
  width: 50%;
}
.grid-content span,
.top span,
.botMain span {
  font-size: 14px;
}
.row-bg {
  padding: 10px 0;
  /* background-color: #f9fafc; */
}
.botMain .pStyle {
  padding: 0;
  margin: 6px 0 0 0;
  background-color: #fff;
}
#fenye {
  background: #c1c1c1;
}
</style>
