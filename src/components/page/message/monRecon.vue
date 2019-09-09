<template>
    <div class="content">
        <div class="top">
          <span>住院号：</span>
		      <el-input v-model="hospitalNum" style="width:160px;"  placeholder="请输入内容"></el-input>
          <span>姓名：</span>
		      <el-input v-model="name" style="width:140px;"  placeholder="请输入内容"></el-input>
          <span>就医类别：</span>
          <el-select v-model="illegal" size="mini" placeholder="请选择">
              <el-option
              v-for="item in illegaloptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
          
          <span>经办人：</span>
		      <el-input v-model="mainName" style="width:140px;"  placeholder="请输入内容"></el-input>       
          <p class="pStyle">
                <el-date-picker
                  v-model="startTime"
                  type="date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择开始日期">
                  </el-date-picker>
                  <el-date-picker
                  v-model="endTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择结束日期">
                  </el-date-picker>
                
              <el-button type="primary" @click="Settlesearch(1)">查询</el-button>
              <el-button  type="success" icon="el-icon-check" style="margin-left: 10px;" @click="settleClick">月结对账</el-button>
            </p> 
           
        </div>   
		    <el-table
            :data="settleData"
            style="width: 100%;"
            height="450"
            highlight-current-row
            border>
            <el-table-column
            prop="AKC190"
            label="就医编号"
            width="140px">
            </el-table-column>
            <el-table-column
            prop="BKC023"
            label="住院号"
            width="140px">
            </el-table-column>
             <el-table-column
            prop="AAC001"
            label="个人编码"
            width="120px">
            </el-table-column>
            <el-table-column
            prop="AAC003"
            label="姓名">
            </el-table-column>
           <!--  <el-table-column
            prop="AAC002"
            label="身份证号"
            width="140px">
            </el-table-column> -->
            <el-table-column
            prop="AKC401"
            label="人员标志">
            </el-table-column>
            
            <el-table-column
            prop="AKA130"
            label="医疗类别">
            </el-table-column>
            <el-table-column
            prop="AAB001"
            label="单位编号"
            width="120px">
            </el-table-column>
            <el-table-column
            prop="AAB004"
            label="单位名称"
            width="260px">
            </el-table-column>
            <el-table-column
            prop="AKC021"
            label="医疗人员类别"
            width="120px">
            </el-table-column>
           <!--  <el-table-column
            prop="AAE040"
            label="上传时间"
            width="160px">
            </el-table-column> -->
            <el-table-column
            prop="AKC264"
            label="医疗费总额"
            width="110px">
            </el-table-column>
            <el-table-column
            prop="AKC253"
            label="个人自费金额"
            width="110px">
            </el-table-column>
           
            <el-table-column
            prop="BKC257"
            label="个人现金支付"
            width="100px">
            </el-table-column>
           
            <el-table-column
            prop="AKC255"
            label="个人帐户支付金额"
            width="130px">
            </el-table-column>
            <el-table-column
            prop="AAE140"
            label="险种"
            width="50px">
            </el-table-column>
            
            <el-table-column
            prop="AAE011"
            label="经办人">
            </el-table-column>
            <el-table-column
            prop="AAE036"
            label="经办日期"
            width="160px">
            </el-table-column>
          
          
        </el-table>	
        <div class="block" id="fenye">
              <el-pagination
              background
              layout="prev, pager, next,total"
              @current-change="handleCurrentChange"
              :page-size="pageSize"
              :current-page="currentPage"
              :total=endtotal>
              </el-pagination>
        </div>	

        <el-dialog title="月结对账" v-if='drugVisible' :visible.sync="drugVisible" width="58%"  top="20px">
              <monthList :startTime="startTime" :endTime="endTime" ></monthList>
        </el-dialog>
    </div>
</template>

<script>
import axios from "axios";
let moment = require("moment");

import monthList from "../../component/monthList";
export default {
  name: "examine",
  data() {
    return {
      illegal: "",
      illegaloptions: [
        {
          value: "11",
          label: "普通门诊"
        },
        {
          value: "21",
          label: "住院结算"
        }
      ],

      settleData: [],
      hospitalNum: "",
      name: "",
      // idcard: "",
      mainName: "",
      startTime: "",
      endTime: "",
      // hospitalxml: "",
      endtotal: 0,
      currentPage: 1,
      pageSize: 10,
      flag: 1,
      drugVisible: false
    };
  },

  watch: {
    /* hospitalNum(num) {
      console.log((num / Math.pow(10, 10)).toFixed(10).substr(2));
    } */
  },
  filters: {},
  computed: {},
  components: {
    monthList
  },
  methods: {
    // 页码改变时去请求数据
    handleCurrentChange(val) {
      if (this.flag == 1) {
        this.getSettle(val);
      } else {
        this.Settlesearch(val);
      }
    },
    // 初始化页面请求数据
    getSettle(val) {
      this.flag = 1;
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/settlementcostinfo/list",
        data: {
          page: val,
          limit: 10
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.settleData = res.data.page.list;
            this.endtotal = res.data.page.totalCount;
            for (var i = 0; i < this.settleData.length; i++) {
              switch (this.settleData[i].AKA130) {
                case "11":
                  this.settleData[i].AKA130 = "普通门诊";
                  break;
                case "21":
                  this.settleData[i].AKA130 = "住院结算";
                  break;
              }
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },
    // 模糊查询页面数据
    Settlesearch(val) {
      this.flag = 2;
      /*  console.log(this.startTime)
      console.log(this.endTime+" "+"23"+":"+"59"+":"+"59") */
      if (this.endTime != "") {
        var endTime = this.endTime + " " + "23" + ":" + "59" + ":" + "59";
      }
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/settlementcostinfo/list",
        data: {
          page: val,
          limit: 10,
          BKC023: this.hospitalNum,
          AKA130: this.illegal,
          // AAC002: this.idcard,
          AAC003: this.name,
          STARTOUTDT: this.startTime,
          ENDOUTDT: endTime,
          AAE011: this.mainName
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.settleData = res.data.page.list;
            this.endtotal = res.data.page.totalCount;
            for (var i = 0; i < this.settleData.length; i++) {
              switch (this.settleData[i].AKA130) {
                case "11":
                  this.settleData[i].AKA130 = "普通门诊";
                  break;
                case "21":
                  this.settleData[i].AKA130 = "住院结算";
                  break;
              }
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },
    settleClick() {
      if(this.startTime == ""||this.endTime == "") {
        this.drugVisible = false;
        this.$message.warning('请选择日期');
      } else {
         this.drugVisible = true;
      }
    },
    // 调取医保接口
    /* hospitalDown(param) {
      console.log(param);
      var state = WSCall.biz(param);
      console.log(state);
      if (state == 1) {
        var res = WSCall.retbiz;
        var wordsContent = encodeURIComponent(res);
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
            this.$message.success("下载成功");
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else {
        this.$message.warning("下载失败");
      }
    } */
  },
  created() {
    this.getSettle(1);
  }
};
</script>

<style scoped>
.top {
  padding: 6px;
}
.top span {
  font-size: 14px;
}
/* .top .el-input {
  width: 20%;
} */
.el-select {
  width: 100px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 200px;
}

.pStyle {
  padding: 6px;
  margin: 0;
}

#fenye {
  background: #c1c1c1;
}
</style>
