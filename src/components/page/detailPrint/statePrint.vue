<template>
    <div class="content">
        <div class="top">
             <span>住院号：</span>
					   <el-input v-model="hospitalNum"  placeholder="请输入内容"></el-input>
					   <el-button type="primary" @click="getState">查询</el-button>
            <el-button  type="success" icon="el-icon-printer" style="margin-left: 10px;" @click="stateClick">结算单打印</el-button>
        </div>   
		    <el-table
            :data="stateData"
            style="width: 100%;"
            border>
            <el-table-column
            prop="AKC190"
            label="就医流水号">
            </el-table-column>
            <el-table-column
            prop="AKA130"
            label="就医类别">
            </el-table-column>
            <el-table-column
            prop="AAB034"
            label="所属经办机构">
            </el-table-column>
            <el-table-column
            prop="AAE140"
            label="险种">
            </el-table-column>
        </el-table>		
    </div>
</template>

<script>
import axios from "axios";
let moment = require("moment");
export default {
  name: "examine",
  data() {
    return {
      stateData: [],
      hospitalNum: "",
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
    // 初始化查询页面数据
    getState() {
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
          this.stateData = res.data.data;
        } else if (res.data.code == 203) {
          this.$message.warning(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 打印
    stateClick() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          AKC190: this.stateData.AKC190,
          AAE140: this.stateData.AAE140,
          AAB034: this.stateData.AAB034,
          AKA130: this.stateData.AKA130,
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
        this.$message.error("结算单打印失败");
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
</style>
