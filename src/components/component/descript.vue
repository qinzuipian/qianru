<template>
  <div>
    <div v-show="this.tainNum == 1">
        <el-form ref="form" :model="dataForm" label-width="120px">
             <el-form-item label="代码">
                     <el-input  v-model="dataForm.code" style="width: 90%;"></el-input>              
             </el-form-item>
             <el-form-item label="编码">
                  <el-input v-model="dataForm.typeId" style="width: 90%;"></el-input>
                    
             </el-form-item>
             <el-form-item label="显示值">
                 <el-input v-model="dataForm.name" style="width: 90%;"></el-input>
             </el-form-item>
  
            
             <el-form-item style="text-align:center;">
                 <el-button type="primary" icon="el-icon-check" v-show="this.flag == 1" @click="plusSave">保存</el-button>
                 <el-button type="primary" icon="el-icon-check" v-show="this.flag == 2" @click="editSave">保存</el-button>
                 <el-button type="danger" icon="el-icon-close" @click="clear">关闭</el-button>
             </el-form-item>
        </el-form> 
    </div>
    <div v-show="this.tainNum == 5">
        <div class="queryBtn">
             <el-button type="primary" icon="el-icon-plus" @click="queryClick">新增</el-button>
             <el-button type="success" icon="el-icon-edit" @click="editClick">编辑</el-button>
             <el-button type="danger" icon="el-icon-delete" @click="deleteClick">删除</el-button>
        </div>
        <el-table
            :data="smallList"
            border
            style="width: 100%"
            highlight-current-row
            @row-click="IsSmall">
           <el-table-column
            prop="code"
            label="代码">
            </el-table-column>
            <el-table-column
            prop="typeId"
            label="编码">
            </el-table-column>
            <el-table-column
            prop="dispOrder"
            label="显示顺序">
            </el-table-column>
            <el-table-column
            prop="name"
            label="显示值">
            </el-table-column>
            <el-table-column
            prop="removed"
            label="删除标志">
            </el-table-column>
         
        </el-table>
         <div class="block" id="fenye">
            <el-pagination background layout="prev, pager, next" :total =smalltotal @current-change="handlePage">
            </el-pagination>
        </div>
        <p style="text-align:center;">
            <el-button type="danger" icon="el-icon-close" @click="clear">关闭</el-button>
        </p>
    </div>

     <!-- 小类添加，编辑的显示 -->
    <transition name="el-zoom-in-center">
             <div v-show="gularList" class="gular">
                   <el-form ref="form" :model="smallForm" label-width="120px">
                    <el-form-item label="代码">
                            <el-input  v-model="smallForm.code" style="width: 90%;"></el-input>              
                    </el-form-item>
                    <el-form-item label="编码">
                          <el-input v-model="smallForm.typeId" style="width: 90%;"></el-input>
                            
                    </el-form-item>
                    <el-form-item label="显示值">
                        <el-input v-model="smallForm.name" style="width: 90%;"></el-input>
                    </el-form-item>
                  </el-form> 
                  <p style="text-align:center;">
                        <el-button type="success" v-show="this.ruleFlag == 1" icon="el-icon-check" @click="IsruleSave">确认</el-button>
                        <el-button type="success" v-show="this.ruleFlag == 2" icon="el-icon-check" @click="IseditSave">确认1</el-button>
                        <el-button type="danger" icon="el-icon-close" @click="smallClose">关闭</el-button>
                  </p>
             </div>
    </transition>
    <!-- 医院机构 -->
   <div v-show="this.tainNum == 10">
        <el-form ref="form" :model="medicOrganForm" label-width="120px">
             <el-form-item label="机构编码">
                 <el-input v-model="medicOrganForm.hospitalCode" style="width: 90%;"></el-input>
             </el-form-item>
          
             <el-form-item label="机构名称">
                 <el-input v-model="medicOrganForm.hospitalName" style="width: 90%;"></el-input>
             </el-form-item>
             <el-form-item label="医院等级">

                   <el-select v-model="medicOrganForm.grade" style="width: 90%;" placeholder="请选择医院等级">
                      <el-option label="一级医院" value="11"></el-option>
                      <el-option label="二级医院" value="21"></el-option>
                      <el-option label="三级医院" value="31"></el-option>
                    </el-select>
             </el-form-item> 
             <!--  <el-form-item label="机构类型">
                 <el-input v-model="medicOrganForm.type" style="width: 90%;"></el-input>
             </el-form-item> -->
              <el-form-item label="所属区域编码">
                 <el-input v-model="medicOrganForm.areaCode" style="width: 90%;"></el-input>
          
             </el-form-item>                 
             <el-form-item label="邮政编码">
                 <el-input v-model="medicOrganForm.postCode" style="width: 90%;"></el-input>
             </el-form-item>           
        
                    
            
             <el-form-item label="联系方式">
                 <el-input v-model="medicOrganForm.tel" style="width: 90%;"></el-input>
          
             </el-form-item> 
             <el-form-item label="地址">
                 <el-input v-model="medicOrganForm.address" style="width: 90%;"></el-input>
          
             </el-form-item> 
              <el-form-item label="描述">
                 <el-input  type="textarea" v-model="medicOrganForm.description" style="width: 90%;"></el-input>
             </el-form-item>            
                      
             <el-form-item style="text-align:center;">
                 <el-button type="primary" icon="el-icon-check" v-show="this.flag == 1" @click="organSave">保存</el-button>
                 <el-button type="primary" icon="el-icon-check" v-show="this.flag == 2" @click="organEdit">保存1</el-button>
                 <el-button type="danger" icon="el-icon-close" @click="clear">关闭</el-button>
             </el-form-item>
        </el-form> 
    </div>
    <div v-show="this.tainNum == 2">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
              <span>参保人员ID</span>
              <el-input v-model="peopleId" style="width:200px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
             <span>家庭编码</span>
             <el-input v-model="peopleCd" style="width:200px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
              <span>地区编码</span>
             <el-input v-model="areaCd" style="width:200px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
              <span>姓名</span>
              <el-input v-model="name" style="width:220px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
             <span>出生日期</span>
             <el-input v-model="birdate" style="width:220px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
              <span>性别</span>
             <el-input v-model="sex" style="width:200px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
      </el-row>

       <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
             <span>民族</span>
             <el-input v-model="nation" style="width:220px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
              <span>身份证号</span>
              <el-input v-model="idcard" style="width:220px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
       
        <el-col :span="8">
          <div class="grid-content bg-purple">
              <span>现住址</span>
             <el-input v-model="address" style="width:200px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
      </el-row>
     
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
              <span>联系电话</span>
              <el-input v-model="telphone" style="width:220px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
             <span>婚姻状况</span>
             <el-input v-model="poster" style="width:220px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
              <span>工作单位</span>
             <el-input v-model="jobAddress" style="width:200px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
      <el-col :span="24" style="text-align:center;">
        <div class="grid-content bg-purple-dark">
          <el-button type="success" icon="el-icon-check" v-show="this.flag == 1" @click="peopleClick">保存</el-button>
          <el-button type="danger" icon="el-icon-close" @click="clear">关闭</el-button>
        </div>
        </el-col>
      </el-row>
      
    </div>

    <div v-show="this.tainNum == 3">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
              <span>医护人员编码</span>
              <el-input v-model="doctorId" style="width:200px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
             <span>姓名</span>
             <el-input v-model="doctorName" style="width:200px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
              <span>身份证号</span>
             <el-input v-model="doctorCard" style="width:200px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
              <span>联系方式</span>
              <el-input v-model="docTel" style="width:220px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
             <span>职业</span>
             <el-input v-model="docProfess" style="width:220px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
              <span>执业地点</span>
             <el-input v-model="docAddress" style="width:200px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
              <span>执业证编码</span>
              <el-input v-model="Profess" style="width:220px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
             <span>资格证编码</span>
             <el-input v-model="docCertifi" style="width:220px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
       <!--  <el-col :span="8">
          <div class="grid-content bg-purple">
              <span>执业地点</span>
             <el-input v-model="docAddress" style="width:200px;" placeholder="请输入内容"></el-input>
          </div>
        </el-col> -->
      </el-row>

       <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
                <span>医师介绍</span>
                <el-input   type="textarea" v-model="docRemark" style="width:75%;" placeholder="请输入内容"></el-input>
            </div>
          </el-col>
      </el-row>
    
      <el-row>
      <el-col :span="24" style="text-align:center;">
        <div class="grid-content bg-purple-dark">
          <el-button type="success" icon="el-icon-check" v-show="this.flag == 1" @click="doctorSave">确认</el-button>
          <el-button type="success" icon="el-icon-check" v-show="this.flag == 2" @click="doctorEdit">确认</el-button>
          <el-button type="danger" icon="el-icon-close" @click="clear">关闭</el-button>
        </div>
        </el-col>
      </el-row>
    </div>

    <div v-show="this.tainNum == 4">
        <el-form ref="form" :model="form" label-width="120px">
          
           
            
           
             <el-form-item label="中心科室编码">
               <el-input v-model="form.unionCode" style="width: 90%;"></el-input>
             </el-form-item>
             <el-form-item label="中心科室名称">
                 <el-input v-model="form.unionName" style="width: 90%;"></el-input>
              
             </el-form-item>
             <el-form-item label="中心科室类别">
                 <el-input v-model="form.typeCode" style="width: 90%;"></el-input>
             </el-form-item>
            
             <el-form-item style="text-align:center;">
                 <el-button type="primary" icon="el-icon-check" v-show="this.flag == 1" @click="onSubmit">保存</el-button>
                 <el-button type="primary" icon="el-icon-check" v-show="this.flag == 2" @click="editSubmit">保存</el-button>
                 <el-button type="danger" icon="el-icon-close" @click="clear">关闭</el-button>
             </el-form-item>
         </el-form>
    </div>

    <div v-show="this.tainNum == 6">
        <el-form ref="form" :model="medicalForm" label-width="120px">
             <el-form-item label="项目编码">
                     <el-input  v-model="medicalForm.itemCode" style="width: 90%;"></el-input>              
             </el-form-item>
             <el-form-item label="项目名称">
                  <el-input v-model="medicalForm.itemName" style="width: 90%;"></el-input>
                    
             </el-form-item>
             <el-form-item label="拼音码">
                 <el-input v-model="medicalForm.spell" style="width: 90%;"></el-input>
             </el-form-item>
             <!-- <el-form-item label="项目类型">
                 <el-input v-model="medicalForm.itemType" style="width: 90%;"></el-input>
             </el-form-item> -->
             <el-form-item label="规格">
                 <el-input v-model="medicalForm.spec" style="width: 90%;"></el-input>
             </el-form-item>
             <el-form-item label="销售单位">
                 <el-input v-model="medicalForm.unit" style="width: 90%;"></el-input>
             </el-form-item>
             <el-form-item label="剂型">
                 <el-input v-model="medicalForm.form" style="width: 90%;"></el-input>
             </el-form-item>
             <el-form-item label="描述">
                 <el-input v-model="medicalForm.description" type="textarea" :rows="2" placeholder="请输入内容" style="width: 90%;"></el-input>
             </el-form-item>
  
            
             <el-form-item style="text-align:center;">
                 <el-button type="primary" icon="el-icon-check" v-show="this.flag == 1" @click="medicplSave">保存</el-button>
                 <el-button type="primary" icon="el-icon-check" v-show="this.flag == 2" @click="medicedSave">保存</el-button>
                 <el-button type="danger" icon="el-icon-close" @click="clear">关闭</el-button>
             </el-form-item>
        </el-form> 
    </div>
    <div v-show="this.tainNum == 7">
        <el-form ref="form" :model="diseaseForm" label-width="120px">
             <el-form-item label="疾病编码">
                <el-input  v-model="diseaseForm.diseaseCode" style="width: 90%;"></el-input>              
             </el-form-item>
             <el-form-item label="疾病名称">
                <el-input v-model="diseaseForm.diseaseName" style="width: 90%;"></el-input>
                    
             </el-form-item>
             <el-form-item label="拼音码">
                 <el-input v-model="diseaseForm.spell" style="width: 90%;"></el-input>
             </el-form-item>
          
             <el-form-item label="疾病分类">
                 <el-input v-model="diseaseForm.diseaseCategory" style="width: 90%;"></el-input>
             </el-form-item>
             <el-form-item label="特殊病种标志">
                 <el-input v-model="diseaseForm.specialStatus" style="width: 90%;"></el-input>
             </el-form-item>
             <el-form-item label="描述">
                 <el-input v-model="diseaseForm.description" type="textarea" :rows="2" placeholder="请输入内容" style="width: 90%;"></el-input>
             </el-form-item>
  
            
             <el-form-item style="text-align:center;">
                 <el-button type="primary" icon="el-icon-check" v-show="this.flag == 1" @click="diseacplSave">保存</el-button>
                 <el-button type="primary" icon="el-icon-check" v-show="this.flag == 2" @click="diseaedSave">保存</el-button>
                 <el-button type="danger" icon="el-icon-close" @click="clear">关闭</el-button>
             </el-form-item>
        </el-form> 
    </div>
    <div v-show="this.tainNum == 8">
        <el-form ref="form" :model="hospitalForm" label-width="120px">
            <!--  <el-form-item label="医院编码">
                <el-input  v-model="hospitalForm.hospitalCode" style="width: 70%;"></el-input>   
                <el-button type="primary" @click="officeSelect">选择</el-button>     
             </el-form-item> -->
             <el-form-item label="科室名称">
                <el-input v-model="hospitalForm.deptName" style="width: 90%;"></el-input>
                    
             </el-form-item>
             <el-form-item label="科室编码">
                 <el-input v-model="hospitalForm.deptCode" style="width: 90%;"></el-input>
             </el-form-item>
          
             <el-form-item label="团队介绍">
                 <el-input v-model="hospitalForm.description" style="width: 90%;"></el-input>
             </el-form-item>
             <el-form-item label="床位数">
                 <el-input v-model="hospitalForm.bedNumber" style="width: 90%;"></el-input>
             </el-form-item>           
                    
             <el-form-item label="中心科室名称">
                 <el-input v-model="hospitalForm.unionName" style="width: 70%;"></el-input>
                 <el-button type="primary" @click="hosNameclick">选择</el-button>
             </el-form-item> 
              <el-form-item label="中心科室编码">
                 <el-input v-model="hospitalForm.unionCode" style="width: 90%;"></el-input>
             </el-form-item>            
             <el-form-item label="中心科室类别">
                 <el-input v-model="hospitalForm.typeCode" style="width: 90%;"></el-input>
             </el-form-item>           
             <el-form-item style="text-align:center;">
                 <el-button type="primary" icon="el-icon-check" v-show="this.flag == 1" @click="hoscplSave">保存</el-button>
                 <el-button type="primary" icon="el-icon-check" v-show="this.flag == 2" @click="hosedSave">保存</el-button>
                 <el-button type="danger" icon="el-icon-close" @click="clear">关闭</el-button>
             </el-form-item>
        </el-form> 
    </div>
    <div v-show="this.tainNum == 9">
        <el-form ref="form" :model="ruleForm" label-width="120px">
           <!--   <el-form-item label="规则编码">
                <el-input v-model="ruleForm.code" style="width: 90%;"></el-input>
                    
             </el-form-item> -->
             <el-form-item label="规则名称">
                 <el-input v-model="ruleForm.name" style="width: 90%;"></el-input>
             </el-form-item>
          
             <el-form-item label="规则类型">
                 <el-input v-model="ruleForm.ruleType" style="width: 90%;"></el-input>
             </el-form-item>
             <el-form-item label="执行周期">
                 <el-input v-model="ruleForm.execCycle" style="width: 90%;"></el-input>
             </el-form-item>           
                    
             <el-form-item label="违规等级">
                 <el-input v-model="ruleForm.illegalLevel" style="width: 90%;"></el-input>
                
             </el-form-item> 
              <el-form-item label="规则描述">
                 <el-input  type="textarea" v-model="ruleForm.dsc" style="width: 90%;"></el-input>
             </el-form-item>            
                      
             <el-form-item style="text-align:center;">
                 <el-button type="primary" icon="el-icon-check" v-show="this.flag == 1" @click="rulecplSave">保存</el-button>
                 <el-button type="primary" icon="el-icon-check" v-show="this.flag == 2" @click="ruleedSave">保存1</el-button>
                 <el-button type="danger" icon="el-icon-close" @click="clear">关闭</el-button>
             </el-form-item>
        </el-form> 
    </div>

    <el-dialog :title="btnTitle" v-if='doubtVisible' :visible.sync="doubtVisible" width="70%" top="10px" :append-to-body='true'>
      <btnSelect :btnNumber="btnNumber" v-on:otherhidden="hiddenadd" v-on:officeList="officeList"></btnSelect>
    </el-dialog>
  </div>
   
