<template>
    <div class="content">
				<div class="top">
					   <span>门诊号：</span>
					   <el-input v-model="hospitalNum"  placeholder="请输入内容"></el-input>
					   <el-button type="primary" @click="gitHospitlaMsg">查询</el-button>
             <el-button type="warning" icon="el-icon-close" @click="clinicFeecancel">门诊结算退费</el-button>
				</div>
				<div class="botMain">
						<p> <span class="el-icon-school"></span><span class="fzstyle">门诊信息</span></p>
								<el-row>
									<el-col :span="8">
										<div class="grid-content">
											  <span>就医流水号:</span>
												<el-input v-model="hosdata.AKC190"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											  <span>参保地行政区划:</span>
												<el-input v-model="hosdata.AAB034"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>就医类别:</span>
											<el-input v-model="hosdata.AKA130"  placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="8">
										<div class="grid-content">
											  <span>医院的住院号:</span>
												<el-input v-model="hosdata.BKC023" placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>就医病种:</span>
											<el-input v-model="hosdata.AKA120"  placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>就医日期:</span>
											 <el-date-picker
												v-model="hosdata.AKC192"
												type="date"
												value-format="yyyy-MM-dd"
												placeholder="选择日期">
											</el-date-picker>
											<!-- <el-input v-model="hosdata.BKC332"  placeholder="请输入内容"></el-input> -->
										</div>
									</el-col>
								</el-row>				
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
			hospitalNum:"",
			hosdata:{},
      hospitalxml:"",
			moneyData: [],			
		/* 	endtotal: 0,
      currentPage: 1,
      pageSize: 12, */
			
    };
  },

  created() {},
  watch: {
  },
  filters: {

  },
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
					 bkc023:this.hospitalNum,
          //  requestId :"311"
				},
        /* headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      })
        .then(res => {
          if (res.data.code == 0) {
							// this.moneyData = res.data.data.datacon;
							// this.endtotal = this.moneyData.length;
							this.hosdata = res.data.data.dataReg;
							var hosdata = res.data.data.dataReg;
							hosdata.AKA130 == undefined? (this.hosdata.AKA130 = "61100001"):(this.hosdata.AKA130 = hosdata.AKA130);
							this.hospitalxml = res.data.data.dataxml;
					
							// this.hosdata.AAB034='商洛市';
							/* this.hosdata.AAB034='61100001';
							console.log(this.hosdata); */
          } else {
            this.$message.error(res.data.msg);
          }
        })
      /*   .catch(error => {
          this.$message.error("请检查网络");
        }); */
		},
		// 查询结算费用信息表单个信息
		gitHosave() {		
			axios({
			  method: "post",
			  url: axios.PARK_API + "/medical_reimbursement/settlementcostinfo/queryCostInfo",
			  params: {
					bkc023: this.hospitalNum
				},				
			  /* headers: {
			    "Content-Type": "application/json;charset=UTF-8"
			  } */
			})
			  .then(res => {
			    if (res.data.code == 0) {
						this.$message.error('门诊结算已保存')
						// this.hospitalDown(this.hospitalxml);	
			    } else if(res.data.code == 203){
						// this.$message.error(res.data.msg);
						this.hospitalDown(this.hospitalxml)
			    }
			  })
			 /* .catch(error => {
			    this.$message.error("请检查网络");
			  }); */
		},
		//添加
		hospitalDown(param) {
			// console.log(param)
			  var state = WSCall.biz(param);
				if (state == 1) {
				var res = WSCall.retbiz; 
			/* 	var state = 1;
				if(state == 1) {
					var res = "<?xml version=\"1.0\" encoding=\"utf-8\"?>       "
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
							url: axios.PARK_API + "/medical_reimbursement/settlementcostinfo/saveSettlementCost",
							data: {
									xml : wordsContent
							},
							headers: {
								"Content-Type": "application/json;charset=UTF-8"
							}
						})
							.then(res => {
								if (res.data.code == 0) {
									 this.$message.success('登记成功');
									
								} else {
									this.$message.error(res.data.msg);
								}
							})
						/* .catch(error => {
							this.$message.error("请检查网络");
						}); */

			} else {
				 this.$message.warning('登记失败');
			}
		},
		// 门诊结算退费
		clinicFeecancel() {

		}
  },
  computed: {},
  components: {
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
.botMain p{
	width: 100%;
	height: 36px;
	line-height: 36px;
	background-color: #EEEEEE;
	/* margin-left: 10px; */
}

.botMain .el-icon-school,.botMain .el-icon-s-order {
	font-size: 20px;
	font-weight: 700;
	color: #409EFF;
	margin-left: 10px;
}
.botMain .fzstyle {
	margin-left: 10px;
	font-size: 14px;
	color: #409EFF;
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
.grid-content span,.top span {
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
