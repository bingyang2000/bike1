package henu.edu.BikeDispatch.Dao;

import henu.edu.BikeDispatch.pojo.d_t;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface D_tDao {
    public int addd_t(d_t x);
    public int deld_t(d_t x);
    public List<Integer> getTidByDid(Integer dispatcherId);
    public List<d_t> getd_t();

}
