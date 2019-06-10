<template>
    <div>
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <span>统筹区代码</span>
                    <el-select v-model="region" placeholder="请选择">
                        <el-option
                        v-for="item in regionOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <span class="red">*</span>
                    <span>受理方式</span>
                    <el-select v-model="accept" placeholder="请选择">
                        <el-option
                        v-for="item in acceptOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                    <span class="red">*</span>
                    <span>来源方式</span>
                    <el-select v-model="source" placeholder="请选择">
                        <el-option
                        v-for="item in sourceOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                   <span class="red">*</span>
                    <span>来源方类型</span>
                    <el-select v-model="sourceType" placeholder="请选择">
                        <el-option
                        v-for="item in souTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <el-row>
             <el-col :span="12">
                <div class="grid-content bg-purple">
                   <span class="red">*</span>
                    <span>来源方名称</span>
                    <el-input v-model="sourName" style="width:220px;" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                   <span class="red">*</span>
                    <span>受理日期</span>
                <el-date-picker
                    v-model="Acceptdate"
                    type="date"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期">
                    </el-date-picker>
                </div>
            </el-col>
        </el-row>
        <el-row>
             <el-col :span="12">
                <div class="grid-content bg-purple">
                    <span>来源联系人</span>
                    <el-input v-model="sourPerple" style="width:220px;" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <span>联系电话</span>
                    <el-input v-model="sourTelephone" style="width:220px;" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <span>邮政编码</span>
                    <el-input v-model="postal" style="width:220px;" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <span>电子邮箱</span>
                    <el-input v-model="email" style="width:220px;" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <span>联系地址</span>
                    <el-input v-model="address" style="width:76%;" placeholder="请输入内容"></el-input>
                </div>          
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <span class="red">*</span>
                    <span>问题描述</span>
                    <el-input  type="textarea" v-model="describe" style="width:76%;" placeholder="请输入内容"></el-input>
                </div>          
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark threeObject">
                    <span>稽核对象</span>
                    <div class="botObject">
                        <el-tree
                        :data="Objectdata"
                         v-show="!botShow"
                        :props="defaultProps"
                        node-key="id"
                        default-expand-all
                        :expand-on-click-node="false"
                        @node-click="handleNodeClick">
                        </el-tree>
                        <p style="text-align:center;" v-show="botShow">
                          暂无对象
                        </p>
                        <!-- :render-content="renderContent" -->
                         <!-- accordion
                        @node-click="handleNodeClick" -->
                       <!--  
                        <p>
                          <el-button type="success" size="mini" v-show="!botShow">医院</el-button>
                        </p>
                        <p>
                          <el-button type="success" size="mini" v-show="!botShow">医生</el-button>
                        </p>
                        <p>
                          <el-button type="success" size="mini" v-show="!botShow||this.pShow==3">参保人员</el-button>
                        </p> -->
                    </div>

                    <div class="btn">
                        <el-button type="primary" icon="fa fa-medkit" :disabled = "hosDisabled" @click="hosClick">医院</el-button>
                        <el-button type="primary" icon="fa fa-user-md" :disabled = "docDisabled" @click="medClick">责任医师</el-button>
                        <el-button type="primary" icon="fa fa-user-circle" :disabled = "pelDisabled" @click="pelClick">参保人员</el-button>
                        <el-button type="danger" icon="el-icon-delete" v-show="this.flag==false" @click="otherdelete">删除对象</el-button>
                    </div>
                </div>          
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark threeObject">
                    <span>文件上传：</span>
                    <p style="text-align:center;" v-show="fileShow">暂无附件</p>
                    <!-- <span style="margin-left:20px;" v-show="!fileShow">{{fileName}}</span> -->
                    <div class="fileupload" v-show="!fileShow">
                        <!-- <span style="margin-left:10%;"  v-show="this.thirdNum == 1">{{doubtedit.fileName}}</span>
                        <span style="margin-left:10%;" v-show="this.thirdNum == 0">{{fileName}}</span>
                        <el-button style="margin-left:26%;" type="danger" size="mini" @click="fileDelete">删除</el-button>
                        <a :href="this.downloadUrl">
                              <el-button type="primary" size="mini">下载</el-button>
                        </a> -->
                        <div v-for="(it,index) in fileList" :key="index">
                            <p style="margin-left:10%;">{{it.fileName}}
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span>附件描述：</span>
                                <span>{{it.fileDescription}}</span>
                            </p>
                          
                            <div class="filebtn">
                                  <el-button style="margin-left:26%;" type="danger" size="mini" @click="fileDelete(it)">删除</el-button>
                                  <a :href="it.downloadUrl">
                                        <el-button type="primary" size="mini">下载</el-button>
                                  </a>
                            </div>
                        </div>
                    </div>
                    <div v-show="addShow">
                          <div v-for="(it,index) in this.fileInfoArray" :key="index">
                            <p style="margin-left:10%;">{{it.fileName}}
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <span>照片描述：</span>
                              <span>{{it.fileDescription}}</span>
                            </p>
                           
                            <div class="filebtn">
                                  <el-button style="margin-left:26%;" type="danger" size="mini" @click="fileDelete(it)">删除</el-button>
                                  <a :href="it.downloadUrl">
                                        <el-button type="primary" size="mini">下载</el-button>
                                  </a>
                            </div>
                        </div>
                    </div>
                   
                    <!-- <p style="text-align:center;" v-show="!fileShow">{{fileName}}</p> -->
                    <div class="btn">
                        <el-button type="primary" icon="el-icon-upload" @click="fileUpload">附件上传</el-button>
                        <el-button type="primary" icon="fa fa-floppy-o" v-show="this.flag==false" @click="doubtSave">保存</el-button>
                        <el-button type="primary" icon="fa fa-floppy-o" v-show="this.flag==true" @click="editSave">保存</el-button>
                        <el-button type="danger" icon="fa fa-minus-circle" @click="mainClear">取消</el-button>
                    </div>
                </div>          
            </el-col>
        </el-row>
       <!-- Dialog被蒙板遮住的解决方案
        :modal-append-to-body='false'
        或
        :append-to-body='true' -->
        <el-dialog :title="btnTitle" v-if='btnVisible' :visible.sync="btnVisible" width="70%" top="10px" :append-to-body='true'>
            <btnSelect :btnNumber="btnNumber" v-on:otherhidden="hiddenand" v-on:serchList="serchList" v-on:secondList="secondList" v-on:oneList="oneList" v-on:thirdList="thirdList"></btnSelect>
        </el-dialog>
    </div>
    
    
    
