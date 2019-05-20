<template>
    <div id="Login">
        <div id="container">
            <h1 style="font-size:80px;margin-top:10px;height:150px;color:#F8F5F2">可米彩票</h1>
            <el-form  status-icon label-width="80px" :model="userInfo" :rules="rules" ref="userInfo">
                <el-form-item  label="用户名" prop="accountName">
                    <el-input v-model="userInfo.accountName"></el-input>
                </el-form-item>
                 <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="userInfo.password"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="login">登录</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            userInfo:{
                accountName:'',
                password:''
            },
            rules:{
                accountName:[
                    {required:true,message:'用户名不能为空',trigger:'blur'},
                    {min:3,max:20,message:'用户名不能小于3和大于20个字符',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'密码不能为空',tragger:'blur'}
                ]
            }
        }
    },
    methods:{
        login(){
            console.log(this.$refs);
            this.$refs['userInfo'].validate((valid)=>{
                if(valid){
                    console.log("校验通过");
                    this.$http.post(this.$apis.signin,this.userInfo)
                    .then((resp)=>{
                        console.log("resp",resp);
                        var accountName=resp.data.accountName;
                        var token=resp.data.token;
                        var success=resp.data.success;
                        if(success){
                            //把token保存到本地
                            localStorage.setItem("token",token);
                            console.log(this.$route)
                            var query=this.$route.query;
                            //如果query.redirect存在，直接跳转到redirect。不然就跳到根目录
                            if(query.redirect){
                            this.$router.push({path:query.redirect})
                            }else{
                                this.$router.push({path:'/'})
                            }
                        }else{
                            this.$message.error("登录失败，请检查用户名和密码哦！")
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }else{
                    console.log("校验失败")
                }
            })
        }
    }
    
}
</script>
<style lang="scss" scoped>
#Login{
    width: 100%;
    height: 100%;
    background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558359906626&di=63bff161a8c4ae38bfbed15815857bf1&imgtype=0&src=http%3A%2F%2Fpx.thea.cn%2FPublic%2FUpload%2FUploadfiles%2Fimage%2F20190227%2F20190227200457_85559.png");
    background-size: 100% 100%;    
}
#container{
    background-color: rgba(0,0,0,.5);
    margin:0;
    width: 25%;
    height: 100%;
    min-width: 400px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
}
.el-form{
    margin-top: 40px;
    padding: 20px;
    box-sizing: border-box;
}

</style>


