<template>
    <div class="content">
        <div class="top">
            <span>住院号：</span>
		        <el-input v-model="hospitalNum" style="width:160px;"  placeholder="请输入内容"></el-input>
            <el-button type="primary" @click="getRegister">查询</el-button>
            <el-button  type="success" icon="el-icon-download" style="margin-left: 10px;" @click="registerClick">下载</el-button>
          
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
											<span>入院开始日期:</span>
											 <el-date-picker
												v-model="hosdata.STARTINDT"
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
											 <span>入院结束日期:</span>
											 <el-date-picker
												v-model="hosdata.ENDINDT"
												type="date"
												value-format="yyyy-MM-dd"
												placeholder="选择日期">
											</el-date-picker>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>出院开始日期:</span>
											 <el-date-picker
												v-model="hosdata.STARTOUTDT"
												type="date"
												value-format="yyyy-MM-dd"
												placeholder="选择日期">
											</el-date-picker>
									  </div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>出院结束日期:</span>
											 <el-date-picker
												v-model="hosdata.ENDOUTDT"
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
											  <span>结算标志:</span>
												<el-input v-model="hosdata.BKC036" placeholder="请输入内容"></el-input>
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
								
								</el-row>
							  
						 <p> <span class="el-icon-school"></span><span class="fzstyle">登记信息查询</span></p> 
                <span>姓名：</span>
                <el-input v-model="AAC003" style="width:120px;"  placeholder="请输入内容"></el-input>
                <span>住院号：</span>
                <el-input v-model="BKC023" style="width:160px;"  placeholder="请输入内容"></el-input>
                <el-date-picker
                v-model="startAKC192"
                type="date"
                value-format="yyyy-MM-dd"
                style="width:170px;"
                placeholder="选择入院开始日期">
                </el-date-picker>
                <el-date-picker
                v-model="endAKC192"
                value-format="yyyy-MM-dd"
                type="date"
                style="width:170px;"
                placeholder="选择入院结束日期">
                </el-date-picker>
                <p class="pStyle">
                  <el-date-picker
                    v-model="startAKC194"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width:170px;"
                    placeholder="选择出院开始日期">
                    </el-date-picker>
                    <el-date-picker
                    v-model="endAKC194"
                    value-format="yyyy-MM-dd"
                    type="date"
                    style="width:170px;"
                    placeholder="选择出院结束日期">
                    </el-date-picker>
                     <el-button type="primary" @click="Registersearch(1)">查询</el-button>
                </p>
                 <el-table
                  :data="registerData"
                  style="width: 100%;"
                  height="460"
                  border>
                  <el-table-column
                  prop="AAC003"
                  width="100px"
                  label="姓名">
                  </el-table-column>
                  <el-table-column
                  prop="AKC190"
                  width="160px"
                  label="就医流水号">
                  </el-table-column>
                  <el-table-column
                  prop="AKA130"
                  label="就医类别">
                  </el-table-column>
                  <el-table-column
                  prop="AAB034"
                  width="120px"
                  label="所属经办机构">
                  </el-table-column>
                  <el-table-column
                  prop="AAE140"
                  label="险种">
                  </el-table-column>
                  <el-table-column
                  prop="AAC001"
                  width="120px"
                  label="个人编码">
                  </el-table-column>
                  <el-table-column
                  prop="BKC051"
                  label="科室">
                  </el-table-column>
                  <el-table-column
                  prop="BKC023"
                  width="120px"
                  label="医院的住院号">
                  </el-table-column>
                  <el-table-column
                  prop="STARTINDT"
                  width="120px"
                  label="入院开始日期">
                  </el-table-column>
                  <el-table-column
                  prop="ENDINDT"
                  width="120px"
                  label="入院截止日期">
                  </el-table-column>
                  <el-table-column
                  prop="STARTOUTDT"
                  width="120px"
                  label="出院开始日期">
                  </el-table-column>
                  <el-table-column
                  prop="ENDOUTDT"
                  width="120px"
                  label="出院截止日期">
                  </el-table-column>
                  <el-table-column
                  prop="ACK222"
                  label="入院类型">
                  </el-table-column>
                  <el-table-column
                  prop="BKC036"
                  label="结算标志">
                  </el-table-column>
                  <el-table-column
                  prop="AKA120"
                  label="就医病种">
                  </el-table-column>
                  <el-table-column
                  prop="AAE011"
                  label="经办人">
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
        AKC190:"",
        AAB034:"",
        AAE140:"",
        AKA130:"",
        AAC001:"",
        BKC051:"",
        BKC023:"",
        STARTINDT:"",
        ENDINDT:"",
        STARTOUTDT:"",
        ENDOUTDT:"",
        ACK222:"",
        BKC036:"",
        AKA120:"",
        AAE011:""
      },
      hospitalNum: "",
      AAC003: "",
      BKC023: "",
      startAKC192: "",
      endAKC192: "",
      startAKC194: "",
      endAKC194: "",
      hospitalxml: "",
      pageSize: 10,
      currentPage: 1,
      endtotal: 0,
      flag: 1,
      registerData: []
    };
  },
  watch: {
    /* hospitalNum(num) {
      console.log((num / Math.pow(10, 10)).toFixed(10).substr(2));
    } */
  },
  filters: {},
  methods: {
    getRegister() {
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
           hosdata.STARTINDT == undefined
              ? (this.hosdata.STARTINDT = this.hosdata.STARTINDT)
              : (this.hosdata.STARTINDT = hosdata.STARTINDT);
            this.hosdata.ENDINDT == undefined
              ? (this.hosdata.ENDINDT = this.hosdata.ENDINDT)
              : (this.hosdata.ENDINDT = hosdata.ENDINDT);
            this.hosdata.STARTOUTDT == undefined
              ? (this.hosdata.STARTOUTDT = this.hosdata.STARTOUTDT)
              : (this.hosdata.STARTOUTDT = hosdata.STARTOUTDT);
            this.hosdata.ENDOUTDT == undefined
              ? (this.hosdata.ENDOUTDT =  this.hosdata.ENDOUTDT)
              : (this.hosdata.ENDOUTDT =  hosdata.ENDOUTDT);
            this.hosdata.AKC190 == undefined
              ? (this.hosdata.AKC190 =  this.hosdata.AKC190)
              : (this.hosdata.AKC190 =  hosdata.AKC190);
            this.hosdata.AAB034 == undefined
              ? (this.hosdata.AAB034 =  this.hosdata.AAB034)
              : (this.hosdata.AAB034 =  hosdata.AAB034);
            this.hosdata.AAE140 == undefined
              ? (this.hosdata.AAE140 =  this.hosdata.AAE140)
              : (this.hosdata.AAE140 =  hosdata.AAE140);
            this.hosdata.AKA130 == undefined
              ? (this.hosdata.AKA130 =  this.hosdata.AKA130)
              : (this.hosdata.AKA130 =  hosdata.AKA130);
            this.hosdata.AAC001 == undefined
              ? (this.hosdata.AAC001 =  this.hosdata.AAC001)
              : (this.hosdata.AAC001 =  hosdata.AAC001);
            this.hosdata.BKC051 == undefined
              ? (this.hosdata.BKC051 =  this.hosdata.BKC051)
              : (this.hosdata.BKC051 =  hosdata.BKC051);
            this.hosdata.BKC023 == undefined
              ? (this.hosdata.BKC023 =  this.hosdata.BKC023)
              : (this.hosdata.BKC023 =  hosdata.BKC023);
            this.hosdata.ACK222 == undefined
              ? (this.hosdata.ACK222 =  this.hosdata.ACK222)
              : (this.hosdata.ACK222 =  hosdata.ACK222);
            this.hosdata.BKC036 == undefined
              ? (this.hosdata.BKC036 =  this.hosdata.BKC036)
              : (this.hosdata.BKC036 =  hosdata.BKC036);
            this.hosdata.AKA120 == undefined
              ? (this.hosdata.AKA120 =  this.hosdata.AKA120)
              : (this.hosdata.AKA120 =  hosdata.AKA120);
            this.hosdata.AAE011 == undefined
              ? (this.hosdata.AAE011 =  this.hosdata.AAE011)
              : (this.hosdata.AAE011 =  hosdata.AAE011);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },

    RegisterInit(val) {
      this.flag = 1;
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/downloadkc21/list",
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
            this.registerData = res.data.page.list;
            this.endtotal = res.data.page.totalCount;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },
    Registersearch(val) {
      this.flag = 2;
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/downloadkc21/list",
        data: {
          page: val,
          limit: 10,
          AAC003: this.AAC003,
          BKC023: this.BKC023,
          startAKC192: this.startAKC192,
          endAKC192: this.endAKC192,
          startAKC194: this.startAKC194,
          endAKC194: this.endAKC194
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.registerData = res.data.page.list;
            this.endtotal = res.data.page.totalCount;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },

    // 分页查询
    handleCurrentChange(val) {
      if (this.flag == 1) {
        this.RegisterInit(val);
      } else {
        this.Registersearch(val);
      }
    },
    registerClick() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          AKC190: this.hosdata.AKC190,
          AAB034: this.hosdata.AAB034,
          AAE140: this.hosdata.AAE140,
          AKA130: this.hosdata.AKA130,
          AAC001: this.hosdata.AAC001,
          BKC051: this.hosdata.BKC051,
          BKC023: this.hosdata.BKC023,
          ACK222: this.hosdata.ACK222,
          BKC036: this.hosdata.BKC036,
          AKA120: this.hosdata.AKA120,
          AAE011: this.hosdata.AAE011,
          STARTINDT: this.hosdata.STARTINDT,
          ENDINDT: this.hosdata.ENDINDT,
          STARTOUTDT: this.hosdata.STARTOUTDT,
          ENDOUTDT: this.hosdata.ENDOUTDT,
          requestId: "701",
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
        /* var state = 1;
      if (state == 1) {
        var res =
          '<?xml version="1.0" encoding="GBK" standalone="no" ?>' +
          "<transferinfo>" +
          "<headinfo>" +
          "<REQUESTID>701</REQUESTID>" +
          "<AKB020>SNYY0005</AKB020>" +
          "<AAB034>61100001</AAB034>" +
          "<BKB026>888888</BKB026>" +
          "<USCODE>管理员</USCODE>" +
          "<USNAME>管理员</USNAME>" +
          "<DATACOUNT>1</DATACOUNT>" +
          "<ROWCOUNT1>1</ROWCOUNT1>" +
          "<ROWCOUNT2>0</ROWCOUNT2>" +
          "<ROWCOUNT3>0</ROWCOUNT3>" +
          "<ROWCOUNT4>0</ROWCOUNT4>" +
          "<ERRCODE>1</ERRCODE>" +
          "<ERRMSG></ERRMSG>" +
          "</headinfo>" +
          "<datas>" +
          "<data1>" +
          "<row>																								" +
          "<AKC190>000000009511256</AKC190>" +
          "<AKB020>SNYY0005</AKB020>" +
          "<AKB021>西关医院</AKB021>" +
          "<AAB001>11000004170</AAB001>" +
          "<AAB004>山阳县政策破产企业退休人员__酒厂</AAB004>" +
          "<AAC002>612525195112090155</AAC002>" +
          "<AAC001>100000363505</AAC001>" +
          "<AAC003>詹凯朝测试</AAC003>" +
          "<AAC004>1</AAC004>" +
          "<AKC020>0001906861100024</AKC020>" +
          "<AKC021>21</AKC021>" +
          "<AAC008>2</AAC008>" +
          "<AKC401>1</AKC401>										" +
          "<BAC515>1</BAC515>" +
          "<AKA130>21</AKA130>" +
          "<BKC051>外科</BKC051>" +
          "<AKC192>2019-06-03</AKC192>" +
          "<ACK222>1</ACK222>" +
          "<BKC286>十二指肠</BKC286>" +
          "<AKC193>B76.000</AKC193>" +
          "<AKA120>00001</AKA120>" +
          "<AKC194></AKC194>" +
          "<AKC195></AKC195>" +
          "<BKC287></BKC287>" +
          "<AKC196></AKC196>" +
          "<BKC059>李四</BKC059>" +
          "<BKC089></BKC089>" +
          "<AAE006></AAE006>" +
          "<AAE005>13811111111</AAE005>" +
          "<BKC080>周一</BKC080>" +
          "<AAC006>1951-12-09</AAC006>" +
          "<AAE011>管理员</AAE011>" +
          "<AAE036>2019-06-04 11:47:17</AAE036>" +
          "<BKC023>0000000041</BKC023>" +
          "<BKC036>1</BKC036>" +
          "<BKC067></BKC067>" +
          "<AAE040>2019-06-04 11:47:18</AAE040>" +
          "<AAB034>61100001</AAB034>" +
          "<BAA001>61100024</BAA001>" +
          "<AKC191>2</AKC191>" +
          "<BKA005></BKA005>" +
          "<AKC255></AKC255>	" +
          "<AKC197>0</AKC197>" +
          "<AAE140>3</AAE140>" +
          "<BKC256>0.0</BKC256>" +
          "<AKC204></AKC204>" +
          "<AKC206></AKC206>" +
          "<AKC207></AKC207>" +
          "<AKC216></AKC216>" +
          "<AKC217></AKC217>" +
          "<AKC209></AKC209>" +
          "</row>" +
          "</data1>" +
          "</datas>" +
          "</transferinfo>"; */
        var wordsContent = encodeURIComponent(res);
        // 将下载下来的数据保存到数据库
        axios({
          method: "post",
          url:
            axios.PARK_API +
            "/medical_reimbursement/downloadkc21/saveDownloadkc21",
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
    this.RegisterInit(1);
  }
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
.botMain .el-icon-school {
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
