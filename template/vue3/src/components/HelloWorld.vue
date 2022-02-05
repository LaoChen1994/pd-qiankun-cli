<template>
  <div class="vue-layout">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
</template>

<script>
import { ElTable, ElTableColumn } from "element-plus";
import {ref} from 'vue'

export default {
  setup() {
    const data = ref([
      {
        date: "2016-05-03",
        name: "Tom",
        address: "HangZhou",
      },
      {
        date: "2017-06-08",
        name: "Jerry",
        address: "NingBo",
      },
    ]);

    console.log(data.value)

    return {
      tableData: data,
    };
  },
  components: {
    ElTable,
    ElTableColumn,
  },
};
</script>

<style lang="css" scoped>
.vue-layout {
  padding: 10px;
  width: 1000px;
}
</style>