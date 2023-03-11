<template>
  <div>
    <el-form ref="form" :disabled="readonly" :model="formData" :rules="rules" label-position="top">
      <div class="sub-title first-sub-title">基本信息</div>
      <el-row :gutter="20" class="content-common_box">
        <el-col :span="16">
          <el-form-item label="项目名称" prop="name">
            <el-input v-if="!readonly" clearable v-model.trim="formData.name" size="mini" placeholder="请输入"></el-input>
            <div v-else>{{formData.name ||'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="执行项目类别" prop="projectType.name">
            <el-input
              v-if="!readonly"
              v-model.trim="formData.projectType.name"
              :readonly="formData.projectType.name?false:true"
              clearable
              @clear="clearProjectType"
              @focus="openPeojectType"
              size="mini"
              placeholder="请选择"
            ></el-input>
            <div v-else>{{formData.projectType?`${formData.projectType.code}-${formData.projectType.name}`:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="执行项目编号" prop="code">
            <el-input v-if="!readonly" v-model.trim="formData.code" clearable size="mini" placeholder="请输入"></el-input>
            <div v-else>{{formData.code || '--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="助记码">
            <el-input v-if="!readonly" v-model.trim="formData.mnemonic" size="mini" clearable placeholder="请输入"></el-input>
            <div v-else>{{formData.mnemonic || '--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="科研项目编号">
            <el-input v-if="!readonly" v-model.trim="formData.researchProjectCode" size="mini" clearable placeholder="请输入"></el-input>
            <div v-else>{{formData.researchProjectCode || '--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="预算项目">
            <el-input
              v-if="!readonly"
              :value="`(${formData.budgetProjectInfo.code})${formData.budgetProjectInfo.name}`"
              size="mini"
              disabled
            ></el-input>
            <div v-else>{{formData.budgetProjectInfo?`(${formData.budgetProjectInfo.code})${formData.budgetProjectInfo.name}`:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预算项目类别">
            <el-input
              v-if="!readonly"
              :value="`${formData.budgetProjectType.code}-${formData.budgetProjectType.name}`"
              size="mini"
              disabled
            ></el-input>
            <div v-else>{{formData.budgetProjectType?`${formData.budgetProjectType.code}-${formData.budgetProjectType.name}`:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属一级项目">
            <el-input v-if="!readonly" :value="`(${formData.topProject.code})${formData.topProject.name}`" size="mini" disabled></el-input>
            <div v-else>{{formData.topProject?`(${formData.topProject.code})${formData.topProject.name}`:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属预算支出项">
            <el-input v-if="!readonly" :value="`${formData.budget.code} ${formData.budget.name}`" size="mini" disabled></el-input>
            <div v-else>{{formData.budget?`${formData.budget.code} ${formData.budget.name}`:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目负责人">
            <el-input
              v-if="!readonly"
              v-model.trim="formData.directorsNew.name"
              :readonly="formData.directorsNew.name?false:true"
              clearable
              @clear="clearPerson('directorsNew')"
              @focus="openPerson('directorsNew')"
              size="mini"
              placeholder="请选择"
            ></el-input>
            <div v-else>{{formData.directorsNew.name || '--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属部门" prop="department.name">
            <el-input
              v-if="!readonly"
              v-model.trim="formData.department.name"
              :readonly="formData.department.name?false:true"
              clearable
              @clear="clearDepartment"
              @focus="openDepartment"
              size="mini"
              placeholder="请选择"
            ></el-input>
            <div v-else>{{formData.department?`${formData.department.code} ${formData.department.name}`:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职能部门">
            <el-input
              v-if="!readonly"
              :value="formData.functionalDepartment?`${formData.functionalDepartment.code} ${formData.functionalDepartment.name}`:'--'"
              size="mini"
              disabled
            ></el-input>
            <div v-else>{{formData.functionalDepartment?`${formData.functionalDepartment.code} ${formData.functionalDepartment.name}`:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其他负责人">
            <el-input
              v-if="!readonly"
              v-model.trim="formData.qtfzRs"
              :readonly="formData.qtfzRs?false:true"
              clearable
              @clear="clearPerson('qtfzRs')"
              @focus="openPerson('qtfzRs')"
              size="mini"
              placeholder="请选择"
            ></el-input>
            <div v-else>{{formData.qtfzRs || '--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="额度模式">
            <el-input v-if="!readonly" :value="`${formData.quotaType.code}-${formData.quotaType.name}`" size="mini" disabled></el-input>
            <div v-else>{{formData.quotaType?`${formData.quotaType.code}-${formData.quotaType.name}`:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年末全额结转">
            <el-select v-if="!readonly" style="width:100%" size="mini" v-model="formData.carryOver" placeholder="请选择">
              <el-option
                v-for="item in [{code:false,name:'否'},{code:true,name:'是'}]"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
            <div v-else>{{formData.carryOver?'是':'否'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="课题组成员">
            <el-input
              v-if="!readonly"
              v-model.trim="formData.topicMembers"
              :readonly="formData.topicMembers?false:true"
              clearable
              @clear="clearPerson('topicMembers')"
              @focus="openPerson('topicMembers')"
              size="mini"
              placeholder="请选择"
            ></el-input>
            <div v-else>{{formData.topicMembers || '--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="存续状态">
            <el-input v-if="!readonly" :value="formData.state.name" size="mini" disabled></el-input>
            <div v-else>{{formData.state?formData.state.name || '--':'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="立项日期">
            <el-input
              v-if="!readonly"
              :value="formData.approvalDate?yyAtool.formate(new Date(Number(formData.approvalDate)),'yyyy年MM月dd日'):'--'"
              size="mini"
              disabled
            ></el-input>
            <div v-else>{{formData.approvalDate?yyAtool.formate(new Date(Number(formData.approvalDate)),'yyyy年MM月dd日'):'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结项日期">
            <el-input
              v-if="!readonly"
              :value="formData.endDate?yyAtool.formate(new Date(Number(formData.endDate)),'yyyy年MM月dd日'):'--'"
              size="mini"
              disabled
            ></el-input>
            <div v-else>{{formData.endDate?yyAtool.formate(new Date(Number(formData.endDate)),'yyyy年MM月dd日'):'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="立项年份">
            <el-input v-if="!readonly" :value="formData.initiationYear?formData.initiationYear+'年':'--'" size="mini" disabled></el-input>
            <div v-else>{{formData.initiationYear?formData.initiationYear+'年':'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="支出功能类别" prop="expendType.name">
            <el-input v-if="!readonly" v-model.trim="formData.expendType.name" placeholder="请选择" size="mini"></el-input>
            <div v-else>{{formData.expendType?formData.expendType.code+'-'+formData.expendType.name:'--'}}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="sub-title first-sub-title">核算控制信息</div>
      <el-row :gutter="20" class="content-common_box">
        <el-col :span="8">
          <el-form-item label="借方默认科目">
            <el-input
              v-if="!readonly"
              v-model.trim="formData.defaultDebitSubjectCode"
              :readonly="formData.defaultDebitSubjectCode?false:true"
              clearable
              @clear="clearSubject('defaultDebitSubjectCode')"
              @focus="openSubject('defaultDebitSubjectCode')"
              size="mini"
              placeholder="请选择"
            ></el-input>
            <div v-else>{{formData.defaultDebitSubjectCode || '--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="默认预算借方科目">
            <el-input
              v-model.trim="formData.defaultDebitSubjectCodeYS"
              :readonly="formData.defaultDebitSubjectCodeYS?false:true"
              clearable
              v-if="!readonly"
              @clear="clearSubject('defaultDebitSubjectCodeYS')"
              @focus="openSubject('defaultDebitSubjectCodeYS')"
              size="mini"
              placeholder="请选择"
            ></el-input>
            <div v-else>{{formData.defaultDebitSubjectCodeYS || '--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="借方其他科目">
            <el-input
              v-model.trim="formData.otherDebitSubjectCodes"
              :readonly="formData.otherDebitSubjectCodes?false:true"
              clearable
              v-if="!readonly"
              @clear="clearSubject('otherDebitSubjectCodes')"
              @focus="openSubject('otherDebitSubjectCodes')"
              size="mini"
              placeholder="请选择"
            ></el-input>
            <div v-else>{{formData.otherDebitSubjectCodes || '--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="贷方默认科目">
            <el-input
              v-model.trim="formData.defaultCreditSubjectCode"
              :readonly="formData.defaultCreditSubjectCode?false:true"
              clearable
              v-if="!readonly"
              @clear="clearSubject('defaultCreditSubjectCode')"
              @focus="openSubject('defaultCreditSubjectCode')"
              size="mini"
              placeholder="请选择"
            ></el-input>
            <div v-else>{{formData.defaultCreditSubjectCode || '--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="默认预算贷方科目">
            <el-input
              v-model.trim="formData.defaultCreditSubjectCodeYS"
              :readonly="formData.defaultCreditSubjectCodeYS?false:true"
              clearable
              v-if="!readonly"
              @clear="clearSubject('defaultCreditSubjectCodeYS')"
              @focus="openSubject('defaultCreditSubjectCodeYS')"
              size="mini"
              placeholder="请选择"
            ></el-input>
            <div v-else>{{formData.defaultCreditSubjectCodeYS || '--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="贷方其他科目">
            <el-input
              v-model.trim="formData.otherCreditSubjectCodes"
              :readonly="formData.otherCreditSubjectCodes?false:true"
              clearable
              v-if="!readonly"
              @clear="clearSubject('otherCreditSubjectCodes')"
              @focus="openSubject('otherCreditSubjectCodes')"
              size="mini"
              placeholder="请选择"
            ></el-input>
            <div v-else>{{formData.otherCreditSubjectCodes || '--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="禁用会计科目">
            <el-input
              v-model.trim="formData.limitSubjectCode"
              :readonly="formData.limitSubjectCode?false:true"
              clearable
              v-if="!readonly"
              @clear="clearSubject('limitSubjectCode')"
              @focus="openSubject('limitSubjectCode')"
              size="mini"
              placeholder="请选择"
            ></el-input>
            <div v-else>{{formData.limitSubjectCode || '--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="禁用经济分类">
            <el-input
              v-model.trim="formData.limitEconomySubjectCode"
              :readonly="formData.limitEconomySubjectCode?false:true"
              clearable
              v-if="!readonly"
              @clear="clearEconomy('limitEconomySubjectCode')"
              @focus="openEconomy('limitEconomySubjectCode')"
              size="mini"
              placeholder="请选择"
            ></el-input>
            <div v-else>{{formData.limitEconomySubjectCode || '--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="可用经济分类">
            <el-input
              v-model.trim="formData.economySubjectCode"
              :readonly="formData.economySubjectCode?false:true"
              clearable
              v-if="!readonly"
              @clear="clearEconomy('economySubjectCode')"
              @focus="openEconomy('economySubjectCode')"
              size="mini"
              placeholder="请选择"
            ></el-input>
            <div v-else>{{formData.economySubjectCode || '--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="可用资金来源">
            <el-input
              v-model.trim="formData.fundsOriginSubjects"
              :readonly="formData.fundsOriginSubjects?false:true"
              clearable
              v-if="!readonly"
              @clear="clearMoney('fundsOriginSubjects')"
              @focus="openMoneySource('fundsOriginSubjects')"
              size="mini"
              placeholder="请选择"
            ></el-input>
            <div v-else>{{formData.fundsOriginSubjects || '--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="可超支资金来源">
            <el-input
              v-model.trim="formData.overFundsOriginSubjects"
              :readonly="formData.overFundsOriginSubjects?false:true"
              clearable
              v-if="!readonly"
              @clear="clearMoney('overFundsOriginSubjects')"
              @focus="openMoneySource('overFundsOriginSubjects')"
              size="mini"
              placeholder="请选择"
            ></el-input>
            <div v-else>{{formData.overFundsOriginSubjects || '--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目结转类型">
            <el-select
              value-key="code"
              style="width:100%"
              size="mini"
              v-if="!readonly"
              v-model="formData.transferType"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in XMJZLX" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.transferType?formData.transferType.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="余额方向">
            <el-select v-if="!readonly" style="width:100%" size="mini" v-model="formData.direction" disabled>
              <el-option
                v-for="item in [{code:'Credit',name:'贷方'},{code:'Debit',name:'借方'}]"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
            <div
              v-else
            >{{[{code:'Credit',name:'贷方'},{code:'Debit',name:'借方'}].find(f=>f.code===formData.direction)?[{code:'Credit',name:'贷方'},{code:'Debit',name:'借方'}].find(f=>f.code===formData.direction).name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="可用凭证类型">
            <el-input
              v-model.trim="formData.pzlx"
              clearable
              v-if="!readonly"
              :readonly="formData.pzlx?false:true"
              placeholder="请选择"
              @focus="openVoucher"
              size="mini"
              @clear="clearVoucher"
            ></el-input>
            <div v-else>{{formData.pzlx ||'--'}}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="content-common_box">
        <el-col :span="4">
          <el-form-item class="special-form_item">
            <el-checkbox v-model="formData.isLocked" @change="changeSd">锁定</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="锁定原因" prop="lockRemark">
            <el-input
              v-if="!readonly"
              :disabled="!formData.isLocked"
              v-model.trim="formData.lockRemark"
              type="textarea"
              :row="4"
              clearable
              placeholder="请输入"
            ></el-input>
            <div v-else>{{formData.lockRemark || '--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="special-form_item">
            <el-checkbox v-model="formData.enable">项目是否可用</el-checkbox>
            <el-checkbox v-model="formData.isSpecialAudit">项目是否需要财务一支笔</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="content-common_box">
        <el-col :span="8">
          <el-form-item class="special-form_item">
            <el-checkbox @change="changeYxcz" v-model="formData.isOverspendLimit">是否允许超支</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="超支限额" prop="overspendLimit">
            <el-input-number
              v-if="!readonly"
              style="width:100%"
              placeholder="请输入"
              size="mini"
              v-model="formData.overspendLimit"
              :controls="false"
              :precision="2"
              :disabled="!formData.isOverspendLimit"
              :min="0"
            ></el-input-number>
            <div v-else>{{formData.overspendLimit || '--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="超支有效期" prop="overspendDate">
            <el-date-picker
              v-if="!readonly"
              style="width:100%"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd"
              size="mini"
              v-model="formData.overspendDate"
              :disabled="!formData.isOverspendLimit"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
            <div v-else>{{formData.overspendDate || '--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="special-form_item">
            <el-checkbox v-model="formData.isTreasury" @change="changeSfgk">是否国库项目</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="content-common_box">
        <el-col :span="8">
          <el-form-item label="国库平衡检查">
            <el-select
              v-if="!readonly"
              :disabled="!formData.isTreasury"
              style="width:100%"
              size="mini"
              v-model="formData.treasuryControl"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in [{code:'Control',name:'必须平衡'},{code:'Reminded',name:'不平衡时提醒'},{code:'UnReminded',name:'忽略'}]"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
            <div
              v-else
            >{{[{code:'Control',name:'必须平衡'},{code:'Reminded',name:'不平衡时提醒'},{code:'UnReminded',name:'忽略'}].find(f=>f.code===formData.treasuryControl)?[{code:'Control',name:'必须平衡'},{code:'Reminded',name:'不平衡时提醒'},{code:'UnReminded',name:'忽略'}].find(f=>f.code===formData.treasuryControl).name:'--'}}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="content-common_box">
        <el-col :span="8">
          <el-form-item class="special-form_item">
            <el-radio :disabled="!formData.isTreasury" v-model="formData.treasuryType" label="LocalTreasuryBank">省国库</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="授权计划类型">
            <el-select
              v-if="!readonly"
              style="width:100%"
              size="mini"
              :disabled="formData.treasuryType==='LocalTreasuryBank'?false:true"
              value-key="code"
              multiple
              v-model="formData.authorisedPlanType"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in SQJHLX" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.authorisedPlanType?formData.authorisedPlanType.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="授权计划">
            <el-select
              v-if="!readonly"
              style="width:100%"
              size="mini"
              :disabled="formData.treasuryType==='LocalTreasuryBank'?false:true"
              value-key="code"
              v-model="formData.authorisedPlan"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in SQJH" :key="item.code" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.authorisedPlan?formData.authorisedPlan.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="special-form_item">
            <el-radio
              v-if="formData.treasuryType!=='CivilTreasury'"
              :disabled="!formData.isTreasury"
              v-model="formData.treasuryType"
              label="CentralTreasury"
            >中央国库</el-radio>
            <el-radio :value="1" :label="1" v-if="formData.treasuryType==='CivilTreasury'">中央国库</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="special-form_item">
            <el-radio :disabled="!formData.isTreasury" v-model="formData.treasuryType" label="CivilTreasury">是否民口项目</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="民口项目">
            <el-select
              style="width:100%"
              value-key="code"
              size="mini"
              v-if="!readonly"
              :disabled="formData.treasuryType==='CivilTreasury'?false:true"
              v-model="formData.enterpriseProject"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in MKXM" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.enterpriseProject?formData.enterpriseProject.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预算管理类型">
            <el-select
              v-if="!readonly"
              style="width:100%"
              value-key="code"
              size="mini"
              v-model="formData.budgetType"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in YSLX" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.budgetType?formData.budgetType.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="功能分类">
            <el-select
              v-if="!readonly"
              style="width:100%"
              value-key="code"
              size="mini"
              v-model="formData.purpose"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in ZCGNFL" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.purpose?formData.purpose.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预算信息关联号">
            <el-select
              style="width:100%"
              value-key="code"
              v-if="!readonly"
              size="mini"
              v-model="formData.budgetInfoRelevance"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in YSXXGLH" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.budgetInfoRelevance?formData.budgetInfoRelevance.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收入类型">
            <el-select
              v-if="!readonly"
              style="width:100%"
              value-key="code"
              size="mini"
              v-model="formData.incomeType"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in XMSRLX" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.incomeType?formData.incomeType.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="支出类型">
            <el-select
              style="width:100%"
              value-key="code"
              size="mini"
              v-if="!readonly"
              v-model="formData.expensesType"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in XMSYZCLX" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.expensesType?formData.expensesType.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="事业支出类型">
            <el-select
              style="width:100%"
              value-key="code"
              v-if="!readonly"
              size="mini"
              v-model="formData.causeExpensesType"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in XMZCLX" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.causeExpensesType?formData.causeExpensesType.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资金属性">
            <el-select
              style="width:100%"
              value-key="code"
              size="mini"
              v-if="!readonly"
              v-model="formData.financialAttribute"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in XMCZSX" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.financialAttribute?formData.financialAttribute.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="财务文号">
            <el-select
              style="width:100%"
              value-key="code"
              size="mini"
              v-model="formData.financialSymbol"
              filterable
              v-if="!readonly"
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in CZWH" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.financialSymbol?formData.financialSymbol.name:'--'}}</div>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="sub-title first-sub-title">财务分析属性</div>
      <el-row :gutter="20" class="content-common_box">
        <el-col :span="16">
          <el-form-item label="资金来源级次">
            <el-select
              v-if="!readonly"
              value-key="code"
              style="width:100%"
              size="mini"
              v-model="formData.fundSource"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in ZJLYJC" :key="item.code" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.fundSource?formData.fundSource.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预算管理类型（分析）">
            <el-select
              v-if="!readonly"
              value-key="code"
              style="width:100%"
              size="mini"
              v-model="formData.budgetType1"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in YSLXFX" :key="item.code" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.budgetType1?formData.budgetType1.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收入分类">
            <el-select
              v-if="!readonly"
              value-key="code"
              style="width:100%"
              size="mini"
              v-model="formData.incomeCategory"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in SRFL" :key="item.code" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.incomeCategory?formData.incomeCategory.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="支出分类">
            <el-select
              value-key="code"
              v-if="!readonly"
              style="width:100%"
              size="mini"
              v-model="formData.expensesCategory"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in ZCFL" :key="item.code" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.expensesCategory?formData.expensesCategory.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="功能分类（分析）">
            <el-select
              v-if="!readonly"
              value-key="code"
              style="width:100%"
              size="mini"
              v-model="formData.purpose1"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in ZCGNFLFX" :key="item.code" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.purpose1?formData.purpose1.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目学科门类">
            <el-select
              value-key="code"
              v-if="!readonly"
              style="width:100%"
              size="mini"
              v-model="formData.disciplines"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in XMXKML" :key="item.code" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.disciplines?formData.disciplines.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="培养方向">
            <el-select
              value-key="code"
              style="width:100%"
              v-if="!readonly"
              size="mini"
              v-model="formData.trainingDirection"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in PYFX" :key="item.code" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.trainingDirection?formData.trainingDirection.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用途">
            <el-select
              v-if="!readonly"
              value-key="code"
              style="width:100%"
              size="mini"
              v-model="formData.projectUse"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in YT" :key="item.code" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.projectUse?formData.projectUse.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="中央部门决算">
            <el-select
              value-key="code"
              style="width:100%"
              v-if="!readonly"
              size="mini"
              v-model="formData.centerAccounts"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in ZYBMJS" :key="item.code" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.centerAccounts?formData.centerAccounts.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="省部门决算">
            <el-select
              value-key="code"
              style="width:100%"
              size="mini"
              v-if="!readonly"
              v-model="formData.localAccounts"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in SBMJS" :key="item.code" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.localAccounts?formData.localAccounts.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其他用途">
            <el-select
              style="width:100%"
              value-key="code"
              v-if="!readonly"
              size="mini"
              multiple
              v-model="formData.projectOtherUse"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in YT" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.projectOtherUse?formData.projectOtherUse.name || '--':'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分类属性1">
            <el-select
              v-if="!readonly"
              value-key="code"
              style="width:100%"
              size="mini"
              v-model="formData.flsx1"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in XMFLSX1" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.flsx1?formData.flsx1.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分类属性2">
            <el-select
              v-if="!readonly"
              style="width:100%"
              value-key="code"
              size="mini"
              v-model="formData.flsx2"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in XMFLSX2" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.flsx2?formData.flsx2.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分类属性3">
            <el-select
              v-if="!readonly"
              style="width:100%"
              value-key="code"
              size="mini"
              v-model="formData.flsx3"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in XMFLSX3" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.flsx3?formData.flsx3.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分类属性4">
            <el-select
              v-if="!readonly"
              style="width:100%"
              value-key="code"
              size="mini"
              v-model="formData.flsx4"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in XMFLSX4" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.flsx4?formData.flsx4.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分类属性5">
            <el-select
              v-if="!readonly"
              value-key="code"
              style="width:100%"
              size="mini"
              v-model="formData.flsx5"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in XMFLSX5" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.flsx5?formData.flsx5.name:'--'}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分类属性6">
            <el-select
              v-if="!readonly"
              value-key="code"
              style="width:100%"
              size="mini"
              v-model="formData.flsx6"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in XMFLSX6" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
            <div v-else>{{formData.flsx6?formData.flsx6.name:'--'}}</div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 选择项目类别 -->
    <ExecuteProjectType
      v-if="projectTypeVisible"
      :visible="projectTypeVisible"
      @close="()=>{projectTypeVisible=false}"
      @success="callBackProjectType"
      :defaultCode="projectTypeCode"
    />
    <!-- 选择科目 -->
    <SubjectChoice
      :visible="subjectChoiceVisible"
      v-if="subjectChoiceVisible"
      @close="()=>{subjectChoiceVisible=false}"
      @success="callBackSubject"
    />
    <!-- 选择经济分类科目 -->
    <EconomyClassifySubject
      :visible="economyVisible"
      v-if="economyVisible"
      @close="()=>{economyVisible=false}"
      @success="callBackEconomy"
      :defaultCode="economyCode"
    />
    <!-- 选择资金来源科目 -->
    <MoneySource
      :visible="moneyVisible"
      v-if="moneyVisible"
      @close="()=>{moneyVisible=false}"
      @success="callBackMoney"
      :defaultCodeArr="moneyCode"
    />
    <!-- 选择凭证类型 -->
    <VoucherTypeChoice
      :visible="voucherVisible"
      v-if="voucherVisible"
      @close="()=>{voucherVisible=false}"
      @success="callBackVoucher"
      :defaultCode="defaultVoucherCode"
    />
    <!-- 所属部门 -->
    <DepartmentChoiceDialog
      :visible="departmentVisible"
      v-if="departmentVisible"
      @close="()=>{departmentVisible=false}"
      @success="callBackDepartment"
      :defaultItems="defaultDepartmentItems"
      selectionType="radio"
    />

    <!-- 选择人员 -->
    <PersonChoiceDialog
      :visible="personVisible"
      v-if="personVisible"
      @close="()=>{personVisible=false}"
      @success="callBackPerson"
      :defaultItems="defaultPersonItems"
      :selectionType="selectionType"
    />
  </div>
</template>
<script>
import { Query_HfcOXVLBiX } from '@/api/baseData'
import { GetProject_3EMxpS4U31 } from '@/api/getBatchData'
import ExecuteProjectType from '@/components/projectItemDialog/ExecuteProjectType.vue'
import SubjectChoice from '@/components/projectItemDialog/SubjectChoice.vue'
import EconomyClassifySubject from '@/components/projectItemDialog/EconomyClassifySubject.vue'
import MoneySource from '@/components/projectItemDialog/MoneySource.vue'
import VoucherTypeChoice from '@/components/projectItemDialog/VoucherTypeChoice.vue'
import DepartmentChoiceDialog from '@/components/projectItemDialog/DepartmentChoiceDialog.vue'
import PersonChoiceDialog from '@/components/projectItemDialog/PersonChoiceDialog.vue'
import yyAtool from '@/utils/aTool.js'
export default {
  name: 'ProjectEditForm',
  components: {
    ExecuteProjectType,
    SubjectChoice,
    EconomyClassifySubject,
    MoneySource,
    VoucherTypeChoice,
    DepartmentChoiceDialog,
    PersonChoiceDialog
  },
  props: {
    projectCode: {
      type: String,
      default: ''
    },

    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      yyAtool,
      projectTypeVisible: false, //选择项目分类
      subjectChoiceVisible: false, //选择科目
      economyVisible: false, //选择经济
      moneyVisible: false, //选择资金来源
      voucherVisible: false, //选择凭证
      projectTypeCode: '', //项目类别code
      defaultVoucherCode: '', //可用凭证类型code
      economyCode: '', //经济科目code
      moneyCode: [], //资金来源科目编号
      departmentVisible: false, //选择部门
      defaultDepartmentItems: [], //已经选择的部门
      personVisible: false,
      defaultPersonItems: [], //已经选择的人员
      selectionType: 'radio',
      filed: '', //字段内容
      formData: {
        // 基本信息
        name: '', //项目名称
        projectType: {
          //项目类别
          code: '',
          id: '',
          name: '',
          pId: ''
        },
        code: '', //执行项目编号
        mnemonic: '', // 助记码
        researchProjectCode: '', //科研项目编号
        budgetProjectInfo: {
          //预算项目
          name: '',
          code: ''
        },
        budgetProjectType: {
          //预算项目类别
          name: '',
          code: ''
        },
        topProject: {
          //所属一级项目
          code: '',
          name: ''
        },
        budget: {
          //预算支出项
          code: '',
          name: ''
        },
        directors: [], //项目负责人
        directorsNew: {
          code: '',
          name: ''
        },
        department: {
          //所属部门
          name: '',
          code: ''
        },
        functionalDepartment: {
          //职能部门
          name: '',
          code: ''
        },
        qtfzRs: '', //其他负责人
        quotaType: {
          //额度模式
          name: '',
          code: ''
        },
        carryOver: true, //年末全额结转
        topicMembers: '', //课题组成员
        state: {
          //存续状态
          name: '',
          code: ''
        },
        approvalDate: null, //立项日期
        endDate: null, //结项日期
        initiationYear: null, //立项年份
        expendType: {
          //支出功能类别
          code: '',
          id: '',
          name: '',
          pId: ''
        },
        // 核算控制信息
        defaultDebitSubjectCode: '', //借方默认科目
        defaultDebitSubjectCodeYS: '', //默认预算借方科目
        otherDebitSubjectCodes: '', //其它借方科目
        defaultCreditSubjectCode: '', //默认贷方科目
        defaultCreditSubjectCodeYS: '', //默认预算贷方科目
        otherCreditSubjectCodes: '', //其它贷方科目
        limitSubjectCode: '', //禁用会计科目
        limitEconomySubjectCode: '', //禁用经济分类科目
        economySubjectCode: '', //可用经济分类科目
        fundsOriginSubjects: '', //可用资金来源
        overFundsOriginSubjects: '', //可超支资金来源
        transferType: null, //项目结转类型
        pzlx: '', //可用凭证类型
        fzRs: '', //负责人
        direction: '', //余额方向
        budgetType: null, //预算管理类型
        purpose: null, //功能分类
        budgetInfoRelevance: null, //预算信息关联号
        incomeType: null, //收入类型
        expensesType: null, //支出类型
        causeExpensesType: null, //事业支出类型
        financialAttribute: null, //资金属性
        financialSymbol: null, //财务文号
        isLocked: false, //是否锁定
        lockRemark: '', //锁定原因
        enable: false, //是否启用
        isSpecialAudit: false, //是否财务一支笔
        isOverspendLimit: false, //是否允许超支
        overspendLimit: undefined, //超支限额
        overspendDate: null, //超支有效期
        isTreasury: false, //是否国库项目
        treasuryControl: 'Reminded', //国库平衡检查
        treasuryType: '', //国库类别
        authorisedPlanType: [], //授权计划类型
        authorisedPlan: null, //授权计划
        enterpriseProject: null, //民口项目
        // 财务分析属性
        fundSource: null, //资金来源级次
        budgetType1: null, //预算管理类型（分析）
        incomeCategory: null, //收入分类
        expensesCategory: null, //支出分类
        purpose1: null, //功能分类（分析）
        disciplines: null, //项目学科门类
        trainingDirection: null, //培养方向
        projectUse: null, //用途
        centerAccounts: null, //中央部门决算
        localAccounts: null, //省部门决算
        projectOtherUse: [], //其他用途
        flsx1: null, //分类属性1
        flsx2: null, //分类属性2
        flsx3: null, //分类属性3
        flsx4: null, //分类属性4
        flsx5: null, //分类属性5
        flsx6: null //分类属性6
      },
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        'projectType.name': [{ required: true, message: '请选择', trigger: ['change', 'blur'] }],
        code: [{ required: true, message: '请输入', trigger: 'blur' }],
        'expendType.name': [{ required: true, message: '请选择', trigger: ['change', 'blur'] }],
        'department.name': [{ required: true, message: '请选择', trigger: ['change', 'blur'] }],
        lockRemark: [{ required: false, message: '请输入', trigger: ['change', 'blur'] }],
        overspendDate: [{ required: false, message: '请选择', trigger: ['change', 'blur'] }],
        overspendLimit: [{ required: false, message: '请输入', trigger: ['change', 'blur'] }]
      },

      XMFLSX1: [],
      XMFLSX2: [],
      XMFLSX3: [],
      XMFLSX4: [],
      XMFLSX5: [],
      XMFLSX6: [],
      YT: [],
      SBMJS: [],
      ZYBMJS: [],
      PYFX: [],
      XMXKML: [],
      ZCGNFLFX: [],
      ZCFL: [],
      SRFL: [],
      YSLXFX: [],
      ZJLYJC: [],
      XMCZSX: [],
      ZCGNFL: [],
      YSLX: [],
      SQJHLX: [],
      SQJH: [],
      MKXM: [],
      XMZCLX: [],
      XMJZLX: [],
      XMSYZCLX: [],
      XMSRLX: [],
      YSXXGLH: [],
      CZWH: [],
      subjectField: '',
      economyField: '',
      moneyField: ''
    }
  },
  watch: {
    projectCode: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            this.getDetail()
          })
        }
      }
    }
  },
  created() {
    if (!this.readonly) {
      this.queryZd('XMFLSX1')
      this.queryZd('XMFLSX2')
      this.queryZd('XMFLSX3')
      this.queryZd('XMFLSX4')
      this.queryZd('XMFLSX5')
      this.queryZd('XMFLSX6')
      this.queryZd('YT')
      this.queryZd('SBMJS')
      this.queryZd('ZYBMJS')
      this.queryZd('PYFX')
      this.queryZd('XMXKML')
      this.queryZd('ZCGNFLFX')
      this.queryZd('ZCFL')
      this.queryZd('SRFL')
      this.queryZd('YSLXFX')
      this.queryZd('ZJLYJC')
      this.queryZd('XMCZSX')
      this.queryZd('ZCGNFL')
      this.queryZd('YSLX')
      this.queryZd('SQJHLX')
      this.queryZd('SQJH')
      this.queryZd('MKXM')
      this.queryZd('XMZCLX')
      this.queryZd('XMJZLX')
      this.queryZd('XMSYZCLX')
      this.queryZd('XMSRLX')
      this.queryZd('YSXXGLH')
      this.queryZd('CZWH')
    }
  },
  methods: {
    getDetail() {
      this.$emit('loading', true)
      GetProject_3EMxpS4U31({ projectCode: this.projectCode })
        .then(res => {
          this.$emit('loading', false)
          this.formData = res.data
          if (this.formData.directors.length) {
            this.formData.directorsNew = this.formData.directors[0]
          } else {
            this.formData.directorsNew = {
              name: '',
              code: '',
              isMainDirector: false
            }
          }
        })
        .catch(() => {
          this.$emit('loading', false)
        })
    },

    openPeojectType() {
      this.projectTypeCode = this.formData.projectType.code
      this.projectTypeVisible = true
    },

    callBackProjectType(data) {
      Object.keys(this.formData.projectType).forEach(key => {
        this.formData.projectType[key] = ''
        if (data) {
          this.formData.projectType[key] = data[key]
        }
      })
    },

    clearProjectType() {
      Object.keys(this.formData.projectType).forEach(key => {
        this.formData.projectType[key] = ''
      })
    },

    clearSubject(filed) {
      this.formData[filed] = ''
    },

    openSubject(filed) {
      this.subjectField = filed
      this.subjectChoiceVisible = true
    },

    callBackSubject(data) {
      this.formData[this.subjectField] = data ? data.code : ''
    },

    openEconomy(filed) {
      this.economyField = filed
      this.economyCode = this.formData[this.economyField]
      this.economyVisible = true
    },

    clearEconomy(filed) {
      this.formData[filed] = ''
    },

    callBackEconomy(data) {
      this.formData[this.economyField] = data ? data.code : ''
    },

    clearMoney(filed) {
      this.formData[filed] = ''
    },

    openMoneySource(filed) {
      this.moneyField = filed
      this.moneyCode = this.formData[this.moneyField] ? this.formData[this.moneyField].split(',') : []
      this.moneyVisible = true
    },

    callBackMoney(data) {
      this.formData[this.moneyField] = data.length ? data.map(f => f.code).join(',') : ''
    },

    openVoucher() {
      this.defaultVoucherCode = this.formData.pzlx
      this.voucherVisible = true
    },

    callBackVoucher(data) {
      this.formData.pzlx = data ? data.code : ''
    },

    clearVoucher() {
      this.formData.pzlx = ''
    },

    queryZd(dictCode) {
      Query_HfcOXVLBiX({ dictCode }).then(res => {
        this[dictCode] = res.data ? res.data.items : []
      })
    },

    changeSd(val) {
      this.rules.lockRemark[0].required = val
      this.$refs.form.validateField('lockRemark')
    },

    changeYxcz(val) {
      this.rules.overspendDate[0].required = val
      this.rules.overspendLimit[0].required = val
      this.$refs.form.validateField('overspendDate')
      this.$refs.form.validateField('overspendLimit')
    },

    changeSfgk(val) {
      //是否国库项目
      if (val) {
        this.formData.treasuryControl = 'Control'
        this.formData.treasuryType = 'CentralTreasury'
      } else {
        this.formData.treasuryControl = 'Reminded'
        this.formData.treasuryType = ''
      }
    },

    clearDepartment() {
      Object.keys(this.formData.department).forEach(key => {
        this.formData.department[key] = ''
      })
    },

    openDepartment() {
      this.defaultDepartmentItems = [this.formData.department]
      this.departmentVisible = true
    },

    callBackDepartment(data) {
      Object.keys(this.formData.department).forEach(key => {
        this.formData.department[key] = ''
        if (data) {
          this.formData.department[key] = data[key]
        }
      })
    },

    callBackPerson(data) {
      if (this.filed === 'directorsNew') {
        this.formData[this.filed].name = ''
        this.formData[this.filed].code = ''
        this.formData.fzRs = ''
        if (data) {
          this.formData[this.filed].name = data.name
          this.formData[this.filed].code = data.code
          this.formData.fzRs = data.code
        }
      } else {
        this.formData[this.filed] = data.length ? data.map(f => f.code).join(',') : ''
      }
    },

    clearPerson(filed) {
      if (filed === 'directorsNew') {
        //项目负责人
        this.formData[filed].name = ''
        this.formData[filed].code = ''
        this.formData.fzRs = ''
      } else {
        this.formData[filed] = ''
      }
    },

    openPerson(filed) {
      this.filed = filed
      if (filed === 'directorsNew') {
        this.selectionType = 'radio'
        this.defaultPersonItems = [this.formData[filed]]
      } else {
        this.selectionType = 'checkbox'
        let arr = []
        if (this.formData[filed]) {
          this.formData[filed].split(',').forEach(f => {
            arr.push({ code: f })
          })
        }
        this.defaultPersonItems = arr
      }
      this.personVisible = true
    },

    // 校验内容
    validate() {
      let result = false
      this.$refs.form.validate(valid => {
        result = valid
      })
      return result
    },

    // 滚动定位该填没有填写的地方
    scroll() {
      this.$nextTick(() => {
        let isError = document.getElementsByClassName('is-error')
        isError[0].scrollIntoView({
          block: 'center',
          behavior: 'auto'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.sub-title {
  font-weight: bold;
  font-size: 16px;
  padding: 12px 0 12px 20px;
  margin-bottom: 10px;
  box-sizing: content-box;
  background-color: #f0f7ff;
  &.first-sub-title {
    border-top: none;
    padding-top: 10px;
  }
}
.content-common_box {
  padding: 0 20px;
}
.special-form_item {
  ::v-deep .el-form-item__content {
    margin-top: 33px;
  }
}
</style>
