<template>
    <div class="content">
        <div class="top">
            <span>就医流水号：</span>
            <el-input v-model="AKC190"  placeholder="请输入内容"></el-input>
            <span>就医类别：</span>
            <el-input v-model="AKA130"  placeholder="请输入内容"></el-input>
            <!-- <el-button type="primary" @click="getSetdeclar">查询</el-button> -->
            <el-button  type="success" icon="el-icon-top" style="margin-left: 10px;" @click="declarClick">结算费用申报</el-button>
        </div>   
		 <!--    <el-table
            :data="declarData"
            style="width: 100%;"
            height="500"
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
            <el-table-column
            prop="AAC001"
            label="个人编码">
            </el-table-column>
            <el-table-column
            prop="BKC051"
            label="科室">
            </el-table-column>
            <el-table-column
            prop="BKC023"
            label="医院的住院号">
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
        </el-table>		 -->
    </div>
</template>

<script>
import axios from "axios";
let moment = require("moment");
export default {
  name: "examine",
  data() {
    return {
      declarData: [],
      AKC190: "",
      AKA130: "",
      // hospitalxml: ""
    };
  },
  watch: {
    /* hospitalNum(num) {
      console.log((num / Math.pow(10, 10)).toFixed(10).substr(2));
    } */
  },
  methods: {
   /*  getSetdeclar() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/his/querHisMedList",
        params: {},
         headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.declarData = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    }, */
    declarClick() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          AKC190: this.AKC190,
          AKA130: this.AKA130,

          requestId: "606",
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
            this.hospitalDown(res.data.data);
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
        this.$message.success("申报成功");
       /*  var wordsContent = encodeURIComponent(res);
        // 将下载下来的数据保存到数据库
        axios({
          method: "post",
          url:
            axios.PARK_API +
            "/medical_reimbursement/listcorrespond/saveCatalogResult",
          data: {
            xml: wordsContent
          },
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }).then(res => {
          if (res.data.code == 0) {
            this.$message.success("申报成功");
          } else {
            this.$message.error(res.data.msg);
          }
        }); */
      } else {
        this.$message.warning("申报失败");
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
.top .el-input {
  width: 16%;
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
.top span {
  font-size: 14px;
}
.row-bg {
  padding: 10px 0;
  /* background-color: #f9fafc; */
}
</style>
