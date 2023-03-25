package henu.edu.BikeDispatch.controller;

import com.alibaba.fastjson.JSON;
import henu.edu.BikeDispatch.Dao.D_tDao;
import henu.edu.BikeDispatch.Dao.DispatcherDao;
import henu.edu.BikeDispatch.Dao.PortDao;
import henu.edu.BikeDispatch.Dao.taskDao;
import henu.edu.BikeDispatch.pojo.d_t;
import henu.edu.BikeDispatch.pojo.task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@RestController
public class taskController {
    @Autowired
    taskDao taskdao;
    @Autowired
    DispatcherDao dispatcherDao;  //这里遵循依赖倒置原则，高层抽象依赖与接口
    @Autowired
    PortDao portDao;
    @Autowired
    D_tDao d_tDao;
    @RequestMapping("/addTask")
    public String addTask(){
        //这个方法要定时调用，实现实时性
        int flag=portDao.getNoNeedNum()+ portDao.getNeedNum();
        if(flag>50){
            //如果总调度数量大于五十则生成调度任务
            task t=new task();
            t.setFirstTime(new Date());
            t.setState("待完成");
            t.setNeedSpan(flag/50.0);  //根据调度车辆数确定,此处进行简单模拟
            int count=taskdao.addTask(t);
            if (count>0) return "ok";
            else return "no";
        }
        else
            return "noNeed";
    }
    @RequestMapping("/addTaskByManager")
    public String addTaskByManager(@RequestBody task task){
            int count=taskdao.addTask(task);
            if (count>0) return "ok";
            else return "no";
    }
    @RequestMapping("/getAllTask")
    public Object getAllTask(){
        List<task> tasks=taskdao.getAllTask();
        return JSON.toJSONString(tasks);
    }
    @RequestMapping("/getTaskByState")
    public Object getTaskByState(String state){
        List<task> tasks=taskdao.getTaskByState(state);
        return JSON.toJSONString(tasks);
    }
    @RequestMapping("/getTaskByJobNumber")
    public Object getTaskByJobNumber(String jobNumber,String state){
        int dId;
        dId=dispatcherDao.getDIdByJobNumber(jobNumber);
        //通过调度员id获取他所参与的任务
        List<Integer> tids;
        tids=d_tDao.getTidByDid(dId);
        List<task> tasks= new LinkedList<>();

        for (Integer tid:tids) {
            task ta=taskdao.getTaskByJobNumber(tid,state);
            if(ta!=null)
                tasks.add(ta);
        }
        return JSON.toJSONString(tasks);
    }
    @RequestMapping("/startTask")
    public String startTask(Integer taskid,Integer dispatcherId){
        d_t x =new d_t(dispatcherId,taskid);
        int count=d_tDao.addd_t(x);
//        SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd");
//        date=formatter.format(System.currentTimeMillis());
        Date date=new Date();
        count+=taskdao.startTask(taskid,date);
        if(count==2)return "ok";
        else return "no";
    }
    @RequestMapping("/compeleteTask")
    public String compeleteTask(Integer taskid, Date date,Integer dispatcherId){
        //此处简略，省去了判断任务完成情况，即判断任务时间是否小于needspan(任务需要时间）
        //因为日期只精确到天，需要精确到分
        int count=dispatcherDao.updateDispatcherSuccess(dispatcherId);
//        SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd");
//        date=formatter.format(System.currentTimeMillis());
        date=new Date();
        count+=taskdao.compeleteTask(taskid,date);
        if(count==2)return "ok";
        else return "no";
    }
    @RequestMapping("/delTask")
    public String delTask(Integer id){
        int count=taskdao.delTask(id);
        if(count==1)return "ok";
        else return "no";
    }
}
