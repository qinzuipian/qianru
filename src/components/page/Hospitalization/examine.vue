<template>
    <div class="content">
				<div class="top">
						<span>住院号：</span>
						<el-input v-model="hospitalNum"  placeholder="请输入内容"></el-input>
						<el-button type="primary" @click="gitHospitlaMsg">查询</el-button>
				</div>
				<div class="botMain">
						<p> <span class="el-icon-school"></span><span class="fzstyle">住院信息</span></p>
								<el-row>
									<el-col :span="8">
										<div class="grid-content">
											  <span>患者:</span>
												<el-input v-model="hosdata.AAC003"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											  <span>医院的住院号:</span>
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
											  <span>入院诊断:</span>
												<el-input v-model="hosdata.BKC286" placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>ICD-10编码:</span>
											<el-input v-model="hosdata.AKC193"  placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>入院日期:</span>
											 <el-date-picker
												v-model="hosdata.AKC192"
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
											<span>主治医师1:</span>
											<el-input v-model="hosdata.BKC059"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											  <span>主治医师2:</span>
												<el-input v-model="hosdata.BKC159"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>主治医师3:</span>
											<el-input v-model="hosdata.BKC160" placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
								</el-row>
								<el-row>
									
									<el-col :span="8">
										<div class="grid-content">
											<span>科室:</span>
											<el-input v-model="hosdata.BKC051"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											  <span>床号:</span>
												<el-input v-model="hosdata.BKC089" placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>联系电话:</span>
											<el-input v-model="hosdata.AAE005" placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
								</el-row>
							<el-row>
								
								<el-col :span="8">
									<div class="grid-content">
										<span>联系地址:</span>
										<el-input v-model="hosdata.AAE006" placeholder="请输入内容"></el-input>
									</div>
								</el-col>
								<el-col :span="8">
									<div class="grid-content">
										<span>参保地行政区划:</span>
										<el-input v-model="hosdata.AAB034" placeholder="请输入内容"></el-input>
									</div>
								</el-col>
							</el-row>
							
							<el-row>
								<el-col :span="24">
									<div class="grid-content">
										 <el-button type="success" @click="gitHosave">住院登记保存</el-button>
									</div>
								</el-col>
							</el-row>
					
				</div>
    </div>
</template>

<script>
/* import screen from "../../component/screen";
import reply from "../../component/reply";
import drugshow from "../../component/drugshow";
import addData from "../../component/addData"; */
// import common from "../../common/common.js";
import axios from "axios";

