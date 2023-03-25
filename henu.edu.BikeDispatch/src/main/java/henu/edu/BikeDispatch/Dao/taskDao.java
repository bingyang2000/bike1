package henu.edu.BikeDispatch.Dao;

import henu.edu.BikeDispatch.pojo.task;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * 获取任务，产生任务接口
 */
@Mapper
@Repository
public interface taskDao {
    //创建任务
    public int addTask(task t);
    //查询所有任务
    public List<task> getAllTask();
    //查询所有未完成任务
    public List<task> getTaskByState(String state);
    //按Id查询任务
    public task getTaskByJobNumber(@Param("tid") Integer tid,@Param("state") String state);
    //启动任务
    public int startTask(@Param("id") Integer id, @Param("date") Date date);
    //提交任务
    public int compeleteTask(@Param("id") Integer id, @Param("date") Date date);
    //删除任务，按id
    public int delTask(Integer id);
}
