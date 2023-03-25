package henu.edu.BikeDispatch.Dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface UserDao {
    public int getUserByLoginName(@Param("userName") String userName, @Param("userPassword") String userPassword);
}