let moment = require("moment");
export default {
  name: "examine",
  data() {
    return {
			hospitalNum:"",
			hosdata:{
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
			hospitalxml:""
			
    };
  },

  created() {

  },
  watch: {
  },
  filters: {

  },
  methods: {
  

    // 页面初始化请求参数
    gitHospitlaMsg() {
      // 请求list
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/his/readHosRegistInfo",
        params: {
						bkc023:this.hospitalNum
				},
        /* headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      })
        .then(res => {
          if (res.data.code == 0) {
							this.hosdata = res.data.data;
							// this.hosdata.AAB034='商洛市';
							this.hosdata.AAB034='61100001';
							console.log(this.hosdata)
							// var hosdata = res.data.data;
							// hosdata.BKC023 == undefined?this.hosdata.BKC023 = "":this.hosdata.BKC023 = hosdata.BKC023;
          } else {
            this.$message.error(res.data.msg);
          }
        })
      /*   .catch(error => {
          this.$message.error("请检查网络");
        }); */
    },
		gitHosave() {
		/* 	this.hosdata.requestId = "121";
			console.log(this.hosdata) */
			if(this.hosdata.AKC193 == undefined || this.hosdata.BKC159 == undefined || this.hosdata.BKC160 == undefined
			 || this.hosdata.BKC329 == undefined || this.hosdata.AAE006 == undefined) {
				this.hosdata.AKC193 = "";
				this.hosdata.BKC159 = "";
				this.hosdata.BKC160 = "";
				this.hosdata.BKC329 = "";
				this.hosdata.AAE006 = "";
			} 
			console.log(this.hosdata)
			axios({
			  method: "post",
			  url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
			  data: {
					AAE005:this.hosdata.AAE005,
					AKC192:this.hosdata.AKC192,
					BKC023:this.hosdata.BKC023,
					BKC051:this.hosdata.BKC051,
					BKC059:this.hosdata.BKC059,
					//BKC080:this.hosdata.BKC080,
					BKC089:this.hosdata.BKC089,
					BKC286:this.hosdata.BKC286,
					AAB034:this.hosdata.AAB034,
					AKC193:this.hosdata.AKC193,				
					BKC159:this.hosdata.BKC159,
					BKC160:this.hosdata.BKC160,
					BKC329:this.hosdata.BKC329,
					AAE006:this.hosdata.AAE006,
					requestId:"121"
				},
				
			  headers: {
			    "Content-Type": "application/json;charset=UTF-8"
			  }
			})
			  .then(res => {
			    if (res.data.code == 0) {
						this.hospitalxml = res.data.data;
						this.hospitalDown(this.hospitalxml)
			    } else {
			      this.$message.error(res.data.msg);
			    }
			  })
			 /* .catch(error => {
			    this.$message.error("请检查网络");
			  }); */
		},
		
		hospitalDown(param) {
			// console.log(param)
			 var state = WSCall.biz(param);
				if (state == 1) {
				var res = WSCall.retbiz; 
			/* 	var state =1;
				if (state == 1) {
				var res = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"no\" ?>"
					+"<transferinfo>"             
					+"<headinfo>"
					+"<REQUESTID>121</REQUESTID>"
					+"<AKB020>SNYY0005</AKB020>"
					+"<AAB034>61100001</AAB034>"
					+"<BKB026>888888</BKB026>"
					+"<USCODE>管理员</USCODE>"
					+"<USNAME>管理员</USNAME>"
					+"<DATACOUNT>1</DATACOUNT>"
					+"<ROWCOUNT1>1</ROWCOUNT1>"
					+"<ROWCOUNT2>0</ROWCOUNT2>"
					+"<ROWCOUNT3>0</ROWCOUNT3>"
					+"<ROWCOUNT4>0</ROWCOUNT4>"
					+"<ERRCODE>1</ERRCODE>"
					+"<ERRMSG></ERRMSG>"
					+"</headinfo>"
					+"<datas>"
					+"<data1>"
							+"<row>																								"
							+"<AKC190>000000009515984</AKC190>"
							+"<AKB020>SNYY0005</AKB020>"
							+"<AKB021>西关医院</AKB021>"
							+"<AAB001>11000004170</AAB001>"
							+"<AAB004>山阳县政策破产企业退休人员__酒厂</AAB004>"
							+"<AAC002>612525195112090155</AAC002>"
							+"<AAC001>100000363505</AAC001>"
							+"<AAC003>詹凯朝</AAC003>"
							+"<AAC004>1</AAC004>"
							+"<AKC020>0001906861100024</AKC020>"
							+"<AKC021>21</AKC021>"
							+"<AAC008>2</AAC008>"
							+"<AKC401>1</AKC401>										"
							+"<BAC515>1</BAC515>"
							+"<AKA130>21</AKA130>"
							+"<BKC051>外科</BKC051>"
							+"<AKC192>2019-06-03</AKC192>"
							+"<ACK222>1</ACK222>"
							+"<BKC286>十二指肠钩虫病</BKC286>"
							+"<AKC193>B76.000</AKC193>"
							+"<AKA120>00001</AKA120>"
							+"<AKC194></AKC194>"
							+"<AKC195></AKC195>"
							+"<BKC287></BKC287>"								
							+"<AKC196></AKC196>"
							+"<BKC059>张三</BKC059>"
							+"<BKC089></BKC089>"
							+"<AAE006></AAE006>"
							+"<AAE005>13811111111</AAE005>"
							+"<BKC080>周一</BKC080>"
							+"<AAC006>1951-12-09</AAC006>"
							+"<AAE011>管理员</AAE011>"
							+"<AAE036>2019-06-04 11:47:17</AAE036>"
							+"<BKC023>0000000042</BKC023>"
							+"<BKC036>1</BKC036>"
							+"<BKC067></BKC067>"
							+"<AAE040>2019-06-04 11:47:18</AAE040>"
							+"<AAB034>61100001</AAB034>"
							+"<BAA001>61100024</BAA001>"
							+"<AKC191>2</AKC191>"
							+"<BKA005></BKA005>"
							+"<AKC255></AKC255>	"
							+"<AKC197>0</AKC197>"
							+"<AAE140>3</AAE140>"
							+"<BKC256>0.0</BKC256>"
							+"<AKC204></AKC204>"
							+"<AKC206></AKC206>"
							+"<AKC207></AKC207>"
							+"<AKC216></AKC216>"
							+"<AKC217></AKC217>"
							+"<AKC209></AKC209>"
						+"</row>"
					+"</data1>"
				+"</datas>"
			+"</transferinfo>"; */

				var wordsContent = encodeURIComponent(res);
				// 将下载下来的数据保存到数据库
						axios({
							method: "post",
							url: axios.PARK_API + "/medical_reimbursement/hospitalizationregister/saveHospitalizationRegistration",
							params: {
										xml : wordsContent
							}
						/* 	headers: {
								"Content-Type": "application/json;charset=UTF-8"
							} */
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
			/* 	$.ajax({
					type : "POST",
					url : baseURL
							+ "/medical_reimbursement/hospitalizationregister/saveHospitalizationRegistration",
					data : {
						"xml" : wordsContent
					},
					success : function(r) {
						if (r.code === 0) {
							alert('登记成功', function(index) {
								vm.reload();
							});
						} else {
							alert(r.msg);
						}
					}
				}); */
			} else {
				 this.$message.warning('登记失败');
			}
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
.botMain .el-icon-school {
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
</style>
