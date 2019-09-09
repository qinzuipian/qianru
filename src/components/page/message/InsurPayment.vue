<template>
    <div class="content">
        <div class="top">
            <el-button  type="success" icon="el-icon-printer" style="margin-left: 10px;" @click="insurClick">打印</el-button>
        </div>   
		  	<div class="botMain">
						<p> <span class="el-icon-document"></span><span class="fzstyle">商洛市医疗保险待遇支付明细表</span></p>
								<el-row>
									<el-col :span="8">
										<div class="grid-content">
											  <span>起始结算日期:</span>
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
											   <span>截止结算日期:</span>
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
											<span>就医类别:</span>
											<el-input v-model="AKA130"  placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
								</el-row>
								<el-row>
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
									<el-col :span="8">
										<div class="grid-content">
											 <span>是否查询单病种住院数据:</span>
												<el-select v-model="BKC036" placeholder="请选择">
                          <el-option
                            v-for="item in BKCOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
									  </div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>经办机构编码:</span>
											<el-input v-model="BAA001"  placeholder="请输入内容"></el-input>
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
      STARTOUTDT: "",
      ENDOUTDT: "",
      AKA130: "",
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
      BKCOptions: [
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
      BAA001:"",
      hospitalxml: ""
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
    insurClick() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          STARTOUTDT: this.STARTOUTDT,
          ENDOUTDT: this.ENDOUTDT,
          AKA130: this.AKA130,
          BKC067: this.BKC067,
          BKC036: this.BKC036,
          BAA001: this.BAA001,
          requestId: "922",

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
