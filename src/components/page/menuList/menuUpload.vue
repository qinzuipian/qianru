<template>
   <div>
       <div class="right-ctn-title">
            <span>目录类别：</span>
            <el-select v-model="illegal" size="mini" placeholder="请选择">
                <el-option
                v-for="item in illegaloptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button size="mini" type="primary" style="margin-left: 5px;" @click="foulSearch">查询</el-button>
            <el-button size="mini" type="primary" class="el-icon-upload" style="margin-left: 5px;" @click="corresUpload">对应目录上传</el-button>
            <!-- <el-button size="mini" type="primary" style="margin-left: 5px;" @click="statusEdit">测试</el-button> -->
            <el-table
            ref="multipleTable"
            :data="foulData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            :header-cell-style="rowClass"
            highlight-current-row
            @selection-change="menuhandleSelect"
            :row-key="getRowKeys"
            height="480"
            border
            style="width: 100%">
            <el-table-column
            type="selection"
            width="55"
            :reserve-selection="true">
            </el-table-column>
              <el-table-column
              prop="AKB020"
              label="服务机构编号"
              width="110">
              </el-table-column>
              <el-table-column
              prop="AAE073"
              label="目录对应流水号"
              width="120">
              </el-table-column>
              <el-table-column
              prop="BKA262"
              label="医院三大目录项目编码"
              width="160">
              </el-table-column>
              <el-table-column
              prop="BKA263"
              label="医院三大目录项目名称"
               width="160">
              </el-table-column>
              <el-table-column
              prop="BKA261"
              label="医保三大目录项目编码"
               width="160">
              </el-table-column>
             
              <el-table-column
              prop="BKA264"
              label="医保三大目录项目名称"
               width="160">
              </el-table-column>
              <el-table-column
              prop="AKA213"
              width="90"
              label="目录类别">
              </el-table-column>
              <el-table-column
              prop="AKC175"
              width="140"
              label="审批标志">
              </el-table-column>
              <el-table-column
              prop="BAA001"
              width="140"
              label="数据分区">
              </el-table-column>
              <el-table-column
              prop="AKB120"
              width="140"
              label="单价">
              </el-table-column>
              <el-table-column
              prop="AAE013"
              width="140"
              label="备注">
              </el-table-column>
              <el-table-column
              prop="AKA220"
              width="140"
              label="目录对应拒绝原因">
              </el-table-column>
              <el-table-column
              prop="AAE011"
              width="140"
              label="经办人">
              </el-table-column>
              <el-table-column
              prop="AAE036"
              width="140"
              label="经办日期">
              </el-table-column>
              <el-table-column
              prop="AAB034"
              width="140"
              label="所属经办机构">
              </el-table-column>
              <el-table-column
              prop="AAE100"
              width="140"
              label="有效标志">
              </el-table-column>
          </el-table>
          <div class="block" id="fenye">
              <el-pagination
              background
              layout="prev, pager, next,sizes,total"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10,30,50,100]"
              :page-size="pageSize"
              @size-change="foulSizeChange"
              :total=foultotal>
              </el-pagination>
          </div>
      </div>
   </div>

</template>



