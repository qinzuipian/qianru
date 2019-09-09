<template>
    <div class="content">
       <!--  <div class="top">
             <span>住院号：</span>
					   <el-input v-model="hospitalNum"  placeholder="请输入内容"></el-input>
					   <el-button type="primary" @click="getSummary">查询</el-button>
            <el-button  type="success" icon="el-icon-printer" style="margin-left: 10px;" @click="summaryClick">打印</el-button>
        </div>   --> 
		     <div class="botMain">
						<p> <span class="el-icon-document"></span><span class="fzstyle">结算费用汇总表</span></p>
								<el-row>
									<el-col :span="8">
										<div class="grid-content">
											  <span>下载起始年月:</span>
                        <el-date-picker
                          v-model="STARTOUTDT"
                          type="month"
                          value-format="yyyy-MM"
                          placeholder="选择开始日期">
                          </el-date-picker>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											   <span>下载截止年月:</span>
                        <el-date-picker
                          v-model="ENDOUTDT"
                          type="month"
                          value-format="yyyy-MM"
                          placeholder="选择开始日期">
                          </el-date-picker>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>起始结算日期:</span>
											<el-date-picker
                      v-model="STARTINDT"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择开始日期">
                      </el-date-picker>
										</div>
									</el-col>
									
								</el-row>
								<el-row>
									<el-col :span="8">
										<div class="grid-content">
											 	<span>截止结算日期:</span>
											<el-date-picker
                      v-model="ENDINDT"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择开始日期">
                      </el-date-picker>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>经办机构编码:</span>
											<el-input v-model="BAA001"  placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											  <span>人员类别:</span>
												<el-input v-model="AKC021"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
								</el-row>
								
								<el-row>									
									<el-col :span="8">
										<div class="grid-content">
											<span>所属经办机构:</span>
											<el-input v-model="AAB034"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									
									
								</el-row>
							
							 
							  
							  <el-row>
									<el-col :span="24">
										<div class="grid-content">
											<el-button type="primary" icon="el-icon-printer" @click="summaryClick">结算费用汇总表打印</el-button>
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
  data() {
    return {
      STARTOUTDT:"",
      ENDOUTDT:"",
      STARTINDT:"",
      ENDINDT:"",
      BAA001:"",
      AKC021:"",
      AAB034:"",
    };
  },

  watch: {
    /* hospitalNum(num) {
      console.log((num / Math.pow(10, 10)).toFixed(10).substr(2));
    } */
  },
  filters: {},
  methods: {
  
    // 打印
    summaryClick() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          STARTOUTDT: this.STARTOUTDT,
          ENDOUTDT: this.ENDOUTDT,
          AAB034: this.AAB034,
          STARTINDT: this.STARTINDT,
          ENDINDT: this.ENDINDT,
          AKC021: this.AKC021,
          BAA001: this.BAA001,
          requestId: "920",

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
          this.hosPrint(res.data.data);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    hosPrint(param) {
      console.log(param);
      var state = WSCall.biz(param);
      console.log(state);
      if (state == 1) {
        var res = WSCall.retbiz;
      } else {
        this.$message.error("结算费用汇总表打印失败");
      }
    }
  },
  created() {}
};
</script>

<style scoped>
.top {
  padding: 10px;
}
.top span {
  font-size: 14px;
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
.botMain .el-icon-document {
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
.row-bg {
  padding: 10px 0;
  /* background-color: #f9fafc; */
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
</style>
