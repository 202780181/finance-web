<template>
  <ibps-container type="full" class="page">
    <div class="before-carry_box">
      <el-steps :active="active" align-center>
        <el-step title="选择项目范围"></el-step>
        <el-step title="选择项目"></el-step>
        <el-step title="说明和策略设置"></el-step>
        <el-step title="预览回收数据"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <div class="before-carry_box-content">
        <template v-if="active===1">
          <div class="choice-project_scope">
            <ul>
              <li>
                <h3>说明</h3>
              </li>
              <li>全部项目：已经登记留用金额的项目，如果项目最新余额大于留用登记金额，则回收金额=项目余额-留用登记金额；反之，则回收金额=0，不生成回收记录。</li>
              <li>指定项目：根据需要选择指定项目进行回收。</li>
            </ul>
            <div>
              <el-radio v-model="radio" label="1">全部项目</el-radio>
            </div>
            <div>
              <el-radio v-model="radio" label="2">指定项目</el-radio>
            </div>
          </div>
        </template>
        <template v-if="active===2">
          <div class="choice-project">
            <div class="choice-project_tree">
              <div class="choice-project_left-input">
                <p>预算支出项</p>
                <el-input placeholder="请输入内容" v-model.trim="filterText" clearable size="mini"></el-input>
              </div>
              <div class="choice-project_tree-content">
                <el-tree ref="tree" :filter-node-method="filterNode" :data="treeData" :props="defaultProps" @node-click="handleNodeClick">
                  <div class="custom-tree-node" slot-scope="{ node }">
                    <span :title="node.label">{{ node.label }}</span>
                  </div>
                </el-tree>
              </div>
            </div>
            <div class="choice-project_table">表格</div>
          </div>
        </template>
        <template v-if="active===3">
          <div class="explain-tactics_set">
            <ul>
              <li>
                <h3>说明</h3>
              </li>
              <li>1、已经登记留用金额的项目，如果项目最新余额大于留用登记金额，则回收金额=项目余额-留用登记金额；反之，则回收金额=0，不生成回收记录；</li>
              <li>2、设置为全额结转的项目，项目余额全部结转到第二年，所以回收金额=0，不生成回收记录；</li>
              <li>3、其他项目请设置自动回收策略。</li>
            </ul>
            <el-form label-width="110px">
              <el-form-item label="经常性项目：">
                <div>
                  <el-radio v-model="radio1" label="1">全额回收</el-radio>
                </div>
                <div>
                  <el-radio v-model="radio1" label="2">冻结金额不回收</el-radio>
                </div>
                <div>
                  <el-radio v-model="radio1" label="3">不回收</el-radio>
                </div>
              </el-form-item>
              <el-form-item label="一次性项目：">
                <div>
                  <el-radio v-model="radio2" label="1">全额回收</el-radio>
                </div>
                <div>
                  <el-radio v-model="radio2" label="2">冻结金额不回收</el-radio>
                </div>
                <div>
                  <el-radio v-model="radio2" label="3">不回收</el-radio>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </template>
        <template v-if="active===4">
          <div style="height:100%;padding-top:20px;">
            <el-result icon="warning" v-if="false">
              <template slot="subTitle">
                <p class="preview-des">未找到需要回收的项目，请重新选择！</p>
              </template>
            </el-result>
            <el-table
              :data="tableData"
              row-key="id"
              border
              default-expand-all
              tooltip-effect="dark"
              height="100%"
              :tree-props="{children: 'children'}"
            >
              <el-table-column label="预算支出项及部门" prop="date" align="center" min-width="140" />
              <el-table-column label="回收项目数" prop="name" align="center" min-width="140">
                <template slot-scope="scope">
                  <el-button type="text">{{scope.row.name}}</el-button>
                </template>
              </el-table-column>
              <el-table-column label="回收额度（元）" prop="address" align="center" min-width="140">
                <template slot-scope="scope">
                  <el-button type="text">{{scope.row.address}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
        <template v-if="active===5">
          <div>
            <el-result icon="success">
              <template slot="subTitle">
                <p class="preview-des">
                  操作成功，回收批次已生成，详情请查看
                  <span>（批次XDHS20230101）</span>
                </p>
                <div class="preview-des_bottom">回收凭证生成后将通过系统消息提醒您！</div>
              </template>
            </el-result>
          </div>
        </template>
      </div>
      <div class="before-carry_box-btn">
        <el-button icon="el-icon-bottom" type="primary" v-if="active!==4&&active!==5" @click="goNext(true)">下一步</el-button>
        <el-button icon="el-icon-top" v-if="active!==1" @click="goNext(false)">上一步</el-button>
        <el-button type="primary" @click="createHsBatch" v-if="active===4">生成回收批次</el-button>
        <el-button type="primary" v-if="active===5" @click="reset">重新发起回收</el-button>
        <el-button @click="goRouter">{{active===5?'关闭':'取消' }}</el-button>
      </div>
    </div>
  </ibps-container>
</template>
<script>
import { GetAll_uR8YTYIK20 } from '@/api/baseData'
import treeUtil from '@/utils/tree'
export default {
  name: 'CarryForwardRecovery',
  data() {
    return {
      active: 1,
      radio: '1',
      radio2: '1',
      radio1: '1',
      filterText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 2,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 3,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ]
        },
        {
          id: 4,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.getTree()
  },
  methods: {
    goNext(val) {
      if (val) {
        this.active++
      } else {
        this.active--
      }
    },

    handleNodeClick(node) {},

    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },

    getTree() {
      GetAll_uR8YTYIK20({}).then(res => {
        this.treeData = treeUtil.transformToTreeFormat(res.data, {
          idKey: 'id',
          pIdKey: 'pId',
          nameKey: 'name',
          childrenKey: 'children'
        })
      })
    },

    createHsBatch() {
      this.active = 5
    },

    reset() {
      this.active = 1
    },

    goRouter() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.before-carry_box {
  height: 100%;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 20px;
  .before-carry_box-content {
    flex: 1;
    overflow: auto;
  }
  .before-carry_box-btn {
    text-align: center;
    padding-top: 10px;
    .el-button {
      margin: 0 10px;
    }
  }
}
.choice-project_scope {
  margin-left: 200px;
  & > div {
    margin: 20px 0;
  }
  ul {
    margin-top: 20px;
    h3 {
      color: #666;
    }
    li {
      margin-bottom: 10px;
    }
    color: #999;
  }
}
.explain-tactics_set {
  margin-left: 200px;
  ul {
    margin-top: 20px;
    h3 {
      color: #666;
    }
    li {
      margin-bottom: 10px;
    }
    color: #999;
  }
}
.preview-des {
  font-size: 24px;
  font-weight: 500;
  span {
    color: #55a0eb;
    cursor: pointer;
  }
}
.preview-des_bottom {
  margin-top: 10px;
  color: #999;
}
.choice-project {
  display: flex;
  height: 100%;
  padding-top: 20px;
  .choice-project_tree {
    border: 1px solid #ccc;
    border-radius: 2px;
    padding: 10px;
    width: 20%;
    display: flex;
    flex-direction: column;
    .choice-project_left-input {
      padding-bottom: 10px;
      & > p {
        margin-bottom: 10px;
      }
    }
    .choice-project_tree-content {
      flex: 1;
      overflow: auto;
      .el-tree {
        height: 100% !important;
        .custom-tree-node {
          font-size: 12px;
          width: 100%;
          overflow: hidden; //超出隐藏
          white-space: nowrap; //不折行
          text-overflow: ellipsis; //溢出显示省略号
        }
      }
    }
  }
}
</style>