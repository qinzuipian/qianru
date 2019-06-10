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
			hospitalNum:"",
      hospitalxml:"",
      hospitalData: [],
      moneyData:[],
      params:"",

      endtotal: 0,
      currentPage: 1,
      pageSize: 12,
			
    };
  },

  created() {

  },
  watch: {
  },
  filters: {

  },
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
      // 请求list
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/hospitalizationregister/queryReginfoAndConsumInfo",
        params: {
            bkc023:this.hospitalNum,
            requestId :"621"
				},
        /* headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      })
        .then(res => {
          if (res.data.code == 0) {
            console.log(res.data.data.dataInfo)
            localStorage.setItem("hiszje",res.data.data.dataInfo.HISZJE)
            this.hospitalData.push(res.data.data.dataInfo);
            let date = new Date();
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            let x = date.getDate();

            let time = y +"-"+"0"+ m +"-"+"0"+ x;
            // console.log(time);
            for (let i = 0; i <  this.hospitalData.length; i++) {
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
        })
        /* .catch(error => {
          this.$message.error("请检查网络");
        }); */
    },
    gitHospitalMoney() {
      console.log(this.params)
      var state = WSCall.biz(this.params);
			if (state == 1) {
        var res = WSCall.retbiz;

    /*  var state = 1;
			if(state == 1) {
				var res = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"no\" ?>"+
			"<transferinfo>\r\n" + 
			"<headinfo>\r\n" + 
			"<REQUESTID>621</REQUESTID>\r\n" + 
			"<AKB020>SNYY0010</AKB020>\r\n" + 
			"<BKB026>888888</BKB026>\r\n" + 
			"<AAB034>61100001</AAB034>\r\n" + 
			"<USCODE>管理员</USCODE>\r\n" + 
			"<USNAME>管理员</USNAME>\r\n" + 
			"<DATACOUNT>2</DATACOUNT>\r\n" + 
			"<ROWCOUNT1>1</ROWCOUNT1>\r\n" + 
			"<ROWCOUNT2>1</ROWCOUNT2>\r\n" + 
			"<ROWCOUNT3>0</ROWCOUNT3>\r\n" + 
			"<ROWCOUNT4>0</ROWCOUNT4>\r\n" + 
			"<ERRCODE/>\r\n" + 
			"<ERRMSG/>\r\n" + 
			"</headinfo>\r\n" + 
			"<datas>\r\n"+
					"<data1>"
								+"<row>" 
								  +"<AKC190>0</AKC190>"
								  +"<AAE072>1</AAE072>"
								  +"<AKA063>2</AKA063>"
								  +"<AKA074>4</AKA074>"
								  +"<AKC224>3</AKC224>"
                  +"<BKC086>6</BKC086>"
                  +"<BKC037>6</BKC037>"
								  +"</row>"
								  +"<row>" 
								  +"<AKC190>1</AKC190>"
								  +"<AAE072>1</AAE072>"
								  +"<AKA063>2</AKA063>"
								  +"<AKA074>4</AKA074>"
								  +"<AKC224>3</AKC224>"
                  +"<BKC086>6</BKC086>"
                  +"<BKC037>5</BKC037>"
								  +"</row>"
								  +"<row>" 
								  +"<AKC190>2</AKC190>"
								  +"<AAE072>1</AAE072>"
								  +"<AKA063>2</AKA063>"
								  +"<AKA074>4</AKA074>"
								  +"<AKC224>3</AKC224>"
                  +"<BKC086>6</BKC086>"
                  +"<BKC037>7</BKC037>"
								  +"</row>"
								  +"<row>" 
								  +"<AKC190>3</AKC190>"
								  +"<AAE072>1</AAE072>"
								  +"<AKA063>2</AKA063>"
								  +"<AKA074>4</AKA074>"
								  +"<AKC224>3</AKC224>"
                  +"<BKC086>6</BKC086>"
                  +"<BKC037>9</BKC037>"
								  +"</row>"
								  +"<row>" 
								  +"<AKC190>4</AKC190>"
								  +"<AAE072>1</AAE072>"
								  +"<AKA063>2</AKA063>"
								  +"<AKA074>4</AKA074>"
								  +"<AKC224>3</AKC224>"
                  +"<BKC086>6</BKC086>"
                  +"<BKC037>10</BKC037>"
								  +"</row>"
								  +"<row>" 
								  +"<AKC190>5</AKC190>"
								  +"<AAE072>1</AAE072>"
								  +"<AKA063>2</AKA063>"
								  +"<AKA074>4</AKA074>"
								  +"<AKC224>3</AKC224>"
                  +"<BKC086>6</BKC086>"
                  +"<BKC037>11</BKC037>"
								  +"</row>"
								  +"<row>" 
								  +"<AKC190>6</AKC190>"
								  +"<AAE072>1</AAE072>"
								  +"<AKA063>2</AKA063>"
								  +"<AKA074>4</AKA074>"
								  +"<AKC224>3</AKC224>"
                  +"<BKC086>6</BKC086>"
                  +"<BKC037>12</BKC037>"
								  +"</row>"
								  +"<row>" 
								  +"<AKC190>7</AKC190>"
								  +"<AAE072>1</AAE072>"
								  +"<AKA063>2</AKA063>"
								  +"<AKA074>4</AKA074>"
								  +"<AKC224>3</AKC224>"
                  +"<BKC086>6</BKC086>"
                  +"<BKC037>13</BKC037>"
								  +"</row></data1>"
			+"</datas>\r\n" + 
			"</transferinfo>";  */
        var wordsContent = encodeURIComponent(res);

        axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/costinfo/savehosUploadCostInfo",
        params: {
          xml : wordsContent
				},
        /* headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      })
        .then(res => {
          if (res.data.code == 0) {
						this.$message.success('明细保存成功');
          } else {
            this.$message.error(res.data.msg);
          }
        })
      }
      else {
          	this.$message.error('明细保存失败');
      }
    

    }
	
		
			

  },
  computed: {},
  components: {
  }
};
</script>

<style scoped>
.top {
	padding: 10px;
}
.top .el-input {
	width: 20%;
}
.botMain p{
	width: 100%;
	height: 36px;
	line-height: 36px;
	background-color: #EEEEEE;
	/* margin-left: 10px; */
}
.botMain .el-icon-school,.botMain .el-icon-s-order {
	font-size: 20px;
	font-weight: 700;
	color: #409EFF;
	margin-left: 10px;
}
.botMain .fzstyle {
	margin-left: 10px;
	font-size: 14px;
	color: #409EFF;
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
.grid-content span,.top span {
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
