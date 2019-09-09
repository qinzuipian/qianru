<template>
    <div class="content">
        <div class="top">
            <span>代码类型：</span>
		        <el-input v-model="codeType" style="width:160px;"  placeholder="请输入内容"></el-input>
            <span>代码值：</span>
		        <el-input v-model="codeVal" style="width:160px;"  placeholder="请输入内容"></el-input>
            <span>代码名称：</span>
		        <el-input v-model="codeName" style="width:160px;"  placeholder="请输入内容"></el-input>
            <el-button  type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="codeSearch(1)">查询</el-button>
            <el-button  type="success" icon="el-icon-download" style="margin-left: 10px;" @click="codeloadClick">代码表下载</el-button>
        </div>   
		    <el-table
            :data="codeData"
            style="width: 100%;"
            border
            height="480">
            <el-table-column
            prop="aab034"
            label="经办机构代码">
            </el-table-column>
            <el-table-column
            prop="codeType"
            label="代码类型">
            </el-table-column>
            <el-table-column
            prop="value"
            label="代码值">
            </el-table-column>
            <el-table-column
            prop="name"
            label="代码名称">
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
</template>

<script>
import axios from "axios";
let moment = require("moment");
export default {
  name: "examine",
  data() {
    return {
      codeData: [],
      codeType: "",
      codeVal: "",
      codeName: "",
      pageSize: 10,
      currentPage: 1,
      endtotal: 0,
      flag: 1
    };
  },
  watch: {
    hospitalNum(num) {
      console.log((num / Math.pow(10, 10)).toFixed(10).substr(2));
    }
  },
  components: {},
  methods: {
    // 初始化页面请求数据
    getCode(val) {
      this.flag = 1;
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/code/list",
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
            this.codeData = res.data.page.list;
            this.endtotal = res.data.page.totalCount;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },
    // 搜索查询
    codeSearch(val) {
      this.flag = 2;
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/code/list",
        data: {
          codeType: this.codeType,
          value: this.codeVal,
          name: this.codeName,
          page: val,
          limit: 10
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.codeData = res.data.page.list;
            this.endtotal = res.data.page.totalCount;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },
    // 分页查询
    handleCurrentChange(val) {
      if (this.flag == 1) {
        this.getCode(val);
      } else {
        this.codeSearch(val);
      }
    },
    // 代码表下载
    codeloadClick() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          requestId: "901",
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
      // console.log(param);
      var state = WSCall.biz(param);
      console.log(state); 
        if (state == 1) {
        var res = WSCall.retbiz;

    /*   var state = 1;
      if(state == 1){
        var res =  '<?xml version="1.0" encoding="utf-8"?> ' +
          "                                                " +
          "<transferinfo>                                  " +
          "  <headinfo>                                    " +
          "    <REQUESTID>901</REQUESTID>                  " +
          "    <AKB020>SLYY0001</AKB020>                   " +
          "    <AAB034>61100001</AAB034>                   " +
          "    <BKB026>888888</BKB026>                     " +
          "    <USCODE>管理员</USCODE>                     " +
          "    <USNAME>管理员</USNAME>                     " +
          "    <DATACOUNT>1</DATACOUNT>                    " +
          "    <ROWCOUNT1>2</ROWCOUNT1>                    " +
          "    <ROWCOUNT2>0</ROWCOUNT2>                    " +
          "    <ROWCOUNT3>0</ROWCOUNT3>                    " +
          "    <ROWCOUNT4>0</ROWCOUNT4>                    " +
          "    <ERRCODE>1</ERRCODE>                        " +
          "    <ERRMSG/>                                   " +
          "  </headinfo>                                   " +
          "  <datas>                                       " +
          "    <data1>                                     " +
          "      <row>                                     " +
          "        <AAB034>610324</AAB034>               " +
          "        <CODETYPE>1</CODETYPE>                " +
          "        <VALUE>2</VALUE>              " +
          "        <NAME>3</NAME>              " +
          "      </row>                                    " +
          "      <row>                                     " +
          "        <AAB034>610324</AAB034>               " +
          "        <CODETYPE>3</CODETYPE>                " +
          "        <VALUE>4</VALUE>              " +
          "        <NAME>6</NAME>              " +
          "      </row>                                    " +
          "    </data1>                                    " +
          "  </datas>                                      " +
          "</transferinfo>                                 ";  */
    
        var wordsContent = encodeURIComponent(res);
        // 将下载下来的数据保存到数据库
        axios({
          method: "post",
          url:
            axios.PARK_API +
            "/medical_reimbursement/code/saveCodeInfo",
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
    this.getCode(1);
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
.top .el-input {
  width: 20%;
}
.botMain p {
  width: 100%;
  height: 36px;
  line-height: 36px;
  background-color: #eeeeee;
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

#fenye {
  background: #c1c1c1;
}
</style>
