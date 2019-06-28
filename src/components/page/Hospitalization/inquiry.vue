<template>
    <div class="content">
				<div class="top">
						<span>住院号：</span>
						<el-input v-model="hospitalNum"  placeholder="请输入内容"></el-input>
						<el-button type="primary" @click="gitHospitlaMsg">查询</el-button>
						<el-button type="success" @click="gitHospitalMoney">费用明细上传</el-button>
				</div>
				<div class="botMain">
          <p> <span class="el-icon-school"></span><span class="fzstyle">住院登记信息</span></p>
              <el-table
                :data="hospitalData"
                border
                style="width: 100%">
                <el-table-column
                  prop="AKC190"
                  label="就医流水号">
                </el-table-column>
                <el-table-column
                  prop="AAE140"
                  label="险种">
                </el-table-column>
                <el-table-column
                  prop="AAB034"
                  label="参保地行政区划">
                </el-table-column>
                 <el-table-column
                  prop="BKC023"
                  label="医院的住院号">
                </el-table-column>
                <el-table-column
                  prop="AKC194"
                  label="出院日期">
                </el-table-column>
                <el-table-column
                  prop="HISZJE"
                  label="his总金额">
                </el-table-column>
              </el-table>
					<p> <span class="el-icon-s-order"></span><span class="fzstyle">住院费用明细信息</span></p>
            <el-table
            :data="moneyData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border
            height="526"
            style="width: 100%">
            <!-- <el-table-column
              prop="index"
              label="编号">
            </el-table-column> -->
            <el-table-column
              prop="AKC190"
              label="就医编号">
            </el-table-column>
            <el-table-column
              prop="AKC220"
              width="110px"
              label="处方号">
            </el-table-column>
            <el-table-column
              prop="AAE072"
              width="110px"
              label="单据号">
            </el-table-column>
            <el-table-column
              prop="AKC221" 
              width="100px"             
              label="处方时间">
            </el-table-column>
            <el-table-column
              prop="AKA213"
              label="目录类别">
            </el-table-column>
            <el-table-column
              prop="AKC229"
              label="执行天数">
            </el-table-column>
            <el-table-column
              prop="AKC222"
              width="140px"
              label="收费项目编码(医院)">
            </el-table-column>
            <el-table-column
              prop="AKC223"
              width="140px"
              label="收费项目名称(医院)">
            </el-table-column>

             <el-table-column
              prop="AKC226"
              width="60px"
              label="数量">
            </el-table-column>
             <el-table-column
              prop="AKC225"
              width="60px"
              label="单价">
            </el-table-column>
             <el-table-column
              prop="AKC227"
              width="60px"
              label="金额">
            </el-table-column>
             <el-table-column
              prop="BKC284"
              width="160px"
              label="区分每条明细的唯一性">
            </el-table-column>
            <el-table-column
              prop="BKC023"
              width="120px"
              label="医院的就医编号">
            </el-table-column>
             <el-table-column
              prop="BKC059"
              label="开单医生">
            </el-table-column>
            <el-table-column
              prop="BKC330"
              width="140px"
              label="开单医生编号">
            </el-table-column>
            <el-table-column
              prop="BKC051"
              label="开单科室">
            </el-table-column>

             <el-table-column
              prop="BKC402"
              width="140px"
              label="受单科室名称">
            </el-table-column>
             <el-table-column
              prop="BKC400"
              width="140px"
              label="受单医生编号">
            </el-table-column>
             <el-table-column
              prop="BKC401"
              width="140px"
              label="受单医生姓名">
            </el-table-column>
             <el-table-column
              prop="AAB034"
              width="140px"
              label="所属经办机构">
            </el-table-column>
          </el-table>

          <div class="block" id="fenye">
              <el-pagination
              background
              layout="prev, pager, next,total"
              @current-change="handleCurrentChange"
              :page-sizes="[10, 20, 30]"
              :page-size="pageSize"
              :current-page="currentPage"
              @size-change="dragSizeChange"
              :total=endtotal>
              </el-pagination>
          </div>
				</div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "reexamine",
  data() {
    return {
      hospitalNum: "",
      hospitalxml: "",
      hospitalData: [],
      moneyData: [],
      params: "",

      endtotal: 0,
      currentPage: 1,
      pageSize: 12,
      AKC190:"",
      HISZJE:""
    };
  },

  created() {},
  watch: {},
  filters: {},
  methods: {
    // 页码改变时去请求数据
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    dragSizeChange(val) {
      this.pageSize = val;
    },

    // 页面初始化请求参数
    gitHospitlaMsg() {
      this.hospitalData = [];
      // 请求list
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/medical_reimbursement/hospitalizationregister/queryReginfoAndConsumInfo",
        params: {
          bkc023: this.hospitalNum,
          requestId: "621",

          akb020: localStorage.getItem("akb020"),
          bkb026: localStorage.getItem("bkb026"),
          aab034: localStorage.getItem("aab034"),
          uscode: localStorage.getItem("uscode"),
          usname: localStorage.getItem("usname")
        }
        /* headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      }).then(res => {
        if (res.data.code == 0) {
          console.log(res.data.data.dataInfo);
          // localStorage.setItem("hiszje", res.data.data.dataInfo.HISZJE);
          this.AKC190 = res.data.data.dataInfo.AKC190;
          this.HISZJE = res.data.data.dataInfo.HISZJE;
          var hosupData = res.data.data.dataInfo;
          hosupData.AAB034 == undefined?hosupData.AAB034="61100001":hosupData.AAB034=hosupData.AAB034;
          this.hospitalData.push(hosupData);
          let date = new Date();
          let y = date.getFullYear();
          let m = date.getMonth() + 1;
          let x = date.getDate();
          let time;
          if (m < 10) {
            time = y + "-" + "0" + m + "-" + x;
          } else if (x < 10) {
            time = y + "-" + m + "-" + "0" + x;
          } else if (m < 10 && x < 10) {
            time = y + "-" + "0" + m + "-" + "0" + x;
          }

          // let time = y + "-" + "0" + m + "-" + "0" + x;
          // console.log(time);
          for (let i = 0; i < this.hospitalData.length; i++) {
            // console.log(this.hospitalData[i].AKC194.replace(/(\s*$)/g, ""))
            switch (this.hospitalData[i].AKC194) {
              case "":
                this.hospitalData[i].AKC194 = time;
                break;
            }
          }
          this.moneyData = res.data.data.dataHos.dataHos;
          this.endtotal = this.moneyData.length;
          this.params = res.data.data.dataxml;
          // console.log(params)
          // this.gitHospitalMoney(params);
        } else {
          this.$message.error(res.data.msg);
        }
      });
      /* .catch(error => {
          this.$message.error("请检查网络");
        }); */
    },
    gitHospitalMoney() {
      console.log(this.params);
      var state = WSCall.biz(this.params);
      console.log(state);
      if (state == 1) {
        var res = WSCall.retbiz;

    /*   var state = 1;
			if(state == 1) {
				var res = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"no\"?><transferinfo>"
        +"<headinfo>                                                        "
        +"  <REQUESTID>621</REQUESTID>                                      "
        +"  <AKB020>SLYY0001</AKB020>                                       "
        +"  <AAB034>61100001</AAB034>                                       "
        +"  <BKB026>888888</BKB026>                                         "
        +"  <USCODE>管理员</USCODE>                                         "
        +"  <USNAME>管理员</USNAME>                                         "
        +"  <DATACOUNT>1</DATACOUNT>                                        "
        +"  <ROWCOUNT1>1</ROWCOUNT1>                                        "
        +"  <ROWCOUNT2>0</ROWCOUNT2>                                        "
        +"  <ROWCOUNT3>0</ROWCOUNT3>                                        "
        +"  <ROWCOUNT4>0</ROWCOUNT4>                                        "
        +"  <ERRCODE>1</ERRCODE>                                            "
        +"  <ERRMSG></ERRMSG>                                               "
        +"</headinfo>                                                       "
        +"<datas>                                                           "
        +"  <data1>                                                         "
        +"    <row>                                                         "
        +"      <AKB020>SLYY0001</AKB020>                                   "
        +"      <AKC190>000000009516011</AKC190>                            "
        +"      <BKC037>1</BKC037>                                          "
        +"      <AKC220>123456</AKC220>                                     "
        +"      <AAE073>0</AAE073>                                          "
        +"      <AAE072>123456</AAE072>                                     "
        +"      <BKA261>000</BKA261>                                        "
        +"      <BKA265>未对应</BKA265>                                     "
        +"      <AKC221>2019-05-15</AKC221>                                 "
        +"      <AKA063>01</AKA063>                                         "
        +"      <AKC222>000000005050</AKC222>                               "
        +"      <AKC223>灭菌注射用水</AKC223>                               "
        +"      <AKA070>无</AKA070>                                         "
        +"      <AKA074>无</AKA074>                                         "
        +"      <AKA065>3</AKA065>                                          "
        +"      <AKA215>0</AKA215>                                          "
        +"      <AKA066>无</AKA066>                                         "
        +"      <AKA067>无</AKA067>                                         "
        +"      <AKC225>0.0</AKC225>                                        "
        +"      <AKC226>1.0</AKC226>                                        "
        +"      <BKA263>0</BKA263>                                          "
        +"      <AKC227>6.85</AKC227>                                       "
        +"      <AKC228>0.0</AKC228>                                        "
        +"      <AKA071>0.0</AKA071>                                        "
        +"      <AKA072>无</AKA072>                                         "
        +"      <AKA073>无</AKA073>                                         "
        +"      <AKC229>1</AKC229>                                          "
        +"      <BKC023>0000000042</BKC023>                                 "
        +"      <BKC034>0.0</BKC034>                                        "
        +"      <AKA213>1</AKA213>                                          "
        +"      <AKC224>1</AKC224>                                          "
        +"      <BKC040>0.0</BKC040>                                        "
        +"      <BKC041>0.0</BKC041>                                        "
        +"      <BKC042> </BKC042>                                          "
        +"      <BKC067></BKC067>                                           "
        +"      <AAE040></AAE040>                                           "
        +"      <BKC083>1</BKC083>                                          "
        +"      <BKC086>0.01</BKC086>                                       "
        +"      <BKC097>无</BKC097>                                         "
        +"      <BKC098>无</BKC098>                                         "
        +"      <BKC099>0.0</BKC099>                                        "
        +"      <BAA001></BAA001>                                           "
        +"      <BKC084></BKC084>                                           "
        +"      <BKC284>123456789</BKC284>                                  "
        +"      <BKC048>0.0</BKC048>                                        "
        +"      <BKC049>0.0</BKC049>                                        "
        +"      <BKC050></BKC050>                                           "
        +"      <BKC052></BKC052>                                           "
        +"      <BKC053>0.0</BKC053>                                        "
        +"      <BKC072></BKC072>                                           "
        +"      <BKC310>0.0</BKC310>                                        "
        +"      <BKC320>0.0</BKC320>                                        "
        +"      <BKC292>0.0</BKC292>                                        "
        +"      <BKC293>0.0</BKC293>                                        "
        +"      <BKC114>0.0</BKC114>                                        "
        +"      <AKC260>0.0</AKC260>                                        "
        +"    </row>                                                        "
        +"  </data1>                                                        "
        +"</datas>                                                          "
        +"</transferinfo>                                                   ";  */                             

        var wordsContent = encodeURIComponent(res);

        axios({
          method: "post",
          url:
            axios.PARK_API +
            "/medical_reimbursement/costinfo/savehosUploadCostInfo",
          data: {
            xml: wordsContent
          },
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }).then(res => {
          if (res.data.code == 0) {
            this.$message.success("明细保存成功");
            this.getSavehismoney();
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else {
        this.$message.error("明细保存失败");
      }
    },
    // 保存his总金额
    getSavehismoney() {
        axios({
          method: "post",
          url:
            axios.PARK_API +
            "/medical_reimbursement/hospitalizationregister/update",
          data: {
           AKC190:this.AKC190,
           HISZJE:this.HISZJE
          },
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }).then(res => {
          if (res.data.code == 0) {
            console.log('修改住院信息his总金额成功');
            // this.$message.success("明细保存成功");
          } else {
            this.$message.error(res.data.msg);
          }
        });
      
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
.botMain .el-icon-school,
.botMain .el-icon-s-order {
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
#fenye {
  background: #c1c1c1;
}
</style>
