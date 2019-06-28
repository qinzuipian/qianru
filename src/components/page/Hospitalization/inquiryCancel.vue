<template>
    <div class="content">
				<div class="top">
						<span>住院号：</span>
						<el-input v-model="hospitalNum"  placeholder="请输入内容"></el-input>
						<el-button type="primary" @click="gitHospitlaMsg">查询</el-button>
						<el-button type="warning" icon="el-icon-close" @click="gethosMsgcancel">住院明细清除</el-button>
				</div>
				<div class="botMain">
          <p> <span class="el-icon-school"></span><span class="fzstyle">住院登记信息</span></p>
              <el-row>
									<el-col :span="8">
										<div class="grid-content">
											  <span>就医流水号:</span>
												<el-input v-model="hosdata.AKC190"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											  <span>参保地行政区划:</span>
												<el-input v-model="hosdata.AAB034"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>险种:</span>
											<el-input v-model="hosdata.AAE140"  placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
							</el-row>
							<el-row>
									<el-col :span="8">
										<div class="grid-content">
											  <span>医院的住院号:</span>
												<el-input v-model="hosdata.BKC023" placeholder="请输入内容"></el-input>
										</div>
									</el-col>
							</el-row>
		
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
      hosdata: {},
      params: ""
    };
  },

  created() {},
  watch: {},
  filters: {},
  methods: {
    // 页面初始化请求参数
    gitHospitlaMsg() {
      // 请求list
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/medical_reimbursement/hospitalizationregister/queryHosInfo",
        params: {
          bkc023: this.hospitalNum
        }
        /* headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      }).then(res => {
        if (res.data.code == 0) {
          this.hosdata = res.data.data;
          var hosdata = res.data.data;
          hosdata.AKC190 == undefined
            ? (this.hosdata.AKC190 = "")
            : (this.hosdata.AKC190 = hosdata.AKC190);
          hosdata.AAE140 == undefined
            ? (this.hosdata.AAE140 = "")
            : (this.hosdata.AAE140 = hosdata.AAE140);
          hosdata.BKC023 == undefined
            ? (this.hosdata.BKC023 = "")
            : (this.hosdata.BKC023 = hosdata.BKC023);
          hosdata.AAB034 == undefined
            ? (this.hosdata.AAB034 = "61100001")
            : (this.hosdata.AAB034 = hosdata.AAB034);
        } else {
          this.$message.error(res.data.msg);
        }
      });
      /* .catch(error => {
          this.$message.error("请检查网络");
        }); */
    },
    // 住院明细清除
    gethosMsgcancel() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          AKC190: this.hosdata.AKC190,
          AAB034: this.hosdata.AAB034,
          AAE140: this.hosdata.AAE140,
          BKC023: this.hosdata.BKC023,
          requestId: "821",

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
          this.gitHospitalMoney(this.hospitalxml);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    gitHospitalMoney(params) {
      console.log(params);
      var state = WSCall.biz(params);
      console.log(state)
      if (state == 1) {
        var res = WSCall.retbiz;
      /*  var state = 1;
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
        +"      <AKC190>000000009516091</AKC190>                            "
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
        +"      <AKC227>0.01</AKC227>                                       "
        +"      <AKC228>0.0</AKC228>                                        "
        +"      <AKA071>0.0</AKA071>                                        "
        +"      <AKA072>无</AKA072>                                         "
        +"      <AKA073>无</AKA073>                                         "
        +"      <AKC229>1</AKC229>                                          "
        +"      <BKC023>0000000016</BKC023>                                     "
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
        +"</transferinfo>   ";      */
        this.$message.success('明细清除成功')	
        this.inquirydelete();
      } else {
        this.$message.error('明细清除失败')	
      }
    },
    // 住院明细清除删除
    inquirydelete() {
        axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/costinfo/delete",
        data: {
          AKC190: this.hosdata.AKC190
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          console.log('明细清除成功')
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
