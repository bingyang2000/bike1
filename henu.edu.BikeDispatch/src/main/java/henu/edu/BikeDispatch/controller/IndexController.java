package henu.edu.BikeDispatch.controller;

import henu.edu.BikeDispatch.Dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class IndexController {

    @Autowired
    private UserDao userDao;

    @GetMapping("/login")
    public String index(String adminUser,String adminPassword) {
        System.out.println("用户账号为："+adminUser);
        System.out.println("用户密码为："+adminPassword);
        int count = userDao.getUserByLoginName(adminUser,adminPassword);
        System.out.println(count);
        if(count>0)
        {
            //登录成功页面跳转处
            return "ok";
        }
        else
        {
            return "用户名或密码错误";
        }
    }
}
