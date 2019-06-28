<template>
    <div class="content">
				<div class="top">
						<span>门诊号：</span>
						<el-input v-model="hospitalNum"  placeholder="请输入内容"></el-input>
						<el-button type="primary" @click="gitHospitlaMsg">查询</el-button>
            <el-button type="success" @click="gitHosave">门诊结算保存</el-button>
            <el-button type="primary" class="el-icon-printer" @click="gitclinic">门诊结算打印</el-button>
				</div>
				<div class="botMain">
						<p><span class="el-icon-school"></span><span class="fzstyle">门诊信息</span></p>
								<el-row>
                  <el-col :span="8">
										<div class="grid-content">
											<span>患者:</span>
											<el-input v-model="hosdata.AAC003"  placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											  <span>医院的门诊号:</span>
												<el-input v-model="hosdata.BKC023"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											  <span>病案号:</span>
												<el-input v-model="hosdata.BKC329"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
								
								</el-row>
								<el-row>
									<el-col :span="8">
										<div class="grid-content">
											  <span>ICD-10编码:</span>
												<el-input v-model="hosdata.AKC193" placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>其他诊断二ICD10编码:</span>
											<el-input v-model="hosdata.BKC331"  placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>其他诊断三ICD10编码:</span>
											 <!-- <el-date-picker
												v-model="hosdata.AKC192"
												type="date"
												value-format="yyyy-MM-dd"
												placeholder="选择日期">
											</el-date-picker> -->
											<el-input v-model="hosdata.BKC332"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
								</el-row>
								
								<el-row>
									
									<el-col :span="8">
										<div class="grid-content">
											<span>其他诊断四ICD10编码:</span>
											<el-input v-model="hosdata.BKC333"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											  <span>其他诊断五ICD10编码:</span>
												<el-input v-model="hosdata.BKC334"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>其他诊断六ICD10编码:</span>
											<el-input v-model="hosdata.BKC335" placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
								</el-row>
								<el-row>					
									<el-col :span="8">
										<div class="grid-content">
											<span>其他诊断七ICD10编码:</span>
											<el-input v-model="hosdata.BKC336"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											  <span>其他诊断八ICD10编码:</span>
												<el-input v-model="hosdata.BKC337" placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>主治医师1:</span>
											<el-input v-model="hosdata.BKC059" placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
								</el-row>
                <el-row>
                  
                  <el-col :span="8">
                    <div class="grid-content">
                      <span>主治医师2:</span>
                      <el-input v-model="hosdata.BKC159" placeholder="请输入内容"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content">
                      <span>主治医师3:</span>
                      <el-input v-model="hosdata.BKC160" placeholder="请输入内容"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content">
                      <span>科室:</span>
                      <el-input v-model="hosdata.BKC051" placeholder="请输入内容"></el-input>
                    </div>
                  </el-col>
                </el-row>
              	<el-row>
								
                  <el-col :span="8">
                    <div class="grid-content">
                      <span>联系电话:</span>
                      <el-input v-model="hosdata.AAE005" placeholder="请输入内容"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content">
                      <span>联系地址:</span>
                      <el-input v-model="hosdata.AAE006" placeholder="请输入内容"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content">
                      <span>his总金额:</span>
                      <el-input v-model="hosdata.HISZJE" placeholder="请输入内容"></el-input>
                    </div>
                  </el-col>
							  </el-row>
              	<el-row>
								
                  <el-col :span="8">
                    <div class="grid-content">
                      <span>参保地行政区划:</span>
                      <el-input v-model="hosdata.AAB034" placeholder="请输入内容"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content">
                      <span>就医类别:</span>
                      <el-input v-model="hosdata.AKA130" placeholder="请输入内容"></el-input>
                    </div>
                  </el-col>
                	<el-col :span="8">
										<div class="grid-content">
											<span>入院诊断:</span>
											<el-input v-model="hosdata.BKC286"  placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
							  </el-row>
              	<p> <span class="el-icon-s-order"></span><span class="fzstyle">费用明细信息</span></p>
                   <el-table
                      :data="moneyData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                      border
                      height="526"
                      style="width: 100%">
                    <el-table-column
                        prop="AKC190"
                        label="就医编号">
                      </el-table-column>
                      <el-table-column
                        prop="AKC220"
                        width="110px"
                        label="处方号">
                      </el-table-column>
                      <el-table-column
                        prop="AAE072"
                        width="110px"
                        label="单据号">
                      </el-table-column>
                      <el-table-column
                        prop="AKC221" 
                        width="100px"             
                        label="处方时间">
                      </el-table-column>
                      <el-table-column
                        prop="AKA213"
                        label="目录类别">
                      </el-table-column>
                      <el-table-column
                        prop="AKC229"
                        label="执行天数">
                      </el-table-column>
                      <el-table-column
                        prop="AKC222"
                        width="140px"
                        label="收费项目编码(医院)">
                      </el-table-column>
                      <el-table-column
                        prop="AKC223"
                        width="140px"
                        label="收费项目名称(医院)">
                      </el-table-column>
                      <el-table-column
                        prop="AKC226"
                        width="60px"
                        label="数量">
                      </el-table-column>
                      <el-table-column
                        prop="AKC225"
                        width="60px"
                        label="单价">
                      </el-table-column>
                      <el-table-column
                        prop="AKC227"
                        width="60px"
                        label="金额">
                      </el-table-column>
                      <el-table-column
                        prop="BKC284"
                        width="160px"
                        label="区分每条明细的唯一性">
                      </el-table-column>
                      <el-table-column
                        prop="BKC023"
                        width="120px"
                        label="医院的就医编号">
                      </el-table-column>
                      <el-table-column
                        prop="BKC059"
                        label="开单医生">
                      </el-table-column>
                      <el-table-column
                        prop="BKC330"
                        width="140px"
                        label="开单医生编号">
                      </el-table-column>
                      <el-table-column
                        prop="BKC051"
                        label="开单科室">
                      </el-table-column>

                      <el-table-column
                        prop="BKC402"
                        width="140px"
                        label="受单科室名称">
                      </el-table-column>
                      <el-table-column
                        prop="BKC400"
                        width="140px"
                        label="受单医生编号">
                      </el-table-column>
                      <el-table-column
                        prop="BKC401"
                        width="140px"
                        label="受单医生姓名">
                      </el-table-column>
                      <el-table-column
                        prop="AAB034"
                        width="140px"
                        label="所属经办机构">
                      </el-table-column>
                    </el-table>
                    <div class="block" id="fenye">
                            <el-pagination
                            background
                            layout="prev, pager, next,total"
                            @current-change="handleCurrentChange"
                            :page-sizes="[10, 20, 30]"
                            :page-size="pageSize"
                            :current-page="currentPage"
                            @size-change="dragSizeChange"
                            :total=endtotal>
                            </el-pagination>
                    </div>
               <!--  <el-row>
                  <el-col :span="24">
                    <div class="grid-content">
                      <el-button type="success" @click="gitHosave">门诊结算保存</el-button>
                    </div>
                  </el-col>
                </el-row> -->
					
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
      hospitalNum: "",
      hosdata: {
        /* BKC023:"",
				BKC329:"",
				AKC192:"",
				BKC286:"",
				AKC193:"",
				BKC059:"",
				BKC159:"",
				BKC160:"",
				BKC051:"",
				BKC089:"",
				AAE005:"",
				AAE006:"" */
      },
      hospitalxml: "",
      moneyData: [],

      endtotal: 0,
      currentPage: 1,
      pageSize: 12,
      hosprintxml: "",
      AKC190: "",
      HISZJE: ""
    };
  },

  created() {},
  watch: {},
  filters: {},
  methods: {
    // 页码改变时去请求数据
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    dragSizeChange(val) {
      this.pageSize = val;
    },
    // 页面初始化请求参数
    gitHospitlaMsg() {
      // 请求list
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/his/readClinicRegInfo",
        params: {
          bkc023: this.hospitalNum,
          //  requestId :"311"
          akb020: localStorage.getItem("akb020"),
          bkb026: localStorage.getItem("bkb026"),
          aab034: localStorage.getItem("aab034"),
          uscode: localStorage.getItem("uscode"),
          usname: localStorage.getItem("usname")
        }
        /* headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      }).then(res => {
        if (res.data.code == 0) {
          this.moneyData = res.data.data.datacon;
          this.endtotal = this.moneyData.length;
          this.hosdata = res.data.data.dataReg;
          var hosdata = res.data.data.dataReg;
          // hosdata.AAC003 = localStorage.getItem('huazhe');
          this.HISZJE = hosdata.HISZJE;
          hosdata.AKA130 == undefined
            ? (this.hosdata.AKA130 = "61100001")
            : (this.hosdata.AKA130 = hosdata.AKA130);
          this.hospitalxml = res.data.data.dataxml;

          // this.hosdata.AAB034='商洛市';
          /* this.hosdata.AAB034='611401';
							console.log(this.hosdata); */
        } else if (res.data.code == 203) {
          this.$message.error("该患者未结算");
        } else {
          this.$message.error(res.data.msg);
        }
      });
      /*   .catch(error => {
          this.$message.error("请检查网络");
        }); */
    },
    // 查询结算费用信息表单个信息
    gitHosave() {
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/medical_reimbursement/settlementcostinfo/queryCostInfo",
        params: {
          bkc023: this.hospitalNum
        }
        /* headers: {
			    "Content-Type": "application/json;charset=UTF-8"
			  } */
      }).then(res => {
        if (res.data.code == 0) {
          this.$message.error("门诊结算已保存");
          // this.hospitalDown(this.hospitalxml);
        } else if (res.data.code == 203) {
          // this.$message.error(res.data.msg);
          this.hospitalDown(this.hospitalxml);
        }
      });
      /* .catch(error => {
			    this.$message.error("请检查网络");
			  }); */
    },
    //添加
    hospitalDown(param) {
      console.log(param);
      var state = WSCall.biz(param);
      console.log(state);
      if (state == 1) {
        var res = WSCall.retbiz;
        /*  var state = 1;
				if(state == 1) {
					var res = "<?xml version=\"1.0\" encoding=\"utf-8\"?>"
          +"                                             "
          +"<transferinfo>                               "
          +"  <headinfo>                                 "
          +"    <REQUESTID>311</REQUESTID>               "
          +"    <AKB020>SNYY0005</AKB020>                "
          +"    <AAB034>61100001</AAB034>                "
          +"    <BKB026>888888</BKB026>                  "
          +"    <USCODE>管理员</USCODE>                  "
          +"    <USNAME>管理员</USNAME>                  "
          +"    <DATACOUNT>1</DATACOUNT>                 "
          +"    <ROWCOUNT1>1</ROWCOUNT1>                 "
          +"    <ROWCOUNT2>0</ROWCOUNT2>                 "
          +"    <ROWCOUNT3>0</ROWCOUNT3>                 "
          +"    <ROWCOUNT4>0</ROWCOUNT4>                 "
          +"    <ERRCODE>1</ERRCODE>                     "
          +"    <ERRMSG/>                                "
          +"  </headinfo>                                "
          +"  <datas>                                    "
          +"    <data1>                                  "
          +"      <row>                                  "
          +"        <AKC190>000000009514563</AKC190>     "
          +"        <AKB020>SNYY0005</AKB020>            "
          +"        <AKB021>西关医院</AKB021>            "
          +"        <AKA101>05</AKA101>                  "
          +"        <AAB001>11000006092</AAB001>         "
          +"        <AAB004>竹林关镇政府</AAB004>        "
          +"        <AAC001>100000413540</AAC001>        "
          +"        <AAC003>苏斌</AAC003>                "
          +"        <AAB019/>                            "
          +"        <BKC260>0</BKC260>                   "
          +"        <AKC021>11</AKC021>                  "
          +"        <AKC401>1</AKC401>                   "
          +"        <BAC515>1</BAC515>                   "
          +"        <AAC008>1</AAC008>                   "
          +"        <AKA130>11</AKA130>                  "
          +"        <ACK222/>                            "
          +"        <BKC023>201900000492</BKC023>        "
          +"        <AKA120/>                            "
          +"        <AKC240>0.0</AKC240>                 "
          +"        <AKC250>123.2</AKC250>               "
          +"        <AKC251>0.0</AKC251>                 "
          +"        <AKC252>1138.21</AKC252>             "
          +"        <BKC113>0.0</BKC113>                 "
          +"        <BKC242>0.0</BKC242>                 "
          +"        <BKC243>0.0</BKC243>                 "
          +"        <AKC264>9.0</AKC264>                 "
          +"        <AKC253>9.0</AKC253>                 "
          +"        <AKC254>0.0</AKC254>                 "
          +"        <AKC255>9.0</AKC255>                 "
          +"        <BKC245>0.0</BKC245>                 "
          +"        <BKC254>0.0</BKC254>                 "
          +"        <BKC256>0.0</BKC256>                 "
          +"        <BKC257>0.0</BKC257>                 "
          +"        <AKC261>0.0</AKC261>                 "
          +"        <AKC256>0.0</AKC256>                 "
          +"        <AKC257>0.0</AKC257>                 "
          +"        <BKC234>0.0</BKC234>                 "
          +"        <AKC260>0.0</AKC260>                 "
          +"        <AKC263>0.0</AKC263>                 "
          +"        <BKC235>0.0</BKC235>                 "
          +"        <BKC236>0.0</BKC236>                 "
          +"        <BKC251>0.0</BKC251>                 "
          +"        <BKC258>0.0</BKC258>                 "
          +"        <BKC255>0.0</BKC255>                 "
          +"        <AKC258>0.0</AKC258>                 "
          +"        <BKC282>0.0</BKC282>                 "
          +"        <BKC114>0.0</BKC114>                 "
          +"        <BKC111>0.0</BKC111>                 "
          +"        <BKC246>0.0</BKC246>                 "
          +"        <BKC302>0.0</BKC302>                 "
          +"        <BKC304>0.0</BKC304>                 "
          +"        <BKB116>0.0</BKB116>                 "
          +"        <BKC092>0.0</BKC092>                 "
          +"        <BKC093>0.0</BKC093>                 "
          +"        <BKC241>0.0</BKC241>                 "
          +"        <BKC237>0.0</BKC237>                 "
          +"        <BKC238>0.0</BKC238>                 "
          +"        <BKC239>0.0</BKC239>                 "
          +"        <AAE011>管理员</AAE011>              "
          +"        <AAE036>2019-03-04 18:53:51</AAE036> " 
          +"        <BAA001>61100022</BAA001>            "
          +"        <AAE040>2019-03-04 18:53:51</AAE040> " 
          +"        <BKC026>0.0</BKC026>                 "
          +"        <BKA005/>                            "
          +"        <BKA006/>                            "
          +"        <BAA006>1</BAA006>                   "
          +"        <BAA007/>                            "
          +"        <BKC038/>                            "
          +"        <BKC039/>                            "
          +"        <AAB034>61100001</AAB034>            "
          +"        <AKB131>1</AKB131>                   "
          +"        <BKC288>0.0</BKC288>                 "
          +"        <BKC299>0.0</BKC299>                 "
          +"        <BKC300>0.0</BKC300>                 "
          +"        <BKC240>0.0</BKC240>                 "
          +"        <BKC252>0.0</BKC252>                 "
          +"        <BKC259>0.0</BKC259>                 "
          +"        <BKC283/>                            "
          +"        <BKC281>2</BKC281>                   "
          +"        <BKA249>0.0</BKA249>                 "
          +"        <BKC058>0.0</BKC058>                 "
          +"        <BKC286/>                            "
          +"        <AKC199/>                            "
          +"        <AKA232/>                            "
          +"        <BKA251/>                            "
          +"        <AKC192>2019-03-04</AKC192>          "
          +"        <AKC194>2019-03-04</AKC194>          "
          +"        <BKC118>0.0</BKC118>                 "
          +"        <AAE140>3</AAE140>                   "
          +"        <AMC102/>                            "
          +"        <BKC117>0.0</BKC117>                 "
          +"        <BKC120>0.0</BKC120>                 "
          +"        <BKC121>0.0</BKC121>                 "
          +"        <BKC122>0.0</BKC122>                 "
          +"        <BKC123>0.0</BKC123>                 "
          +"        <BKC060T1>0.0</BKC060T1>             "
          +"        <BKC061T1>0.0</BKC061T1>             "
          +"        <BKC045T1>0.0</BKC045T1>             "
          +"        <BKC258T1>0.0</BKC258T1>             "
          +"        <BKC047T1>0.0</BKC047T1>             "
          +"        <AKC257T1>0.0</AKC257T1>             "
          +"        <BKC060T2>0.0</BKC060T2>             "
          +"        <BKC061T2>0.0</BKC061T2>             "
          +"        <BKC045T2>0.0</BKC045T2>             "
          +"        <BKC258T2>0.0</BKC258T2>             "
          +"        <BKC047T2>0.0</BKC047T2>             "
          +"        <AKC257T2>0.0</AKC257T2>             "
          +"        <BKC060T3>0.0</BKC060T3>             "
          +"        <BKC061T3>0.0</BKC061T3>             "
          +"        <BKC045T3>0.0</BKC045T3>             "
          +"        <BKC258T3>0.0</BKC258T3>             "
          +"        <BKC047T3>0.0</BKC047T3>             "
          +"        <AKC257T3>0.0</AKC257T3>             "
          +"        <BZZ001>0.0</BZZ001>                 "
          +"        <BZZ002>0.0</BZZ002>                 "
          +"        <BZZ003>0.0</BZZ003>                 "
          +"        <BZZ004>0.0</BZZ004>                 "
          +"        <BZZ005>0.0</BZZ005>                 "
          +"        <BZZ006>0.0</BZZ006>                 "
          +"      </row>                                 "
          +"    </data1>                                 "
          +"  </datas>                                   "
          +"</transferinfo>                              "; */
        var wordsContent = encodeURIComponent(res);
        // 将下载下来的数据保存到数据库
        axios({
          method: "post",
          url:
            axios.PARK_API +
            "/medical_reimbursement/settlementcostinfo/saveSettlementCost",
          data: {
            xml: wordsContent
          },
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }).then(res => {
          if (res.data.code == 0) {
            this.$message.success("结算保存成功");
            this.getHisupload();
          } else {
            this.$message.error(res.data.msg);
          }
        });
        /* .catch(error => {
							this.$message.error("请检查网络");
						}); */
      } else {
        this.$message.warning("结算保存失败");
      }
    },
    // 修改门诊his总金额
    getHisupload() {
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/medical_reimbursement/settlementcostinfo/updateCliHiszje",
        data: {
          BKC023: this.hospitalNum,
          HISZJE: this.HISZJE
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          console.log("门诊修改his总金额成功");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 门诊结算单打印
    gitclinic() {
      // 请求门诊列表
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/medical_reimbursement/settlementcostinfo/queryCostInfo",
        params: {
          bkc023: this.hospitalNum
        }
        /* headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      }).then(res => {
        if (res.data.code == 0) {
          var hosdata = res.data.data;
          this.gitClinicave(hosdata);
        } else if (res.data.code == 203) {
          this.$message.warning(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    gitClinicave(hosdata) {
      /*   if(this.AKA130 == undefined) {
        this.AKA130 = "";
      } */
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          AAB034: hosdata.AAB034,
          AKC190: hosdata.AKC190,
          AKA130: hosdata.AKA130,
          AAE140: hosdata.AAE140,
          requestId: "918",

          akb020: localStorage.getItem("akb020"),
          bkb026: localStorage.getItem("bkb026"),
          aab034: localStorage.getItem("aab034"),
          uscode: localStorage.getItem("uscode"),
          usname: localStorage.getItem("usname")
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.hosprintxml = res.data.data;
          this.hosPrint(this.hosprintxml);
        } else {
          this.$message.error(res.data.msg);
        }
      });
      /* .catch(error => {
			    this.$message.error("请检查网络");
			  }); */
    },
    // 点击打印按钮调用打印函数
    hosPrint(param) {
      console.log(param);
      var state = WSCall.biz(param);
      console.log(state);
      if (state == 1) {
        var res = WSCall.retbiz;
      } else {
        this.$message.error("门诊结算打印失败");
      }
    }
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
.botMain .el-icon-s-order {
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
.top span {
  font-size: 14px;
}
.row-bg {
  padding: 10px 0;
  /* background-color: #f9fafc; */
}
#fenye {
  background: #c1c1c1;
}
</style>
