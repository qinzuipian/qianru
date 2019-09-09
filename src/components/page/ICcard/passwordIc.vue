<template>
    <div class="content">
        <div class="top">
            <!-- <el-input style="width:180px;" placeholder="请输入个人具体信息" v-model="message"></el-input> -->
            <el-button type="primary" icon="el-icon-view"  @click="peopleSearch">IC卡密码修改</el-button>
        </div>
   

      
    </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      message: "",
      // peopleData: [],
      peopleData: {}
    };
  },
  methods: {
    //   个人信息查询
    peopleSearch() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          requestId: "003",
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
         this.$message.success("修改成功");
      } else {
        this.$message.warning("修改失败");
      }
    }
  },
  created() {}
};
</script>



<style scoped>
.top {
  padding: 10px;
  width: 100%;
}
.printTable {
  width: 100%;
  font-size: 14px;
  padding: 16px;
}
.printTable tr td {
  text-align: center;
  height: 34px;
  border-bottom: 1px solid gray;
  border-right: 1px solid gray;
}
.printTable tr:nth-child(1) td {
  border-top: 1px solid gray;
}

.printTable tr td:nth-child(1) {
  border-left: 1px solid gray;
}
.printTable tr td:nth-child(1),
.printTable tr td:nth-child(3),
.printTable tr td:nth-child(5),
.printTable tr td:nth-child(7) {
  font-weight: 700;
  width: 120px;
  color: gray;
}
</style>

