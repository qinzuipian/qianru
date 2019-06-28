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
      hospitalNum: "",
      hosdata: {
        AKC190:"",
        AKA120:"",
        AAB034:"",
        BKC023:"",
        AKA130:"",
        AKC192:"",
      },
      hospitalxml: ""
    };
  },

  created() {},
  watch: {},
  filters: {},
  methods: {
    // 页面初始化请求参数(门诊结算退费)
    gitHospitlaMsg() {
      // 请求list
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
          // this.moneyData = res.data.data.datacon;
          // this.endtotal = this.moneyData.length;
          // this.hosdata = res.data.data;
          var hosdata = res.data.data;

          hosdata.AKC190 == undefined
            ? (this.hosdata.AKC190 = "")
            : (this.hosdata.AKC190 = hosdata.AKC190);
          hosdata.AKA130 == undefined
            ? (this.hosdata.AKA130 = "")
            : (this.hosdata.AKA130 = hosdata.AKA130);
          hosdata.BKC023 == undefined
            ? (this.hosdata.BKC023 = "")
            : (this.hosdata.BKC023 = hosdata.BKC023);
          hosdata.AAB034 == undefined
            ? (this.hosdata.AAB034 = "61100001")
            : (this.hosdata.AAB034 = hosdata.AAB034);
          hosdata.AKC192 == undefined
            ? (this.hosdata.AKC192 = "")
            : (this.hosdata.AKC192 = hosdata.AKC192);
          hosdata.AKA120 == undefined
            ? (this.hosdata.AKA120 = "")
            : (this.hosdata.AKA120 = hosdata.AKA120);
        } else {
          this.$message.error(res.data.msg);
        }
      });
      /*   .catch(error => {
          this.$message.error("请检查网络");
        }); */
    },
    // 门诊结算退费（data转xml）
    clinicFeecancel() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          AKC190: this.hosdata.AKC190,
          AKA120: this.hosdata.AKA120,
          AAB034: this.hosdata.AAB034,
          BKC023: this.hosdata.BKC023,
          AKA130: this.hosdata.AKA130,
          AKC192: this.hosdata.AKC192,
          requestId: "511",

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
          this.hospitalxml = res.data.data;
          this.hospitalDown(this.hospitalxml);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //添加
    hospitalDown(param) {
      console.log(param);
      var state = WSCall.biz(param);
      console.log(state)
      if (state == 1) {
        var res = WSCall.retbiz;
        this.$message.success('门诊结算退费成功')
        this.getClinicdelete();
      } else {
        this.$message.error('门诊结算退费失败')
      }
    },
    // 门诊结算退费删除
    getClinicdelete() {
       axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/settlementcostinfo/delete",
        data: {
          AKC190: this.hosdata.AKC190
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          console.log('门诊结算退费成功')
        } else {
          this.$message.error(res.data.msg);
        }
      });
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
