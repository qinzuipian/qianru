<template>
    <div class="maincontent">
        <div class="top">
             <el-button type="success" @click="MonthDui">月结对账</el-button>
        </div>
         <el-table
            :data="monthData"
            style="width: 100%;"
            border>
            <!-- <el-table-column
            prop="AAE040"
            label="开始日期"
            width="140px">
            </el-table-column>
            <el-table-column
            prop="AAE036"
            label="结束日期"
            width="140px"> 
            </el-table-column>-->
             <el-table-column
            prop="BKC256"
            label="结算人次"
            width="120px">
            </el-table-column>
            <el-table-column
            prop="AKC264"
            label="总金额">
            </el-table-column>
          
            <el-table-column
            prop="BKC258"
            label="医保统筹金支付">
            </el-table-column>
            
            <el-table-column
            prop="AKC255"
            label="个人账户支付">
            </el-table-column>
            <el-table-column
            prop="BKC257"
            label="个人现金支付"
            width="140px">
            </el-table-column>       
        </el-table>	
    </div>
    
</template>


<script>
import axios from "axios";
export default {
  props: ["endTime", "startTime"],
  data() {
    return {
      //   pageSize: 10,
      //   currentPage: 1,
      //   endtotal: 0,
      monthData: [],
      endtime: ""
    };
  },
  watch: {
    startTime(val) {
      console.log(val);
    }
  },

  methods: {
    MonthInit() {
      console.log(this.startTime, this.endTime);
      if (this.endTime != "") {
        this.endtime = this.endTime + " " + "23" + ":" + "59" + ":" + "59";
      }
      this.monthData = [];
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/medical_reimbursement/settlementcostinfo/queryMonthlyInfo",
        data: {
          AAE040: this.startTime,
          AAE036: this.endtime
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.monthData.push(res.data.data);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },

    MonthDui() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          AAE040: this.startTime,
          AAE036: this.endtime,
          BKC256: this.monthData[0].BKC256,
          AKC264: this.monthData[0].AKC264,
          BKC258: this.monthData[0].BKC258,
          AKC255: this.monthData[0].AKC255,
          BKC257: this.monthData[0].BKC257,
          requestId: "603",

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
          this.hosMonth(res.data.data);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    hosMonth(param) {
      console.log(param);
      var state = WSCall.biz(param);
      console.log(state);
      if (state == 1) {
        var res = WSCall.retbiz;
        this.$message.error("月结对账成功");
      } else {
        this.$message.error("月结对账失败");
      }
    }
  },
  created() {
    this.MonthInit();
  }
};
</script>

<style scoped>
.maincontent {
  padding: 4px;
}
#fenye {
  background: #c1c1c1;
}
.top {
  text-align: center;
  margin-bottom: 6px;
}
</style>
