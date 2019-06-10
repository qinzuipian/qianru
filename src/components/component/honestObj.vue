<template>
    <div>
       <div v-show="otherNum == 0">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="医疗机构">
                    <el-col :span="11">
                        <el-input v-model="form.name"></el-input>
                    </el-col>
                    <el-col :span="11" style="margin-left:10px;">
                    <el-button type="primary" @click="hosSelect">选择</el-button>
                    </el-col>
                    
                </el-form-item>
                <el-form-item label="诚信年度">
                    <el-date-picker type="year" placeholder="选择日期" v-model="form.date1" style="width: 70%;"></el-date-picker>  
                </el-form-item>
                <el-form-item label="初始分值">
                    <el-input v-model="form.name" style="width: 70%;"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.desc" style="width: 70%;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-check" @click="onSubmit">保存</el-button>
                    <el-button type="danger" icon="el-icon-close" @click="honClose">关闭</el-button>
                </el-form-item>
            </el-form>
       </div>

       <div v-show="otherNum == 1">
           <el-form ref="form" :model="oneForm" label-width="80px">
               <el-form-item label="对象名称">
                    <el-input v-model="oneForm.objName" style="width: 70%;"></el-input>
                </el-form-item>
                <el-form-item label="指标名称">
                    <el-col :span="11">
                        <el-input v-model="oneForm.tarName"></el-input>
                    </el-col>
                    <el-col :span="11" style="margin-left:10px;">
                    <el-button type="primary" @click="targetSelect">选择</el-button>
                    </el-col>          
                </el-form-item>
                <el-form-item label="评分算法">
                    <el-input v-model="oneForm.score" style="width: 70%;"></el-input>
                </el-form-item>
                 <el-form-item label="评分标准">
                    <el-input v-model="oneForm.scoreStand" style="width: 70%;"></el-input>
                </el-form-item>
                <el-form-item label="评分计量">
                    <el-input-number v-model="oneForm.meter" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
                </el-form-item>
                <el-form-item label="评分系数">
                    <el-input-number v-model="oneForm.coeff" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
                </el-form-item>
              
                 <el-form-item label="附加分值">
                    <el-input v-model="oneForm.scoreAdd" style="width: 70%;"></el-input>
                </el-form-item>
                 <el-form-item label="评分结果">
                    <el-input v-model="oneForm.scoreResult" style="width: 70%;"></el-input>
                </el-form-item>
                <el-form-item label="补充理由">
                    <el-input type="textarea" v-model="oneForm.remark" style="width: 70%;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-check" @click="onSubmit">保存</el-button>
                    <el-button type="danger" icon="el-icon-close" @click="honClose">关闭</el-button>
                </el-form-item>
            </el-form>
       </div>

       <div v-show="otherNum == 2">
             <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="date"
                label="日期"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>
            </el-table>
             <p style="text-align:center;margin:6px;">
                <el-button type="danger" icon="el-icon-close" @click="honClose">关闭</el-button>
            </p>
       </div>
       <div v-show="otherNum == 3">
            <el-form ref="form" :model="secondForm" label-width="120px">
               <el-form-item label="对象名称">
                    <el-input v-model="secondForm.objName" style="width: 70%;"></el-input>
                </el-form-item>
                 <el-form-item label="对象状态">
                    <el-select v-model="secondForm.objState" placeholder="请选择活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="终止监管类型">
                    <el-select v-model="secondForm.objType" placeholder="请选择活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="生效开始日期">
                    <el-date-picker
                    v-model="secondForm.startDate"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                 <el-form-item label="生效结束日期">
                    <el-date-picker
                    v-model="secondForm.endDate"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
              
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="oneForm.remark" style="width: 70%;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-check" @click="onSubmit">保存</el-button>
                    <el-button type="danger" icon="el-icon-close" @click="honClose">关闭</el-button>
                </el-form-item>
            </el-form>
       </div>
       <div v-show="otherNum == 4">
           <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="date"
                label="日期"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>
            </el-table>
            <p style="text-align:center; margin:6px;">
                <el-button type="danger" icon="el-icon-close" @click="honClose">关闭</el-button>
            </p>
       </div>

       <div v-show="otherNum == 5">
             <el-form ref="form" :model="thirdForm" label-width="120px">
               <el-form-item label="医院">
                    <el-input v-model="thirdForm.hosName" style="width: 70%;"></el-input>
                </el-form-item>
              
               <el-form-item label="诚信年度">
                    <el-input v-model="thirdForm.honYear" style="width: 70%;"></el-input>
                </el-form-item>
             
                <el-form-item label="总结评语">
                    <el-input type="textarea" v-model="thirdForm.summary" style="width: 70%;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-check" @click="onSubmit">保存</el-button>
                    <el-button type="danger" icon="el-icon-close" @click="honClose">关闭</el-button>
                </el-form-item>
            </el-form>
       </div>

        <el-dialog :title="btnTitle" v-if='btnVisible' :visible.sync="btnVisible" width="70%" top="10px" :append-to-body='true'>
            <btnSelect :btnNumber="btnNumber" v-on:otherhidden="hiddenand"></btnSelect>
        </el-dialog>
    </div>
</template>


<script>
import btnSelect from "./btnSelect.vue";
export default {
  props: ["otherNum"],
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      oneForm: {
        objName: "",
        tarName: "",
        score: "",
        scoreStand: "",
        meter: "",
        coeff: "",
        scoreAdd: "",
        scoreResult: "",
        remark: ""
      },
      secondForm:{
          objName:"",
          objState:"",
          objType:"",
          startDate:"",
          endDate:"",
          remark:""
      },
      thirdForm:{
          hosName:"",
          honYear:"",
          summary:""
      },
      btnNumber: 0,
      btnVisible: false,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    hosSelect() {
      this.btnNumber = 0;
      this.btnTitle = "选择机构";
      this.btnVisible = true;
    },
    targetSelect() {
      this.btnNumber = 6;
      this.btnTitle = "选择指标";
      this.btnVisible = true;
    },
    hiddenand() {
      this.btnVisible = false;
    },
    honClose() {
      this.$emit("mainhidden");
    },
    handleChange(value) {
      console.log(value);
    }
  },
  created() {},
  components: {
    btnSelect
  }
};
</script>
