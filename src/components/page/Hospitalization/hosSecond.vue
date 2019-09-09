<template>
    <div class="content">
         <div class="top">
             <span>备案开始时间：</span>
            <el-date-picker
            v-model="startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择开始日期">
            </el-date-picker>
            <span>二次住院类型：</span>
            <el-select v-model="hosValue" placeholder="请选择">
                <el-option
                v-for="item in hosOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <span>身份证号：</span>
            <el-input v-model="idCard" placeholder="请输入内容"></el-input>
            <el-button  type="success" icon="el-icon-finished" style="margin-left: 10px;" @click="keepRecord">备案</el-button>
        </div>
    </div>
</template> 


<script>
import axios from "axios";
export default {
  data() {
    return {
      startTime: "",
      hosOptions: [
        {
          value: "3",
          label: "二次同病种住院"
        },
        {
          value: "4",
          label: "二次不同病种住院"
        }
      ],
      hosValue: "",
      idCard: ""
    };
  },
  methods: {
    keepRecord() {
      if (this.startTime != "" && this.hosValue != "" && this.idCard != "") {
        axios({
          method: "post",
          url:
            axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
          data: {
            AAE030: this.startTime,
            BKC090: this.hosValue,
            AAC002: this.idCard,

            requestId: "522",
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
            this.hospitalDown(res.data.data);
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else {
        this.$message.warning("请输入备案信息");
      }
    },
    hospitalDown(param) {
      console.log(param);
      var state = WSCall.biz(param);
      console.log(state);
      if (state == 1) {
        var res = WSCall.retbiz;
        this.$message.success("备案成功");
      } else {
        this.$message.warning("备案失败");
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
  width: 15%;
}
.top .el-select {
  width: 160px;
}
</style>

