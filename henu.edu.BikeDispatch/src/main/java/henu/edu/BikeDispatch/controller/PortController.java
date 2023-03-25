package henu.edu.BikeDispatch.controller;

import com.alibaba.fastjson.JSON;
import henu.edu.BikeDispatch.Dao.PortDao;
import henu.edu.BikeDispatch.pojo.port;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PortController {
    //最好能够将接口进行分级管理即文件用@RequestMapping,具体方法用@GetMapping和@PostMapping
    @Autowired
    PortDao portDao;
    @RequestMapping("/addPort")
    public String addPort(@RequestBody port p){
        System.out.println(p);
        int count = portDao.addPort(p);
        System.out.println("添加成功的数据条数："+count);
        if(count>0){
            return "ok";
        }
        return "no";
    }
    @RequestMapping("/getAllPort")
    public Object getAllPort(){
        List<port> Ports = portDao.getPort();
        String portsJson= JSON.toJSONString(Ports);
        System.out.println("portsJson:"+portsJson);
        return portsJson;
    }
    @RequestMapping("/delPort")
    public String delPort(Integer ID){
        int count = portDao.delPort(ID);
        if(count>0){
            return "ok";
        }
        else{
            return "no";
        }
    }
    @RequestMapping("/getPortById")
    public String getPortById(Integer ID){
        port p = portDao.getPortById(ID);

        String portJson = JSON.toJSONString(p);
        System.out.println("portJson:"+portJson);
        return portJson;
    }
    @RequestMapping("/updatePort")
    public String updatePort(@RequestBody port p){
        int count = portDao.updatePort(p);
        if(count>0){
            return "ok";
        }
        else{
            return "no";
        }
    }
    @RequestMapping("/getNeedNum")
    public int getNeedNum(){
        return portDao.getNeedNum();
    }
    @RequestMapping("/getNoNeedNum")
    public int getNoNeedNum(){
        int x= portDao.getNoNeedNum();
        return x*(-1);
    }
    @RequestMapping("/getTaskPort")
    public String getTaskPort(Integer dist){
        List<port> Ports = portDao.getTaskPort(dist);
        String portsJson= JSON.toJSONString(Ports);
        System.out.println("portsJson:"+portsJson);
        return portsJson;
    }
}
