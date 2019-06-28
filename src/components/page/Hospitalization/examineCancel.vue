<template>
    <div class="content">
				<div class="top">
						<span>住院号：</span>
						<el-input v-model="hospitalNum"  placeholder="请输入内容"></el-input>
						<el-button type="primary" @click="gitHospitlaMsg">查询</el-button>
						<el-button type="warning" class="el-icon-close" @click="gethosCancel">住院登记撤销</el-button>
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
											  <span>参保地行政区划:</span>
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
											<span>医院的住院号:</span>
											<el-input v-model="hosdata.BKC023"  placeholder="请输入内容"></el-input>
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
							<!-- <el-row>
								<el-col :span="24">
									<div class="grid-content">
										 <el-button type="success" @click="gitHosave">住院登记保存</el-button>
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
			hospitalNum:"",
			hosdata:{
				AKC190:"",
				AAB034:"",
				AAE140:"",
				AKA130:"",
				BKC023:"",
				AKC192:""
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
        url: axios.PARK_API + "/medical_reimbursement/hospitalizationregister/queryHosInfo",
        params: {
						bkc023:this.hospitalNum
				},
        /* headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      })
        .then(res => {
          if (res.data.code == 0) {
							// this.hosdata = res.data.data;
							// this.hosdata.AAB034='商洛市';
							// this.hosdata.AAB034 = '61100001';
							console.log(this.hosdata)
							var hosdata = res.data.data;
							hosdata.AKC190 == undefined?this.hosdata.AKC190 = "":this.hosdata.AKC190 = hosdata.AKC190;
							hosdata.AAE140 == undefined?this.hosdata.AAE140 = "":this.hosdata.AAE140 = hosdata.AAE140;
							hosdata.AKA130 == undefined?this.hosdata.AKA130 = "":this.hosdata.AKA130 = hosdata.AKA130;
							hosdata.BKC023 == undefined?this.hosdata.BKC023 = "":this.hosdata.BKC023 = hosdata.BKC023;
							hosdata.AKC192 == undefined?this.hosdata.AKC192 = "":this.hosdata.AKC192 = hosdata.AKC192;
							hosdata.AAB034 == undefined?this.hosdata.AAB034 = "61100001":this.hosdata.AAB034 = hosdata.AAB034;
          } else {
            this.$message.error(res.data.msg);
          }
        })
      /*   .catch(error => {
          this.$message.error("请检查网络");
        }); */
		},
		// 参数转换xml
		gethosCancel() {
			console.log(this.hosdata)
			axios({
			  method: "post",
			  url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
			  data: {
					AKC190:this.hosdata.AKC190,
					AAB034:this.hosdata.AAB034,
					AAE140:this.hosdata.AAE140,
					AKA130:this.hosdata.AKA130,
					BKC023:this.hosdata.BKC023,
					AKC192:this.hosdata.AKC192,		
					requestId:"421",

					akb020:localStorage.getItem("akb020"),
					bkb026:localStorage.getItem("bkb026"),
					aab034:localStorage.getItem("aab034"),
					uscode:localStorage.getItem("uscode"),
					usname:localStorage.getItem("usname")
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
			console.log(param)
			var state = WSCall.biz(param);
			console.log(state)
			if (state == 1) {
				var res = WSCall.retbiz;
				this.$message.success('住院登记撤销成功');
				this.hosLogindelete();
			} else {
				this.$message.error('住院登记撤销失败')	
			}
		},
		
		// 住院登记撤销删除
		hosLogindelete() {
				axios({
			  method: "post",
			  url: axios.PARK_API + "/medical_reimbursement/hospitalizationregister/delete",
			  data: {
					AKC190:this.hosdata.AKC190,
				},				
			  headers: {
			    "Content-Type": "application/json;charset=UTF-8"
			  }
			})
			  .then(res => {
			    if (res.data.code == 0) {
						console.log('住院登记撤销成功')
			    } else {
			      this.$message.error(res.data.msg);
			    }
			  })
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