</template>


<script>
// import issue from "./issuedetail";
import moment from "moment";
import btnSelect from "./btnSelect.vue";
import axios from "axios";
export default {
  props: [
    "tainNum",
    "hospitallook",
    "peoplelook",
    "doctorlook",
    "officelook",
    "medicallook",
    "rowId",
    "smallList",
    "smalltotal",
    "datalook",
    "dataInit",
    "flag",
    "medicalFlag",
    "hospitalLook",
    "hospitalCode",
    "diseaselook",
    "rulelook",
    "hosOrganlook"
  ],
  data() {
    return {
      //数据字典data
      dataForm: { code: "", typeId: "", name: "" },
      smallForm: { code: "", typeId: "", name: "" },
      //医疗机构
      medicOrganForm: {
        hospitalCode: "",
        hospitalName: "",
        address: "",
        areaCode: "",
        description: "",
        tel: "",
        postCode: "",
        grade: ""
      },
      organId: "",
      dataId: "",
      smId: "",
      smList: [],
      gularList: false,
      ruleFlag: 1,
      peopleId: "",
      peopleCd: "",
      areaCd: "",
      name: "",
      age: "",
      jobDate: "",
      peopletype: "",
      birdate: "",
      sex: "",
      nation: "",
      idcard: "",
      address: "",
      telphone: "",
      poster: "",
      jobAddress: "",

      doctorId: "",
      doctorName: "",
      doctorCard: "",
      docTel: "",
      docProfess: "",
      docAddress: "",
      docRemark: "",
      Profess: "",
      docCertifi: "",

      btnNumber: 0,
      btnTitle: "",
      doubtVisible: false,
      form: {
        typeCode: "",
        unionCode: "",
        unionName: ""
      },
      medicalForm: {
        itemCode: "",
        itemName: "",
        spell: "",
        spec: "",
        unit: "",
        description: ""
      },
      diseaseForm: {
        description: "",
        specialStatus: "",
        diseaseCategory: "",
        spell: "",
        diseaseName: "",
        diseaseCode: ""
      },
      hospitalForm: {
        deptName: "",
        deptCode: "",
        description: "",
        bedNumber: "",
        unionCode: "",
        unionName: "",
        typeCode: ""
      },
      hosId: "",
      diseaseId: "",
      //规则列表
      ruleForm: {
        // code: "",
        name: "",
        ruleType: "",
        execCycle: "",
        illegalLevel: "",
        dsc: "",
        illegalLevel: ""
      },
      ruleId: ""
    };
  },
  watch: {
    //数据字典
    datalook(val) {
      console.log(val);
      if (this.tainNum == "1") {
        this.dataDetail(val);
      }
    },
    //医疗机构单个信息查询
    hosOrganlook(val) {
      if (this.tainNum == "10") {
        this.organDetail(val);
      }
    },

    //参保人员
    peoplelook(val) {
      console.log(val);
      if (this.tainNum == "2") {
        this.peopleDetail(val);
      }
    },
    //执业医师
    doctorlook(val) {
      if (this.tainNum == "3") {
        this.doctorDetail(val);
      }
    },
    //医院科室信息
    hospitalLook(val) {
      console.log(val);
      if (this.tainNum == "8") {
        this.hospitalDetail(val);
      }
    },
    //科室信息
    officelook(val) {
      if (this.tainNum == "4") {
        this.officeDetail(val);
      }
    },

    //药品信息
    medicallook(val) {
      console.log(val);
      if (this.tainNum == "6") {
        this.medicalDetail(val);
      }
    },
    //病种信息
    diseaselook(val) {
      if (this.tainNum == "7") {
        this.diseaseDetail(val);
      }
    },
    //规则列表信息
    rulelook(val) {
      if (this.tainNum == "9") {
        this.ruleDetail(val);
      }
    }
  },
  methods: {
    hiddenadd() {
      this.doubtVisible = false;
    },
    clear() {
      this.$emit("mainhidden");
    },
    //医疗机构的添加
    organSave() {
      console.log("222");
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/bashospital/save",
        data: this.medicOrganForm,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.$message.success("添加成功");
            this.$emit("mainhidden");
            this.$emit("hospitalInit");
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //   this.$message.error("请检查网络");
        });
    },
    //编辑前先填充
    organDetail(val) {
      this.medicOrganForm.hospitalCode = val.hospitalCode;
      this.medicOrganForm.hospitalName = val.hospitalName;
      this.medicOrganForm.address = val.address;
      this.medicOrganForm.areaCode = val.areaCode;
      this.medicOrganForm.description = val.description;
      this.medicOrganForm.grade = val.grade;
      this.medicOrganForm.postCode = val.postCode;
      this.medicOrganForm.tel = val.tel;
      this.organId = val.id;
    },
    //医疗机构编辑
    organEdit() {
      this.medicOrganForm.id = this.organId;

      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/bashospital/update",
        data: this.medicOrganForm,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.$message.success("编辑成功");
            this.$emit("mainhidden");
            this.$emit("hospitalInit");
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //   this.$message.error("请检查网络");
        });
    },
    //数据字典
    handlePage(val) {
      this.$emit("handlePage", val);
    },
    //数据字典大类的添加
    plusSave() {
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/codeinfo/save",
        data: this.dataForm,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message.success("添加成功");
          this.$emit("mainhidden");
          this.$emit("dataInit");
        } else {
        }
      });
    },
    //数据字典修改之前的填充
    dataDetail(val) {
      this.dataForm.code = val.code;
      this.dataForm.typeId = val.typeId;
      this.dataForm.name = val.name;
      this.dataId = val.id;
    },
    //数据字典大类的修改
    editSave() {
      this.dataForm.id = this.dataId;
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/codeinfo/update",
        data: this.dataForm,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message.success("编辑成功");
          this.$emit("mainhidden");
          this.$emit("dataInit");
        } else {
        }
      });
    },
    //数据字典小类的增添
    queryClick() {
      this.gularList = true;
      this.ruleFlag = 1;
    },
    //数据字典小类的修改
    editClick() {
      if (this.smId != "") {
        this.gularList = true;
        this.ruleFlag = 2;
        this.smallForm.code = this.smList.code;
        this.smallForm.typeId = this.smList.typeId;
        this.smallForm.name = this.smList.name;
      } else {
        this.$message.warning("请选择一条数据进行修改");
      }
    },
    IseditSave() {
      this.gularList = false;
      this.smallForm.id = this.smList.id;
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/codeinfo/update",
        data: this.smallForm,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message.success("编辑成功");
          this.gularList = false;
          // this.$emit("detailRow");
          this.smallForm = {};
        } else {
        }
      });
    },
    //小类表格的行点击事件
    IsSmall(row) {
      console.log(row);
      this.smId = row.id;
      this.smList = row;
    },
    IsruleSave() {
      this.gularList = false;
      this.smallForm.codeInfoId = this.rowId;
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/codeinfo/save",
        data: this.smallForm,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message.success("添加成功");
          this.gularList = false;
          // this.$emit("detailRow");
          this.smallForm = {};
        } else {
        }
      });
    },
    smallClose() {
      this.gularList = false;
    },
    //数据字典小类的删除
    deleteClick() {
      if (this.smId != "") {
        this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            /*   let arry = [];
            arry.push(this.rowId);
            console.log(arry); */
            axios({
              method: "post",
              url: axios.PARK_API + "/jkda/jkda/codeinfo/logicDelete",
              // data: { ids: arry },
              // data: { ids: JSON.stringify(arry) },
              params: {
                id: this.smId
              }
              /*  headers: {
                "Content-Type": "application/json;charset=UTF-8"
              } */
            }).then(res => {
              if (res.data.code == 0) {
                this.$message.success("删除成功");
              } else {
              }
            });
          })
          .catch(() => {});
      } else {
        this.$message.warning("请选择一条数据进行删除");
      }
    },

    //参保人员的详情信息
    peopleDetail(val) {
      console.log(val);
      let pepleval = val[0];
      this.peopleId = pepleval.id;
      this.peopleCd = pepleval.familyNo;
      this.areaCd = pepleval.districtCode;
      this.name = pepleval.name;
      this.birdate = pepleval.birthDate;
      if (pepleval.genderCd == "1") {
        this.sex = "男";
      } else {
        this.sex = "女";
      }
      if (pepleval.nationCd == "01") {
        this.nation = "汉族";
      } else {
        this.nation = "无";
      }
      this.idcard = pepleval.idNo;
      this.address = pepleval.addr;
      this.telphone = pepleval.tel;
      this.jobAddress = pepleval.wokingUnitName;
      if (pepleval.maritalStCd == "10") {
        this.poster = "未婚";
      } else if (pepleval.maritalStCd == "20") {
        this.poster = "已婚";
      } else {
        this.poster = "";
      }
    },
    //参保人员编辑保存
    peopleClick() {
      if (this.sex == "男") {
        this.sex = "1";
      } else  {
        this.sex = "2";
      }
      if (this.nation == "汉族") {
        this.nation = "01";
      }
      if (this.poster == "未婚") {
        this.poster = "10";
      } else if (this.poster == "已婚") {
        this.poster = "20";
      }
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/ehrpir/update",
        data: {
          id: this.peopleId,
          familyNo: this.peopleCd,
          districtCode: this.areaCd,
          name: this.name,
          birthDate: this.birdate,
          idNo: this.idcard,
          addr: this.address,
          tel: this.telphone,
          wokingUnitName: this.jobAddress,
          genderCd: this.sex,
          nationCd: this.nation,
          maritalStCd: this.poster
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message.success("编辑成功");
          this.$emit("mainhidden");
          this.$emit("peopleInit");
        } else {
        }
      });
    },

    //执业医师保存
    doctorSave() {
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/basdoctor/save",
        data: {
          doctorNo: this.doctorId,
          doctorName: this.doctorName,
          idNo: this.doctorCard,
          tel: this.docTel,
          professional: this.docProfess,
          firstAddress: this.docAddress,
          description: this.docRemark,
          doctorPractising: this.Profess,
          doctorQualification: this.docCertifi
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message.success("添加成功");
          this.$emit("mainhidden");
          this.$emit("doctorInit");
        } else {
        }
      });
    },

    //执业医师编辑修改
    doctorEdit() {
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/basdoctor/update",
        data: {
          doctorNo: this.doctorId,
          doctorName: this.doctorName,
          idNo: this.doctorCard,
          tel: this.docTel,
          professional: this.docProfess,
          firstAddress: this.docAddress,
          description: this.docRemark,
          doctorPractising: this.Profess,
          doctorQualification: this.docCertifi,
          id: this.rowId
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message.success("修改成功");
          this.$emit("mainhidden");
          this.$emit("doctorInit");
        } else {
        }
      });
    },
    //执业医师修改时先添加
    doctorDetail(val) {
      this.doctorId = val.doctorNo;
      this.doctorName = val.doctorName;
      this.doctorCard = val.idNo;
      this.docTel = val.tel;
      this.docProfess = val.professional;
      this.docAddress = val.firstAddress;
      this.Profess = val.doctorPractising;
      this.docCertifi = val.doctorQualification;
      this.docRemark = val.description;
    },
    //科室信息保存
    onSubmit() {
      // console.log("submit!");
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/basdept/save",
        data: this.form,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message.success("添加成功");
          this.$emit("mainhidden");
          this.$emit("officeInit");
        } else {
        }
      });
    },
    //科室信息修改前先填充
    officeDetail(val) {
      this.form.unionCode = val.unionCode;
      this.form.unionName = val.unionName;
      this.form.typeCode = val.typeCode;
    },
    //科室信息编辑保存
    editSubmit() {
      /*  
      console.log("edit"); */
      this.form.id = this.rowId;
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/basdept/update",
        data: this.form,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message.success("添加成功");
          this.$emit("mainhidden");
          this.$emit("officeInit");
        } else {
        }
      });
    },
    hosNameclick() {
      this.btnNumber = 9;
      this.btnTitle = "选择中心科室";
      this.doubtVisible = true;
    },
    //子传父数据
    officeList(val) {
      console.log(val);
      this.hospitalForm.typeCode = val.typeCode;
      this.hospitalForm.unionCode = val.unionCode;
      this.hospitalForm.unionName = val.unionName;
      // this.hospitalForm.hospitalCode = val.hospitalCode;
    },

    //  医院科室信息保存
    hoscplSave() {
      this.hospitalForm.hospitalCode = this.hospitalCode;
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/bashospitaldept/save",
        data: this.hospitalForm,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message.success("添加成功");
          this.$emit("mainhidden");
          this.$emit("hospitaldowm", this.hospitalCode);

          // this.$emit("hospitaldowm");
        } else {
        }
      });
    },

    //医院科室编辑前先填充
    hospitalDetail(val) {
      console.log(val);
      this.hospitalForm.bedNumber = val.bedNumber;
      this.hospitalForm.deptCode = val.deptCode;
      this.hospitalForm.deptName = val.deptName;
      this.hospitalForm.description = val.description;
      this.hospitalForm.unionCode = val.unionCode;
      this.hospitalForm.unionName = val.unionName;
      this.hospitalForm.typeCode = val.typeCode;
      this.hosId = val.id;
    },
    //  医院科室信息编辑保存
    hosedSave() {
      this.hospitalForm.id = this.hosId;
      this.hospitalForm.hospitalCode = this.hospitalCode;
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/bashospitaldept/update",
        data: this.hospitalForm,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message.success("编辑成功");
          this.$emit("mainhidden");
          //子组件调用父组件的方法
          this.$emit("hospitaldowm", this.hospitalCode);
        } else {
        }
      });
    },

    //药品信息添加保存
    medicplSave() {
      if (this.medicalFlag == 1) {
        this.medicalForm.itemType = "1";
      } else if (this.medicalFlag == 2) {
        this.medicalForm.itemType = "2";
      } else if (this.medicalFlag == 3) {
        this.medicalForm.itemType = "3";
      }

      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/basproduct/save",
        data: this.medicalForm,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message.success("添加成功");
          this.$emit("mainhidden");
          this.$emit("medicalInit");
        } else {
        }
      });
    },
    //药品信息编辑前先添加
    medicalDetail(val) {
      this.medicalForm.itemCode = val.itemCode;
      this.medicalForm.itemName = val.itemName;
      this.medicalForm.spell = val.spell;
      this.medicalForm.spec = val.spec;
      this.medicalForm.unit = val.unit;
      this.medicalForm.description = val.description;
    },
    //药品信息编辑保存
    medicedSave() {
      if (this.medicalFlag == 1) {
        this.medicalForm.itemType = "1";
      } else if (this.medicalFlag == 2) {
        this.medicalForm.itemType = "2";
      } else if (this.medicalFlag == 3) {
        this.medicalForm.itemType = "3";
      }
      this.medicalForm.id = this.rowId;
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/jkda/basproduct/update",
        data: this.medicalForm,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message.success("编辑成功");
          this.$emit("mainhidden");
          this.$emit("medicalInit");
        } else {
        }
      });
    },

    //病种信息保存
    diseacplSave() {
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/Inspection_integrity/basdisease/save",
        data: this.diseaseForm,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message.success("添加成功");
          this.$emit("mainhidden");
          this.$emit("diseaseInit");
        } else {
        }
      });
    },
    //病种信息编辑前先填充
    diseaseDetail(val) {
      this.diseaseForm.diseaseName = val.diseaseName;
      this.diseaseForm.diseaseCode = val.diseaseCode;
      this.diseaseForm.diseaseCategory = val.diseaseCategory;
      this.diseaseForm.spell = val.spell;
      this.diseaseForm.specialStatus = val.specialStatus;
      this.diseaseForm.description = val.description;
      this.diseaseId = val.id;
    },
    //病种信息编辑
    diseaedSave() {
      this.diseaseForm.id = this.diseaseId;
      axios({
        method: "post",
        url: axios.PARK_API + "/jkda/Inspection_integrity/basdisease/update",
        data: this.diseaseForm,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message.success("编辑成功");
          this.$emit("mainhidden");
          this.$emit("diseaseInit");
        } else {
        }
      });
    },
    //规则列表的添加
    rulecplSave() {
      axios({
        method: "post",
        url: axios.PARK_API + "/rule/rule/ruleconfig/save",
        data: this.ruleForm,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message.success("保存成功");
          this.$emit("mainhidden");
          this.$emit("ruleInit");
        } else {
        }
      });
    },
    //规则列表编辑前填充
    ruleDetail(val) {
      console.log(val);
      this.ruleForm.name = val.name;
      this.ruleForm.dsc = val.dsc;
      this.ruleForm.ruleType = val.ruleType;
      this.ruleForm.execCycle = val.execCycle;
      this.ruleForm.illegalLevel = val.illegalLevel;
      this.ruleId = val.id;
    },
    //规则列表的编辑保存
    ruleedSave() {
      this.ruleForm.id = this.ruleId;
      axios({
        method: "post",
        url: axios.PARK_API + "/rule/rule/ruleconfig/update",
        data: this.ruleForm,
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (res.data.code == 0) {
          this.$message.success("编辑成功");
          this.$emit("mainhidden");
          this.$emit("ruleInit");
        } else {
        }
      });
    }
  },
  created() {},
  components: { btnSelect }
};
</script>


<style scoped>
#fenye {
  background: #c1c1c1;
}

.el-row {
  margin-bottom: 6px;
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
}
.row-bg {
  padding: 10px 0;
  /* background-color: #f9fafc; */
}
.queryBtn {
  border-top: 1px solid #409eff;
  border-bottom: 1px solid #409eff;
  padding: 4px;
}
.gular {
  position: absolute;
  width: 100%;
  height: 90%;
  top: 8%;
  left: 0;
  background-color: #fff;
  z-index: 999;
}
</style>
