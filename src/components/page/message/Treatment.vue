<template>
    <div class="content">
        <div class="top">
            <el-button  type="success" icon="el-icon-printer" style="margin-left: 10px;" @click="treatClick">打印</el-button>
        </div>   
		    	<div class="botMain">
						<p> <span class="el-icon-document"></span><span class="fzstyle">商洛市医疗保险待遇汇总表</span></p>
								<el-row>
									<el-col :span="8">
										<div class="grid-content">
											  <span>起始住院申报日期:</span>
												 <el-date-picker
                          v-model="STARTOUTDT"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                        </el-date-picker>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											   <span>截止住院申报日期:</span>
												 <el-date-picker
                          v-model="ENDOUTDT"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                        </el-date-picker>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											 <span>起始特殊门诊申报日期:</span>
												 <el-date-picker
                          v-model="STARTINDT"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                        </el-date-picker>
									  </div>
									</el-col>
								</el-row>
                <el-row>
									<el-col :span="8">
										<div class="grid-content">
											  <span>截止特殊门诊申报日期:</span>
												 <el-date-picker
                          v-model="ENDINDT"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                        </el-date-picker>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											   <span>起始门诊刷卡支付结算日期:</span>
												 <el-date-picker
                          v-model="AKC192"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                        </el-date-picker>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											 <span>截止门诊刷卡支付结算日期:</span>
												 <el-date-picker
                          v-model="AKC194"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                        </el-date-picker>
									  </div>
									</el-col>
								</el-row>
                <el-row>
									<el-col :span="8">
										<div class="grid-content">
											  <span>起始代亲属刷卡支付结算日期:</span>
												 <el-date-picker
                          v-model="AAE036"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                        </el-date-picker>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											   <span>截止代亲属刷卡支付结算日期:</span>
												 <el-date-picker
                          v-model="AAE040"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                        </el-date-picker>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											 <span>是否查询普通住院数据:</span>
												<el-select v-model="BKC067" placeholder="请选择">
                          <el-option
                            v-for="item in BKCptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
									  </div>
									</el-col>
								</el-row>

								<el-row>
									<el-col :span="8">
										<div class="grid-content">
											  <span>是否查询单病种住院数据:</span>
												<el-select v-model="BKC036" placeholder="请选择">
                          <el-option
                            v-for="item in BKC036option"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											 <span>是否查询商州区数据:</span>
												<el-select v-model="AKC195" placeholder="请选择">
                          <el-option
                            v-for="item in AKC195option"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
									  </div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>查询职工还是居民:</span>
												<el-select v-model="AAE140" placeholder="请选择">
                          <el-option
                            v-for="item in AAE140option"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
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
      hospitalxml: "",
      STARTOUTDT: "",
      ENDOUTDT: "",
      STARTINDT: "",
      ENDINDT: "",
      AKC192: "",
      AKC194: "",
      AAE036: "",
      AAE040: "",
      BKCptions: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      BKC067: "",
      BKC036option: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      BKC036: "",
      AKC195option: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      AKC195: "",
      AAE140option: [
        {
          value: "3",
          label: "职工"
        },
        {
          value: "390",
          label: "居民"
        }
      ],
      AAE140: ""
    };
  },
  created() {},
  watch: {
    /* hospitalNum(num) {
      console.log((num / Math.pow(10, 10)).toFixed(10).substr(2));
    } */
  },
  filters: {},
  methods: {
    treatClick() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          STARTOUTDT: this.STARTOUTDT,
          ENDOUTDT: this.ENDOUTDT,
          STARTINDT: this.STARTINDT,
          ENDINDT: this.ENDINDT,
          AKC192: this.AKC192,
          AKC194: this.AKC194,
          AAE036: this.AAE036,
          AAE040: this.AAE040,
          BKC067: this.BKC067,
          BKC036: this.BKC036,
          AKC195: this.AKC195,
          AAE140: this.AAE140,
          requestId: "923",

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
          this.hosPrint(this.hospitalxml);
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
        this.$message.error("打印失败");
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
</style>
