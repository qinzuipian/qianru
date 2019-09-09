<template>
    <div class="content">
        <div class="top">
            <span>住院号：</span>
		        <el-input v-model="hospitalNum"  placeholder="请输入内容"></el-input>
		        <el-button type="primary" @click="getFile">查询</el-button>
            <el-button  type="success" icon="el-icon-download" style="margin-left: 10px;" @click="fileClick">下载</el-button>
        </div>
        <div class="botMain">
          	<p> <span class="el-icon-school"></span><span class="fzstyle">住院信息</span></p>
                <el-row>
                      <el-col :span="8">
                        <div class="grid-content">
                            <span>就医流水号:</span>
                            <el-input v-model="hosdata.AKC190"  placeholder="请输入内容"></el-input>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content">
                            <span>所属经办机构:</span>
                            <el-input v-model="hosdata.AAB034"  placeholder="请输入内容"></el-input>
                        </div>
                      </el-col>
                    
                </el-row>
            	<p> <span class="el-icon-tickets"></span><span class="fzstyle">费用明细信息</span></p>
               <span>住院号：</span>
               <el-input v-model="BKC023"  placeholder="请输入内容"></el-input>
               <span>目录类别：</span>
                <el-select v-model="AKA213" placeholder="请选择">
                <el-option
                  v-for="item in AKA213Option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>收费项目名称：</span>
              <el-input v-model="AKC223" placeholder="请输入内容"></el-input>
              <el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="fileSearch(1)">查询</el-button>
               <el-table
                :data="fileData"
                style="width: 100%;"
                height="460"
                border>
                <el-table-column
                prop="AKC190"
                width="140px"
                label="住院号">
                </el-table-column>
                <el-table-column
                prop="BKC037"
                label="明细序号">
                </el-table-column>
                <el-table-column
                prop="AKC220"
                label="处方号">
                </el-table-column>
                <el-table-column
                prop="AAE072"
                label="单据号">
                </el-table-column>
                <el-table-column
                prop="BKA261"
                width="120px"
                label="目录项目编码">
                </el-table-column>
                <el-table-column
                prop="BKA265"
                width="120px"
                label="目录项目名称">
                </el-table-column>
                <el-table-column
                prop="AKC221"
                width="120px"
                label="处方日期">
                </el-table-column>
                <el-table-column
                prop="AKA063"
                label="收费类别">
                </el-table-column>
                <el-table-column
                prop="AKC222"
                width="120px"
                label="收费项目编码">
                </el-table-column>
                <el-table-column
                prop="AKC223"
                width="120px"
                label="收费项目名称">
                </el-table-column>
                <el-table-column
                prop="AKA070"
                label="剂型">
                </el-table-column>
                <el-table-column
                prop="AKA074"
                label="规格">
                </el-table-column>
                <el-table-column
                prop="AKA065"
                width="120px"
                label="收费项目等级">
                </el-table-column>
                <el-table-column
                prop="AKA215"
                width="120px"
                label="限制类用药标志">
                </el-table-column>
                <el-table-column
                prop="AKA066"
                label="助记码">
                </el-table-column>
                <el-table-column
                prop="AKA067"
                label="单位">
                </el-table-column>
                <el-table-column
                prop="AKC225"
                label="单价">
                </el-table-column>
                <el-table-column
                prop="AKC226"
                label="数量">
                </el-table-column>
                <el-table-column
                prop="AKC227"
                label="金额">
                </el-table-column>
                <el-table-column
                prop="AKC228"
                label="自付金额">
                </el-table-column>
                <el-table-column
                prop="BKC023"
                width="110px"
                label="医院挂号编号">
                </el-table-column>
                <el-table-column
                prop="BKC034"
                width="120px"
                label="审核扣减数量">
                </el-table-column>
                <el-table-column
                prop="AKA213"
                label="目录类别">
                </el-table-column>
                <el-table-column
                prop="AKC224"
                width="120px"
                label="收费项目种类">
                </el-table-column>
                <el-table-column
                prop="BKC040"
                width="120px"
                label="统筹范围内金额">
                </el-table-column>
                <el-table-column
                prop="BKC041"
                width="120px"
                label="审核扣减金额">
                </el-table-column>
                <el-table-column
                prop="BKC042"
                width="120px"
                label="审核扣减原因">
                </el-table-column>
                <el-table-column
                prop="BKC086"
                width="120px"
                label="个人自费金额">
                </el-table-column>
                <el-table-column
                prop="BAA001"
                label="数据分区">
                </el-table-column>
                <el-table-column
                prop="BKC083"
                width="120px"
                label="专家审评意见">
                </el-table-column>
                <el-table-column
                prop="BKC284"
                width="120px"
                label="明细编号">
                </el-table-column>
                <el-table-column
                prop="BKC292"
                width="120px"
                label="超标床位费金额">
                </el-table-column>
                <el-table-column
                prop="BKC293"
                width="140px"
                label="超标床位费补助金额">
                </el-table-column>
                <el-table-column
                prop="BKC114"
                width="120px"
                label="医院负担金额">
                </el-table-column>
                <el-table-column
                prop="AKC260"
                width="120px"
                label="统筹支付金额">
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
      hosdata: {},
      fileData: [],
      hospitalNum: "",
      hospitalxml: "",
      pageSize: 10,
      currentPage: 1,
      endtotal: 0,
      BKC023: "",
      AKA213Option: [
        {
          value: "1",
          label: "药品"
        },
        {
          value: "2",
          label: "诊疗"
        },
        {
          value: "3",
          label: "服务设施"
        }
      ],
      AKA213: "",
      AKC223: "",
      flag: 1
    };
  },
  watch: {
    /* hospitalNum(num) {
      console.log((num / Math.pow(10, 10)).toFixed(10).substr(2));
    } */
  },
  filters: {},
  methods: {
    getFile() {
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/medical_reimbursement/hospitalizationregister/queryHosInfo",
        params: {
          bkc023: this.hospitalNum
        }
        /*  headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      })
        .then(res => {
          if (res.data.code == 0) {
            this.hosdata = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },

    fileInit(val) {
      this.flag = 1;
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/downloadkc22/list",
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
            this.fileData = res.data.page.list;
            console.log(this.fileData)
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },
    fileSearch(val) {
      this.flag = 2;
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/downloadkc22/list",
        data: {
          page: val,
          limit: 10,
          BKC023: this.BKC023,
          AKA213: this.AKA213,
          AKC223: this.AKC223
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.fileData = res.data.page.list;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },
    handleCurrentChange(val) {
      if (this.flag == 1) {
        this.fileInit(val);
      } else {
        this.fileSearch(val);
      }
    },
    fileClick() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          AKC190: this.hosdata.AKC190,
          AAB034: this.hosdata.AAB034,

          requestId: "702",
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
            // console.log(res.data.data);
            // console.log(1)
            this.hospitalDown(res.data.data);
            // console.log(2)
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
     /*  var state = 1;
      if(state == 1) {
        var res = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"no\"?><transferinfo>"+
        "  <headinfo>"+
        "    <REQUESTID>702</REQUESTID>"+
        "    <AKB020>SLYY0001</AKB020>"+
        "    <AAB034>61100001</AAB034>"+
        "    <BKB026>888888</BKB026>"+
        "    <USCODE>管理员</USCODE>"+
        "    <USNAME>管理员</USNAME>"+
        "    <DATACOUNT>1</DATACOUNT>"+
        "    <ROWCOUNT1>1</ROWCOUNT1>"+
        "    <ROWCOUNT2>0</ROWCOUNT2>"+
        "    <ROWCOUNT3>0</ROWCOUNT3>"+
        "    <ROWCOUNT4>0</ROWCOUNT4>"+
        "    <ERRCODE>1</ERRCODE>"+
        "    <ERRMSG></ERRMSG>"+
        "  </headinfo>"+
        "  <datas>"+
        "    <data1>"+
        "      <row>"+
        "        <AKB020>SLYY0001</AKB020>"+
        "        <AKC190>000000009516019</AKC190>"+
        "        <BKC037>1</BKC037>"+
        "        <AKC220>1234567</AKC220>"+
        "        <AAE073>0</AAE073>"+
        "        <AAE072>1234567</AAE072>"+
        "        <BKA261>000</BKA261>"+
        "        <BKA265>未对应</BKA265>"+
        "        <AKC221>2019-05-15</AKC221>"+
        "        <AKA063>01</AKA063>"+
        "        <AKC222>000000005050</AKC222>"+
        "        <AKC223>灭菌注射用水</AKC223>"+
        "        <AKA070>无</AKA070>"+
        "        <AKA074>无</AKA074>"+
        "        <AKA065>3</AKA065>"+
        "        <AKA215>0</AKA215>"+
        "        <AKA066>无</AKA066>"+
        "        <AKA067>无</AKA067>"+
        "        <AKC225>0.01</AKC225>"+
        "        <AKC226>1.0</AKC226>"+
        "        <BKA263>0</BKA263>"+
        "        <AKC227>0.01</AKC227>"+
        "        <AKC228>0.0</AKC228>"+
        "        <AKA071>0.0</AKA071>"+
        "        <AKA072>无</AKA072>"+
        "        <AKA073>无</AKA073>"+
        "        <AKC229>1</AKC229>"+
        "        <BKC023>1234567</BKC023>"+
        "        <BKC034>0.0</BKC034>"+
        "        <AKA213>1</AKA213>"+
        "        <AKC224>1</AKC224>"+
        "        <BKC040>0.0</BKC040>"+
        "        <BKC041>0.0</BKC041>"+
        "        <BKC042> </BKC042>"+
        "        <BKC067>1</BKC067>"+
        "        <AAE040></AAE040>"+
        "        <BKC083>1</BKC083>"+
        "        <BKC086>0.01</BKC086>"+
        "        <BKC097>无</BKC097>"+
        "        <BKC098>无</BKC098>"+
        "        <BKC099>0.0</BKC099>"+
        "        <BAA001></BAA001>"+
        "        <BKC284>1234567891</BKC284>"+
        "        <BKC048>0.0</BKC048>"+
        "        <BKC049>0.0</BKC049>"+
        "        <BKC053>0.0</BKC053>"+
        "        <BKC310>0.0</BKC310>"+
        "        <BKC320>0.0</BKC320>"+
        "        <BKC292>0.0</BKC292>"+
        "        <BKC293>0.0</BKC293>"+
        "        <BKC114>0.0</BKC114>"+
        "        <AKC260>0.0</AKC260>"+
        "      </row>"+
        "    </data1>"+
        "  </datas>"+
        "</transferinfo>" */

        var wordsContent = encodeURIComponent(res);
        // 将下载下来的数据保存到数据库
        axios({
          method: "post",
          url:
            axios.PARK_API +
            "/medical_reimbursement/downloadkc22/saveDownloadkc22",
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
    }
  },
  created() {
    this.fileInit(1);
  }
};
</script>

<style scoped>
.top {
  padding: 10px;
}
.top span {
  font-size: 14px;
}
.top .el-input,
.botMain .el-input {
  width: 20%;
}
.botMain p {
  width: 100%;
  height: 36px;
  line-height: 36px;
  background-color: #eeeeee;
  /* margin-left: 10px; */
}
.botMain .el-icon-school,
.botMain .el-icon-tickets {
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
.top span,
.botMain span {
  font-size: 14px;
}
.row-bg {
  padding: 10px 0;
  /* background-color: #f9fafc; */
}

#fenye {
  background: #c1c1c1;
}
</style>
