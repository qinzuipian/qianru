<template>
   <div>
       <div class="right-ctn-title">
            <div class="left">
                <span>his药品名/拼音码：</span>
                <el-input style="width: 200px; height: 30px;" v-model="rulename" placeholder="请输入内容"></el-input>
                <!-- <el-button size="mini" type="primary"  @click="ruleSearch">查询</el-button> -->
                  <el-button  type="success" icon="el-icon-folder-add" style="margin-left: 10px;" @click="medicalSave">药品目录对应保存</el-button>
                <el-table
                      :data="ruleList.slice((rulePage-1)*pageSize,rulePage*pageSize)"
                      :header-cell-style="rowClass"
                      highlight-current-row
                      @row-click="rightClick"
                      height="480"
                      border
                      style="width: 100%">
                      <el-table-column
                       prop="AKA060"
                       label="his药品编码"
                       width="130px">
                       </el-table-column>
                       <el-table-column
                       prop="AKA061"
                       label="his药品名称"
                       width="180px">
                       </el-table-column>
                     
                       <el-table-column
                       prop="AKA067"
                       label="单位"
                       width="50px">
                       </el-table-column>
                       <el-table-column
                       prop="AKA074"
                       label="规格">
                       </el-table-column>
                       <el-table-column
                       prop="AKA070"
                       label="剂型">
                       </el-table-column>
                  </el-table>
                <div class="block" id="fenye">
                    <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="ruleCurrentChange"
                    :current-page="rulePage"
                    :page-sizes="[10, 20, 30]"
                    :page-size="pageSize"
                    @size-change="foulSizeChange"
                    :total=total>
                    </el-pagination>
                </div>
            </div>
            
            <div class="right">
              

                 <span>药品名/拼音码：</span>
                 <el-input style="width: 200px; height: 30px;" v-model="medicalname" placeholder="请输入内容"></el-input>
                 <!-- <el-button size="mini" type="primary" style="margin-left: 5px;" @click="foulSearch(1)">查询</el-button> -->
                 <el-table
                        :data="foulData"
                        :header-cell-style="rowClass"
                        highlight-current-row
                        @row-click="leftClick"
                        height="480"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="AKA060"
                        label="药品编码"
                        width="130px">
                        </el-table-column>
                        <el-table-column
                        prop="AKA061"
                        label="药品名称">
                        </el-table-column>
                       
                        <el-table-column
                        prop="AKA067"
                        label="单位"
                        width="50px">
                        </el-table-column>
                        <el-table-column
                        prop="AKA074"
                        label="规格">
                        </el-table-column>
                        <el-table-column
                        prop="AKA070"
                        label="剂型">
                        </el-table-column>
                    
                 </el-table>
                 <div class="block" id="fenye">
                        <el-pagination
                        background
                        layout="prev, pager, next"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :total=foultotal>
                        </el-pagination>
                 </div>
               
            </div>
      </div>
   </div>

</template>



<script>
import axios from "axios";
export default {
  data() {
    return {
      medicalname: "",
      foulData: [],
      currentPage: 1,
      flag: 1,
      // 一共多少页
      foultotal: 0,
      ruleList: [],
      rulePage: 1,
      pageSize: 10,
      total: 0,
      rulename: "",
      medicalCode: "",
      medicalName: "",
      hisCode: "",
      hisName: "",
      sinmoney: ""
    };
  },
  watch:{
    medicalname(val) {
      console.log(val);
      this.foulSearch(val,1)
      // this.foulPinyin(val)
    },
    rulename(val) {
      this.ruleSearch(val)
    }
  },
  methods: {
    // 页码改变时去请求数据
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.flag == 2) {
        this.foulSearch(this.medicalname,val);
      } else {
        this.getFoul(val);
      }
    },
    rowClass({ row, rowIndex }) {
      return "border-bottom:2px solid #ccc;border-top:2px solid #ccc";
    },
    //页面初始化时请求页面数据
    getFoul(val) {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/druglist/list",
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
            this.foulData = res.data.page.list;
            this.foultotal = res.data.page.totalCount;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },

    //根据模糊查询数据
    foulSearch(val,page) {
      console.log(val,page)
      this.flag = 2;
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/druglist/list",
        data: {
          AKA061: val,
          page: page,
          limit: 10
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.foulData = res.data.page.list;
            this.foultotal = res.data.page.totalCount;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },

    // 拼音简码查询
    /* foulPinyin(val) {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/druglist/list",
        data: {
          AKA061: val,
          page: 1,
          limit: 10
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.foulData = res.data.page.list;
            this.foultotal = res.data.page.totalCount;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    }, */
    // 药品目录行点击事件
    leftClick(row) {
      console.log(row);
      this.medicalCode = row.AKA060;
      this.medicalName = row.AKA061;
      this.$message("已选中");
    },
    // his药品目录初始化列表
    getRulelist() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/his/queryHisDrugList",
        data: {},
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.ruleList = res.data.data;
            this.total = this.ruleList.length;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },
    // his药品目录分页
    ruleCurrentChange(val) {
      this.rulePage = val;
    },
    foulSizeChange(val) {
      this.pageSize = val;
    },
    // his药品目录模糊查询
    ruleSearch(val) {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/his/queryHisDrugList",
        params: {
          AKA061: val
        }
        /*  headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      })
        .then(res => {
          if (res.data.code == 0) {
            this.ruleList = res.data.data;
            this.total = this.ruleList.length;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },
    // his药品目录行点击事件
    rightClick(row) {
      console.log(row);
      this.hisCode = row.AKA060;
      this.hisName = row.AKA061;
      this.sinmoney = row.AKB120;
      this.$message("已选中");
    },

    // 左边药品目录与右边his药品目录结合保存
    medicalSave() {
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/medical_reimbursement/listcorrespond/saveCorreSpond",
        data: {
          AKB020: localStorage.getItem("akb020"),
          BKA261: this.medicalCode,
          BKA262: this.hisCode,
          BKA264: this.medicalName,
          BKA263: this.hisName,
          AKA213: 1,
          AAE100: 1,
          AKB120: this.sinmoney,
          AAB034: localStorage.getItem("aab034")
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.$message.success("药品目录对应保存成功");
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    }
  },
  created() {
    this.getFoul(1);
    this.getRulelist();
  }
};
</script>



<style scoped>
.right-ctn-title {
  width: calc(100%-20px);
  /* height: 40px; */
  text-align: left;
  padding-left: 6px;
  position: relative;
}
.right-ctn-title .top {
  width: 100%;
}
.right-ctn-title .left {
  width: 50%;
  float: left;
}
.right-ctn-title .right {
  width: 49.5%;
  float: right;
}
/* .right-ctn-title .right .line {
    width: 2px;
    height: 100%;
    background-color: #000;
} */

.right-ctn-title span {
  font-size: 14px;
  line-height: 40px;
}
#fenye {
  background: #c1c1c1;
}

.el-pagination {
  padding: 10px 18px;
  text-align: left;
}

.el-button + .el-button {
  margin-left: 0;
}
.el-select {
  width: 100px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 124px;
}

::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}

/* .el-table_body tr.current-row>td {
    background: #f57878 !important;
} */
</style>

