<template>
    <el-row :gutter="0">
        <el-col :span="3">
            <div class="grid-content bg-purple">
                <el-menu style="height: 400px;" 
                default-active="1" 
                class="el-menu-vertical-demo"  
                @open="handleOpen" 
                @close="handleClose" 
                background-color="#545c64" 
                text-color="#fff"
                active-text-color="#ffd04b">
                    <el-menu-item index="1" @click="goTo('port')">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>站点管理</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="2" @click="goTo('check')">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>任务管理</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="3" @click="goTo('control')">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>调度员管理</span>
                        </template>
                    </el-menu-item>
                </el-menu>
            </div>
        </el-col>

        <el-col :span="21">
            <div class="grid-content bg-purple">
                <el-menu :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                style="width: 90%;">
                    <li role="menuitem" aria-haspopup="true" class="el-submenu" tabindex="0">
                        <div style="color: rgb(255, 255, 255); background-color: rgb(84, 92, 100);">
                            <img src="@/icon/1.jpg" class="headicon">
                        </div>
                    </li>
                </el-menu>
            </div>
            <router-view></router-view>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        data() {
            return{
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            goTo(path) {
                this.$router.replace(path);
            }
        }
    }
</script>
<style>
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .el-submenu .el-menu-item {
        height: 50px;
        line-height: 50px;
        min-width: 100px;
    }
    .el-menu-vertical-demo{
        max-width: 200px;
    }
    .el-menu{
        border: none;
        list-style: none;
        position: relative;
        margin: 0;
        padding-left: 0;
        background-color: #FFF;
    }
    .headicon{
        position:absolute;
        top: 10px;
        right: 20px;
        height: 40px;
        text-align: center;
        width: 40px;
    }
    .el-menu-demo.el-menu--horizontal.el-menu{
        background-color: rgb(84, 92, 100);
        height:60px;
        border: none;
        margin-left: 20px;
    }
</style>