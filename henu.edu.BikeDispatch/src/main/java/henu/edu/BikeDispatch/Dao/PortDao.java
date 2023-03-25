package henu.edu.BikeDispatch.Dao;
import henu.edu.BikeDispatch.pojo.port;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 接口，服务层（service）
 */

@Mapper
@Repository
public interface PortDao {

    public int addPort(port p);
    public int delPort(Integer ID);
    public int updatePort(port p);
    public List<port> getPort();
    public port getPortById(Integer ID);
    //获取需要车辆数
    public int getNeedNum();
    //获取多余车辆数
    public int getNoNeedNum();
    //获取需要调度的站点
    public List<port> getTaskPort(Integer dist);
}

