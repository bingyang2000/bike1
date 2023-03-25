package henu.edu.BikeDispatch.controller;

import com.alibaba.fastjson.JSON;
import henu.edu.BikeDispatch.Dao.DispatcherDao;
import henu.edu.BikeDispatch.pojo.dispatcher;
import henu.edu.BikeDispatch.pojo.port;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DispatcherController {
    @Autowired
    DispatcherDao dispatcherDao;
    @RequestMapping("/wxlogin")
    public String getdispatcerByJobNumber(String jobNum,String password){
        dispatcher disp=dispatcherDao.getdispatcerByJobNumber(jobNum,password);
        return JSON.toJSONString(disp);
    }
    @RequestMapping("/addDispatcher")
    public String addDispatcher(@RequestBody dispatcher disp){
        int count = dispatcherDao.addDispatcher(disp);
        System.out.println("添加成功的数据条数："+count);
        if(count>0){
            return "ok";
        }
        return "no";
    }
    @RequestMapping("/getDispatcher")
    public Object getDispatcher(){
        List<dispatcher> disps = dispatcherDao.getDispatcher();
        String dispsJson= JSON.toJSONString(disps);
        System.out.println("dispsJson:"+dispsJson);
        return dispsJson;
    }
    @RequestMapping("/delDispatcher")
    public String delDispatcher(String jobNumber){
        int count = dispatcherDao.delDispatcher(jobNumber);
        if(count>0){
            return "ok";
        }
        else{
            return "no";
        }
    }
    @RequestMapping("/updateDispatcherSuccess")
    public String updateDispatcherSuccess(Integer id){
        int count = dispatcherDao.updateDispatcherSuccess(id);
        if(count>0){
            return "ok";
        }
        else{
            return "no";
        }
    }
    @RequestMapping("/updateDispatcherFail")
    public String updateDispatcherFail(Integer id){
        int count = dispatcherDao.updateDispatcherFail(id);
        if(count>0){
            return "ok";
        }
        else{
            return "no";
        }
    }
}