</template>


<script>
import axios from "axios";
import btnSelect from "./btnSelect.vue";
export default {
  props: ["doubtedit", "fileList", "flag", "rowId"],
  data() {
    return {
      regionOptions: [
        {
          value: "1",
          label: "中国"
        }
      ],
      region: "1",
      accept: "",
      acceptOptions: [
        {
          value: "1",
          label: "主动稽核"
        },
        {
          value: "2",
          label: "系统监控"
        },
        {
          value: "3",
          label: "投诉"
        }
      ],
      source: "",
      sourceOptions: [
        {
          value: "1",
          label: "主动稽核"
        },
        {
          value: "2",
          label: "来信来电"
        },
        {
          value: "9",
          label: "其他"
        }
      ],
      sourceType: "",
      souTypeOptions: [
        {
          value: "1",
          label: "稽核部门"
        },
        {
          value: "2",
          label: "外部单位"
        },
        {
          value: "3",
          label: "其它自然人"
        },
        {
          value: "9",
          label: "其它"
        }
      ],
      sourName: "",
      Acceptdate: "",
      sourPerple: "",
      sourTelephone: "",
      postal: "",
      email: "",
      address: "",
      describe: "",

      Objectdata: [
       /*  {
          label: "医院",
          children: [
            {
              label: ""
            }
          ]
        },
        {
          label: "医生",
          children: [
            {
              label: ""
            }
          ]
        },
        {
          label: "参保人员",
          children: [
            {
              label: ""
            }
          ]
        } */
      ],
      //判断树形结构的类型
      treeType: "",
      treeObj: "",
      hosDisabled: false,
      docDisabled: false,
      pelDisabled: false,
      defaultProps: {
        children: "children",
        label: "label"
      },
      removeNode: "",
      removeData: "",
      //稽核对象
      botShow: true,
      // pShow: 0,
      // peopleName: "",
      btnVisible: false,
      btnNumber: 0,
      btnTitle: "",
      //附件上传
      fileName: [],
      filePath: [],
      fileShow: true,
      editList: [],
      // editfileList:[],
      // 下载链接
      downloadUrl: "",
      thirdNum: 0,
      fileInfoArray: [],
      addShow: false,
      // fileDescription: "",
      objectType: "",
      objectCode: "",
      objectName: ""
    };
  },
  watch: {
    doubtedit(val) {
      this.editList = val;
      this.monitorInit(this.editList);
    },
    fileList(val) {
      // this.editfileList = val;
      if (val != "") {
        this.fileShow = false;
      } else {
        this.fileShow = true;
      }
    },
    fileInfoArray(val) {
      console.log(this.flag);
      // console.log(val)
      if (this.flag != true) {
        console.log(val);
        this.fileInfoArray = val;
        this.addShow = true;
      } else {
        this.addShow = true;
      }
    },
   /*  Objectdata(val) {
      if(this.flag != true) {
        this.botShow = true;
      }
    } */
   
  },

  methods: {
    hosClick() {
      this.btnNumber = 0;
      this.btnTitle = "选择机构";
      this.btnVisible = true;
      this.hosDisabled = false;
      this.docDisabled = true;
      this.pelDisabled = true;
    },
    medClick() {
      this.btnNumber = 1;
      this.btnVisible = true;
      this.btnTitle = "选择医护人员";
      this.hosDisabled = true;
      this.docDisabled = false;
      this.pelDisabled = true;
    },
    pelClick() {
      this.btnNumber = 2;
      this.btnVisible = true;
      this.btnTitle = "选择参保人";
      this.hosDisabled = true;
      this.docDisabled = true;
      this.pelDisabled = false;
    },
    fileUpload() {
      this.btnNumber = 3;
      this.btnVisible = true;
      this.btnTitle = "主动稽核";
    },
    mainClear() {
      this.$emit("mainhidden");
      this.hosDisabled = false;
      this.docDisabled = false;
      this.pelDisabled = false;
      this.botShow = true;
      // this.Objectdata=[];

    },
    hiddenand() {
      this.btnVisible = false;
    },
    //树形结构
    handleNodeClick(node, data) {
      console.log(node, data);
      this.removeNode = data;
      this.removeData = node;
      // this.treeType = data.label;
      // this.treeObj = data.children[0].label;
      // console.log(this.treeType);
    },

    otherdelete() {
      this.$confirm("确认删除此条数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(node, data);
          /*  console.log(this.removeNode);
          console.log(this.removeData); */
          const node = this.removeNode;
          const data = this.removeData;
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
          console.log(this.Objectdata);
          // this.Objectdata = JSON.parse(JSON.stringify(this.Objectdata));

          /* this.treeType = "";
           console.log(this.treeType) */
          /*   if (this.treeType == "医院") {
            console.log(this.treeType);
            this.treeObj = "";
          } else if (this.treeType == "医生") {
            console.log(this.treeType);
          } else if (this.treeType == "参保人员") {
            console.log(this.treeType);
          } */

          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
    },
    //添加数据成功
    doubtSave() {
      if (
        this.accept != "" &&
        this.source != "" &&
        this.sourceType != "" &&
        this.sourName != "" &&
        this.Acceptdate != "" &&
        this.describe != ""
      ) {
        axios({
          method: "post",
          url:
            axios.PARK_API +
            "/inspectionintegrity/Inspection_integrity/bizautquestion/save",
          data: JSON.stringify({
            acceptMode: this.accept,
            sourceCode: this.source,
            sourceDept: this.sourceType,
            sourceName: this.sourName,
            acceptDate: this.Acceptdate,
            sourceContact: this.sourPerple,
            tel: this.sourTelephone,
            postCode: this.postal,
            email: this.email,
            address: this.address,
            description: this.describe,
            /* fileName: this.fileName,
          filePath: this.filePath */
            fileInfoArray: this.fileInfoArray,
            objectType: this.objectType,
            objectCode: this.objectCode,
            objectName: this.objectName
            // fileDescription: this.fileDescription
          }),
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
          .then(res => {
            if (res.data.code == 0) {
              this.$message.success("添加成功");
              this.fileInfoArray = [];
              
              this.$emit("mainhidden");
              this.$emit("doubtInit");
              this.Objectdata=[];
              console.log( this.Objectdata)
              
            } else {
              this.$message.error(res.data.msg);
            }
          })
         /*  .catch(error => {
            this.$message.error("请检查网络");
          }); */
      } else {
        this.$message.warning("带*的为必填项");
      }
    },

    // 修改数据
    editSave() {
      if (
        this.accept != "" &&
        this.source != "" &&
        this.sourceType != "" &&
        this.sourName != "" &&
        this.Acceptdate != "" &&
        this.describe != ""
      ) {
        axios({
          method: "post",
          url:
            axios.PARK_API +
            "/inspectionintegrity/Inspection_integrity/bizautquestion/update",
          data: JSON.stringify({
            id: this.rowId,
            acceptMode: this.accept,
            sourceCode: this.source,
            sourceDept: this.sourceType,
            sourceName: this.sourName,
            acceptDate: this.Acceptdate,
            sourceContact: this.sourPerple,
            tel: this.sourTelephone,
            postCode: this.postal,
            email: this.email,
            address: this.address,
            description: this.describe,
            /*  fileName: this.fileName,
          filePath: this.filePath, */
            fileInfoArray: this.fileInfoArray,
            // fileDescription: this.fileDescription,
            objectType: this.objectType,
            objectCode: this.objectCode,
            objectName: this.objectName
          }),
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
          .then(res => {
            if (res.data.code == 0) {
              this.$message.success("修改成功");
              this.fileInfoArray = [];
              console.log( this.Objectdata)
              this.Objectdata[0].children[0].label = "";
              this.Objectdata[1].children[0].label = "";
              this.Objectdata[2].children[0].label = "";
              this.$emit("mainhidden");
              this.$emit("doubtInit");
             
            } else {
              this.$message.error(res.data.msg);
            }
          })
         /*  .catch(error => {
            this.$message.error("请检查网络");
          }); */
      } else {
        this.$message.warning("带*的为必填项");
      }
    },

    // 修改数据时先添加
    monitorInit(val) {
      this.Objectdata=[];
      this.accept = val.acceptMode;
      this.source = val.sourceCode;
      this.sourceType = val.sourceDept;
      this.sourName = val.sourceName;
      this.Acceptdate = val.acceptDate;
      this.sourPerple = val.sourceContact;
      this.sourTelephone = val.tel;
      this.postal = val.postCode;
      this.email = val.email;
      this.address = val.address;
      this.describe = val.description;
      let obj = {};
      if (val.objectType == "1") {     
        obj.label = "医院";
         this.botShow = false;
      } else if (val.objectType == "2") {
         obj.label = "医师";
          this.botShow = false;
      } else if (val.objectType == "3") {
          obj.label = "参保人员";
          this.botShow = false;
      } else if (val.objectType == undefined) {
         this.botShow = true;
      }
       
        obj.children = [];
        let objner = {};
        objner.id = 1;
        objner.label = val.objectName;
        obj.children.push(objner)
      /*  if (this.Objectdata[0].children.length == 0) {
          this.$set(this.Objectdata[0], "children", []);
        } */
      this.Objectdata.push(obj);
      this.objectType = val.objectType;
      this.objectCode = val.objectCode;
      this.objectName = val.objectName;

      /*  this.fileName = val.fileName;
      this.filePath = val.filePath;
 */
      /*  this.downloadUrl =
        axios.PARK_API +
        "/inspectionintegrity/Inspection_integrity/bizautquestion/downloadfile?" +
        "filePath=" +
        val.filePath +
        "&" +
        "fileName=" +
        val.fileName; */

      /*   if (val.fileName != undefined) {
        this.fileShow = false;
        this.thirdNum = 1;
      } else {
        this.fileShow = true;
        this.fileName = "";
        this.filePath = "";
      } */
    },

    //删除文件附件
    fileDelete(it) {
      // console.log(it)
      this.$confirm("确认删除此条数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            method: "post",
            url:
              axios.PARK_API +
              "/inspectionintegrity/Inspection_integrity/bizautquestion/deletefile",
            data: {
              fileName: it.fileName,
              filePath: it.filePath
              // id: this.rowId
            },
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }).then(res => {
            if (res.data.code == 0) {
              this.$message.success("删除成功");
              this.fileShow = false;
            } else {
            }
          });
        })
        .catch(() => {});
    },
    // this.serchList(this.thirdData,val);
    serchList(thirdData) {
      console.log(thirdData);
      this.fileInfoArray = thirdData.list;
      // this.pShow = thirdData.pShow;

      // this.fileDescription = thirdData.fileDescription;
      /*   this.fileName = thirdData.fileName;
      this.filePath = thirdData.filePath; */
      // this.thirdNum = thirdData.thirdNum;
    },
    oneList(val) {
      console.log(val);
      this.botShow = false;
      /*   this.Objectdata[0].children[0].label = val.hospitalName;
      this.Objectdata[0].children[0].id = 1; */
      // console.log(this.Objectdata[0]);
      let obj = {};
      obj.label = "医院"
      obj.children = [];
      let objner = {};
      objner.id = 1;
      objner.label = val.hospitalName;
      obj.children.push(objner)
     /*  if (this.Objectdata[0].children.length == 0) {
        this.$set(this.Objectdata[0], "children", []);
      } */
      this.Objectdata.push(obj);
      console.log(this.Objectdata)

      this.objectType = val.hospitalType;
      this.objectCode = val.hospitalCode;
      this.objectName = val.hospitalName;

      /*   const newChild = { id: id++, label: this.objectName, children: [] };
      if (!this.Objectdata[0].children) {
        this.$set(this.Objectdata[0], "children", []);
      }
        this.Objectdata[0].children.push(newChild); */
    },
    secondList(val) {
      /*  this.Objectdata[1].children[0].label = val.doctorName;
      this.Objectdata[1].children[0].id = 2; */

      this.botShow = false;
      /*   this.Objectdata[0].children[0].label = val.hospitalName;
      this.Objectdata[0].children[0].id = 1; */
      // console.log(this.Objectdata[0]);
      let obj = {};
      obj.label = "医师"
      obj.children = [];
      let objner = {};
      objner.id = 1;
      objner.label = val.doctorName;
      obj.children.push(objner)
     /*  if (this.Objectdata[0].children.length == 0) {
        this.$set(this.Objectdata[0], "children", []);
      } */
      this.Objectdata.push(obj);
      console.log(this.Objectdata)

      this.objectType = val.doctorType;
      this.objectCode = val.doctorCode;
      this.objectName = val.doctorName;

      /*   this.Objectdata[2].children[0].label = thirdData.peopleName;
      this.Objectdata[1].children[0].label = thirdData.doctorName;
      this.Objectdata[0].children[0].label = thirdData.hospitalName;
 */
    },
    thirdList(val) {
      /* this.Objectdata[2].children[0].label = val.peopleName;
      this.Objectdata[2].children[0].id = 3; */

     this.botShow = false;
      /*   this.Objectdata[0].children[0].label = val.hospitalName;
      this.Objectdata[0].children[0].id = 1; */
      // console.log(this.Objectdata[0]);
      let obj = {};
      obj.label = "参保人员"
      obj.children = [];
      let objner = {};
      objner.id = 1;
      objner.label = val.peopleName;
      obj.children.push(objner)
     /*  if (this.Objectdata[0].children.length == 0) {
        this.$set(this.Objectdata[0], "children", []);
      } */
      this.Objectdata.push(obj);
      console.log(this.Objectdata)

      this.objectType = val.peopleType;
      this.objectCode = val.peopleCode;
      this.objectName = val.peopleName;
    }
  },

  created() {
    // this.monitorInit();
  },
  components: {
    btnSelect
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 6px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  text-align: center;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  /* background-color: #f9fafc; */
}
.threeObject {
  text-align: left;
  margin: 1% 0 0 8%;
}
.botObject {
  width: 80%;
  /* height: 100px; */
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-left: 10%;
  padding: 10px;
}
.btn {
  margin: 1% 0 0 12%;
}
.red {
  color: #f00;
}
</style>

