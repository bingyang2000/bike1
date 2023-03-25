package henu.edu.BikeDispatch.Dao;

import henu.edu.BikeDispatch.pojo.dispatcher;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface DispatcherDao {
    public dispatcher getdispatcerByJobNumber(@Param("jobNumber") String jobNumber, @Param("password") String password);
    public int addDispatcher(dispatcher p);
    public int getDIdByJobNumber(String jobNumber);
    public int delDispatcher(String jobNumber);
    public int updateDispatcherSuccess(Integer id);
    public int updateDispatcherFail(Integer id);
    public List<dispatcher> getDispatcher();
}
