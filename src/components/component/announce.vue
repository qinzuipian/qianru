<template>
    <div class="main">
        <p>告示</p>
        <p>{{rowHTML.BKC085}}</p>
        <p>{{rowHTML.AAE036}}</p>
    </div>
    
</template>



<script>
import axios from "axios";
export default {
  props: ["rowHTML"],
  data() {
    return {};
  },
  methods:{}
};
</script>


<style scoped>
.main p:nth-child(1) {
    text-align: center;
    font-size: 20px;
    color: gray;
    font-weight: 700;
    padding: 0;
    margin: 0;
}
.main p:nth-child(2) {
    padding: 8px;
    margin:0;
}
.main p:nth-child(3) {
    padding: 0;
    margin: 0 0 10px 0;
    text-align: right;
}
</style>