<script>
import axios from "axios";
export default {
  data() {
    return {
      foulData: [],
      // 一共多少页
      foultotal: 0,
      currentPage: 1,
      pageSize: 100,
      illegal: "",
      illegaloptions: [
        {
          value: "1",
          label: "药品目录"
        },
        {
          value: "2",
          label: "诊疗目录"
        }
      ],
      corrList: "",
      piliangIdList: []
    };
  },
  methods: {
    // 页码改变时去请求数据
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage = val;
      /* if (val > 1) {
        this.$refs.multipleTable.clearSelection();
      } */
    },
    foulSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.$refs.multipleTable.clearSelection();
    },
    rowClass({ row, rowIndex }) {
      return "border-bottom:2px solid #ccc;border-top:2px solid #ccc";
    },
    //页面初始化时请求页面数据
    getFoul() {
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/medical_reimbursement/listcorrespond/queryHiska21List",
        data: {
          status: 0
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.foulData = res.data.data;
            this.foultotal = this.foulData.length;
            for (var i = 0; i < this.foulData.length; i++) {
              switch (this.foulData[i].AKA213) {
                case "1":
                  this.foulData[i].AKA213 = "药品目录";
                  break;
                case "2":
                  this.foulData[i].AKA213 = "诊疗目录";
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

    //根据条件查询数据
    foulSearch() {
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/medical_reimbursement/listcorrespond/queryHiska21List",
        data: {
          AKA213: this.illegal,
          status: 0
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            console.log(res.data.data);
            this.foulData = res.data.data;
            this.foultotal = this.foulData.length;
            for (var i = 0; i < this.foulData.length; i++) {
              switch (this.foulData[i].AKA213) {
                case "1":
                  this.foulData[i].AKA213 = "药品目录";
                  break;
                case "2":
                  this.foulData[i].AKA213 = "诊疗目录";
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
    // 对应目录批量事件
    menuhandleSelect(val) {
      console.log(val);

      // this.$refs.multipleTable.clearSelection();
      this.piliangIdList = [];
      for (let i = 0; i < val.length; i++) {
        /* let obj = {};
        obj.AAE073 = val[i].AAE073; */
        this.piliangIdList.push(val[i].AAE073);
        val[i].AKC175 == undefined
          ? (val[i].AKC175 = "")
          : (val[i].AKC175 = val[i].AKC175);
        val[i].AAE013 == undefined
          ? (val[i].AAE013 = "")
          : (val[i].AAE013 = val[i].AAE013);
        val[i].AKA220 == undefined
          ? (val[i].AKA220 = "")
          : (val[i].AKA220 = val[i].AKA220);
        val[i].AAE011 == undefined
          ? (val[i].AAE011 = "")
          : (val[i].AAE011 = val[i].AAE011);
        val[i].AAE036 == undefined
          ? (val[i].AAE036 = "")
          : (val[i].AAE036 = val[i].AAE036);
        val[i].AAB034 == undefined
          ? (val[i].AAB034 = "")
          : (val[i].AAB034 = val[i].AAB034);
        val[i].BAA001 == undefined
          ? (val[i].BAA001 = "")
          : (val[i].BAA001 = val[i].BAA001);
        val[i].AKA213 == "药品目录"
          ? (val[i].AKA213 = "1")
          : (val[i].AKA213 = "2");
      }
      this.corrList = val;
      console.log(this.corrList);
      console.log(this.piliangIdList);
    },
    getRowKeys(row) {
      // console.log(row)
      return row.id;
    },
    // 对应目录上传
    corresUpload() {
      if (this.corrList.length > 100) {
        this.$message.warning("最多只能传100条数据");
      } else {
        this.$confirm(
          "确认上传" + this.corrList.length + "条数据" + ", 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            axios({
              method: "post",
              url:
                axios.PARK_API +
                "/medical_reimbursement/listcorrespond/mapToXml",
              data: {
                bodyList: this.corrList,
                requestId: "906",
                akb020: localStorage.getItem("akb020"),
                bkb026: localStorage.getItem("bkb026"),
                aab034: localStorage.getItem("aab034"),
                uscode: localStorage.getItem("uscode"),
                usname: localStorage.getItem("usname"),
                datacount: "1",
                rowcount1: "0",
                rowcount2: "0"
              },
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              }
            })
              .then(res => {
                if (res.data.code == 0) {
                  // console.log(res.data.data);
                  this.hospitalDown(res.data.data);
                } else {
                  this.$message.error(res.data.msg);
                }
              })
              .catch(error => {
                //this.$message.error('请检查网络');
              });
          })
          .catch(() => {});
      }
    },
    // 调取医保接口
    hospitalDown(param) {
      console.log(param);
      var state = WSCall.biz(param);
      console.log(state);
      if (state == 1) {
        var res = WSCall.retbiz;
        this.$message.success("上传成功");
        this.statusEdit();
      } else {
        this.$message.warning("上传失败");
      }
    },
    statusEdit() {
      // 将下载下来的数据保存到数据库
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/medical_reimbursement/listcorrespond/updateHisKa21",
        data: {
          AAE073Array: this.piliangIdList
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.getFoul();
          // this.$message.success("登记成功");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  },
  created() {
    this.getFoul();
  }
};
</script>



<style scoped>
.right-ctn-title {
  width: calc(100%-20px);
  /* height: 40px; */
  text-align: left;
  padding-left: 10px;
  position: relative;
}

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
.el-autocomplete {
  width: 202px;
}
</style>

