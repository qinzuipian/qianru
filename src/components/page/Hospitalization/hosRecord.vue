<template>
    <div class="content">
		<div class="top">
				<span>住院号：</span>
				<el-input v-model="hospitalNum"  placeholder="请输入内容"></el-input>
				<el-button type="primary" @click="gitHospitlaMsg">查询</el-button>
		</div>
		<div class="botMain">
						<p><span class="el-icon-school"></span><span class="fzstyle">出院结算</span></p>
								<el-row>
									<el-col :span="8">
										<div class="grid-content">
											  <span>就医流水号:</span>
												<el-input v-model="AKC190"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											  <span>险种:</span>
												<el-input v-model="AAE140"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>参保地行政区划:</span>
											<el-input v-model="AAB034"  placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="8">
										<div class="grid-content">
											  <span>医院的住院号:</span>
												<el-input v-model="BKC023" placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>出院诊断:</span>
											<el-input v-model="BKC287"  placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>出院日期:</span>
											 <el-date-picker
												v-model="AKC194"
												type="date"
												value-format="yyyy-MM-dd"
												placeholder="选择日期">
											</el-date-picker>
											<!-- <el-input v-model="hosdata.AKC192"  placeholder="请输入内容"></el-input> -->
										</div>
									</el-col>
								</el-row>
								
								<el-row>
									
									<el-col :span="8">
										<div class="grid-content">
											<span>出院主要诊断ICD10编码:</span>
											<el-input v-model="AKC196"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											  <span>其他诊断二ICD10编码:</span>
												<el-input v-model="BKC331"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>其他诊断三ICD10编码:</span>
											<el-input v-model="BKC332" placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
								</el-row>
								<el-row>
									
									<el-col :span="8">
										<div class="grid-content">
											<span>其他诊断四ICD10编码:</span>
											<el-input v-model="BKC333"  placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											  <span>其他诊断五ICD10编码:</span>
												<el-input v-model="BKC334" placeholder="请输入内容"></el-input>
										</div>
									</el-col>
									<el-col :span="8">
										<div class="grid-content">
											<span>其他诊断六ICD10编码:</span>
											<el-input v-model="BKC335" placeholder="请输入内容"></el-input>
									  </div>
									</el-col>
								</el-row>
							<el-row>
								
								<el-col :span="8">
									<div class="grid-content">
										<span>其他诊断七ICD10编码:</span>
										<el-input v-model="BKC336" placeholder="请输入内容"></el-input>
									</div>
								</el-col>
								<el-col :span="8">
									<div class="grid-content">
										<span>其他诊断八ICD10编码:</span>
										<el-input v-model="BKC337" placeholder="请输入内容"></el-input>
									</div>
								</el-col>
								<el-col :span="8">
									<div class="grid-content">
										<span>病理（损伤、中毒外部原因）疾病编码:</span>
										<el-input v-model="AKC204" placeholder="请输入内容"></el-input>
									</div>
								</el-col>
							</el-row>
							
							<el-row>
								
								<el-col :span="8">
									<div class="grid-content">
										<span>病理诊断疾病编码:</span>
										<el-input v-model="AKC206" placeholder="请输入内容"></el-input>
									</div>
								</el-col>
								<el-col :span="8">
									<div class="grid-content">
										<span>切口愈合等级:</span>
										<el-input v-model="AKC209" placeholder="请输入内容"></el-input>
									</div>
								</el-col>
								<el-col :span="8">
									<div class="grid-content">
										<span>手术操作编码:</span>
										<el-input v-model="AKC207" placeholder="请输入内容"></el-input>
									</div>
								</el-col>
							</el-row>
							
							<el-row>
								
								<el-col :span="8">
									<div class="grid-content">
										<span>手术操作编码1:</span>
										<el-input v-model="AKC216" placeholder="请输入内容"></el-input>
									</div>
								</el-col>
								<el-col :span="8">
									<div class="grid-content">
										<span>手术操作编码2:</span>
										<el-input v-model="AKC217" placeholder="请输入内容"></el-input>
									</div>
								</el-col>
								<el-col :span="8">
									<div class="grid-content">
										<span>his总金额:</span>
										<el-input v-model="HISZJE" placeholder="请输入内容"></el-input>
									</div>
								</el-col>
							</el-row>
							
								<el-row>
								
								<el-col :span="8">
									<div class="grid-content">
										<span>个人账户支付金额:</span>
										<el-input v-model="AKC255" placeholder="请输入内容"></el-input>
									</div>
								</el-col>
							
							</el-row>
							
							<el-row>
								<el-col :span="24">
									<div class="grid-content">
										 <el-button type="success" @click="gitHosave">住院结算保存</el-button>
										 <el-button type="primary" class="el-icon-printer" @click="gitHosprint">住院结算打印</el-button>
									</div>
								</el-col>
								
							</el-row>
					
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
      hospitalNum: "",
      hospitalxml: "",
      //住院登记信息字段
      AKC190: "",
      AAE140: "",
      AAB034: "",
      BKC023: "",
      AKC194: "",
      BKC287: "",
      AKC196: "",
      BKC331: "",
      BKC332: "",
      BKC333: "",
      BKC334: "",
      BKC335: "",
      BKC336: "",
      BKC337: "",
      AKC204: "",
      AKC206: "",
      AKC209: "",
      AKC207: "",
      AKC216: "",
      AKC217: "",
      HISZJE: "",
      AKC255: "",
      hosprintxml: ""
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
          "/medical_reimbursement/settlementcostinfo/queryCostInfo",
        params: {
          bkc023: this.hospitalNum
        }
        /* headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      }).then(res => {
        if (res.data.code == 0) {
          var data = res.data.data;
          let timedate = new Date();
          let y = timedate.getFullYear();
          let m = timedate.getMonth() + 1;
          let x = timedate.getDate();
          let time = y + "-" + "0" + m + "-" + "0" + x;

          data.AKC190 == undefined
            ? (this.AKC190 = "")
            : (this.AKC190 = data.AKC190);
          data.AAE140 == undefined
            ? (this.AAE140 = "")
            : (this.AAE140 = data.AAE140);
          data.AAB034 == undefined
            ? (this.AAB034 = "")
            : (this.AAB034 = data.AAB034);
          data.BKC023 == undefined
            ? (this.BKC023 = "")
            : (this.BKC023 = data.BKC023);
          data.AKC194 == ""
            ? (this.AKC194 = time)
            : (this.AKC194 = data.AKC194);
          data.BKC287 == undefined
            ? (this.BKC287 = "")
            : (this.BKC287 = data.BKC287);
          data.AKC196 == undefined
            ? (this.AKC196 = "")
            : (this.AKC196 = data.AKC196);
          data.BKC331 == undefined
            ? (this.BKC331 = "")
            : (this.BKC331 = data.BKC331);
          data.BKC332 == undefined
            ? (this.BKC332 = "")
            : (this.BKC332 = data.BKC332);
          data.BKC333 == undefined
            ? (this.BKC333 = "")
            : (this.BKC333 = data.BKC333);
          data.BKC334 == undefined
            ? (this.BKC334 = "")
            : (this.BKC334 = data.BKC334);
          data.BKC335 == undefined
            ? (this.BKC335 = "")
            : (this.BKC335 = data.BKC335);
          data.BKC336 == undefined
            ? (this.BKC336 = "")
            : (this.BKC336 = data.BKC336);
          data.BKC337 == undefined
            ? (this.BKC337 = "")
            : (this.BKC337 = data.BKC337);
          data.AKC204 == undefined
            ? (this.AKC204 = "")
            : (this.AKC204 = data.AKC204);
          data.AKC206 == undefined
            ? (this.AKC206 = "")
            : (this.AKC206 = data.AKC206);
          data.AKC209 == undefined
            ? (this.AKC209 = "")
            : (this.AKC209 = data.AKC209);
          data.AKC207 == undefined
            ? (this.AKC207 = "")
            : (this.AKC207 = data.AKC207);
          data.AKC216 == undefined
            ? (this.AKC216 = "")
            : (this.AKC216 = data.AKC216);
          data.AKC217 == undefined
            ? (this.AKC217 = "")
            : (this.AKC217 = data.AKC217);
          /*data.HISZJE == undefined
            ? (this.HISZJE = data.HISZJE)
            : (this.HISZJE = data.HISZJE); */
          data.AKC255 == undefined
            ? (this.AKC255 = "")
            : (this.AKC255 = data.AKC255);
          /* this.AKC190 = data.AKC190;
            this.AAE140 = data.AAE140;
            this.AAB034 = data.AAB034;
            this.BKC023 = data.BKC023;
            this.AKC194 = data.AKC194;
            this.BKC287 = data.BKC287;
            this.AKC196 = data.AKC196;
            this.BKC331 = data.BKC331;
            this.BKC332 = data.BKC332;
            this.BKC333 = data.BKC333;
            this.BKC334 = data.BKC334;
            this.BKC335 = data.BKC335;
            this.BKC336 = data.BKC336;
            this.BKC337 = data.BKC337;
            this.AKC204 = data.AKC204;
            this.AKC206 = data.AKC206;
            this.AKC209 = data.AKC209;
            this.AKC207 = data.AKC207;
            this.AKC216 = data.AKC216;
            this.AKC217 = data.AKC217;
            this.HISZJE = localStorage.getItem("hiszje")
            this.AKC255 = data.AKC255; */

          // this.hospitalxml = res.data.dataxml
        } else if (res.data.code == 203) {
          this.$message.error("该患者未结算");
        } else {
          this.$message.error(res.data.msg);
        }
      });
      /* .catch(error => {
          this.$message.error("请检查网络");
        }); */

      // 获取his总金额
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
          var data = res.data.data;
          data.HISZJE == undefined
            ? (this.HISZJE = data.HISZJE)
            : (this.HISZJE = data.HISZJE);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    gitHosave() {
      /* 	this.hosdata.requestId = "121";
			console.log(this.hosdata) */
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        /* 	data:{
						xml:this.hospitalxml
				} */
        data: {
          AKC190: this.AKC190,
          AAE140: this.AAE140,
          AAB034: this.AAB034,
          BKC023: this.BKC023,
          AKC194: this.AKC194,
          BKC287: this.BKC287,
          AKC196: this.AKC196,

          BKC331: this.BKC331,
          BKC332: this.BKC332,
          BKC333: this.BKC333,
          BKC334: this.BKC334,
          BKC335: this.BKC335,
          BKC336: this.BKC336,
          BKC337: this.BKC337,
          AKC204: this.AKC204,
          AKC206: this.AKC206,
          AKC209: this.AKC209,
          AKC207: this.AKC207,
          AKC216: this.AKC216,
          AKC217: this.AKC217,
          HISZJE: this.HISZJE,
          AKC255: this.AKC255,
          requestId: "321",

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
          this.hospitalDown(this.hospitalxml);
        } else {
          this.$message.error(res.data.msg);
        }
      });
      /* .catch(error => {
			    this.$message.error("请检查网络");
			  }); */
    },
    //住院结算保存
    hospitalDown(param) {
      console.log(param);
      var state = WSCall.biz(param);
      console.log(state);
      if (state == 1) {
        var res = WSCall.retbiz;

       /*  var state = 1;
				if (state == 1) {
				var res = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"no\" ?>"
        +"<transferinfo>"
        +"	<headinfo>"
        +"		<REQUESTID>221</REQUESTID>"
        +"		<AKB020>SNYY0005</AKB020>"
        +"		<AAB034>61100001</AAB034>"
        +"		<BKB026>888888</BKB026>   "
        +"		<USCODE>管理员</USCODE>   "
        +"		<USNAME>管理员</USNAME>   "
        +"		<DATACOUNT>1</DATACOUNT>  "
        +"		<ROWCOUNT1>1</ROWCOUNT1>  "
        +"		<ROWCOUNT2>0</ROWCOUNT2>  "
        +"		<ROWCOUNT3>0</ROWCOUNT3>  "
        +"		<ROWCOUNT4>0</ROWCOUNT4>  "
        +"		<ERRCODE>1</ERRCODE>      "
        +"		<ERRMSG></ERRMSG>    "
        +"	</headinfo>              "
        +"	<datas>                  "
        +"		<data1>              "
        +"			<row>      "
        +"				<AKC190>0000000095984</AKC190>"
        +"				<AKB020>SNYY0005</AKB020>       "
        +"				<AKB021>西关医院</AKB021>       "
        +"				<AKA101>05</AKA101>             "
        +"				<AAB001>11000004170</AAB001>    "
        +"				<AAB004>山阳县政策破产企业退休人员__酒厂</AAB004>"
        +"				<AAC001>100000363505</AAC001> "
        +"				<AAC003>詹凯朝</AAC003>       "
        +"				<AAB019>99</AAB019>           "
        +"				<BKC260>67</BKC260>           "
        +"				<AKC021>21</AKC021>           "
        +"				<AKC401>1</AKC401>            "
        +"				<BAC515>1</BAC515>            "
        +"				<AAC008>2</AAC008>            "
        +"				<AKA130>21</AKA130>        "
        +"				<ACK222>1</ACK222>         "
        +"				<BKC023>1111111111</BKC023>"
        +"				<AKA120>00001</AKA120>     "
        +"				<AKC240>0.0</AKC240>       "
        +"				<AKC250>0.0</AKC250>       "
        +"				<AKC251>0.0</AKC251>       "
        +"				<AKC252>722.22</AKC252>    "
        +"				<BKC113>0.0</BKC113>       "
        +"				<BKC242>0.0</BKC242>       "
        +"				<BKC243>0.0</BKC243>       "
        +"				<AKC264>0.01</AKC264>      "
        +"				<AKC253>0.01</AKC253>  "
        +"				<AKC254>0.0</AKC254>   "
        +"				<BKC245>0.0</BKC245>   "
        +"				<BKC254>0.0</BKC254>   "
        +"				<BKC256>1.0</BKC256>   "
        +"				<AKC261>0.01</AKC261>  "
        +"				<AKC256>0.0</AKC256>   "
        +"				<AKC257>0.0</AKC257>   "
        +"				<BKC234>0.0</BKC234>   "
        +"				<AKC260>0.0</AKC260>   "
        +"				<AKC263>0.0</AKC263>   "
        +"				<BKC235>0.0</BKC235>   "
        +"				<BKC236>0.0</BKC236>   "
        +"				<BKC251>0.0</BKC251>   "
        +"				<BKC258>0.0</BKC258>   "
        +"				<BKC255>0.0</BKC255>   "
        +"				<AKC258>0.0</AKC258>   "
        +"				<BKC282>0.0</BKC282>   "
        +"				<BKC114>0.0</BKC114>   "
        +"				<BKC111>0.0</BKC111>   "
        +"				<BKC246>0.0</BKC246>   "
        +"				<BKC302>0.0</BKC302>   "
        +"				<BKC304>0.0</BKC304>   "
        +"				<BKB116>0.0</BKB116>   "
        +"				<BKC092>0.0</BKC092>   "
        +"				<BKC093>0.0</BKC093>   "
        +"				<BKC241>0.0</BKC241>   "
        +"				<BKC237>0.0</BKC237>   "
        +"				<BKC238>0.0</BKC238>   "
        +"				<BKC239>0.0</BKC239>   "
        +"				<AAE011>管理员</AAE011>             "
        +"				<AAE036>2019-06-04</AAE036>         "
        +"				<BAA001>61100024</BAA001>           "
        +"				<AAE040>2019-06-04 12:38:35</AAE040>"
        +"				<BKC026>0.0</BKC026>                "
        +"				<BKA005>01</BKA005>                 "
        +"				<BKA006></BKA006>                   "
        +"				<BAA006></BAA006>                   "
        +"				<BAA007></BAA007>                   "
        +"				<BKC038></BKC038>                   "
        +"				<BKC039></BKC039>                   "
        +"				<AAB034>61100001</AAB034>           "
        +"				<AKB131></AKB131>                   "
        +"				<BKC288>0.0</BKC288>                "
        +"				<BKC299>0.0</BKC299> "
        +"				<BKC300>0.0</BKC300> "
        +"				<BKC240>0.0</BKC240> "
        +"				<BKC252>0.0</BKC252> "
        +"				<BKC259>0.0</BKC259> "
        +"				<BKC283></BKC283>    "
        +"				<BKC281></BKC281>    "
        +"				<BKA249>0.0</BKA249> "
        +"				<BKC058>0.0</BKC058> "
        +"				<BKC286>十二指肠钩虫病</BKC286>"
        +"				<AKA232></AKA232>              "
        +"				<BKA251></BKA251>              "
        +"				<BKC118>0.0</BKC118>           "
        +"				<AAE140>3</AAE140>             "
        +"				<AMC102></AMC102>              "
        +"				<BKC117>0.0</BKC117>           "
        +"				<BKC120>0.0</BKC120>           "
        +"				<BKC121>0.0</BKC121>           "
        +"				<BKC122>0.0</BKC122>     "
        +"				<BKC123>0.0</BKC123>     "
        +"				<BKC060T1>0.0</BKC060T1> "
        +"				<BKC061T1>0.0</BKC061T1> "
        +"				<BKC045T1>0.0</BKC045T1> "
        +"				<BKC258T1>0.0</BKC258T1> "
        +"				<BKC047T1>0.0</BKC047T1> "
        +"				<AKC257T1>0.0</AKC257T1> "
        +"				<BKC060T2>0.0</BKC060T2> "
        +"				<BKC061T2>0.0</BKC061T2> "
        +"				<BKC045T2>0.0</BKC045T2> "
        +"				<BKC258T2>0.0</BKC258T2>  "
        +"				<BKC047T2>0.0</BKC047T2>   "
        +"				<AKC257T2>0.0</AKC257T2>   "
        +"				<BKC060T3>0.0</BKC060T3>   "
        +"				<BKC061T3>0.0</BKC061T3>   "
        +"				<BKC045T3>0.0</BKC045T3>   "
        +"				<BKC258T3>0.0</BKC258T3>   "
        +"				<BKC047T3>0.0</BKC047T3>   "
        +"				<AKC257T3>0.0</AKC257T3>   "
        +"				<BZZ001>0.0</BZZ001>       "
        +"				<BZZ002>0.0</BZZ002>       "
        +"				<BZZ003>0.0</BZZ003>       "
        +"				<BZZ004>0.0</BZZ004>       "
        +"				<BZZ005>0.0</BZZ005>       "
        +"				<BZZ006>0.0</BZZ006>       "
        +"				<AKC255>0.01</AKC255>      "
        +"				<BKC257>0.00</BKC257></row>"
        +"		</data1>"
        +"	</datas>"
        +"</transferinfo>";  */

        var wordsContent = encodeURIComponent(res);
        // 将下载下来的数据保存到数据库
        axios({
          method: "post",
          url:
            axios.PARK_API +
            "/medical_reimbursement/settlementcostinfo/updateSettlementCost",
          data: {
            xml: wordsContent
          },
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }).then(res => {
          if (res.data.code == 0) {
            this.$message.success("结算成功");
          } else {
            this.$message.error(res.data.msg);
          }
        });
        /* .catch(error => {
							this.$message.error("请检查网络");
						}); */
      } else {
        this.$message.warning("结算失败");
      }
    },
    //住院结算单打印
    gitHosprint() {
      // 查询住院登记全部字段
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
          var hosdata = res.data.data;
          // this.AAB034 ='61100001';
          /* this.aab034 = hosdata.AAB034;
            this.akc190 = hosdata.AKC190;
            this.aka130 = hosdata.AKA130;
            this.aae140 = hosdata.AAE140; */
          this.gethosPrint(hosdata);
        } else if (res.data.code == 203) {
          this.$message.warning(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    gethosPrint(hosdata) {
      /*   if(this.AKA130 == undefined) {
        this.AKA130 = "";
      } */
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          AAB034: hosdata.AAB034,
          AKC190: hosdata.AKC190,
          AKA130: hosdata.AKA130,
          AAE140: hosdata.AAE140,
          requestId: "918",

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
          this.hosprintxml = res.data.data;
          this.hosPrint(this.hosprintxml);
        } else {
          this.$message.error(res.data.msg);
        }
      });
      /* .catch(error => {
			    this.$message.error("请检查网络");
			  }); */
    },

    hosPrint(param) {
      console.log(param);
      var state = WSCall.biz(param);
      console.log(state);
      if (state == 1) {
        var res = WSCall.retbiz;
      } else {
        this.$message.error("结算打印失败");
      }
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
</style>
